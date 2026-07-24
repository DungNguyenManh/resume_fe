import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Reusable badge component showing a text tag inside a custom neon border box.
 */
@Component({
  selector: 'app-glow-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './glow-badge.component.html',
  styleUrl: './glow-badge.component.css'
})
export class GlowBadgeComponent {
  // Label text to display
  @Input({ required: true }) text!: string;
  
  // Neon colors
  @Input() color: 'cyan' | 'pink' | 'yellow' | 'green' = 'cyan';

  /**
   * Evaluates input color parameter to produce respective style rules.
   */
  getColorClass(): string {
    switch (this.color) {
      case 'pink': return 'border-cyber-pink/40 text-cyber-pink bg-cyber-pink/5 hover:border-cyber-pink hover:shadow-[0_0_8px_rgba(255,0,85,0.2)]';
      case 'yellow': return 'border-cyber-yellow/40 text-cyber-yellow bg-cyber-yellow/5 hover:border-cyber-yellow hover:shadow-[0_0_8px_rgba(252,238,10,0.2)]';
      case 'green': return 'border-cyber-green/40 text-cyber-green bg-cyber-green/5 hover:border-cyber-green hover:shadow-[0_0_8px_rgba(0,255,102,0.2)]';
      default: return 'border-cyber-cyan/40 text-cyber-cyan bg-cyber-cyan/5 hover:border-cyber-cyan hover:shadow-[0_0_8px_rgba(0,240,255,0.2)]';
    }
  }
}
