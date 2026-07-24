import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Renders the Career Objective block.
 */
@Component({
  selector: 'app-career-objective',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="mb-3">
      <h3 class="text-xl font-bold text-text-primary border-b-2 border-lilac/40 pb-2 mb-4 tracking-wide uppercase">
        Career Objective
      </h3>
    </div>
    <p class="text-sm leading-relaxed text-text-primary/85">{{ text }}</p>
  `
})
export class CareerObjectiveComponent {
  @Input({ required: true }) text!: string;
}
