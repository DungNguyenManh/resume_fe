import { Injectable, inject, signal } from '@angular/core';
import { StorageService } from '../storage.service';
import { BACKGROUND_MUSIC_VIDEO_ID } from '../config/background-music.config';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

/**
 * Manages background audio via YouTube IFrame API.
 */
@Injectable({
  providedIn: 'root'
})
export class BackgroundMusicService {
  private readonly storageService = inject(StorageService);
  private player: any;
  private apiLoaded = false;
  
  // State exposed to components
  isMuted = signal<boolean>(true);
  isReady = signal<boolean>(false);

  constructor() {
    // Check saved preference
    const savedMute = this.storageService.getItem('audio_muted_preference');
    if (savedMute === 'false') {
      this.isMuted.set(false);
    } else {
      this.isMuted.set(true); // Default muted per autoplay policy
    }
  }

  /**
   * Loads the YouTube IFrame API script once.
   */
  loadApi(): void {
    if (this.apiLoaded || typeof window === 'undefined') return;
    this.apiLoaded = true;

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      document.head.appendChild(tag);
    }
  }

  /**
   * Initializes the player instance. Called by the dumb component.
   */
  initPlayer(elementId: string): void {
    if (typeof window === 'undefined') return;

    window.onYouTubeIframeAPIReady = () => {
      this.player = new window.YT.Player(elementId, {
        height: '1',
        width: '1',
        videoId: BACKGROUND_MUSIC_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          loop: 1,
          playlist: BACKGROUND_MUSIC_VIDEO_ID, // Required for loop
          playsinline: 1,
          modestbranding: 1
        },
        events: {
          onReady: (event: any) => this.onPlayerReady(event),
          onStateChange: (event: any) => this.onPlayerStateChange(event)
        }
      });
    };
  }

  private onPlayerReady(event: any): void {
    this.isReady.set(true);
    if (this.isMuted()) {
      event.target.mute();
    } else {
      event.target.unMute();
      event.target.setVolume(50);
    }
    event.target.playVideo();
  }

  private onPlayerStateChange(event: any): void {
    // If video ends, it should loop automatically due to playerVars, 
    // but we can catch YT.PlayerState.ENDED just in case.
    if (event.data === window.YT.PlayerState.ENDED) {
      this.player.playVideo();
    }
  }

  /**
   * Toggles the mute state.
   */
  toggleMute(): void {
    if (!this.player || !this.isReady()) return;

    const nextMute = !this.isMuted();
    this.isMuted.set(nextMute);
    this.storageService.setItem('audio_muted_preference', nextMute.toString());

    if (nextMute) {
      this.player.mute();
    } else {
      this.player.unMute();
      this.player.setVolume(50);
      // Browser autoplay policy might pause the video if it was muted and not interacted with.
      // Call play again to ensure it plays after interaction.
      this.player.playVideo();
    }
  }
}
