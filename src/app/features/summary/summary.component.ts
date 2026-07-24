import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Renders the Summary block with multiple paragraphs.
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
      @for (para of paragraphs; track para) {
        <p class="text-sm leading-relaxed text-text-primary/85">{{ para }}</p>
      }
    </div>
  `
})
export class SummaryComponent {
  @Input({ required: true }) rawText!: string;

  get paragraphs(): string[] {
    return this.rawText.split('\n\n').map(p => p.trim()).filter(p => p.length > 0);
  }
}
