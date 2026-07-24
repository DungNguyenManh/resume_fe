import { Injectable } from '@angular/core';
import { CommandResult, CommandStrategyFn } from '../../models/terminal.model';
import { RESUME_DATA } from '../../data/resume.data';

/**
 * Service responsible for parsing CLI queries typed in the Terminal console.
 * Implements Strategy Pattern to delegate command execution to individual handlers.
 */
@Injectable({
  providedIn: 'root'
})
export class CommandParserService {
  // Command strategy dictionary lookup
  private readonly strategies = new Map<string, CommandStrategyFn>();

  constructor() {
    this.registerStrategies();
  }

  /**
   * Generates a simple ASCII progress bar string of 10 characters.
   */
  private getMeterASCII(level: number): string {
    const totalBlocks = 10;
    const filledCount = Math.round((Math.max(0, Math.min(100, level)) / 100) * totalBlocks);
    const emptyCount = totalBlocks - filledCount;
    return '█'.repeat(filledCount) + '░'.repeat(emptyCount);
  }

  /**
   * Registers available console command strategies.
   * Follows Open-Closed Principle (OCP) - easy to expand without changing the main parser loop.
   */
  private registerStrategies(): void {
    this.strategies.set('help', () => ({
      output: [
        'HỆ THỐNG GIAO DIỆN DÒNG LỆNH CHROME_CV // CÁC LỆNH KHẢ DỤNG:',
        '  about    - Hiển thị thông tin cá nhân / Bio',
        '  skills   - Liệt kê bộ kỹ năng và công nghệ (Angular, Tailwind,...)',
        '  xp       - Xem quá trình làm việc và lịch sử dự án',
        '  projects - Danh sách các sản phẩm và dự án nổi bật',
        '  contact  - Lấy thông tin liên lạc và kênh kết nối',
        '  clear    - Dọn sạch màn hình console',
        '  help     - Hiển thị trình hướng dẫn này'
      ]
    }));

    this.strategies.set('about', () => ({
      output: [
        '>> TRUY XUẤT THÔNG TIN: BIOGRAPHY // SYSTEM RUNNER',
        '--------------------------------------------------',
        `Họ tên: ${RESUME_DATA.profile.name} // ${RESUME_DATA.profile.alias}`,
        `Vai trò: ${RESUME_DATA.profile.title}`,
        `Chuyên môn: ${RESUME_DATA.profile.bio}`,
        'Triết lý phát triển: "Nếu code chạy chưa tối ưu, nó chưa thực sự chạy."',
        'Trang bị hiện tại: Angular 19+, RxJS, Tailwind CSS v4, Node.js, WebGL.'
      ]
    }));

    this.strategies.set('skills', () => {
      const outputLines: string[] = [
        '>> TRUY XUẤT THÔNG TIN: KỸ NĂNG CỐT LÕI',
        '----------------------------------------'
      ];
      RESUME_DATA.skills.forEach(skillCat => {
        outputLines.push(`// ${skillCat.category}`);
        skillCat.items.forEach(skill => {
          outputLines.push(`  ${skill.name.padEnd(16)} [${this.getMeterASCII(skill.level)}] ${skill.level}%`);
        });
      });
      outputLines.push('----------------------------------------');
      return { output: outputLines };
    });

    this.strategies.set('xp', () => {
      const outputLines: string[] = [
        '>> TRUY XUẤT THÔNG TIN: THỜI GIAN LÀM VIỆC',
        '------------------------------------------'
      ];
      RESUME_DATA.experiences.forEach(xp => {
        outputLines.push(`[${xp.period}] // ${xp.company} - ${xp.role}`);
        xp.details.forEach(detail => {
          outputLines.push(`  > ${detail}`);
        });
        outputLines.push('');
      });
      return { output: outputLines };
    });

    this.strategies.set('projects', () => {
      const outputLines: string[] = [
        '>> TRUY XUẤT THÔNG TIN: DỰ ÁN NỔI BẬT',
        '-------------------------------------'
      ];
      RESUME_DATA.projects.forEach((proj, idx) => {
        outputLines.push(`${idx + 1}. ${proj.name} // ${proj.status}`);
        outputLines.push(`   Description: ${proj.description}`);
        outputLines.push(`   Tech Stack: ${proj.tags.join(', ')}`);
        if (proj.github) outputLines.push(`   GitHub: ${proj.github}`);
        if (proj.demo) outputLines.push(`   Demo: ${proj.demo}`);
        outputLines.push('');
      });
      return { output: outputLines };
    });

    this.strategies.set('contact', () => ({
      output: [
        '>> TRUY XUẤT THÔNG TIN: LIÊN HỆ',
        '-------------------------------',
        'Email: cyber.runner@net.com',
        'Github: https://github.com/cyber-runner',
        'LinkedIn: https://linkedin.com/in/cyber-runner',
        'Signal Beacon: Trực tuyến 24/7. Gửi tin nhắn qua biểu mẫu P2P phía dưới!'
      ]
    }));

    this.strategies.set('clear', () => ({
      output: [],
      clearScreen: true
    }));
  }

  /**
   * Evaluates input strings and maps commands to strategies.
   * @param input Raw text typed into terminal command line.
   * @returns CommandResult output payload.
   */
  parse(input: string): CommandResult {
    const trimmed = input.trim().toLowerCase();
    if (!trimmed) {
      return { output: [] };
    }

    const tokens = trimmed.split(' ');
    const cmd = tokens[0];
    const args = tokens.slice(1);

    const strategy = this.strategies.get(cmd);
    if (strategy) {
      return strategy(args);
    }

    return {
      output: [
        `LỆNH KHÔNG HỢP LỆ: "${cmd}"`,
        'Gõ "help" để hiển thị danh sách các lệnh được hỗ trợ.'
      ],
      isError: true
    };
  }

  /**
   * Retrieves array containing names of all registered strategy triggers.
   */
  getCommandsList(): string[] {
    return Array.from(this.strategies.keys());
  }
}
