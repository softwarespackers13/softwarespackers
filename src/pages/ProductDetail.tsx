import { useState, useMemo, useEffect } from "react";
import { useParams, Link, useSearchParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Package } from "lucide-react";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import RelatedProductCard from "@/components/common/RelatedProductCard";
import OptimizedImage from "@/components/common/OptimizedImage";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { COMPANY_WHATSAPP } from "@/config/constants";
import { groupProductsByConfig, getProductGroup, formatCapacity, formatVariantDisplay, type Product, type GroupedProduct } from "@/lib/productUtils";
import styles from "./css/ProductDetail.module.css";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  
  // Group all products using config
  const allGroupedProducts = useMemo(() => {
    return groupProductsByConfig(productsData.products as Product[], {
      productGroups: productsData.productGroups || [],
      standaloneProducts: productsData.standaloneProducts || []
    });
  }, []);

  // Find product - check if slug matches a base slug or individual product slug
  const product = useMemo(() => {
    // First try to find by exact slug
    let found = productsData.products.find((p) => p.slug === slug) as Product | undefined;
    
    // If not found, check if it's a base slug
    if (!found) {
      const group = allGroupedProducts.find((g) => g.baseSlug === slug);
      if (group) {
        found = group.representative;
      }
    }
    
    return found;
  }, [slug, allGroupedProducts]);

  // Get product group if this product is part of a group
  const productGroup = useMemo(() => {
    if (!product) return null;
    return getProductGroup(product, allGroupedProducts);
  }, [product, allGroupedProducts]);

  // Always show the representative product (variants are just for info display)
  const displayProduct = useMemo(() => {
    return productGroup?.representative || product;
  }, [productGroup, product]);

  const [selectedImage, setSelectedImage] = useState(0);

  if (!product || !displayProduct) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyStateContent}>
          <h1 className={styles.emptyStateTitle}>Product not found</h1>
          <Button asChild>
            <Link to="/categories">
              <ArrowLeft className={styles.iconMedium} />
              Back to Products
            </Link>
          </Button>
        </div>
        {/* Floating WhatsApp Button */}
        <WhatsAppButton
          phoneNumber={COMPANY_WHATSAPP}
          message="Hello, I'm interested in your plastic containers. Please share more details."
          variant="floating"
        />
      </div>
    );
  }


  // Determine which category to use for backlink
  // Priority: 1) URL param (from), 2) Product's category, 3) Default to categories
  const backLink = useMemo(() => {
    // Check if category was passed via URL param (from query string)
    const fromCategory = searchParams.get('from');
    if (fromCategory) {
      return `/categories?category=${fromCategory}`;
    }
    
    // Check if we came from a category page (via referrer or state)
    const referrer = document.referrer;
    if (referrer.includes('/categories?category=')) {
      const match = referrer.match(/category=([^&]+)/);
      if (match) {
        return `/categories?category=${match[1]}`;
      }
    }
    
    // Fallback to product's category
    const category = categoriesData.categories.find(
      (cat) => cat.name === displayProduct.category
    );
    return category?.slug ? `/categories?category=${category.slug}` : "/categories";
  }, [searchParams, displayProduct.category]);

  // Get related products (excluding variants of the same product)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    
    const baseName = productGroup?.baseName || product.name;
    const excludedIds = productGroup?.variants.map(v => v.id) || [product.id];
    
    return productsData.products
      .filter((p) => {
        // Exclude variants of the same product
        if (excludedIds.includes(p.id)) return false;
        
        // Get base name for comparison
        const pGroup = getProductGroup(p as Product, allGroupedProducts);
        const pBaseName = pGroup?.baseName || p.name;
        
        // Include if same category and different base name
        return p.category === product.category && pBaseName !== baseName;
      })
      .slice(0, 3) as Product[];
  }, [product, productGroup, allGroupedProducts]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Button asChild variant="ghost" className={cn("focus-ring", styles.backButton)}>
            <Link to={backLink}>
              <ArrowLeft className={styles.iconMedium} />
              Back to Products
            </Link>
          </Button>
        </div>

        {/* Product Hero */}
        <div className={styles.productHero}>
          {/* Images */}
          <div className={styles.imagesContainer}>
            <OptimizedImage
              src={displayProduct.images[selectedImage]}
              alt={`${displayProduct.name} - view ${selectedImage + 1}`}
              className={styles.mainImage}
              loading="eager"
            />
            {displayProduct.images.length > 1 && (
              <div className={styles.thumbnailContainer}>
                {displayProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={cn(
                      styles.thumbnail,
                      "focus-ring",
                      selectedImage === idx ? styles.thumbnailActive : styles.thumbnailInactive
                    )}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <OptimizedImage
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className={styles.thumbnailImage}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className={styles.infoContainer}>
            <div className={styles.badgesContainer}>
              {displayProduct.material && displayProduct.material.trim() !== "" && (
                <Badge variant="secondary">{displayProduct.material}</Badge>
              )}
              <Badge variant="outline">{displayProduct.category}</Badge>
            </div>

            <h1 className={styles.productTitle}>
              {productGroup && productGroup.variants.length > 1 
                ? productGroup.baseName 
                : displayProduct.name}
            </h1>
            
            {/* Size Variants Info (Not Selectable) */}
            {productGroup && productGroup.variants.length > 1 && (
              <div className={styles.sizeInfo}>
                <p className={styles.sizeInfoLabel}>Available Sizes:</p>
                <div className={styles.sizeList}>
                  {productGroup.variants.map((variant) => (
                    <div key={variant.id} className={styles.sizeBadge}>
                      {formatVariantDisplay(variant)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p className={styles.sku}>SKU: {displayProduct.sku}</p>
            <p className={styles.shortDescription}>{displayProduct.short_description}</p>

            {/* Quick Specs */}
            <Card className={styles.specsCard}>
              <CardContent className="p-6">
                <h3 className={styles.specsTitle}>
                  <Package className={styles.iconLarge} />
                  Key Specifications
                </h3>
                <div className={styles.specsGrid}>
                  {displayProduct.capacity_ml > 0 && (
                    <div>
                      <p className={styles.specLabel}>Capacity</p>
                      <p className={styles.specValue}>
                        {displayProduct.capacity_ml >= 1000
                          ? `${displayProduct.capacity_ml / 1000} L`
                          : `${displayProduct.capacity_ml} ml`}
                      </p>
                    </div>
                  )}
                  {displayProduct.material && displayProduct.material.trim() !== "" && (
                    <div>
                      <p className={styles.specLabel}>Material</p>
                      <p className={styles.specValue}>{displayProduct.material}</p>
                    </div>
                  )}
                  {displayProduct.dimensions_mm && Object.keys(displayProduct.dimensions_mm).length > 0 && (
                    <div>
                      <p className={styles.specLabel}>Dimensions</p>
                      <p className={styles.specValue}>
                        {(() => {
                          const dims = displayProduct.dimensions_mm as { dia?: number; length?: number; height?: number };
                          const parts: string[] = [];
                          if (dims.dia) parts.push(`Ø${dims.dia}mm`);
                          if (dims.length) parts.push(`${dims.length}mm`);
                          if (dims.height) parts.push(`${dims.height}mm`);
                          return parts.join(' × ');
                        })()}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className={styles.specLabel}>Colors</p>
                    <p className={styles.specValue}>{displayProduct.colors.join(", ")}</p>
                  </div>
                  <div>
                    <p className={styles.specLabel}>Packing</p>
                    <p className={styles.specValue}>{displayProduct.packing}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTAs */}
            <div className={styles.ctaButtons}>
              <Button size="lg" className={cn(styles.buttonFull, "focus-ring")}>
                Request Sample
              </Button>
              <Button asChild size="lg" variant="outline" className={cn(styles.buttonFull, "focus-ring")}>
                <Link to={`/quote?product=${displayProduct.slug}`}>Add to Quote</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className={styles.tabsContainer}>
          <Card>
            <CardContent className={styles.tabCard}>
              <h3 className={styles.specsTitle}>Description</h3>
              <p className={styles.descriptionText}>{displayProduct.long_description}</p>
            </CardContent>
          </Card>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className={styles.relatedSection}>
            <h2 className={styles.relatedTitle}>Related Products</h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((product) => {
                const categoryMatch = backLink.match(/category=([^&]+)/);
                const categorySlug = categoryMatch ? categoryMatch[1] : undefined;
                return (
                  <RelatedProductCard 
                    key={product.id} 
                    product={product}
                    currentCategorySlug={categorySlug}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
      {/* Floating WhatsApp Button */}
      <WhatsAppButton
        phoneNumber={COMPANY_WHATSAPP}
        message={`Hello, I'm interested in ${displayProduct.name}. Please share more details.`}
        variant="floating"
      />
    </div>
  );
};

export default ProductDetail;
