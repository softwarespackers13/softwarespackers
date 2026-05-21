import { Link } from "react-router-dom";
import { ArrowRight, Beaker, Utensils, Gift, Cake, Package, IceCream, Box } from "lucide-react";
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

const categoryDetails: Record<string, { badge: string; description: string; actionText: string; icon: any }> = {
  "pet-container": {
    badge: "Precision Series",
    description: "Ultra-clear polymer vessels designed for pharmaceutical and precision liquid containment.",
    actionText: "Explore Products",
    icon: Beaker
  },
  "meal-boxes": {
    badge: "Food Grade",
    description: "Heat-resistant, stackable containment systems for large-scale institutional hospitality.",
    actionText: "Explore Products",
    icon: Utensils
  },
  "sweet-boxes": {
    badge: "Presentation",
    description: "Premium showcase packaging featuring anti-fog technology for confectionery retail.",
    actionText: "Explore Products",
    icon: Gift
  },
  "bakery-products": {
    badge: "Retail Ready",
    description: "Engineered ventilation and structural integrity for high-turnover baked assets.",
    actionText: "Explore Products",
    icon: Cake
  },
  "hinge-boxes": {
    badge: "Secure Seal",
    description: "Patented single-piece hinge design with secure-snap closure for industrial logistics.",
    actionText: "Explore Products",
    icon: Package
  },
  "ice-cream-cups-glasses": {
    badge: "Thermal Grade",
    description: "Cold-chain optimized polymers designed for sub-zero impact resistance and clarity.",
    actionText: "Explore Products",
    icon: IceCream
  },
  "container": {
    badge: "Versatile Series",
    description: "Versatile containers for various storage and packaging needs.",
    actionText: "Explore Products",
    icon: Box
  }
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  const details = categoryDetails[category.slug] || {
    badge: "Industrial Series",
    description: category.description,
    actionText: "Explore Products",
    icon: Box
  };

  const IconComponent = details.icon;

  return (
    <Link to={`/categories?category=${category.slug}`} className={styles.catCard}>
      <div className={styles.catCardInner}>
        <OptimizedImage
          src={category.image}
          alt={`${category.name} category`}
          className={styles.catImg}
          loading="lazy"
        />
        <div className={styles.catGradient}></div>
        <div className={styles.catContent}>
          <h3 className={styles.catName}>{category.name}</h3>
          <div className={styles.catAction}>
            <span>{details.actionText}</span>
            <ArrowRight className={styles.arrowIcon} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
