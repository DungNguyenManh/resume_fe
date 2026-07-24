import { ResumeData } from '../models/resume.model';

/**
 * Static resume data for Nguyễn Hoàng Dương (Cyber Runner)
 * Centralizes content for separation of concerns and localization.
 */
export const RESUME_DATA: ResumeData = {
  profile: {
    name: 'Nguyễn Hoàng Dương',
    alias: 'Cyber Runner',
    title: 'Senior Software Architect',
    sector: 'NEO_HANOI // SECTOR_4',
    ip: '192.168.42.1',
    bio: 'Hơn 10 năm kinh nghiệm phát triển Angular, tối ưu hóa client-side, thiết kế kiến trúc hệ thống thời gian thực với hiệu suất tuyệt đối. Chuyên gia kết nối UI/UX nâng cao và các hệ thống bảo mật cổng thông tin.',
    status: 'ONLINE // DECK_ACTIVE',
    avatarText: '</>'
  },
  skills: [
    {
      category: 'FRONTEND_ENGINE',
      items: [
        { name: 'Angular 19+', level: 95 },
        { name: 'TypeScript', level: 95 },
        { name: 'RxJS', level: 90 },
        { name: 'Tailwind CSS v4', level: 90 },
        { name: 'Sass', level: 80 },
        { name: 'Web Audio API', level: 75 },
        { name: 'HTML5 Canvas', level: 80 }
      ]
    },
    {
      category: 'BACKEND_CORE',
      items: [
        { name: 'Node.js', level: 85 },
        { name: 'Express', level: 80 },
        { name: 'NestJS', level: 80 },
        { name: 'RESTful APIs', level: 90 },
        { name: 'WebSockets', level: 80 },
        { name: 'GraphQL', level: 75 }
      ]
    },
    {
      category: 'SYSTEMS_OPS',
      items: [
        { name: 'Docker', level: 75 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'Redis', level: 75 },
        { name: 'Git', level: 90 },
        { name: 'CI/CD Pipelines', level: 80 },
        { name: 'AWS', level: 70 }
      ]
    }
  ],
  experiences: [
    {
      company: 'NEO_GENESIS CORP',
      role: 'Tech Lead / Front-End Architect',
      period: '2022 - Nay',
      details: [
        'Thiết kế kiến trúc Angular thế hệ mới cho hệ thống biểu đồ tài chính thời gian thực.',
        'Tối ưu hóa thời gian tải trang (LCP) tăng 40%, giảm bundle size xuống 30%.',
        'Huấn luyện đội ngũ phát triển, xây dựng design system dựa trên Tailwind CSS v4.'
      ]
    },
    {
      company: 'CYBER_TECH LABS',
      role: 'Senior Angular Engineer',
      period: '2018 - 2022',
      details: [
        'Phát triển ứng dụng Web điều khiển thiết bị IoT thông qua Canvas 2D/3D.',
        'Xây dựng các Angular custom elements tái sử dụng trong các hệ thống micro-frontend.',
        'Tối ưu hóa các tiến trình xử lý RxJS luồng dữ liệu phức tạp.'
      ]
    },
    {
      company: 'RETRO_SYNTH SOFTWARE',
      role: 'Full-Stack Developer',
      period: '2015 - 2018',
      details: [
        'Xây dựng trang Dashboard quản trị cho dữ liệu lớn (Big Data).',
        'Phát triển và bảo trì APIs viết bằng Express, cơ sở dữ liệu PostgreSQL.',
        'Thiết kế giải pháp phân trang và caching dữ liệu ở client.'
      ]
    }
  ],
  projects: [
    {
      name: 'DECK_OVERLORD',
      description: 'Trình cấu hình Dashboard phong cách HUD Cyberpunk cho phép thiết lập biểu đồ thời gian thực dạng mô đun.',
      tags: ['Angular', 'Canvas API', 'Tailwind CSS'],
      status: 'STABLE // v2.4',
      github: 'https://github.com/cyber-runner/deck-overlord',
      demo: 'https://cyber-cv.net/deck-overlord'
    },
    {
      name: 'LIGHTSPEED_COMPILER',
      description: 'Hệ thống biên dịch các component động cho phép tải trực tiếp các khối giao diện từ xa (micro-frontends).',
      tags: ['Angular Elements', 'TypeScript', 'Vite'],
      status: 'STABLE // v1.2',
      github: 'https://github.com/cyber-runner/lightspeed-compiler',
      demo: 'https://cyber-cv.net/lightspeed'
    },
    {
      name: 'NEON_GATEWAY',
      description: 'Cổng giao tiếp WebSocket phân tán hỗ trợ đồng bộ hóa thông tin thời gian thực giữa 10k+ client.',
      tags: ['Node.js', 'RxJS', 'WebSockets'],
      status: 'DEPRECATED // v0.9',
      github: 'https://github.com/cyber-runner/neon-gateway'
    }
  ]
};
export type ResumeDataType = typeof RESUME_DATA;
