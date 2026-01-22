import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import OptimizedImage from "./OptimizedImage";
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
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/products/${product.slug}`}>
      <Card className={styles.productCard}>
        <div className={styles.imageContainer}>
          <OptimizedImage
            src={product.images[0]}
            alt={`${product.name}${product.material && product.material.trim() !== "" ? ` - ${product.material} container` : " container"}`}
            className={styles.productImage}
            loading="lazy"
          />
          {/* Gradient overlay on hover */}
          <div className={styles.gradientOverlay}></div>
        </div>
        <CardContent className={styles.cardContent}>
          <div className={styles.badgesContainer}>
            {product.material && product.material.trim() !== "" && (
              <Badge variant="secondary" className={styles.badge}>
                {product.material}
              </Badge>
            )}
            {product.capacity_ml > 0 && (
              <Badge variant="outline" className={styles.badge}>
                {product.capacity_ml >= 1000
                  ? `${product.capacity_ml / 1000}L`
                  : `${product.capacity_ml}ml`}
              </Badge>
            )}
          </div>

          <div className={styles.headerRow}>
            <h3 className={styles.productTitle}>
              {product.name}
            </h3>
            <div className={styles.iconButton}>
              <ArrowRight className={styles.icon} />
            </div>
          </div>

          <p className={styles.description}>
            {product.short_description}
          </p>

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
