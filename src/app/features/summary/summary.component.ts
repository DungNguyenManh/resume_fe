import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';

/**
 * Renders the Summary block with multiple paragraphs.
 * Data is loaded directly from i18n JSON via TranslateService.
 */
@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-3">
      <h3 class="text-xl font-bold text-text-primary border-b-2 border-lilac/40 pb-2 mb-4 tracking-wide uppercase">
        Summary
      </h3>
    </div>
    <div class="space-y-3">
      @for (para of paragraphs(); track para) {
        <p class="text-sm leading-relaxed text-text-primary/85">{{ para }}</p>
      }
    </div>
  `
})
export class SummaryComponent {
  private readonly translate = inject(TranslateService);

  private readonly rawText = toSignal(
    this.translate.stream('resume.profile.summary') as any,
    { initialValue: this.translate.instant('resume.profile.summary') as string }
  );

  paragraphs(): string[] {
    const raw = this.rawText();
    if (!raw || typeof raw !== 'string') return [];
    return raw.split('\n\n').map((p: string) => p.trim()).filter((p: string) => p.length > 0);
  }
}
