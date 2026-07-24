/**
 * Defines a single skill node with name and proficiency level.
 */
export interface SkillItem {
  name: string;
  level: number;
}

/**
 * Defines the profile information of the developer.
 */
export interface ResumeProfile {
  name: string;
  alias: string;
  title: string;
  sector: string;
  ip: string;
  bio: string;
  status: string;
  avatarText: string;
}

/**
 * Defines a single skill category containing specific technical skills.
 */
export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

/**
 * Defines a professional work experience node.
 */
export interface ExperienceNode {
  company: string;
  role: string;
  period: string;
  details: string[];
}

/**
 * Defines a showcase project card.
 */
export interface ProjectNode {
  name: string;
  description: string;
  tags: string[];
  status: string;
  github?: string;
  demo?: string;
}

/**
 * Main wrapper interface for the entire resume CV dataset.
 */
export interface ResumeData {
  profile: ResumeProfile;
  skills: SkillCategory[];
  experiences: ExperienceNode[];
  projects: ProjectNode[];
}
