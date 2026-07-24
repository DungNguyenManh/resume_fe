import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CyberAudioService } from '../../core/cyber-audio.service';
import { CyberPanelComponent } from '../../shared/components/cyber-panel/cyber-panel.component';

/**
 * P2P Contact Form feature component.
 * Dispatches message payloads directly to standard mail clients on submission fallback.
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, CyberPanelComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  protected readonly audioService = inject(CyberAudioService);

  // Form input signal model
  contactForm = signal({
    name: '',
    email: '',
    message: ''
  });

  formSubmitted = signal(false);

  /**
   * Triggers keyboard sound checks on keystrokes
   */
  playKeyboardSound(event: KeyboardEvent): void {
    if (event.key.length === 1 || event.key === 'Backspace') {
      this.audioService.playKeyboard();
    }
  }

  playHover(): void {
    this.audioService.playHover();
  }

  playClick(): void {
    this.audioService.playClick();
  }

  /**
   * Handles contact form submission, plays synthesizers, and launches client mail applications.
   */
  submitForm(): void {
    const data = this.contactForm();
    if (!data.name || !data.email || !data.message) {
      this.audioService.playGlitch();
      return;
    }

    this.audioService.playSuccess();
    this.formSubmitted.set(true);

    const subject = encodeURIComponent(`[CHROME_CV] Signal from ${data.name}`);
    const body = encodeURIComponent(`Sender: ${data.name} (${data.email})\n\nMessage:\n${data.message}`);
    const mailtoUrl = `mailto:cyber.runner@net.com?subject=${subject}&body=${body}`;

    // Redirect to mailto after visual animations
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.location.href = mailtoUrl;
      }
    }, 1500);
  }

  /**
   * Resets submission states to retry new form submissions.
   */
  resetForm(): void {
    this.playClick();
    this.contactForm.set({ name: '', email: '', message: '' });
    this.formSubmitted.set(false);
  }
}
