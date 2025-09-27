# Claude Development Guide

This document contains helpful information for Claude Code when working on this Next.js project.

## Project Overview

This is a Next.js 14 ecommerce application with TypeScript support using the App Router architecture. The app features a clean, white-dominant design with product display functionality.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
shop/
├── app/                              # Next.js App Router pages and layouts
│   ├── api/                         # API routes
│   │   └── products/                # Products API endpoint
│   │       └── route.ts             # Product data API route
│   ├── components/                  # Reusable React components
│   │   ├── CartCounter.tsx          # Shopping cart counter component
│   │   ├── CartCounter.module.css   # Cart counter styles
│   │   ├── Header.tsx               # Site header component
│   │   ├── Header.module.css        # Header styles
│   │   ├── ProductRow.tsx           # Product display row component
│   │   └── ProductRow.module.css    # Product row styles
│   ├── hooks/                       # Custom React hooks
│   │   ├── useMutateProducts.ts     # Product mutation hook
│   │   └── useProducts.ts           # Products data fetching hook
│   ├── products/                    # Products section
│   │   ├── page.tsx                 # Product display page
│   │   └── page.module.css          # Products page styles
│   ├── types/                       # TypeScript type definitions
│   │   ├── index.ts                 # Central export point for types
│   │   ├── hooks.ts                 # Hook return type interfaces
│   │   └── product.ts               # Product-related interfaces
│   ├── globals.css                  # Global styles and CSS variables
│   ├── layout.tsx                   # Root layout component
│   ├── page.tsx                     # Home page component
│   └── page.module.css              # Home page styles
├── CLAUDE.md                        # Claude development guide
├── next-env.d.ts                    # Next.js TypeScript declarations
├── next.config.js                   # Next.js configuration
├── package.json                     # Dependencies and scripts
└── tsconfig.json                    # TypeScript configuration
```

## Code Standards

- Use TypeScript for all components
- Follow Next.js App Router conventions
- Use functional components with React hooks
- Keep components in the `app/` directory following the App Router structure
- Use CSS modules for component-specific styling
- Utilize global CSS variables for consistent theming
- Centralize TypeScript interfaces in `app/types/` directory
- Import types from `app/types` for reusability across components

## Testing

Currently no test framework is configured. Add testing setup if needed.

## Design System

The design system uses CSS variables defined in `app/globals.css` for consistent theming:

- **Color Scheme**: White-dominant design with subtle gray accents
- **Primary Background**: `--primary-bg: #ffffff` (pure white)
- **Secondary Background**: `--secondary-bg: #f8f9fa` (light gray)
- **Borders**: `--border-color: #e5e5e5` (subtle gray)
- **Text Colors**:
  - `--text-primary: #333` (dark gray)
  - `--text-secondary: #666` (medium gray)
  - `--text-muted: #999` (light gray)
- **Accent Colors**:
  - `--accent-green-bg: #e8f5e8` (success background)
  - `--accent-green-text: #2d5a2d` (success text)
  - `--error-bg: #ffebee` (error background)
  - `--error-text: #d32f2f` (error text)
- **Interactive Elements**:
  - `--star-color: #ffd700` (rating stars)
  - `--shadow-light: 0 2px 4px rgba(0,0,0,0.05)` (subtle shadows)
  - `--transition-fast: 0.2s ease` (smooth transitions)

## Features

- **Home Page** (`/`): Landing page with navigation and call-to-action
- **Products Page** (`/products`): Product grid display with:
  - Product cards with images, ratings, and pricing
  - Discount badges and original price strikethrough
  - Responsive grid layout (auto-fit, minimum 280px columns)
  - Free shipping promotion section

## Styling Architecture

- **CSS Modules**: Component-specific styles using `.module.css` files for scoped styling
- **Global Styles**: Shared variables, utility classes, and base styles in `app/globals.css`
- **CSS Variables**: Consistent theming system using CSS custom properties
- **No External Framework**: Custom styling throughout for maximum control
- **Utility Classes**: Common patterns extracted into reusable classes (`.flex`, `.text-center`, etc.)

## Notes

- Product images sourced from Unsplash for demonstration
- Responsive design that adapts to different screen sizes
- Modular CSS architecture for maintainability and scalability
- Consistent design tokens through CSS variables