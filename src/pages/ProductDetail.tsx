import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Package, Ruler, CheckCircle } from "lucide-react";
import productsData from "@/data/products.json";
import ProductCard from "@/components/common/ProductCard";
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
              <Badge variant="secondary">{product.material}</Badge>
              <Badge variant="outline">{product.category}</Badge>
              {product.certifications?.map((cert) => (
                <Badge key={cert} variant="outline" className={styles.certificationBadge}>
                  <CheckCircle className={styles.iconSmall} />
                  {cert}
                </Badge>
              ))}
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
                  <div>
                    <p className={styles.specLabel}>Capacity</p>
                    <p className={styles.specValue}>
                      {product.capacity_ml >= 1000
                        ? `${product.capacity_ml / 1000} L`
                        : `${product.capacity_ml} ml`}
                    </p>
                  </div>
                  <div>
                    <p className={styles.specLabel}>Material</p>
                    <p className={styles.specValue}>{product.material}</p>
                  </div>
                  {product.dimensions_mm && Object.keys(product.dimensions_mm).length > 0 && (
                    <div>
                      <p className={styles.specLabel}>Dimensions</p>
                      <p className={styles.specValue}>
                        {(() => {
                          const dims = product.dimensions_mm as { dia?: number; length?: number; height?: number };
                          const parts: string[] = [];
                          if (dims.dia) parts.push(`Ø${dims.dia}mm`);
                          if (dims.length) parts.push(`${dims.length}mm`);
                          if (dims.height) parts.push(`H${dims.height}mm`);
                          return parts.join(' × ');
                        })()}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className={styles.specLabel}>MOQ</p>
                    <p className={styles.specValue}>{product.moq} units</p>
                  </div>
                  <div>
                    <p className={styles.specLabel}>Packing</p>
                    <p className={styles.specValue}>{product.packing}</p>
                  </div>
                  <div>
                    <p className={styles.specLabel}>Price Range</p>
                    <p className={styles.specValue}>{product.price_range}</p>
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
                <Link to="/quote">Add to Quote</Link>
              </Button>
            </div>

            {/* Downloads */}
            <div className={styles.downloadButtons}>
              <Button variant="ghost" size="sm" className="focus-ring">
                <Download className={styles.iconMedium} />
                Technical Datasheet
              </Button>
              <Button variant="ghost" size="sm" className="focus-ring">
                <Download className={styles.iconMedium} />
                Packaging Layout
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className={styles.tabsContainer}>
          <TabsList className={styles.tabsList}>
            <TabsTrigger value="description" className="focus-ring">
              Description
            </TabsTrigger>
            <TabsTrigger value="specs" className="focus-ring">
              Technical Specs
            </TabsTrigger>
            <TabsTrigger value="certifications" className="focus-ring">
              Certifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className={styles.tabContent}>
            <Card>
              <CardContent className={styles.tabCard}>
                <p className={styles.descriptionText}>{product.long_description}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specs" className={styles.tabContent}>
            <Card>
              <CardContent className={styles.tabCard}>
                <div className={styles.specsList}>
                  <div className={styles.specsRow}>
                    <span className={styles.specsLabel}>Material Type</span>
                    <span className={styles.specsValue}>{product.material}</span>
                  </div>
                  <div className={styles.specsRow}>
                    <span className={styles.specsLabel}>Capacity</span>
                    <span className={styles.specsValue}>
                      {product.capacity_ml >= 1000
                        ? `${product.capacity_ml / 1000} L`
                        : `${product.capacity_ml} ml`}
                    </span>
                  </div>
                  <div className={styles.specsRow}>
                    <span className={styles.specsLabel}>Available Colors</span>
                    <span className={styles.specsValue}>{product.colors.join(", ")}</span>
                  </div>
                  <div className={styles.specsRow}>
                    <span className={styles.specsLabel}>Minimum Order</span>
                    <span className={styles.specsValue}>{product.moq} units</span>
                  </div>
                  <div className={cn(styles.specsRow, styles.specsRowLast)}>
                    <span className={styles.specsLabel}>Packing Details</span>
                    <span className={styles.specsValue}>{product.packing}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certifications" className={styles.tabContent}>
            <Card>
              <CardContent className={styles.tabCard}>
                <div className={styles.certificationsList}>
                  {product.certifications?.map((cert) => (
                    <Badge key={cert} variant="outline" className={styles.certificationBadgeLarge}>
                      <CheckCircle className={cn(styles.iconMedium, styles.checkIcon)} />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className={styles.relatedSection}>
            <h2 className={styles.relatedTitle}>Related Products</h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
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
