import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    slug: string;
    description: string;
    product_count: number;
    image: string;
  };
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/products?category=${category.slug}`}>
      <Card className="product-card group">
        <div className="aspect-video overflow-hidden bg-secondary">
          <img
            src={category.image}
            alt={`${category.name} category`}
            className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
            loading="lazy"
          />
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-accent smooth-transition">
            {category.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {category.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {category.product_count} products
            </span>
            <ArrowRight className="h-5 w-5 text-accent group-hover:translate-x-1 smooth-transition" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
