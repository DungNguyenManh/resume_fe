import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';

/**
 * Renders the Career Objective block.
 * Data is loaded directly from i18n JSON via TranslateService.
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
    <p class="text-sm leading-relaxed text-text-primary/85">{{ 'resume.profile.careerObjective' | translate }}</p>
  `
})
export class CareerObjectiveComponent {}
