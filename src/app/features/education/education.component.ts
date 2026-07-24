import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationNode } from '../../models/resume.model';

/**
 * Renders the Education section.
 */
@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-3">
      <h3 class="text-xl font-bold text-text-primary border-b-2 border-lilac/40 pb-2 mb-4 tracking-wide uppercase">
        Education
      </h3>
    </div>
    <div class="space-y-4">
      @for (edu of data; track edu.institution) {
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
          <div>
            <h4 class="font-bold text-text-primary">{{ edu.institution }}</h4>
            <p class="text-sm text-lilac font-semibold">{{ edu.degree }}</p>
          </div>
          <div class="text-right shrink-0">
            <p class="text-sm text-gray-500">{{ edu.location }}</p>
            <p class="text-xs text-gray-400">{{ edu.period }}</p>
          </div>
        </div>
      }
    </div>
  `
})
export class EducationComponent {
  @Input({ required: true }) data!: EducationNode[];
}
