import { Component, OnInit, inject } from '@angular/core';
import { BackgroundMusicService } from '../../../core/services/background-music.service';

/**
 * Dumb component that renders the hidden YouTube iframe.
 * All logic is delegated to the BackgroundMusicService.
 */
@Component({
  selector: 'app-youtube-audio-player',
  standalone: true,
  template: `<div id="yt-audio-player" style="position: absolute; opacity: 0; width: 1px; height: 1px; pointer-events: none;"></div>`
})
export class YoutubeAudioPlayerComponent implements OnInit {
  private readonly audioService = inject(BackgroundMusicService);

  ngOnInit(): void {
    this.audioService.loadApi();
    this.audioService.initPlayer('yt-audio-player');
  }
}
