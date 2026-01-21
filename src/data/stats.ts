import { Project } from "@/types/project";
import { projects as fallbackProjects } from "./projects";

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
 * Get stats data from generated JSON file or fallback to hardcoded projects
 */
export function getStatsData(): StatsData {
  // Use generated data if available
  if (generatedStatsData && generatedStatsData.objects && generatedStatsData.objects.length > 0) {
    return generatedStatsData;
  }

  // Fallback to hardcoded projects
  return {
    objects: fallbackProjects,
    sources: {
      updatedAt: new Date().toISOString().split("T")[0],
      source: "Fallback (hardcoded projects.ts)",
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
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
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
