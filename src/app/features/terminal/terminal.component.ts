import { Component, ElementRef, ViewChild, inject, signal, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CyberAudioService } from '../../core/cyber-audio.service';
import { CommandParserService } from './command-parser.service';
import { TerminalLog } from '../../models/terminal.model';

/**
 * Terminal UI Console Component.
 * Supports accessible output announcements, sound triggers, and command traversal histories.
 */
@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.css'
})
export class TerminalComponent implements AfterViewChecked {
  private readonly audioService = inject(CyberAudioService);
  private readonly parserService = inject(CommandParserService);

  @ViewChild('outputContainer') private outputContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('cmdInput') private cmdInput!: ElementRef<HTMLInputElement>;

  // Writable inputs & history queues
  command = signal('');
  history = signal<TerminalLog[]>([
    {
      input: 'system --boot',
      output: [
        'NET.RUNNER OS v10.4.2 // SECURITY SHELL LOADED',
        'SYSTEM STATUS: ACTIVE // DECK ENCRYPTED',
        'Gõ lệnh "help" để bắt đầu truy xuất dữ liệu...'
      ]
    }
  ]);

  // Keyboard navigation histories
  private readonly commandHistory = signal<string[]>([]);
  private historyIndex = signal(-1);
  private tempCommand = '';

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  /**
   * Automatically scroll viewport to bottom upon command prints.
   */
  private scrollToBottom(): void {
    if (this.outputContainer) {
      this.outputContainer.nativeElement.scrollTop = this.outputContainer.nativeElement.scrollHeight;
    }
  }

  /**
   * Refocuses text input field.
   */
  focusInput(): void {
    if (this.cmdInput) {
      this.cmdInput.nativeElement.focus();
    }
  }

  /**
   * Intercepts key events to trigger UI beeps and scroll command histories.
   */
  onKeydown(event: KeyboardEvent): void {
    if (event.key.length === 1 || event.key === 'Backspace') {
      this.audioService.playKeyboard();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.traverseHistoryUp();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.traverseHistoryDown();
    }
  }

  /**
   * Traverses command history backwards.
   */
  private traverseHistoryUp(): void {
    const list = this.commandHistory();
    if (list.length === 0) return;

    if (this.historyIndex() === -1) {
      this.tempCommand = this.command();
      this.historyIndex.set(list.length - 1);
    } else if (this.historyIndex() > 0) {
      this.historyIndex.update(idx => idx - 1);
    }

    this.command.set(list[this.historyIndex()]);
    this.audioService.playClick();
  }

  /**
   * Traverses command history forwards.
   */
  private traverseHistoryDown(): void {
    const list = this.commandHistory();
    if (list.length === 0 || this.historyIndex() === -1) return;

    if (this.historyIndex() < list.length - 1) {
      this.historyIndex.update(idx => idx + 1);
      this.command.set(list[this.historyIndex()]);
    } else {
      this.historyIndex.set(-1);
      this.command.set(this.tempCommand);
    }
    this.audioService.playClick();
  }

  /**
   * Parses current command query, plays UI sounds, and updates console outputs.
   */
  executeCommand(): void {
    const input = this.command().trim();
    if (!input) return;

    // Push into cache traversal array
    this.commandHistory.update(list => [...list, input]);
    this.historyIndex.set(-1);

    this.audioService.playClick();
    
    // Parse using Strategy Parser Service
    const result = this.parserService.parse(input);

    if (result.clearScreen) {
      this.history.set([]);
    } else {
      this.history.update(logs => [...logs, {
        input,
        output: result.output,
        isError: result.isError
      }]);

      if (result.isError) {
        this.audioService.playGlitch();
      }
    }

    this.command.set('');
  }
}
