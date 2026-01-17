# Softwares Packers - Plastic Containers Showcase Website

A modern, responsive frontend website showcasing a comprehensive product range of plastic containers. Built with React, TypeScript, Tailwind CSS, and Vite.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
src/
├── assets/          # Images and static assets
├── components/      # Reusable UI components
│   ├── ui/         # Shadcn UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── CategoryCard.tsx
├── data/           # Mock JSON data
│   ├── products.json
│   ├── categories.json
│   ├── clients.json
│   └── testimonials.json
├── pages/          # Page components
│   ├── Home.tsx
│   ├── Products.tsx
│   ├── ProductDetail.tsx
│   ├── Categories.tsx
│   └── NotFound.tsx
└── lib/            # Utility functions
```

## 🎨 Design System

The application uses a neutral, industrial color palette defined in `src/index.css`:

- **Background**: Off-white (#F7F7F6)
- **Foreground**: Charcoal (#222425)
- **Accent**: Steel gray (#6B7280)
- **Warm Accent**: Soft warm (#A78B6B)

Typography: Inter font family for modern professionalism

All colors are HSL-based and defined as CSS variables for easy theming.

## 📊 Mock Data

Currently using local JSON files in `src/data/`:

### Connecting to Real API

To replace mock data with a real backend:

1. **Create API service** in `src/services/api.ts`:

```typescript
const API_BASE_URL = process.env.VITE_API_URL || 'https://your-api.com';

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  return response.json();
};
```

2. **Use React Query** (already installed):

```typescript
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/services/api';

const { data: products } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts
});
```

3. **Environment Variables**: Create `.env` file:

```
VITE_API_URL=https://your-api.com
```

### Mock Data Structure

**Products** (`src/data/products.json`):
- id, name, sku, slug
- category, material, capacity_ml
- dimensions_mm, colors
- images, descriptions
- moq, packing, price_range
- certifications, tags

**Categories** (`src/data/categories.json`):
- id, name, slug
- description, icon
- product_count, image

## 🖼️ Image Assets

### Required Asset Locations

Place your product images in:
- `src/assets/` - For images imported in components (recommended)
- `public/assets/images/` - For images referenced directly in JSON

### Current Placeholder Images

The following images are generated and need to be replaced with real product photos:
- Hero: `src/assets/hero-warehouse.jpg`
- Products: `src/assets/product-jars.jpg`, `product-tubs.jpg`, `product-bottles.jpg`

### Adding New Images

1. Add to `src/assets/` folder
2. Import in component:
```typescript
import myImage from "@/assets/my-image.jpg";
```
3. Use in JSX: `<img src={myImage} alt="Description" />`

## 🧩 Key Features

- ✅ Responsive design (mobile-first)
- ✅ Accessible (WCAG AA compliant)
- ✅ SEO optimized
- ✅ Product filtering and search
- ✅ Category browsing
- ✅ Product detail pages
- ✅ Lazy loading for images
- ✅ Smooth animations and transitions

## 🛠️ Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Shadcn UI** - Component library
- **React Router** - Client-side routing
- **React Query** - Data fetching (ready for API integration)
- **Lucide React** - Icons

## 📱 Pages

1. **Home** (`/`) - Hero, featured products, categories
2. **Products** (`/products`) - Filterable product listing
3. **Product Detail** (`/products/:slug`) - Detailed product view
4. **Categories** (`/categories`) - Category overview
5. **404** - Not found page

## 🎯 SEO & Meta Tags

Meta tags configured in `index.html` for:
- Page title and description
- Open Graph (Facebook, LinkedIn)
- Twitter Cards
- Keywords

Each page can have custom meta tags by adding React Helmet.

## 🔧 Customization

### Change Primary Colors

Edit `src/index.css`:

```css
:root {
  --primary: 210 11% 14%; /* Your brand color in HSL */
  --accent: 220 13% 46%;  /* CTA color in HSL */
}
```

### Modify Typography

Edit font in `src/App.tsx` Helmet section and `tailwind.config.ts`.

### Add New Pages

1. Create page in `src/pages/YourPage.tsx`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/Header.tsx`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## 📝 Notes

- All styling uses Tailwind utility classes
- No inline styles or custom CSS files
- Components are fully typed with TypeScript
- Images use lazy loading for performance
- Keyboard navigation fully supported

## 🚧 Future Enhancements

To add backend functionality:
1. User authentication
2. Quote request system
3. CMS integration
4. Real-time inventory
5. Analytics tracking

## 📄 License

This project is provided as-is for demonstration purposes.

## 🤝 Support

For questions or issues, refer to the component documentation in the code or consult the original design specifications.
