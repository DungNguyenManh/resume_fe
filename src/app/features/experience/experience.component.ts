import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceNode } from '../../models/resume.model';
import { CyberPanelComponent } from '../../shared/components/cyber-panel/cyber-panel.component';

/**
 * Career timeline component.
 * Maps job histories to a vertical circuit-board layout.
 */
@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, CyberPanelComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  // Timeline nodes list input
  @Input({ required: true }) data!: ExperienceNode[];
}
