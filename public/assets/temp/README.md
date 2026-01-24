# Category Images Directory

This directory contains all category images in WebP format for optimal loading performance.

## Structure

All category images follow this naming convention:
- `category-{slug}-{number}.webp` - Main category image
- `category-{slug}-hover-{number}.webp` - Hover image (if needed)

## Current Category Images

1. **PET Container**
   - `category-pet-container-1.webp`
   - `category-pet-container-hover-8.webp`

2. **Container**
   - `category-container-2.webp`
   - `category-container-hover-9.webp`

3. **Sweet Boxes**
   - `category-sweet-boxes-3.webp`
   - `category-sweet-boxes-hover-10.webp`

4. **Meal Boxes**
   - `category-meal-boxes-4.webp`
   - `category-meal-boxes-hover-11.webp`

5. **Bakery Products**
   - `category-bakery-products-5.webp`
   - `category-bakery-products-hover-12.webp`

6. **Hinge Boxes**
   - `category-hinge-boxes-6.webp`
   - `category-hinge-boxes-hover-13.webp`

7. **Ice Cream Cups & Glasses**
   - `category-ice-cream-cups-glasses-7.webp`
   - `category-ice-cream-cups-glasses-hover-14.webp`

## Usage

Images are referenced in `src/data/categories.json` using the path:
```
/assets/temp/{filename}.webp
```

## Adding/Updating Images

1. Add your new WebP image to this directory
2. Update the `image` field in `src/data/categories.json` with the new filename
3. Ensure images are optimized WebP format for best performance

## Image Format

- **Format**: WebP (for optimal compression and loading)
- **Recommended size**: 800x450px (16:9 aspect ratio) for category cards
- **Optimization**: Use tools like `cwebp` or online converters to ensure optimal file size
