import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import OptimizedImage from "./OptimizedImage";
import styles from "../css/CategoryCard.module.css";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    slug: string;
    description: string;
    product_count: number;
    image: string;
    hover_image?: string;
  };
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/categories?category=${category.slug}`}>
      <Card className={styles.categoryCard}>
        <div className={styles.imageContainer}>
          <OptimizedImage
            src={category.image}
            alt={`${category.name} category`}
            className={styles.categoryImage}
            loading="lazy"
          />
          {category.hover_image && (
            <OptimizedImage
              src={category.hover_image}
              alt={`${category.name} category hover`}
              className={styles.categoryImageHover}
              loading="lazy"
            />
          )}
        </div>
        <CardContent className={styles.cardContent}>
          <div className={styles.headerRow}>
            <h3 className={styles.categoryTitle}>
              {category.name}
            </h3>
            <div className={styles.iconButton}>
              <ArrowRight className={styles.icon} />
            </div>
          </div>
          <p className={styles.description}>
            {category.description}
          </p>
          <div className={styles.footer}>
            <span className={styles.productCount}>
              {category.product_count} Products
            </span>
            <span className={styles.exploreText}>
              Explore →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
