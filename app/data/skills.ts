import skillsData from "./skills.json";

export interface Skill {
  name: string;
  slug: string;
  description: string;
  category: string;
  categoryLabel: string;
}

export const skills: Skill[] = skillsData as Skill[];

export function getSkillBySlug(slug: string): Skill | undefined {
  return skills.find((s) => s.slug === slug);
}

export function getSkillsByCategory(category: string): Skill[] {
  return skills.filter((s) => s.category === category);
}

export const categories = [
  ...new Map(
    skills.map((s) => [s.category, { slug: s.category, label: s.categoryLabel }])
  ).values(),
];
