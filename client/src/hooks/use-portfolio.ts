import { PROJECTS, SKILLS, EXPERIENCE, EDUCATION } from "@/lib/constants";

export function useProjects() {
  return { data: PROJECTS, isLoading: false };
}

export function useSkills() {
  return { data: SKILLS, isLoading: false };
}

export function useExperience() {
  return { data: EXPERIENCE, isLoading: false };
}

export function useEducation() {
  return { data: EDUCATION, isLoading: false };
}