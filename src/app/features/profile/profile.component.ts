import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ResumeProfile } from '../../models/resume.model';

/**
 * Renders the top profile card: name, title, location, and contact links.
 */
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  @Input({ required: true }) data!: ResumeProfile;
}
