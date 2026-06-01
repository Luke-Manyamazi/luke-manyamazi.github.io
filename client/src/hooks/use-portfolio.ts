import { PROJECTS, SKILLS, EXPERIENCE, EDUCATION } from "@/lib/constants";
import { useEffect, useState } from "react";

export function useProjects() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json.projects || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load projects:", err);
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading };
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