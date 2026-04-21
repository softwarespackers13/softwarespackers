import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import OptimizedImage from "./OptimizedImage";
import { formatSizeRange, type GroupedProduct, type Product } from "@/lib/productUtils";
import styles from "../css/ProductCard.module.css";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    sku: string;
    slug: string;
    category: string;
    material: string;
    capacity_ml: number;
    short_description: string;
    images: string[];
    _isGrouped?: boolean;
    _groupSizeRange?: GroupedProduct['sizeRange'];
    _baseSlug?: string;
    _variants?: Product[];
  };
  currentCategorySlug?: string;
}

const ProductCard = ({ product, currentCategorySlug }: ProductCardProps) => {
  // Use base slug if product is grouped, otherwise use regular slug
  const productSlug = product._baseSlug || product.slug;
  const isGrouped = product._isGrouped && product._groupSizeRange;
  const sizeRange = isGrouped 
    ? formatSizeRange(product._groupSizeRange!, product._variants)
    : null;

  // Build product URL with category info for backlink
  const productUrl = currentCategorySlug 
    ? `/products/${productSlug}?from=${currentCategorySlug}`
    : `/products/${productSlug}`;

  return (
    <Link to={productUrl}>
      <Card className={styles.productCard}>
        <div className={styles.imageContainer}>
          <OptimizedImage
            src={product.images[0]}
            alt={`${product.name}${product.material && product.material.trim() !== "" ? ` - ${product.material} container` : " container"}`}
            className={styles.productImage}
            loading="lazy"
          />
          {product.images[1] && (
            <OptimizedImage
              src={product.images[1]}
              alt={`${product.name}${product.material && product.material.trim() !== "" ? ` - ${product.material} container` : " container"} hover`}
              className={styles.productImageHover}
              loading="lazy"
            />
          )}
        </div>
        <CardContent className={styles.cardContent}>
          <div className={styles.badgesContainer}>
            {product.material && product.material.trim() !== "" && (
              <Badge variant="secondary" className={styles.badge}>
                {product.material}
              </Badge>
            )}
            {isGrouped && sizeRange ? (
              <Badge variant="outline" className={styles.badge}>
                {sizeRange}
              </Badge>
            ) : product.capacity_ml > 0 ? (
              <Badge variant="outline" className={styles.badge}>
                {product.capacity_ml >= 1000
                  ? `${product.capacity_ml / 1000}L`
                  : `${product.capacity_ml}ml`}
              </Badge>
            ) : null}
          </div>

          <div className={styles.headerRow}>
            <h3 className={styles.productTitle}>
              {(product as any)._displayName || product.name}
            </h3>
            <div className={styles.iconButton}>
              <ArrowRight className={styles.icon} />
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.priceInfo}>
              <p className={styles.sku}>SKU: {product.sku}</p>
            </div>
            <span className={styles.viewText}>
              View →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
