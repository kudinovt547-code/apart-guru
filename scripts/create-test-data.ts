#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import { projects } from "../src/data/projects";

const OUTPUT_FILE = path.join(process.cwd(), "data/inbox/ApartPro_Stats_AllObjects_for_Claude_v1.json");

const testData = {
  objects: projects.slice(0, 5), // First 5 projects for testing
  sources: {
    updatedAt: "2026-01-21",
    source: "Test data (first 5 projects from projects.ts)",
  },
};

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(testData, null, 2));

console.log(`✓ Created test JSON file at: ${OUTPUT_FILE}`);
console.log(`✓ Contains ${testData.objects.length} projects`);
