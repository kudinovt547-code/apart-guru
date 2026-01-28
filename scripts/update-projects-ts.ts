#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";

// Read the generated stats
const statsPath = path.join(process.cwd(), "src/data/stats.generated.json");
const projectsPath = path.join(process.cwd(), "src/data/projects.ts");

console.log("📝 Updating projects.ts with new data...\n");

// Read stats.generated.json
const statsData = JSON.parse(fs.readFileSync(statsPath, "utf-8"));
const objects = statsData.objects;

console.log(`✓ Loaded ${objects.length} objects from stats.generated.json`);

// Generate TypeScript content
let content = `import { Project, PropertyFormat, ProjectStatus, RiskLevel } from "@/types/project";\n\n`;
content += `/**\n`;
content += ` * Fallback project data - auto-generated from stats.generated.json\n`;
content += ` * Total: ${objects.length} objects\n`;
content += ` * Last updated: ${statsData.sources.updatedAt}\n`;
content += ` * \n`;
content += ` * This file is used as fallback when stats.generated.json is not available.\n`;
content += ` * It's automatically updated by npm run update:projects\n`;
content += ` */\n\n`;
content += `export const projects: Project[] = [\n`;

// Add each object
objects.forEach((obj: any, idx: number) => {
  content += `  {\n`;
  content += `    slug: "${obj.slug}",\n`;
  content += `    title: "${obj.title.replace(/"/g, '\\"')}",\n`;
  content += `    country: "${obj.country}",\n`;
  content += `    city: "${obj.city}",\n`;
  content += `    format: PropertyFormat.${obj.format.toUpperCase().replace(/-/g, "_")},\n`;
  content += `    status: ProjectStatus.${obj.status.toUpperCase()},\n`;
  content += `    updatedAt: "${obj.updatedAt}",\n`;
  content += `    price: ${obj.price},\n`;
  content += `    area: ${obj.area},\n`;
  content += `    revPerM2Month: ${obj.revPerM2Month},\n`;
  content += `    noiYear: ${obj.noiYear},\n`;
  content += `    paybackYears: ${obj.paybackYears},\n`;
  content += `    occupancy: ${obj.occupancy},\n`;
  content += `    adr: ${obj.adr},\n`;
  content += `    riskLevel: RiskLevel.${obj.riskLevel.toUpperCase()},\n`;
  content += `    summary: "${obj.summary.replace(/"/g, '\\"')}",\n`;
  content += `    why: ${JSON.stringify(obj.why)},\n`;
  content += `    risks: ${JSON.stringify(obj.risks)},\n`;
  content += `    seasonality: ${JSON.stringify(obj.seasonality)},\n`;

  if (obj.pricePerM2) {
    content += `    pricePerM2: ${obj.pricePerM2},\n`;
  }
  if (obj.developer) {
    content += `    developer: "${obj.developer.replace(/"/g, '\\"')}",\n`;
  }
  if (obj.completionDate) {
    content += `    completionDate: "${obj.completionDate.replace(/"/g, '\\"')}",\n`;
  }
  if (obj.link) {
    content += `    link: "${obj.link}",\n`;
  }

  content += `  }`;

  if (idx < objects.length - 1) {
    content += `,\n`;
  } else {
    content += `\n`;
  }
});

content += `];\n`;

// Write to projects.ts
fs.writeFileSync(projectsPath, content);

console.log(`✓ Updated ${projectsPath}`);
console.log(`✓ ${objects.length} objects written to projects.ts\n`);

console.log("📊 Summary:");
console.log(`  - Active: ${objects.filter((o: any) => o.status === "active").length}`);
console.log(`  - Construction: ${objects.filter((o: any) => o.status === "construction").length}`);
console.log(`  - Cities: ${[...new Set(objects.map((o: any) => o.city))].length}`);
console.log("");
console.log("✅ Done! Now commit and push to update Vercel.");
