import type React from "react";

// Color theme types
export type ThemeColor = "bg-primary" | "bg-secondary" | "bg-accent";

// Icon types
export type SkillIconType = "code2" | "wrench" | "database" | "award";
export type ContactIconType = "mail" | "phone" | "mappin";
export type SocialIconType = "github" | "linkedin" | "medium";
export type ProjectLinkType = "demo" | "github";

// Common data structures
export interface Paragraph {
    text: string;
    bold?: boolean;
}

export interface CTAButton {
    text: string;
    href: string;
}

export interface CTASection {
    primary: CTAButton;
    secondary: CTAButton;
}

export interface SocialLinks {
    medium: string;
    github: string;
    linkedin: string;
    email: string;
}

export interface ProjectLink {
    type: ProjectLinkType;
    url: string;
}

// Component-specific types
export interface HeroData {
    title: string;
    name: string;
    description: string;
    cta: CTASection;
    social: SocialLinks;
}

export interface AboutData {
    title: string;
    highlightWord: string;
    paragraphs: Paragraph[];
}

export interface ExperienceItem {
    company: string;
    role: string;
    duration: string;
    location: string;
    description: string[];
    techStack: string;
    color: ThemeColor;
}

export interface ExperienceData {
    title: string;
    experiences: ExperienceItem[];
}

export interface Project {
    title: string;
    description: string;
    tech: string;
    file?: string;
    imageUrl?: string;
    links: ProjectLink[];
}

export interface ProjectsData {
    title: string;
    subtitle: string;
    projects: Project[];
}

export interface SkillCategory {
    iconType: SkillIconType;
    title: string;
    items: string[];
}

export interface SkillsData {
    title: string;
    iconType: SkillIconType;
    skillCategories: SkillCategory[];
}

export interface Certification {
    name: string;
    issuer: string;
}

export interface CertificationsData {
    title: string;
    subtitle: string;
    certifications: Certification[];
}

export interface Achievement {
    name: string;
    category: string;
    year: string;
}

export interface AchievementsData {
    title: string;
    achievements: Achievement[];
}

export interface EducationItem {
    institution: string;
    location: string;
    degree: string;
    duration: string;
    cgpa: string;
    color: ThemeColor;
}

export interface EducationData {
    title: string;
    education: EducationItem[];
}

export interface ContactItem {
    iconType: ContactIconType;
    label: string;
    value: string;
    href: string | null;
    color: string;
}

export interface SocialLink {
    iconType: SocialIconType;
    label: string;
    href: string;
    color: string;
}

export interface ContactData {
    title: string;
    socialTitle: string;
    contactItems: ContactItem[];
    socialLinks: SocialLink[];
    ctaEmail: string;
}

// Component prop types
export interface HeroProps extends HeroData { }
export interface AboutProps extends AboutData { }
export interface ExperienceProps extends ExperienceData { }
export interface ProjectsProps extends ProjectsData { }
export interface SkillsProps extends SkillsData { }
export interface CertificationsProps extends CertificationsData { }
export interface AchievementsProps extends AchievementsData { }
export interface EducationProps extends EducationData { }
export interface ContactProps extends ContactData { }

// Internal component prop types
export interface ExperienceItemProps extends ExperienceItem { }
export interface SkillCardProps {
    icon: React.ReactNode;
    title: string;
    items: string[];
    color: ThemeColor;
}

// Index component props
export interface IndexProps {
    heroData: HeroData;
    aboutData: AboutData;
    experienceData: ExperienceData;
    projectsData: ProjectsData;
    skillsData: SkillsData;
    certificationsData: CertificationsData;
    achievementsData: AchievementsData;
    educationData: EducationData;
    contactData: ContactData;
}

