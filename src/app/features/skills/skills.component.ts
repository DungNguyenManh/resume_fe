import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { SkillCategory } from '../../models/resume.model';
import { ProgressMeterComponent } from '../../shared/components/progress-meter/progress-meter.component';

/**
 * Renders technical skills split by categories.
 */
@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ProgressMeterComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  @Input({ required: true }) data!: SkillCategory[];
}
