import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Renders contact form.
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  
  onSubmit(): void {
    // Form submission logic would go here
    console.log('Form submitted');
  }
}
