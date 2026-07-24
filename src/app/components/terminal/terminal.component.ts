import { Component, ElementRef, ViewChild, inject, signal, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CyberAudioService } from '../../services/cyber-audio.service';

interface CommandLog {
  input: string;
  output: string[];
  isError?: boolean;
}

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.css'
})
export class TerminalComponent implements AfterViewChecked {
  private readonly audioService = inject(CyberAudioService);

  @ViewChild('outputContainer') private outputContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('cmdInput') private cmdInput!: ElementRef<HTMLInputElement>;

  command = signal('');
  history = signal<CommandLog[]>([
    {
      input: 'system --boot',
      output: [
        'NET.RUNNER OS v10.4.2 // SECURITY SHELL LOADED',
        'SYSTEM STATUS: ACTIVE // DECK ENCRYPTED',
        'Gõ lệnh "help" để bắt đầu truy xuất dữ liệu...'
      ]
    }
  ]);

  commandList = ['help', 'about', 'skills', 'xp', 'projects', 'contact', 'clear'];

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    if (this.outputContainer) {
      this.outputContainer.nativeElement.scrollTop = this.outputContainer.nativeElement.scrollHeight;
    }
  }

  focusInput() {
    if (this.cmdInput) {
      this.cmdInput.nativeElement.focus();
    }
  }

  onKeydown(event: KeyboardEvent) {
    // Only sound for normal alphanumeric typing keys
    if (event.key.length === 1 || event.key === 'Backspace' || event.key === 'Enter') {
      this.audioService.playKeyboard();
    }
  }

  executeCommand() {
    const input = this.command().trim().toLowerCase();
    if (!input) return;

    this.audioService.playClick();
    let output: string[] = [];
    let isError = false;

    switch (input) {
      case 'help':
        output = [
          'HỆ THỐNG GIAO DIỆN DÒNG LỆNH CHROME_CV // CÁC LỆNH KHẢ DỤNG:',
          '  about    - Hiển thị thông tin cá nhân / Bio',
          '  skills   - Liệt kê bộ kỹ năng và công nghệ (Angular, Tailwind,...)',
          '  xp       - Xem quá trình làm việc và lịch sử dự án',
          '  projects - Danh sách các sản phẩm và dự án nổi bật',
          '  contact  - Lấy thông tin liên lạc và kênh kết nối',
          '  clear    - Dọn sạch màn hình console',
          '  help     - Hiển thị trình hướng dẫn này'
        ];
        break;
      case 'about':
        output = [
          '>> TRUY XUẤT THÔNG TIN: BIOGRAPHY // SYSTEM RUNNER',
          '--------------------------------------------------',
          'Họ tên: Nguyễn Hoàng Dương // Cyber Runner',
          'Vai trò: Senior Full-Stack Developer (10+ năm kinh nghiệm)',
          'Chuyên môn: Xây dựng web app kiến trúc lớn, tối ưu hóa client-side, hệ thống thời gian thực.',
          'Triết lý phát triển: "Nếu code chạy chưa tối ưu, nó chưa thực sự chạy."',
          'Trang bị hiện tại: Angular 19+, RxJS, Tailwind CSS v4, Node.js, WebGL.'
        ];
        break;
      case 'skills':
        output = [
          '>> TRUY XUẤT THÔNG TIN: KỸ NĂNG CỐT LÕI',
          '----------------------------------------',
          '[ANGULAR / TS]    ████████████████████ 95% (Hơn 10 năm)',
          '[TAILWIND / CSS]  ████████████████████ 90% (Giao diện cấp cao)',
          '[RXJS / FLOW]     ████████████████░░░░ 80% (State management)',
          '[NODE.JS / REST]  ████████████████░░░░ 80% (Express/NestJS)',
          '[DATABASE / DB]   ████████████░░░░░░░░ 60% (Postgres/Redis)',
          '[A11y & SEO]      ████████████████░░░░ 80% (Tối ưu hóa)',
          '----------------------------------------',
          'Công cụ: Git, Docker, Webpack, Vite, Chrome DevTools.'
        ];
        break;
      case 'xp':
        output = [
          '>> TRUY XUẤT THÔNG TIN: THỜI GIAN LÀM VIỆC',
          '------------------------------------------',
          '2022 - Nay: Tech Lead @ NEO_GENESIS CORP',
          '  - Thiết kế kiến trúc Front-end Angular cho hệ thống giao dịch thời gian thực.',
          '  - Tăng 40% hiệu suất render và giảm 30% bundle size.',
          '2018 - 2022: Senior Angular Engineer @ CYBER_TECH LABS',
          '  - Phát triển ứng dụng Web 3D Dashboard điều khiển IoT.',
          '  - Xây dựng thư viện component dùng chung bằng Tailwind CSS v4.',
          '2015 - 2018: Full-Stack Developer @ RETRO_SYNTH SOFTWARE',
          '  - Thiết kế REST APIs và UI quản lý dữ liệu lớn.',
          '2013 - 2015: Front-End Developer @ APEX GLOBAL',
          '  - Phát triển giao diện web responsive, tối ưu hóa chuẩn SEO.'
        ];
        break;
      case 'projects':
        output = [
          '>> TRUY XUẤT THÔNG TIN: DỰ ÁN NỔI BẬT',
          '-------------------------------------',
          '1. DECK_OVERLORD - Trình giả lập giao diện Cyberpunk HUD',
          '   - Công nghệ: Angular, Tailwind CSS, Canvas API.',
          '   - Điểm nhấn: Hỗ trợ layout dashboard động và vẽ đồ thị thời gian thực.',
          '2. LIGHTSPEED_BUILDER - Hệ thống kéo thả giao diện',
          '   - Công nghệ: Angular Elements, RxJS state management.',
          '   - Điểm nhấn: Tạo component runtime động, hiệu năng cực cao.',
          '3. NEON_GATEWAY - Cổng thanh toán phân tán',
          '   - Công nghệ: Node.js, WebSockets, Angular dashboard.',
          '   - Điểm nhấn: Bảo mật cấp cao, mã hóa đầu cuối.'
        ];
        break;
      case 'contact':
        output = [
          '>> TRUY XUẤT THÔNG TIN: LIÊN HỆ',
          '-------------------------------',
          'Email: cyber.runner@net.com',
          'Github: https://github.com/cyber-runner',
          'LinkedIn: https://linkedin.com/in/cyber-runner',
          'Signal Beacon: Trực tuyến 24/7. Gửi tin nhắn qua biểu mẫu P2P phía dưới!'
        ];
        break;
      case 'clear':
        this.history.set([]);
        this.command.set('');
        return;
      default:
        output = [
          `LỆNH KHÔNG HỢP LỆ: "${input}"`,
          'Gõ "help" để hiển thị danh sách các lệnh được hỗ trợ.'
        ];
        isError = true;
        this.audioService.playGlitch();
        break;
    }

    this.history.update(h => [...h, { input: this.command(), output, isError }]);
    this.command.set('');
  }
}
