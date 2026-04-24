# Meow Clothing Studio

A modern, minimalistic e-commerce platform for cat-themed clothing and accessories built with Next.js, TypeScript, and Tailwind CSS.

## 🛍 Project Overview

Meow Clothing Studio is a full-stack e-commerce application featuring a clean, modern design with cat-themed fashion products. The platform includes:

- **Marketplace**: Browse and shop our collection of cat-themed clothing
- **Product Details**: Detailed product pages with enhanced shopping experience
- **Shopping Cart & Checkout**: Complete purchase flow with order management

## 🏗️ Architecture

This is a **microfrontends monorepo** using Turborepo with the following structure:

```
meow-clothing-studio/
├── apps/
│   ├── marketplace/           # Main shopping application
│   │   ├── app/
│   │   │   ├── page.tsx
│   │   │   ├── product/[id]/page.tsx
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── CategoryFilter.tsx
│   │   │   └── QuantitySelector.tsx
│   │   └── lib/
│   │       ├── data.ts
│   │       └── cart-utils.ts
│   └── checkout/             # Checkout application
│       ├── app/
│       │   ├── checkout/page.tsx
│       │   └── layout.tsx
│       └── components/
│           ├── CartItem.tsx
│           └── CheckoutForm.tsx
├── packages/
│   ├── components/           # Shared UI components
│   │   ├── Header.tsx
│   │   └── index.ts
│   └── checkout-lib/         # Shared cart functionality
│       ├── index.ts
│       ├── CartLink.tsx
│       └── __tests__/
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

### 🔄 Microfrontends Architecture

The project uses **Vercel Microfrontends** pattern with two independent Next.js applications:

#### **Marketplace App** (`apps/marketplace`)

- **Port**: 3000
- **Purpose**: Main shopping experience and product catalog
- **Features**: Product browsing, category filtering, product details, cart management
- **Dependencies**: Shared components and cart functionality

#### **Checkout App** (`apps/checkout`)

- **Port**: 3001
- **Purpose**: Dedicated checkout flow and order processing
- **Features**: Shopping cart review, shipping form, order completion
- **Dependencies**: Shared components and cart functionality

### 📦 Shared Packages

#### **@meow-clothing-studio/components**

- **Header.tsx**: Sticky navigation header with pill behavior
- **index.ts**: Component exports and re-exports

#### **@meow-clothing-studio/checkout-lib**

- **index.ts**: Core cart functionality (add, remove, update, clear)
- **CartLink.tsx**: Cart icon with item count badge
- **Event System**: Custom events for cross-app cart synchronization

### 🔄 Cart State Management

The shopping cart uses a **sophisticated state sharing system**:

#### **Local Storage Strategy**

- **Browser localStorage**: Primary storage for cart persistence
- **Cross-tab sync**: Storage events automatically sync cart across browser tabs
- **Event-driven updates**: Custom `cart-updated` events for real-time UI updates

#### **State Synchronization Flow**

1. **Add to Cart**: Updates localStorage → Dispatches `cart-updated` event
2. **Quantity Changes**: Updates localStorage → Dispatches `cart-updated` event
3. **Remove Items**: Updates localStorage → Dispatches `cart-updated` event
4. **Cross-app Communication**: Both apps listen for storage and custom events

#### **Benefits**

- **Performance**: Instant cart updates without network requests
- **Reliability**: Cart persists across page refreshes and browser sessions
- **User Experience**: Seamless shopping experience across all touchpoints
- **Scalability**: Simple, effective state management for e-commerce needs

## 🎨 Design System

The application features a **minimalistic design language** with:

- **Typography**: Light font weights (`font-light`) for elegant, modern appearance
- **Color Palette**: Sophisticated grays and blacks instead of bright colors
- **Layout**: Clean spacing, rounded corners, subtle shadows
- **Interactions**: Smooth transitions and micro-animations
- **Components**: Borderless design with focus on content

## 🚀 Key Features

### Header Component

- **Sticky pill behavior**: Transforms from full-width to centered pill on scroll
- **Smooth animations**: Backdrop blur and shadow effects
- **Responsive design**: Adapts size and text for different screen sizes

### Product Cards

- **Modern layout**: No borders, rounded images, clean typography
- **Interactive controls**: Icon-based cart controls positioned inside product images
- **Hover effects**: Subtle image scaling and shadow transitions
- **Smart states**: Dynamic button states based on cart status

### Shopping Experience

- **Category filtering**: Browse products by category
- **Quantity management**: Real-time cart updates with visual feedback
- **Product details**: Enhanced product pages with size/color selectors
- **Checkout flow**: Complete order processing with form validation

## 📦 Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for utility-first styling
- **Monorepo**: Turborepo for efficient development
- **Package Manager**: pnpm for fast, reliable dependency management
- **Testing**: Vitest for unit and integration tests

## 🛒 E-commerce Features

- **Product Catalog**: 38+ products across 6 categories
- **Shopping Cart**: Local storage-based cart management
- **Order Processing**: Complete checkout with form validation
- **Stock Management**: Real-time inventory tracking
- **Responsive Design**: Mobile-first approach with desktop enhancements

## 🧪 Categories

1. **T-Shirts** - Comfortable and stylish t-shirts for everyday wear
2. **Hoodies** - Warm and cozy hoodies for cold days
3. **Accessories** - Complete your look with our accessories
4. **Pants** - Stylish and comfortable pants for any occasion
5. **Dresses** - Elegant dresses for special occasions
6. **Outerwear** - Jackets and coats for all seasons

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/meow-clothing-studio.git

# Install dependencies
pnpm install

# Start development servers
pnpm dev
```

### Development

The application starts two development servers:

- **Marketplace**: http://localhost:3000
- **Checkout**: http://localhost:3001

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm test --filter @meow-clothing-studio/marketplace
```

## 📱 Build & Deploy

```bash
# Build for production
pnpm build

# Deploy (configured for Vercel)
vercel
```

## 🎯 Project Goals

- ✅ **Modern UX**: Clean, intuitive shopping experience
- ✅ **Performance**: Fast loading and smooth interactions
- ✅ **Accessibility**: Semantic HTML and keyboard navigation
- ✅ **Responsive**: Mobile-first design approach
- ✅ **Maintainable**: Clean code with comprehensive tests

---

Built with ❤️ and 🐱 for cat lovers everywhere!
