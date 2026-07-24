import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectNode } from '../../models/resume.model';
import { CyberAudioService } from '../../core/cyber-audio.service';
import { CyberPanelComponent } from '../../shared/components/cyber-panel/cyber-panel.component';
import { GlowBadgeComponent } from '../../shared/components/glow-badge/glow-badge.component';

/**
 * Projects showcase portfolio component.
 * Features project card grids and audio interaction links.
 */
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, CyberPanelComponent, GlowBadgeComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  private readonly audioService = inject(CyberAudioService);

  // Projects data list
  @Input({ required: true }) data!: ProjectNode[];

  /**
   * Sound triggers for links interaction
   */
  playHover(): void {
    this.audioService.playHover();
  }

  playClick(): void {
    this.audioService.playClick();
  }
}
