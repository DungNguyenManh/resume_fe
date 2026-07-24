import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillCategory } from '../../models/resume.model';
import { CyberPanelComponent } from '../../shared/components/cyber-panel/cyber-panel.component';
import { ProgressMeterComponent } from '../../shared/components/progress-meter/progress-meter.component';

/**
 * Technical skill stack module.
 * Wraps skill category maps inside visual loading meters.
 */
@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, CyberPanelComponent, ProgressMeterComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  // Skill sets array
  @Input({ required: true }) data!: SkillCategory[];
}
