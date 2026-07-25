import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { ExperienceNode } from '../../models/resume.model';

/**
 * Renders professional experience history with nested projects and bullet points.
 * Data is loaded directly from i18n JSON via TranslateService.
 */
@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  private readonly translate = inject(TranslateService);

  experiences = toSignal(
    this.translate.stream('resume.experiences') as Observable<ExperienceNode[]>,
    { initialValue: [] as ExperienceNode[] }
  );

  activeProjectIndices: Record<number, number> = {};

  constructor() {
    // Mỗi khi experiences() cập nhật (kể cả khi JSON load xong lần đầu, hoặc đổi ngôn ngữ),
    // đảm bảo mọi expIndex đều có sẵn giá trị số hợp lệ trong activeProjectIndices,
    // tránh trường hợp undefined lọt vào phép tính gây ra NaN.
    effect(() => {
      const list = this.experiences();
      list.forEach((_, i) => {
        if (this.activeProjectIndices[i] === undefined || Number.isNaN(this.activeProjectIndices[i])) {
          this.activeProjectIndices[i] = 0;
        }
      });
    });
  }

  nextProject(expIndex: number, length: number) {
    const current = this.activeProjectIndices[expIndex] ?? 0;
    const safeCurrent = Number.isNaN(current) ? 0 : current;
    this.activeProjectIndices[expIndex] = (safeCurrent + 1) % length;
  }

  prevProject(expIndex: number, length: number) {
    const current = this.activeProjectIndices[expIndex] ?? 0;
    const safeCurrent = Number.isNaN(current) ? 0 : current;
    this.activeProjectIndices[expIndex] = (safeCurrent - 1 + length) % length;
  }

  setProjectIndex(expIndex: number, pIndex: number) {
    this.activeProjectIndices[expIndex] = pIndex;
  }

  getActiveIndex(expIndex: number): number {
    const value = this.activeProjectIndices[expIndex];
    return value === undefined || Number.isNaN(value) ? 0 : value;
  }

  /**
   * Bolds only the leading label before the first colon (e.g. "Newsfeed Ranking:"),
   * supporting both ASCII ':' and fullwidth Japanese '：'.
   */
  highlightKeyword(text: string): string {
    const match = text.match(/^([^:：]+)([:：]\s*)/);
    if (!match) return text;
    const [full, label, colonPart] = match;
    const rest = text.slice(full.length);
    return `<span class="font-semibold text-text-primary">${label}${colonPart.trim()}</span> ${rest}`;
  }
}