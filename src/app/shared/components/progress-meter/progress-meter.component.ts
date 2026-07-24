import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Reusable progress meter that renders technical percentages.
 * Displays character blocks [████░░░] on mobile screens,
 * and glowing CSS progress bars on desktop displays.
 */
@Component({
  selector: 'app-progress-meter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-meter.component.html',
  styleUrl: './progress-meter.component.css'
})
export class ProgressMeterComponent {
  // Label text describing the skill
  @Input({ required: true }) label!: string;
  
  // Percentage value (0 - 100)
  @Input({ required: true }) value!: number;
  
  // Neon colors
  @Input() color: 'cyan' | 'pink' | 'yellow' | 'green' = 'cyan';

  /**
   * Generates a 20-character ASCII representation of the current value.
   * Used for retro CLI views on mobile viewports.
   */
  get meterString(): string {
    const totalBlocks = 20;
    const clampedValue = Math.max(0, Math.min(100, this.value));
    const filledCount = Math.round((clampedValue / 100) * totalBlocks);
    const emptyCount = totalBlocks - filledCount;
    return '█'.repeat(filledCount) + '░'.repeat(emptyCount);
  }

  /**
   * Maps color type to text classes.
   */
  getColorClass(): string {
    switch (this.color) {
      case 'pink': return 'text-cyber-pink';
      case 'yellow': return 'text-cyber-yellow';
      case 'green': return 'text-cyber-green';
      default: return 'text-cyber-cyan';
    }
  }

  /**
   * Maps color type to background colors and glowing box-shadows.
   */
  getBarColorClass(): string {
    switch (this.color) {
      case 'pink': return 'bg-cyber-pink shadow-[0_0_8px_rgba(255,0,85,0.4)]';
      case 'yellow': return 'bg-cyber-yellow shadow-[0_0_8px_rgba(252,238,10,0.4)]';
      case 'green': return 'bg-cyber-green shadow-[0_0_8px_rgba(0,255,102,0.4)]';
      default: return 'bg-cyber-cyan shadow-[0_0_8px_rgba(0,240,255,0.4)]';
    }
  }
}
