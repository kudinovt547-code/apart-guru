# Claude Code Project Rules — Apart Guru

## Project Overview

Apart Guru is a production-ready marketing analytics platform for income property investments in CIS countries. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and follows a strict dark terminal design aesthetic.

## Tech Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS (dark terminal theme)
- **UI**: Custom components (shadcn/ui style)
- **State**: Zustand (localStorage persistence for compare/watchlist)
- **Tables**: TanStack React Table
- **Charts**: Recharts
- **Validation**: Zod
- **Icons**: Lucide React

## Architecture Principles

1. **App Router**: All pages use Next.js 15 App Router (`src/app/`)
2. **TypeScript Strict**: Full type safety, no `any` types
3. **Component Structure**:
   - UI primitives in `src/components/ui/`
   - Layout components in `src/components/layout/`
   - Page-specific in `src/components/[page]/`
4. **Data Layer**:
   - Demo data in `src/data/projects.ts` (40+ projects)
   - Types in `src/types/`
   - Utils in `src/utils/`
5. **State Management**:
   - Zustand stores in `src/store/`
   - localStorage persistence for compare/watchlist
6. **No Dead Buttons**: Every CTA and navigation link must work

## Design System

### Dark Terminal Theme
- Background: `hsl(222.2 84% 4.9%)`
- Primary (green): `hsl(142 86% 28%)`
- Muted text: `hsl(215 20.2% 65.1%)`
- Border: `hsl(217.2 32.6% 17.5%)`

### Typography
- Sans: Geist Sans
- Mono: Geist Mono (for all numbers with `tabular-nums`)
- Numbers must use `font-mono tabular-nums` for alignment

### Spacing & Layout
- Container max-width with responsive padding
- Consistent card spacing (p-6)
- Terminal borders: `terminal-border` class

## Pages Structure

```
/ (Home)                   -> Биржа доходности (terminal table)
/projects                  -> Каталог проектов (cards grid)
/projects/[slug]          -> Детальная карточка проекта
/compare                   -> Сравнение проектов (2-5)
/calculator               -> Калькулятор NOI
/methodology              -> Методология расчёта
/due-diligence            -> Процесс проверки
/services                 -> Услуги
/contact                  -> Контакты (форма)
/legal                    -> Правовая информация
```

## Key Features

### 1. Compare System (Zustand + localStorage)
- Max 5 projects in comparison
- Persistent across sessions
- Global CompareBar shows count
- Compare page with analysis

### 2. Watchlist (localStorage)
- Star/unstar projects
- Persistent across sessions

### 3. NOI Calculator
- Real calculations: revenue - expenses = NOI
- 3 scenarios: conservative (-10%), base, optimistic (+10%)
- Sensitivity analysis: ADR ±10%, occupancy ±10%
- Save calculations to localStorage

### 4. Project Table (react-table)
- Sortable columns
- Actions: view, compare, watchlist
- Responsive design

### 5. Charts (recharts)
- Seasonality graphs on project detail pages
- 12-month data visualization

## Code Style

### Components
```typescript
// Use 'use client' for interactive components
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function MyComponent() {
  // Component logic
}
```

### Data Formatting
Always use utility functions from `@/lib/utils`:
- `formatCurrency(value)` → "5 000 000 ₽"
- `formatNumber(value, decimals)` → "1 234.56"
- `formatPercent(value)` → "75.0%"
- `formatDate(date)` → "21.01.2026"

### State Management
```typescript
// Zustand store pattern
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create()(
  persist(
    (set, get) => ({
      // state and actions
    }),
    { name: "storage-key" }
  )
);
```

## Commands

```bash
npm install        # Install dependencies
npm run dev       # Start dev server (localhost:3000)
npm run build     # Production build
npm start         # Start production server
npm run lint      # ESLint check
```

## Common Tasks

### Adding a New Project
Edit `src/data/projects.ts` and add entry following the `Project` type schema.

### Adding a New Page
1. Create `src/app/[page]/page.tsx`
2. Add link in `src/components/layout/Header.tsx`
3. Add link in `src/components/layout/Footer.tsx`

### Adding a New UI Component
Create in `src/components/ui/[component].tsx` following shadcn/ui patterns.

### Modifying Calculations
Edit formulas in `src/app/calculator/page.tsx` or `src/utils/projectUtils.ts`.

## Important Rules

1. **No Breaking Changes**: Don't modify type schemas without checking all usages
2. **Preserve localStorage**: Don't change store names (breaks user data)
3. **Keep Terminal Theme**: Maintain strict dark terminal aesthetic
4. **All Buttons Work**: Never create non-functional CTAs
5. **Type Safety**: Always use proper TypeScript types
6. **Responsive**: All components must work on mobile
7. **Accessibility**: Use semantic HTML and ARIA labels
8. **Performance**: Memoize expensive calculations with `useMemo`

## Data Schema

### Project Type
```typescript
type Project = {
  slug: string;              // Unique identifier
  title: string;             // Project name
  country: string;           // Country name
  city: string;              // City name
  format: PropertyFormat;    // apartment | hotel | etc.
  status: ProjectStatus;     // active | planning | etc.
  updatedAt: string;         // ISO date
  price: number;             // Full price in RUB
  area: number;              // Area in m²
  revPerM2Month: number;     // Revenue per m² per month
  noiYear: number;           // Net Operating Income per year
  paybackYears: number;      // Payback period
  occupancy: number;         // Occupancy percentage
  adr: number;               // Average Daily Rate
  riskLevel: RiskLevel;      // low | medium | high
  summary: string;           // Short description
  why: string[];             // Reasons to invest
  risks: string[];           // Risk factors
  seasonality: number[];     // 12 months, 0-100 scale
};
```

## Debugging

- Check browser console for localStorage data
- Use React DevTools for component state
- Check `npm run lint` for code issues
- Use `npm run build` to catch TypeScript errors

## Future Enhancements

When adding new features, consider:
- API integration (replace `src/data/projects.ts`)
- CMS for project management
- Real form submissions (replace console.log)
- User authentication
- Favorites sync across devices
- Analytics integration
- SEO optimization
- Performance monitoring

## Contact

For questions about the codebase or architecture decisions, refer to this document first. All design decisions are documented here.

---

**Last Updated**: 2026-01-21
**Version**: 1.0.0
**Status**: Production-ready prototype
