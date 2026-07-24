import { Injectable, inject, signal } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CyberAudioService {
  private readonly storageService = inject(StorageService);
  private audioCtx: AudioContext | null = null;
  
  // Audio state - sound starts muted by default to comply with browser autoplay restrictions.
  readonly isMuted = signal(true);

  constructor() {
    const saved = this.storageService.getItem('sound_preference');
    if (saved === 'enabled') {
      this.isMuted.set(false);
    }
  }

  /**
   * Initializes the AudioContext if it hasn't been instantiated yet.
   * Resumes connection if the state was suspended by the browser.
   */
  private initAudioContext(): void {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  /**
   * Toggles the global sound state and persists selection to cache.
   */
  toggleSound(): void {
    const nextMuteState = !this.isMuted();
    this.isMuted.set(nextMuteState);
    this.storageService.setItem('sound_preference', nextMuteState ? 'disabled' : 'enabled');
    
    if (!nextMuteState) {
      this.playBoot();
    }
  }

  /**
   * Helper that plays a synth tone using raw HTML5 oscillator waveforms.
   * Prevents external network requests or heavy assets loading.
   * @param frequency Wave frequency in Hz.
   * @param duration Tone length in seconds.
   * @param type Oscillator waveform type.
   */
  playTick(frequency = 1000, duration = 0.05, type: OscillatorType = 'sine'): void {
    if (this.isMuted()) return;
    try {
      this.initAudioContext();
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (error) {
      console.warn('CyberAudioService: Sound play failed.', error);
    }
  }

  /**
   * Audio asset factory triggers: Play simple UI clicks, hover bleeps, 
   * mechanical keyboard keystrokes, and errors.
   */
  playClick(): void {
    this.playTick(1200, 0.08, 'sine');
  }

  playHover(): void {
    this.playTick(800, 0.04, 'triangle');
  }

  playKeyboard(): void {
    this.playTick(550 + Math.random() * 350, 0.03, 'sine');
  }

  playGlitch(): void {
    if (this.isMuted()) return;
    try {
      this.initAudioContext();
      if (!this.audioCtx) return;
      
      const now = this.audioCtx.currentTime;
      const osc1 = this.audioCtx.createOscillator();
      const osc2 = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(180, now);
      osc1.frequency.setValueAtTime(320, now + 0.05);

      osc2.type = 'square';
      osc2.frequency.setValueAtTime(90, now);
      osc2.frequency.setValueAtTime(140, now + 0.08);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(now + 0.15);
      osc2.stop(now + 0.15);
    } catch (error) {
      console.warn('CyberAudioService: Glitch sound failed.', error);
    }
  }

  playSuccess(): void {
    if (this.isMuted()) return;
    try {
      this.initAudioContext();
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(880, now + 0.08);
      osc.frequency.setValueAtTime(1760, now + 0.16);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(now + 0.3);
    } catch (error) {
      console.warn('CyberAudioService: Success tone failed.', error);
    }
  }

  playBoot(): void {
    try {
      this.initAudioContext();
      if (!this.audioCtx || this.isMuted()) return;
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const filter = this.audioCtx.createBiquadFilter();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(60, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.6);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(150, now);
      filter.frequency.exponentialRampToValueAtTime(1800, now + 0.6);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.setValueAtTime(0.03, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(now + 0.6);
    } catch (error) {
      console.warn('CyberAudioService: Boot tone failed.', error);
    }
  }
}
