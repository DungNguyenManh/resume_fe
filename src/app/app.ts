import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { ProfileComponent } from './features/profile/profile.component';
import { CareerObjectiveComponent } from './features/career-objective/career-objective.component';
import { SummaryComponent } from './features/summary/summary.component';
import { ExperienceComponent } from './features/experience/experience.component';
import { TechSkillsComponent } from './features/tech-skills/tech-skills.component';
import { EducationComponent } from './features/education/education.component';
import { ContactComponent } from './features/contact/contact.component';
import { StorageService } from './core/storage.service';
import { BackgroundMusicService } from './core/services/background-music.service';
import { YoutubeAudioPlayerComponent } from './shared/components/youtube-audio-player/youtube-audio-player.component';
import { RESUME_DATA } from './data/resume.data';

/**
 * Main application dashboard coordinator.
 * Orchestrates language switching and main view.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ProfileComponent,
    CareerObjectiveComponent,
    SummaryComponent,
    ExperienceComponent,
    TechSkillsComponent,
    EducationComponent,
    ContactComponent,
    YoutubeAudioPlayerComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly storageService = inject(StorageService);
  private readonly translate = inject(TranslateService);
  protected readonly audioService = inject(BackgroundMusicService);

  // Static dataset exposed to template views
  readonly cvData = RESUME_DATA;

  // Language state
  currentLang = signal<string>('en');

  ngOnInit(): void {
    this.initLanguage();
  }

  /**
   * Initializes language based on stored preference or defaults to 'en'.
   */
  private initLanguage(): void {
    this.translate.addLangs(['en', 'vi', 'ja']);
    const savedLang = this.storageService.getItem('lang_preference') || 'en';
    this.changeLanguage(savedLang);
  }

  /**
   * Changes the active application language.
   * @param lang The language code (e.g., 'en', 'vi', 'ja').
   */
  changeLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLang.set(lang);
    this.storageService.setItem('lang_preference', lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }

  /**
   * Launches print workflow.
   */
  triggerPrint(): void {
    if (typeof window !== 'undefined') {
      window.print();
    }
  }

  toggleSound(): void {
    this.audioService.toggleMute();
  }
}
