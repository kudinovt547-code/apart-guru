import type { Project, PropertyFormatType, ProjectStatusType, RiskLevelType } from "@/types/project";

export interface ProjectFilters {
  search?: string;
  country?: string;
  city?: string;
  format?: PropertyFormatType;
  status?: ProjectStatusType;
  riskLevel?: RiskLevelType;
}

export function filterProjects(projects: Project[], filters: ProjectFilters): Project[] {
  return projects.filter((project) => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (
        !project.title.toLowerCase().includes(searchLower) &&
        !project.city.toLowerCase().includes(searchLower) &&
        !project.country.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }

    if (filters.country && project.country !== filters.country) {
      return false;
    }

    if (filters.city && project.city !== filters.city) {
      return false;
    }

    if (filters.format && project.format !== filters.format) {
      return false;
    }

    if (filters.status && project.status !== filters.status) {
      return false;
    }

    if (filters.riskLevel && project.riskLevel !== filters.riskLevel) {
      return false;
    }

    return true;
  });
}

export function calculateMarketIndex(projects: Project[]): number {
  if (projects.length === 0) return 0;
  const sum = projects.reduce((acc, p) => acc + p.revPerM2Month, 0);
  return sum / projects.length;
}

export function getTopByYield(projects: Project[], count = 3): Project[] {
  return [...projects]
    .sort((a, b) => b.revPerM2Month - a.revPerM2Month)
    .slice(0, count);
}

export function getTopByStability(projects: Project[], count = 3): Project[] {
  return [...projects]
    .filter((p) => p.riskLevel === "low")
    .sort((a, b) => a.paybackYears - b.paybackYears)
    .slice(0, count);
}

export function getUniqueCountries(projects: Project[]): string[] {
  return Array.from(new Set(projects.map((p) => p.country))).sort();
}

export function getUniqueCities(projects: Project[]): string[] {
  return Array.from(new Set(projects.map((p) => p.city))).sort();
}
