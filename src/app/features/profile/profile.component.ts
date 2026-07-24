import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeProfile } from '../../models/resume.model';
import { CyberPanelComponent } from '../../shared/components/cyber-panel/cyber-panel.component';

/**
 * Renders developer bio cards and profile stats.
 */
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, CyberPanelComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  // Developer profile dataset
  @Input({ required: true }) data!: ResumeProfile;
}
