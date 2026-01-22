import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import OptimizedImage from "./OptimizedImage";
import styles from "../css/RelatedProductCard.module.css";

interface RelatedProductCardProps {
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

const RelatedProductCard = ({ product }: RelatedProductCardProps) => {
  return (
    <Link to={`/products/${product.slug}`}>
      <Card className={styles.relatedCard}>
        {/* Image Section - Left Half */}
        <div className={styles.imageSection}>
          <OptimizedImage
            src={product.images[0]}
            alt={`${product.name}${product.material && product.material.trim() !== "" ? ` - ${product.material} container` : " container"}`}
            className={styles.relatedImage}
            loading="lazy"
          />
        </div>

        {/* Content Section - Right Half */}
        <CardContent className={styles.contentSection}>
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

          <h3 className={styles.productTitle}>
            {product.name}
          </h3>

          <p className={styles.sku}>SKU: {product.sku}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RelatedProductCard;
