import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { ProfileComponent } from '../../features/profile/profile.component';
import { StorageService } from '../../core/storage.service';
import { BackgroundMusicService } from '../../core/services/background-music.service';
import { YoutubeAudioPlayerComponent } from '../../shared/components/youtube-audio-player/youtube-audio-player.component';

@Component({
    selector: 'app-cv-page',
    standalone: true,
    imports: [
        CommonModule,
        TranslatePipe,
        ProfileComponent,
        YoutubeAudioPlayerComponent
    ],
    templateUrl: './cv-page.component.html',
    styleUrl: './cv-page.component.css'
})
export class CvPageComponent {
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly storageService = inject(StorageService);
    private readonly translate = inject(TranslateService);
    protected readonly audioService = inject(BackgroundMusicService);

    currentLang = toSignal(
        this.route.paramMap.pipe(map(params => params.get('lang') ?? 'en')),
        { initialValue: 'en' }
    );

    constructor() {
        this.translate.addLangs(['en', 'vi', 'ja']);
        effect(() => {
            const lang = this.currentLang();
            this.translate.use(lang);
            this.storageService.setItem('lang_preference', lang);
            if (typeof document !== 'undefined') {
                document.documentElement.lang = lang;
            }
        });
    }

    changeLanguage(lang: string): void {
        this.router.navigate(['/', lang]);
    }

    toggleSound(): void {
        this.audioService.toggleMute();
    }
}