/**
 * Product grouping utilities
 * Groups products that are variants of the same base product (different sizes)
 * Uses manual configuration from productGroups.json
 */

export interface ProductGroupConfig {
  id: string;
  displayName: string;
  baseSlug: string;
  productIds: string[];
}

export interface ProductGroupsConfig {
  productGroups: ProductGroupConfig[];
  standaloneProducts: string[]; // Product IDs that should never be grouped
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  slug: string;
  category: string;
  material: string;
  capacity_ml: number;
  dimensions_mm: Record<string, unknown>;
  colors: string[];
  images: string[];
  short_description: string;
  long_description: string;
  packing: string;
  datasheet_url: string | null;
  tags: string[];
  featured: boolean;
}

export interface GroupedProduct {
  id: string;
  baseName: string;
  baseSlug: string;
  variants: Product[];
  // Representative product (first variant or smallest size)
  representative: Product;
  // Size range info
  sizeRange: {
    min: number;
    max: number;
    capacities: number[];
  };
}

/**
 * Extracts the base name from a product name by removing size/capacity indicators
 * Examples:
 * - "Mini Sweet Box 250" -> "Mini Sweet Box"
 * - "Sweet Box 400 ML" -> "Sweet Box"
 * - "Round Container 500ml" -> "Round Container"
 */
function getBaseProductName(productName: string): string {
  // Remove common size patterns: numbers, ml, ML, L, capacity indicators
  let baseName = productName
    .replace(/\s*\d+\s*(ml|ML|L|l)\s*/gi, '') // Remove "250ml", "500 ML", etc.
    .replace(/\s*\d+\s*/g, '') // Remove standalone numbers
    .replace(/\s*-\s*\d+\s*/g, '') // Remove "-250", "-500", etc.
    .trim();

  // If the name ends with common size words, remove them
  baseName = baseName.replace(/\s+(ml|ML|L|l|size|Size)$/gi, '').trim();

  return baseName || productName; // Fallback to original if nothing left
}

/**
 * Groups products using manual configuration from productGroups.json
 * Only products specified in the config will be grouped
 */
export function groupProductsByConfig(
  products: Product[],
  config: ProductGroupsConfig
): GroupedProduct[] {
  const groupedProducts: GroupedProduct[] = [];
  const productMap = new Map<string, Product>();
  
  // Create a map for quick product lookup
  products.forEach((product) => {
    productMap.set(product.id, product);
  });

  // Process each group from config
  config.productGroups.forEach((groupConfig) => {
    const variants: Product[] = [];
    
    // Collect all variants for this group
    groupConfig.productIds.forEach((productId) => {
      const product = productMap.get(productId);
      if (product) {
        variants.push(product);
      }
    });

    // Only create group if we have at least 2 variants
    if (variants.length >= 2) {
      // Sort variants by capacity (smallest first)
      const sortedVariants = [...variants].sort((a, b) => {
        if (a.capacity_ml !== b.capacity_ml) {
          return a.capacity_ml - b.capacity_ml;
        }
        // If same capacity, sort by name
        return a.name.localeCompare(b.name);
      });

      const capacities = sortedVariants
        .map((v) => v.capacity_ml)
        .filter((cap) => cap > 0);

      const sizeRange = {
        min: capacities.length > 0 ? Math.min(...capacities) : 0,
        max: capacities.length > 0 ? Math.max(...capacities) : 0,
        capacities: [...new Set(capacities)].sort((a, b) => a - b),
      };

      // Use the first variant (smallest) as representative
      const representative = sortedVariants[0];

      groupedProducts.push({
        id: groupConfig.id,
        baseName: groupConfig.displayName,
        baseSlug: groupConfig.baseSlug,
        variants: sortedVariants,
        representative,
        sizeRange,
      });
    }
  });

  return groupedProducts;
}

/**
 * Gets all products that should be displayed (grouped or standalone)
 * Returns products with grouping metadata
 */
