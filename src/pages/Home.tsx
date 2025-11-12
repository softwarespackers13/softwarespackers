import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Award, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-warehouse.jpg";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import clientsData from "@/data/clients.json";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import HeroCarousel from "@/components/HeroCarousel";

const Home = () => {
  const featuredProducts = productsData.products.filter(p => p.featured).slice(0, 3);
  const categories = categoriesData.categories;

  // Hero carousel images - warehouse and industrial themed backgrounds
  const heroImages = [
    heroImage,
    '/assets/images/category-industrial-crates.jpg',
    '/assets/images/category-storage-tubs.jpg',
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] lg:h-[700px] flex items-center">
        {/* Auto-playing background carousel */}
        <HeroCarousel images={heroImages} interval={6000} />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/70 z-[1]" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Plastic containers engineered for durability & design
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Food-grade jars, storage tubs, crates and custom packaging — large catalogue, fast lead times.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="focus-ring">
                <Link to="/products">
                  View Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="focus-ring">
                <Link to="/quote">Request a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.slug}`}
                className="flex-shrink-0 group"
              >
                <Card className="w-48 hover-lift">
                  <CardContent className="p-4 text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-muted flex items-center justify-center">
                      <span className="text-2xl">{category.icon}</span>
                    </div>
                    <h3 className="font-semibold text-sm mb-1 group-hover:text-accent smooth-transition">
                      {category.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {category.product_count} items
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Popular choices for various industries</p>
            </div>
            <Button asChild variant="outline" className="hidden sm:flex focus-ring">
              <Link to="/products">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">Why Choose Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Materials</h3>
                <p className="text-muted-foreground">
                  Food-grade HDPE, PP, and PET plastics. All products meet international safety standards and certifications.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Custom Molding</h3>
                <p className="text-muted-foreground">
                  In-house design and tooling capabilities. We can customize dimensions, colors, and features to your specifications.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Turnaround</h3>
                <p className="text-muted-foreground">
                  Large inventory of standard items ships within 48 hours. Custom orders completed in 2-4 weeks depending on complexity.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Materials & Compliance */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 items-center">
            <Badge variant="outline" className="text-sm py-2 px-4">HDPE</Badge>
            <Badge variant="outline" className="text-sm py-2 px-4">PP (Polypropylene)</Badge>
            <Badge variant="outline" className="text-sm py-2 px-4">PET</Badge>
            <Badge variant="outline" className="text-sm py-2 px-4">Food Grade Certified</Badge>
            <Badge variant="outline" className="text-sm py-2 px-4">ISO 9001</Badge>
            <Badge variant="outline" className="text-sm py-2 px-4">BPA Free</Badge>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-primary text-primary-foreground overflow-hidden">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to discuss your requirements?</h2>
              <p className="text-lg mb-8 opacity-90">
                Our sales team is ready to help you find the perfect packaging solution
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" variant="secondary" className="focus-ring">
                  <Link to="/quote">Request Quote</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="focus-ring border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
