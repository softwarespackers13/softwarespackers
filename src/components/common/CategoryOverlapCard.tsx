import { Link } from "react-router-dom";
import OptimizedImage from "./OptimizedImage";
import styles from "../css/CategoryOverlapCard.module.css";

interface CategoryOverlapCardProps {
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

const CategoryOverlapCard = ({
  category,
  variant = "medium"
}: CategoryOverlapCardProps) => {
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

export default CategoryOverlapCard;
