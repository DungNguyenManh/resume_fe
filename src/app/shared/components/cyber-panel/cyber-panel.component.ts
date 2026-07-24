import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Reusable panel container decorated with Cyberpunk clipped corners,
 * custom neon shadows, and configurable highlights.
 */
@Component({
  selector: 'app-cyber-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cyber-panel.component.html',
  styleUrl: './cyber-panel.component.css'
})
export class CyberPanelComponent {
  // Title printed in the console bracket
  @Input() title?: string;
  
  // Cut corner configuration (top-right, bottom-left, both, small cut)
  @Input() cutSide: 'tr' | 'bl' | 'both' | 'small' = 'tr';
  
  // Colors: neon theme maps
  @Input() themeColor: 'cyan' | 'pink' | 'yellow' | 'green' = 'cyan';

  /**
   * Translates cut-side input into standard CSS clip-path classes.
   */
  getClipClass(): string {
    switch (this.cutSide) {
      case 'bl': return 'cyber-cut-bl';
      case 'both': return 'cyber-cut-both';
      case 'small': return 'cyber-cut-small';
      default: return 'cyber-cut-tr';
    }
  }

  /**
   * Translates themeColor input into border and glow configurations.
   */
  getThemeClass(): string {
    switch (this.themeColor) {
      case 'pink': return 'border-cyber-pink/30 shadow-[0_0_15px_rgba(255,0,85,0.05)]';
      case 'yellow': return 'border-cyber-yellow/30 shadow-[0_0_15px_rgba(252,238,10,0.05)]';
      case 'green': return 'border-cyber-green/30 shadow-[0_0_15px_rgba(0,255,102,0.05)]';
      default: return 'border-cyber-cyan/30 shadow-[0_0_15px_rgba(0,240,255,0.05)]';
    }
  }

  /**
   * Translates themeColor input into highlighting background colors.
   */
  getCornerClass(): string {
    switch (this.themeColor) {
      case 'pink': return 'bg-cyber-pink';
      case 'yellow': return 'bg-cyber-yellow';
      case 'green': return 'bg-cyber-green';
      default: return 'bg-cyber-cyan';
    }
  }
}
