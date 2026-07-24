import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceNode } from '../../models/resume.model';

/**
 * Keywords to highlight visually in bullet points.
 */
const HIGHLIGHT_TERMS: string[] = [
  'RabbitMQ', 'BullMQ', 'Redis', 'NestJS', 'GraphQL', 'gRPC', 'Socket.io',
  'AWS', 'EC2', 'S3', 'CloudFront', 'Neo4j', 'CQRS', 'Redlock', 'Docker',
  'New Relic', 'Bitbucket', 'Jest', 'MongoDB'
];

/**
 * Renders professional experience history with nested projects and bullet points.
 */
@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  @Input({ required: true }) data!: ExperienceNode[];

  /**
   * Wraps tech keywords in a highlight span for visual accent.
   */
  highlightKeyword(text: string): string {
    let result = text;
    for (const term of HIGHLIGHT_TERMS) {
      const regex = new RegExp(`(${term})`, 'g');
      result = result.replace(regex, `<span class="font-semibold text-text-primary">$1</span>`);
    }
    return result;
  }
}
