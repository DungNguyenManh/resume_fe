import { Component, ElementRef, ViewChild, inject, signal, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './features/profile/profile.component';
import { SkillsComponent } from './features/skills/skills.component';
import { ExperienceComponent } from './features/experience/experience.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { ContactComponent } from './features/contact/contact.component';
import { TerminalComponent } from './features/terminal/terminal.component';
import { CyberAudioService } from './core/cyber-audio.service';
import { StorageService } from './core/storage.service';
import { RESUME_DATA } from './data/resume.data';

/**
 * Main application dashboard coordinator.
 * Orchestrates navigation tabs, status widgets, and throttles canvas-based background animations.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ProfileComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactComponent,
    TerminalComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  protected readonly audioService = inject(CyberAudioService);
  private readonly storageService = inject(StorageService);

  @ViewChild('matrixCanvas') private matrixCanvas!: ElementRef<HTMLCanvasElement>;

  // CV Navigation State
  activeTab = signal<'profile' | 'xp' | 'projects' | 'contact'>('profile');
  
  // Audio state exposure
  isSoundMuted = this.audioService.isMuted;
  
  // Matrix rain background control state
  matrixRainActive = signal(true);
  
  // Clock readout variables
  localTime = signal('');
  latency = signal('12ms');
  
  // Static dataset exposed to template views
  readonly cvData = RESUME_DATA;

  // Matrix Rain Engine variables
  private canvasCtx: CanvasRenderingContext2D | null = null;
  private animFrameId: number | null = null;
  private lastDrawTime = 0;
  
  // Throttled frame frequency limits (25 FPS prevents CPU spikes)
  private readonly fpsLimit = 25;
  private readonly fpsInterval = 1000 / this.fpsLimit;
  private readonly fontSize = 14;
  private columns = 0;
  private drops: number[] = [];
  private readonly matrixChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&¥$+-*<>|[]{}';

  ngOnInit(): void {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
    this.updateLatency();
    setInterval(() => this.updateLatency(), 5000);

    // Dynamic checks: Automatically disable high-CPU canvas rain on mobile viewports (< 768px)
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768;
      const savedRain = this.storageService.getItem('matrix_rain_preference');
      
      if (savedRain === 'disabled' || (savedRain === null && isMobile)) {
        this.matrixRainActive.set(false);
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.matrixRainActive()) {
      this.initMatrixRain();
    }
  }

  ngOnDestroy(): void {
    this.destroyMatrixRain();
  }

  /**
   * Updates display time clock.
   */
  private updateTime(): void {
    const now = new Date();
    this.localTime.set(now.toLocaleTimeString('en-US', { hour12: false }));
  }

  /**
   * Simulates network frequency latency readouts.
   */
  private updateLatency(): void {
    const ms = Math.floor(10 + Math.random() * 20);
    this.latency.set(`${ms}ms`);
  }

  /**
   * Sound synthesizer click trigger.
   */
  playClick(): void {
    this.audioService.playClick();
  }

  /**
   * Sound synthesizer hover trigger.
   */
  playHover(): void {
    this.audioService.playHover();
  }

  /**
   * Sound toggle.
   */
  toggleSound(): void {
    this.audioService.toggleSound();
  }

  /**
   * Navigates to a specific CV tab.
   * @param tab Target layout panel key.
   */
  setActiveTab(tab: 'profile' | 'xp' | 'projects' | 'contact'): void {
    this.playClick();
    this.activeTab.set(tab);
  }

  /**
   * Toggles canvas Matrix background rain and persists state.
   */
  toggleMatrixRain(): void {
    this.playClick();
    const nextState = !this.matrixRainActive();
    this.matrixRainActive.set(nextState);
    
    this.storageService.setItem('matrix_rain_preference', nextState ? 'enabled' : 'disabled');

    if (nextState) {
      this.initMatrixRain();
    } else {
      this.destroyMatrixRain();
    }
  }

  /**
   * Launches print workflow.
   */
  triggerPrint(): void {
    this.playClick();
    if (typeof window !== 'undefined') {
      window.print();
    }
  }

  /**
   * Initializes background matrix rain graphics context.
   */
  private initMatrixRain(): void {
    if (typeof window === 'undefined') return;
    const canvas = this.matrixCanvas?.nativeElement;
    if (!canvas) return;

    this.canvasCtx = canvas.getContext('2d');
    this.resizeCanvas();
    
    window.addEventListener('resize', this.onResize);
    this.startMatrixLoop();
  }

  /**
   * Terminate animation timers and clean canvas buffers.
   */
  private destroyMatrixRain(): void {
    if (typeof window === 'undefined') return;
    window.removeEventListener('resize', this.onResize);
    this.stopMatrixLoop();
    this.clearCanvas();
  }

  private onResize = (): void => {
    this.resizeCanvas();
  };

  /**
   * Fits canvas buffers to physical window width.
   */
  private resizeCanvas(): void {
    const canvas = this.matrixCanvas?.nativeElement;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.columns = Math.floor(canvas.width / this.fontSize);
    this.drops = Array(this.columns).fill(1);
  }

  /**
   * Starts requestAnimationFrame drawing cycle.
   */
  private startMatrixLoop(): void {
    this.stopMatrixLoop();
    this.lastDrawTime = performance.now();
    
    const drawFrame = (currentTime: number): void => {
      if (!this.matrixRainActive()) return;
      this.animFrameId = requestAnimationFrame(drawFrame);

      const elapsed = currentTime - this.lastDrawTime;
      if (elapsed > this.fpsInterval) {
        this.lastDrawTime = currentTime - (elapsed % this.fpsInterval);
        this.drawMatrix();
      }
    };
    
    this.animFrameId = requestAnimationFrame(drawFrame);
  }

  /**
   * Halts requestAnimationFrame loop.
   */
  private stopMatrixLoop(): void {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  private clearCanvas(): void {
    const canvas = this.matrixCanvas?.nativeElement;
    if (canvas && this.canvasCtx) {
      this.canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  /**
   * Draws Matrix canvas frame.
   */
  private drawMatrix(): void {
    const canvas = this.matrixCanvas?.nativeElement;
    if (!canvas || !this.canvasCtx) return;

    // Draw semi-opaque frame overlay to yield digital trail drag
    this.canvasCtx.fillStyle = 'rgba(7, 7, 10, 0.15)';
    this.canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    this.canvasCtx.font = `${this.fontSize}px 'Share Tech Mono', monospace`;

    for (let i = 0; i < this.drops.length; i++) {
      const text = this.matrixChars.charAt(Math.floor(Math.random() * this.matrixChars.length));
      
      // Paint brightest cyans at drops tips, standard matrix transparent greens for trailing
      if (Math.random() > 0.985) {
        this.canvasCtx.fillStyle = '#00f0ff';
      } else {
        this.canvasCtx.fillStyle = 'rgba(0, 255, 102, 0.35)';
      }

      this.canvasCtx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

      if (this.drops[i] * this.fontSize > canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }
      this.drops[i]++;
    }
  }
}
