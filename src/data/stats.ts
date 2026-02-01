import { Project } from "@/types/project";
import { projects as fallbackProjects } from "./projects";
import { investmentProjects } from "./investment-projects";
import { realisticProjects } from "./realistic-stats";

export interface StatsData {
  objects: Project[];
  sources: {
    updatedAt: string;
    source: string;
  };
}

// Try to load generated stats - this will be set by dynamic import
let generatedStatsData: StatsData | null = null;

// Load generated stats at module initialization
try {
  // Import from src/data where Next.js can find it
  generatedStatsData = require("./stats.generated.json") as StatsData;
  console.log(`[stats] ✓ Loaded ${generatedStatsData.objects.length} objects from stats.generated.json`);
} catch (error) {
  console.log("[stats] Using fallback data (stats.generated.json not found)");
}

/**
 * Get stats data from generated JSON file or fallback to realistic stats from Telegram
 */
export function getStatsData(): StatsData {
  // Use generated data if available
  if (generatedStatsData && generatedStatsData.objects && generatedStatsData.objects.length > 0) {
    return generatedStatsData;
  }

  // Fallback to realistic Telegram data (2024-2025 statistics)
  return {
    objects: realisticProjects,
    sources: {
      updatedAt: "2025-12-31",
      source: "Real Telegram data from management companies 2024-2025",
    },
  };
}

/**
 * Get all project objects
 */
export function getProjects(): Project[] {
  return getStatsData().objects;
}

/**
 * Get project by slug
 * Searches in both operational projects and investment projects
 */
export function getProjectBySlug(slug: string): Project | undefined {
  // First search in operational projects
  const operationalProject = getProjects().find((p) => p.slug === slug);
  if (operationalProject) {
    return operationalProject;
  }

  // If not found, search in investment projects
  return investmentProjects.find((p) => p.slug === slug);
}

/**
 * Get data sources info
 */
export function getSourcesInfo() {
  return getStatsData().sources;
}

/**
 * Get all unique countries
 */
export function getUniqueCountries(): string[] {
  const projects = getProjects();
  return Array.from(new Set(projects.map((p) => p.country))).sort();
}

/**
 * Get all unique cities
 */
export function getUniqueCities(): string[] {
  const projects = getProjects();
  return Array.from(new Set(projects.map((p) => p.city))).sort();
}
