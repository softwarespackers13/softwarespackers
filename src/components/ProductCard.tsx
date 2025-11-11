import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

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
    price_range: string;
    images: string[];
    certifications?: string[];
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="product-card group">
      <Link to={`/products/${product.slug}`}>
        <div className="aspect-square overflow-hidden bg-secondary">
          <img
            src={product.images[0]}
            alt={`${product.name} - ${product.material} container`}
            className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
            loading="lazy"
          />
        </div>
      </Link>
      
      <CardContent className="p-4">
        <div className="flex gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.material}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {product.capacity_ml >= 1000 
              ? `${product.capacity_ml / 1000}L` 
              : `${product.capacity_ml}ml`}
          </Badge>
        </div>
        
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-semibold text-lg mb-1 group-hover:text-accent smooth-transition line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-muted-foreground mb-2">SKU: {product.sku}</p>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.short_description}
        </p>
        
        <p className="text-sm font-medium text-foreground">{product.price_range}</p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 gap-2">
        <Button asChild variant="default" className="flex-1 focus-ring">
          <Link to={`/products/${product.slug}`}>
            View Details
          </Link>
        </Button>
        <Button variant="outline" size="icon" className="focus-ring" aria-label="Quick view">
          <Eye className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
