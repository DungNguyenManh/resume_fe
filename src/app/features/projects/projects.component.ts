import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ProjectNode } from '../../models/resume.model';

/**
 * Renders portfolio project cards.
 */
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  // Developer projects dataset
  @Input({ required: true }) data!: ProjectNode[];
}
