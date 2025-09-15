# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 3 website for journalist and parliament member محمد عبدالعليم داود (Mohammed Abdul Aleem Daoud). The site is built in Arabic with RTL (right-to-left) support and includes articles, press statements, media content, and biographical information.

## Development Commands

- **Start development server**: `npm run dev`
- **Build for production**: `npm run build`
- **Generate static site**: `npm run generate`
- **Preview production build**: `npm run preview`
- **Prepare Nuxt**: `npm run postinstall`
- **Lint code**: `npm run lint`
- **Fix lint issues**: `npm run lint:fix`
- **Type checking**: `npm run typecheck`

## Architecture Overview

### Core Structure
- **Framework**: Nuxt 4 with TypeScript support and strict type checking
- **Styling**: Tailwind CSS with RTL configuration
- **State Management**: Pinia store with composables
- **API Layer**: Custom `$api` plugin with typed `useAPI` composable
- **Language**: Arabic (ar) with RTL direction
- **Font**: Tajawal Google Font (300, 400, 500, 700 weights)

### Nuxt 4 Directory Structure
- `app/pages/` - File-based routing with articles and press statements
- `app/components/` - Reusable Vue components (HeroSection, ArticleCard, etc.)
- `app/composables/` - Shared logic with TypeScript (`useAPI.ts`, `useData.ts`)
- `app/plugins/` - Nuxt plugins including custom API configuration
- `app/layouts/` - Layout templates
- `types/` - TypeScript type definitions
- `assets/` - Static assets and CSS
- `server/` - Server-side code (if needed)

### API Integration
- Custom `$api` plugin provides configured `$fetch` instance
- Base URL configured via `BASE_URL` environment variable
- `useAPI<T>` composable with TypeScript generics
- `useData` composable with typed interfaces for data management
- Full TypeScript support with strict type checking

### Content Structure
- Articles accessible via `/articles` and `/articles/[id]`
- Press statements via `/press-statements` and `/press-statements/[id]`
- Static pages: CV, media, privacy policy, terms of service, disclaimer

### State Management
- Global data stored using `useState<GlobalData>("globalData")`
- Typed interfaces for all data structures
- Pinia for complex state management when needed

## Technical Notes

- **Nuxt 4 Compatibility**: Configured with `future.compatibilityVersion: 4`
- **RTL Support**: Full Arabic RTL layout in `nuxt.config.ts`
- **TypeScript**: Strict mode enabled with type checking
- **ESLint**: Configured for Vue/Nuxt with flat config format
- **Environment**: Variables configured through `runtimeConfig.public`
- **Performance**: Optimized with experimental features for better performance