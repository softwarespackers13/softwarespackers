import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Package } from "lucide-react";
import productsData from "@/data/products.json";
import RelatedProductCard from "@/components/common/RelatedProductCard";
import OptimizedImage from "@/components/common/OptimizedImage";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { COMPANY_WHATSAPP } from "@/config/constants";
import styles from "./css/ProductDetail.module.css";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { slug } = useParams();
  const product = productsData.products.find((p) => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyStateContent}>
          <h1 className={styles.emptyStateTitle}>Product not found</h1>
          <Button asChild>
            <Link to="/categories">
              <ArrowLeft className={styles.iconMedium} />
              Back to Categories
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

  const relatedProducts = productsData.products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Button asChild variant="ghost" className="focus-ring">
            <Link to="/categories">
              <ArrowLeft className={styles.iconMedium} />
              Back to Categories
            </Link>
          </Button>
        </div>

        {/* Product Hero */}
        <div className={styles.productHero}>
          {/* Images */}
          <div className={styles.imagesContainer}>
            <OptimizedImage
              src={product.images[selectedImage]}
              alt={`${product.name} - view ${selectedImage + 1}`}
              className={styles.mainImage}
              loading="eager"
            />
            {product.images.length > 1 && (
              <div className={styles.thumbnailContainer}>
                {product.images.map((img, idx) => (
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
              {product.material && product.material.trim() !== "" && (
                <Badge variant="secondary">{product.material}</Badge>
              )}
              <Badge variant="outline">{product.category}</Badge>
            </div>

            <h1 className={styles.productTitle}>{product.name}</h1>
            <p className={styles.sku}>SKU: {product.sku}</p>
            <p className={styles.shortDescription}>{product.short_description}</p>

            {/* Quick Specs */}
            <Card className={styles.specsCard}>
              <CardContent className="p-6">
                <h3 className={styles.specsTitle}>
                  <Package className={styles.iconLarge} />
                  Key Specifications
                </h3>
                <div className={styles.specsGrid}>
                  {product.capacity_ml > 0 && (
                    <div>
                      <p className={styles.specLabel}>Capacity</p>
                      <p className={styles.specValue}>
                        {product.capacity_ml >= 1000
                          ? `${product.capacity_ml / 1000} L`
                          : `${product.capacity_ml} ml`}
                      </p>
                    </div>
                  )}
                  {product.material && product.material.trim() !== "" && (
                    <div>
                      <p className={styles.specLabel}>Material</p>
                      <p className={styles.specValue}>{product.material}</p>
                    </div>
                  )}
                  {product.dimensions_mm && Object.keys(product.dimensions_mm).length > 0 && (
                    <div>
                      <p className={styles.specLabel}>Dimensions</p>
                      <p className={styles.specValue}>
                        {(() => {
                          const dims = product.dimensions_mm as { dia?: number; length?: number; height?: number };
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
                    <p className={styles.specValue}>{product.colors.join(", ")}</p>
                  </div>
                  <div>
                    <p className={styles.specLabel}>Packing</p>
                    <p className={styles.specValue}>{product.packing}</p>
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
                <Link to={`/quote?product=${product.slug}`}>Add to Quote</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className={styles.tabsContainer}>
          <Card>
            <CardContent className={styles.tabCard}>
              <h3 className={styles.specsTitle}>Description</h3>
              <p className={styles.descriptionText}>{product.long_description}</p>
            </CardContent>
          </Card>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className={styles.relatedSection}>
            <h2 className={styles.relatedTitle}>Related Products</h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((product) => (
                <RelatedProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Floating WhatsApp Button */}
      <WhatsAppButton
        phoneNumber={COMPANY_WHATSAPP}
        message={`Hello, I'm interested in ${product.name}. Please share more details.`}
        variant="floating"
      />
    </div>
  );
};

export default ProductDetail;
