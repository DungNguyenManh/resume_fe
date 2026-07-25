import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TechSkillGroup } from '../../models/resume.model';
import { Observable } from 'rxjs';

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
    <div class="grid gap-y-2.5 gap-x-3" style="grid-template-columns: max-content 1fr;">
      @for (group of techSkills(); track group.label) {
        <span class="font-bold text-text-primary text-sm">{{ group.label }}:</span>
        <span class="text-text-primary/80 text-sm">{{ group.values }}</span>
      }
    </div>
  `
})
export class TechSkillsComponent {
  private readonly translate = inject(TranslateService);

  techSkills = toSignal(
    this.translate.stream('resume.techSkills') as Observable<TechSkillGroup[]>,
    { initialValue: [] as TechSkillGroup[] }
  );
}