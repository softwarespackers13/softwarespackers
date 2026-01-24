import { Link } from "react-router-dom";
import OptimizedImage from "./OptimizedImage";
import styles from "../css/CategoryShowcaseCard.module.css";

interface CategoryShowcaseCardProps {
  category: {
    id: string;
    name: string;
    slug: string;
    description: string;
    product_count: number;
    image: string;
  };
  variant?: "small-report" | "large-blue" | "large-green" | "medium";
}

/**
 * CategoryShowcaseCard - Displays a category image card for hero showcase section
 * 
 * A clickable card component that displays a category image with hover effects.
 * Used in the hero section to showcase product categories in an overlapping layout.
 * 
 * @param category - Category data object
 * @param variant - Visual variant: 'small-report', 'large-blue', 'large-green', or 'medium'
 */
const CategoryShowcaseCard = ({
  category,
  variant = "medium"
}: CategoryShowcaseCardProps) => {
  return (
    <Link
      to={`/categories?category=${category.slug}`}
      className={`${styles.cardLink} ${styles[variant]}`}
    >
      <OptimizedImage
        src={category.image}
        alt={category.name}
        className={styles.categoryImage}
        loading="lazy"
      />
    </Link>
  );
};

export default CategoryShowcaseCard;
