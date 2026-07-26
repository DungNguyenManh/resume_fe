import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ResumeProfile } from '../../models/resume.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  private readonly translate = inject(TranslateService);

  profile = toSignal(
    this.translate.stream('resume.profile') as Observable<ResumeProfile>,
    { initialValue: this.translate.instant('resume.profile') as ResumeProfile }
  );

  summaryParagraphs = computed(() =>
    (this.profile()?.summary ?? '').split('\n\n').filter((p: string) => p.trim().length > 0)
  );
}