export function getDisplayProducts(
  products: Product[],
  config: ProductGroupsConfig
): Array<Product & {
  _isGrouped?: boolean;
  _groupSizeRange?: GroupedProduct['sizeRange'];
  _baseSlug?: string;
  _displayName?: string;
  _variants?: Product[];
}> {
  const grouped = groupProductsByConfig(products, config);
  const groupedProductIds = new Set<string>();
  const standaloneProductIds = new Set(config.standaloneProducts);
  
  // Collect all product IDs that are in groups
  grouped.forEach((group) => {
    group.variants.forEach((variant) => {
      groupedProductIds.add(variant.id);
    });
  });

  const displayProducts: Array<Product & {
    _isGrouped?: boolean;
    _groupSizeRange?: GroupedProduct['sizeRange'];
    _baseSlug?: string;
    _displayName?: string;
    _variants?: Product[];
  }> = [];

  // Add grouped products (one per group)
  grouped.forEach((group) => {
    displayProducts.push({
      ...group.representative,
      _isGrouped: true,
      _groupSizeRange: group.sizeRange,
      _baseSlug: group.baseSlug,
      _displayName: group.baseName,
      _variants: group.variants,
    });
  });

  // Add standalone products (not in any group and not marked as standalone-only)
  products.forEach((product) => {
    if (!groupedProductIds.has(product.id) && !standaloneProductIds.has(product.id)) {
      displayProducts.push({
        ...product,
        _isGrouped: false,
      });
    }
  });

  return displayProducts;
}

/**
 * Checks if a product is part of a group (has variants)
 */
export function isGroupedProduct(
  product: Product,
  groupedProducts: GroupedProduct[]
): boolean {
  const baseName = getBaseProductName(product.name);
  const group = groupedProducts.find((g) => g.baseName === baseName);
  return group ? group.variants.length > 1 : false;
}

/**
 * Gets the group for a specific product by ID
 */
export function getProductGroupById(
  productId: string,
  groupedProducts: GroupedProduct[]
): GroupedProduct | null {
  return groupedProducts.find((g) => 
    g.variants.some((v) => v.id === productId)
  ) || null;
}

/**
 * Gets the group for a specific product (by product object or slug)
 */
export function getProductGroup(
  product: Product | string,
  groupedProducts: GroupedProduct[]
): GroupedProduct | null {
  if (typeof product === 'string') {
    // If product is a slug, find by slug
    return groupedProducts.find((g) => 
      g.baseSlug === product || g.variants.some((v) => v.slug === product)
    ) || null;
  }
  // Otherwise find by product ID
  return getProductGroupById(product.id, groupedProducts);
}

/**
 * Extracts size from product name (e.g., "7\"" from "7\" Cake Container" or "80H" from "PET Round 80H")
 */
export function extractSizeFromName(productName: string): string | null {
  // Match patterns like: 7", 9", 7 inch, 9 inch, etc.
  const inchMatch = productName.match(/(\d+(?:\.\d+)?)\s*(?:inch|"|in)/i);
  if (inchMatch) {
    return `${inchMatch[1]}"`;
  }
  
  // Match height patterns like: 45H, 63H, 80H (height in mm)
  const heightMatch = productName.match(/(\d+)\s*H\b/i);
  if (heightMatch) {
    return `${heightMatch[1]}H`;
  }
  
  return null;
}

/**
 * Formats capacity for display
 */
export function formatCapacity(capacity: number): string {
  if (capacity >= 1000) {
    return `${capacity / 1000}L`;
  }
  return `${capacity}ml`;
}

/**
 * Formats variant display (capacity or size)
 */
export function formatVariantDisplay(product: Product): string {
  if (product.capacity_ml > 0) {
    return formatCapacity(product.capacity_ml);
  }
  const size = extractSizeFromName(product.name);
  return size || product.name;
}

/**
 * Formats size range for display
 * Handles both capacity-based and size-based products
 */
export function formatSizeRange(
  sizeRange: GroupedProduct['sizeRange'],
  variants?: Product[]
): string {
  // If we have capacities, use them
  if (sizeRange.capacities.length > 0) {
    if (sizeRange.capacities.length === 1) {
      return formatCapacity(sizeRange.capacities[0]);
    }
    return `${formatCapacity(sizeRange.min)} - ${formatCapacity(sizeRange.max)}`;
  }
  
  // If no capacities but we have variants, extract sizes from names
  if (variants && variants.length > 0) {
    const sizes = variants
      .map(v => extractSizeFromName(v.name))
      .filter((size): size is string => size !== null);
    
    if (sizes.length > 0) {
      if (sizes.length === 1) {
        return sizes[0];
      }
      // Sort sizes numerically
      const sortedSizes = sizes.sort((a, b) => {
        const numA = parseFloat(a.replace('"', ''));
        const numB = parseFloat(b.replace('"', ''));
        return numA - numB;
      });
      return `${sortedSizes[0]} - ${sortedSizes[sortedSizes.length - 1]}`;
    }
  }
  
  return '';
}
