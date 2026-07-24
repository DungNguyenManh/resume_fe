import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechSkillGroup } from '../../models/resume.model';

/**
 * Renders Technical Skills as a label-value table (no progress bars).
 */
@Component({
  selector: 'app-tech-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-3">
      <h3 class="text-xl font-bold text-text-primary border-b-2 border-lilac/40 pb-2 mb-4 tracking-wide uppercase">
        Technical Skills
      </h3>
    </div>
    <div class="space-y-2.5">
      @for (group of data; track group.label) {
        <div class="flex flex-col sm:flex-row gap-1 sm:gap-3 text-sm">
          <span class="font-bold text-text-primary shrink-0 min-w-[180px]">{{ group.label }}:</span>
          <span class="text-text-primary/80">{{ group.values }}</span>
        </div>
      }
    </div>
  `
})
export class TechSkillsComponent {
  @Input({ required: true }) data!: TechSkillGroup[];
}
