import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Reusable glass-pill style progress bar component.
 */
@Component({
  selector: 'app-progress-meter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-meter.component.html',
  styleUrl: './progress-meter.component.css'
})
export class ProgressMeterComponent {
  // Metric label display text
  @Input({ required: true }) label!: string;

  // Percentage measurement out of 100
  @Input({ required: true }) value!: number;
}
