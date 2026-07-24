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
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  careerObjective: string;
  summary: string;
}

/**
 * Defines a grouped technical skill list (no progress bar, just a label list).
 */
export interface TechSkillGroup {
  label: string;
  values: string;
}

/**
 * Defines a single skill category containing specific technical skills with levels.
 */
export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

/**
 * Defines a single bullet point inside a project within an experience.
 */
export interface ExperienceProject {
  name: string;
  teamSize: number;
  bullets: string[];
}

/**
 * Defines a professional work experience node.
 */
export interface ExperienceNode {
  company: string;
  companyLocation: string;
  role: string;
  period: string;
  projects: ExperienceProject[];
}

/**
 * Defines a portfolio project card.
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
 * Defines an education entry.
 */
export interface EducationNode {
  institution: string;
  location: string;
  degree: string;
  period: string;
}

/**
 * Main wrapper interface for the entire resume CV dataset.
 */
export interface ResumeData {
  profile: ResumeProfile;
  techSkills: TechSkillGroup[];
  skills: SkillCategory[];
  experiences: ExperienceNode[];
  education: EducationNode[];
}
