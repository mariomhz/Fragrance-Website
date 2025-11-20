# ASIREM - Luxury Perfume E-Commerce

A responsive, multi-page luxury perfume catalog and product detail website built with HTML, CSS, and vanilla JavaScript following mobile-first design principles.

## 📋 Project Overview

ASIREM is a luxury perfume brand website that showcases a catalog of high-end fragrances inspired by global destinations. The project includes a product catalog page and a detailed product page with multiple color palette options.

## 🎨 Features

### Core Pages
- **Catalog Page** (`index.html`) - Full product catalog with filtering options
- **Product Detail Page** (`detalle.html`) - Detailed product information for Belém D'Água perfume

### Color Palette System
Interactive color palette selector with 4 distinct themes:
1. **Monochromatic** (Selected) - Earth tones and beige for timeless elegance
2. **Complementary** - Deep blue and gold for luxury and contrast
3. **Analogous** - Natural greens and blues for freshness
4. **Triadic** - Rose, sage green, and purple for modern sophistication

Users can switch between palettes in real-time using floating buttons.

### Product Detail Page Features
- ✅ Product title and description
- ✅ Complete technical specifications
- ✅ Main product image
- ✅ Image carousel with 4 thumbnails (non-interactive)
- ✅ Current price and previous price (crossed out)
- ✅ 3 CTA buttons: Buy Now, Add to Cart, Add to Favorites
- ✅ 4 additional features: Free shipping, Satisfaction guarantee, Free samples, Personalized advice

### Responsive Design
- **Mobile First** approach
- Breakpoints: 480px, 640px, 800px, 1024px
- Flexible layouts using CSS Grid and Flexbox
- Optimized for all device sizes

## 🛠️ Technologies Used

### Core Technologies
- **HTML5** - Semantic markup
- **CSS3** - Styling and layouts
- **JavaScript (ES6)** - Color palette switching functionality

### CSS Features
- **CSS Grid** - Complex layouts on desktop
- **Flexbox** - Component layouts and mobile design
- **CSS Custom Properties (Variables)** - Dynamic color theming
- **Media Queries** - Responsive breakpoints
- **@import** - Font loading from Google Fonts
- **@font-face** - Local font fallbacks

### Design Approach
- **Mobile First** - Base styles for mobile, enhanced for larger screens
- **Progressive Enhancement** - Features scale up with screen size
- **BEM-like Naming** - Clear, maintainable CSS class names

## 🎨 Color Palettes

### Monochromatic Palette (Selected)
```css
Background: #F5F2ED
Primary:    #8B7F6F
Secondary:  #D4C9B8
Accent:     #6B6157
Text:       #3A3530
```

### Complementary Palette
```css
Background: #F8F7F3
Primary:    #1A3A52 (Deep Blue)
Secondary:  #D4A574 (Gold)
Accent:     #B88E5D
Text:       #0D1F2D
```

### Analogous Palette
```css
Background: #F4F6F5
Primary:    #6B8E9E (Blue-Green)
Secondary:  #8BA396 (Sage)
Accent:     #5A7A87
Text:       #2E3E3C
```

### Triadic Palette
```css
Background: #FAF8F6
Primary:    #8B7B9B (Purple)
Secondary:  #C4A4A0 (Rose)
Accent:     #A0B4A8 (Sage Green)
Text:       #3D3644
```

## 🔤 Typography

### Headings
- **Primary Font**: Chivo (bold, impactful)
- **Secondary Font**: Inter (modern fallback)
- **Weights**: 700-900 (bold/black)
- **Features**: Uppercase, increased letter-spacing

### Body Text
- **Primary Font**: Roboto Mono (monospaced, clean)
- **Secondary Font**: Lato (sans-serif fallback)
- **Weight**: 400 (regular)
- **Size**: 14px base (responsive)

### Font Loading
All fonts are:
1. Loaded from Google Fonts (CDN)
2. Available as local files (offline fallback)
3. With system font fallbacks

## 📱 Responsive Breakpoints

| Breakpoint | Screen Size | Layout Changes |
|------------|-------------|----------------|
| Mobile     | < 480px     | Single column, stacked layout |
| Small Tablet | 480px - 640px | 2-column product grid |
| Tablet     | 640px - 800px | Enhanced footer layout |
| Large Tablet | 800px - 1024px | 3-column product grid, horizontal menus |
| Desktop    | > 1024px    | CSS Grid layout, sidebar navigation, 4-column grid |

## 🎯 Color Palette Switching System

The color switching works through 3 components:

### 1. CSS Variables (palettes.css)
```css
.palette-monochromatic {
    --color-background: #F5F2ED;
    --color-primary: #8B7F6F;
    /* ... */
}
```

### 2. HTML Buttons (index.html, detalle.html)
```html
<button data-palette="monochromatic">Monocromática</button>
<button data-palette="complementary">Complementaria</button>
```

### 3. JavaScript Toggle
```javascript
// Read palette name from button
const palette = this.getAttribute('data-palette');

// Remove all palette classes
document.body.classList.remove('palette-monochromatic', ...);

// Add new palette class
document.body.classList.add('palette-' + palette);
```

When the body class changes, CSS variables update automatically throughout the site.

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: Local web server for best experience

### Installation

1. **Clone or download** the project
2. **Download fonts** (optional - will work without):
   - Download from Google Fonts:
     - [Chivo](https://fonts.google.com/specimen/Chivo)
     - [Inter](https://fonts.google.com/specimen/Inter)
     - [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono)
     - [Lato](https://fonts.google.com/specimen/Lato)
   - Place `.ttf` files in `resources/fonts/`

3. **Open in browser**:
   - Open `index.html` for the catalog
   - Open `detalle.html` for product details

## 🎨 Design Philosophy

### Color Selection
The monocromatic palette was selected as the primary theme because:
- Conveys timeless elegance and sophistication
- Doesn't compete with product imagery
- Provides excellent readability
- Aligns with luxury brand values
- Works across all device sizes

### Typography Choices
- **Chivo for headings**: Bold, impactful, perfect for brand presence
- **Roboto Mono for body**: Clean, modern, excellent readability
- High contrast between headings and body text
- Generous letter-spacing for luxury feel

### Layout Strategy
- **Mobile**: Single column, focus on content hierarchy
- **Tablet**: Multi-column grids, horizontal navigation
- **Desktop**: CSS Grid for complex layouts, sidebar navigation

## 📝 Notes

- All buttons and forms are disabled (not functional)
- No hover effects implemented (as per requirements)
- Product catalog uses repeated products (maquetación focus)
- Single product detail page for all catalog items
- JavaScript is minimal (only palette switching)

## 🔗 Live Demo

Open `index.html` or `detalle.html` in any modern browser. Use the color palette buttons in the top-right corner to switch between themes.

---

**Project by**: Mario
**Course**: 2DAWB - DOR
**Date**: November 2025
**Version**: 1.0