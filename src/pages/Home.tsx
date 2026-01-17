import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Clock,
  Award,
  ArrowRight,
  Truck,
  Factory,
  Users,
  Phone,
  MapPin
} from "lucide-react";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import clientsData from "@/data/clients.json";
import faqData from "@/data/faq.json";
import ProductCard from "@/components/common/ProductCard";
import CategoryCard from "@/components/common/CategoryCard";
import ProductCarouselCard from "@/components/common/ProductCarouselCard";
import BrandCarousel from "@/components/common/BrandCarousel";
import FAQ from "@/components/common/FAQ";
import HowItWorks from "@/components/common/HowItWorks";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import styles from "./css/Home.module.css";
import { cn } from "@/lib/utils";

// Import company constants from config
import { COMPANY_PHONE, COMPANY_WHATSAPP } from "@/config/constants";

const Home = () => {
  const featuredProducts = useMemo(
    () => productsData.products.filter(p => p.featured).slice(0, 6),
    [] // Static data - safe to use empty array
  );

  // Memoize hero products - split into 3 groups for different carousel positions
  // Note: Empty dependency array is safe here because productsData is imported statically
  const allProducts = useMemo(
    () => productsData.products.filter(p => p.featured),
    [] // Static data - safe to use empty array
  );

  // Helper function to distribute products evenly across 3 carousels
  // Each carousel needs at least 2 products to rotate
  const distributeProducts = useMemo(() => {
    if (allProducts.length === 0) return { large: [], small1: [], small2: [] };

    // If we have 3 or more products, distribute them with overlap to ensure rotation
    if (allProducts.length >= 3) {
      // Each carousel gets 2+ products in different orders for variety
      return {
        large: [allProducts[0], allProducts[1], allProducts[2]],
        small1: [allProducts[1], allProducts[2], allProducts[0]],
        small2: [allProducts[2], allProducts[0], allProducts[1]],
      };
    }

    // If we have 2 products, duplicate them in different orders
    if (allProducts.length === 2) {
      return {
        large: [allProducts[0], allProducts[1]],
        small1: [allProducts[1], allProducts[0]],
        small2: [allProducts[0], allProducts[1]],
      };
    }

    // If we only have 1 product, duplicate it for all carousels
    return {
      large: [allProducts[0], allProducts[0]],
      small1: [allProducts[0], allProducts[0]],
      small2: [allProducts[0], allProducts[0]],
    };
  }, [allProducts]);

  // Large card products (first position)
  const largeCardProducts = useMemo(
    () => distributeProducts.large.length > 0 ? distributeProducts.large : allProducts,
    [distributeProducts, allProducts]
  );

  // Small card products (second position)
  const smallCardProducts1 = useMemo(
    () => distributeProducts.small1.length > 0 ? distributeProducts.small1 : allProducts,
    [distributeProducts, allProducts]
  );

  // Small card products (third position)
  const smallCardProducts2 = useMemo(
    () => distributeProducts.small2.length > 0 ? distributeProducts.small2 : allProducts,
    [distributeProducts, allProducts]
  );

  // Memoize categories for consistency
  // Note: Empty dependency array is safe here because categoriesData is imported statically
  const categories = useMemo(() => categoriesData.categories, []); // Static data - safe to use empty array

  return (
    <div className={styles.pageContainer}>
      {/* Hero Section - Product-Focused Redesign */}
      <section className={styles.heroSection} aria-label="Hero section">
        <div className={cn(styles.container, styles.heroContainer)}>
          <div className={styles.heroGrid}>
            {/* Left Column - Content */}
            <div className={styles.heroContent}>
              {/* Regional Badge */}
              <Badge
                variant="secondary"
                className={styles.regionalBadge}
              >
                <MapPin className={styles.iconSmall} aria-hidden="true" />
                Proudly Made in India
              </Badge>

              {/* Main Heading */}
              <h1 className={styles.mainHeading}>
                <span className={styles.mainHeadingBlock}>
                  Premium Plastic Containers
                </span>
                <span className={styles.mainHeadingGradient}>
                  That Keep Your Products Fresh & Safe
                </span>
              </h1>

              {/* Subtitle */}
              <p className={styles.subtitle}>
                Quality containers for food, storage, and industry. Custom sizes, bulk pricing, and fast delivery across North India.
              </p>

              {/* CTA Buttons */}
              <div className={styles.ctaButtons}>
                <Button
                  asChild
                  size="lg"
                  className={styles.primaryButton}
                  aria-label="Explore our product catalog"
                >
                  <Link to="/categories">
                    Explore Our Products
                    <ArrowRight className={styles.iconLarge} aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className={styles.outlineButton}
                  aria-label="Request a custom quote"
                >
                  <Link to="/quote">Get Custom Quote</Link>
                </Button>
              </div>
            </div>

            {/* Right Column - Product Showcase with Carousels */}
            <div className={styles.heroProducts}>
              <div className={styles.productGrid}>
                {/* Large Card Carousel */}
                <div className={styles.productCardLarge}>
                  <ProductCarouselCard
                    products={largeCardProducts}
                    cardSize="large"
                    interval={4500}
                    startDelay={0}
                  />
                </div>
                {/* Small Card Carousel - First */}
                <div className={styles.productCardSmall}>
                  <ProductCarouselCard
                    products={smallCardProducts1}
                    cardSize="small"
                    interval={4000}
                    startDelay={1500}
                  />
                </div>
                {/* Small Card Carousel - Second */}
                <div className={styles.productCardSmall}>
                  <ProductCarouselCard
                    products={smallCardProducts2}
                    cardSize="small"
                    interval={4200}
                    startDelay={3000}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollIndicatorInner}>
            <div className={styles.scrollIndicatorDot}></div>
          </div>
        </div>
      </section>

      {/* Brand Carousel Section */}
      <BrandCarousel clients={clientsData.clients} />

      {/* Categories Section */}
      <section className={styles.categoriesSection} aria-label="Product categories">
        <div className={styles.container}>
          <div className={styles.categoriesHeader}>
            <Badge variant="outline" className={styles.badge}>
              Our Product Range
            </Badge>
            <h2 className={styles.categoriesTitle}>
              Explore by Category
            </h2>
            <p className={styles.categoriesSubtitle}>
              Discover our comprehensive range of packaging solutions for every need
            </p>
          </div>

          <div className={styles.categoriesGrid}>
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.featuredSection} aria-label="Featured products">
        <div className={styles.container}>
          <div className={styles.featuredHeader}>
            <div>
              <Badge variant="outline" className={styles.badge}>
                Best Sellers
              </Badge>
              <h2 className={styles.featuredTitle}>Featured Products</h2>
              <p className={styles.featuredSubtitle}>
                Handpicked selection of our most popular and high-quality products
              </p>
            </div>
            <Button asChild variant="outline" size="lg" className="focus-ring">
              <Link to="/categories">
                View All Products
                <ArrowRight className={styles.iconMedium} aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className={styles.featuredGrid}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - New */}
      <HowItWorks
        title="How It Works"
        subtitle="Simple process from inquiry to delivery"
      />

      {/* FAQ Section - New */}
      <FAQ
        faqs={faqData.faqs}
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our products and services"
      />

      {/* CTA Section - Enhanced with WhatsApp and Phone */}
      <section className={styles.ctaSection} aria-label="Call to action">
        <div className={styles.ctaDecorative1} aria-hidden="true"></div>
        <div className={styles.ctaDecorative2} aria-hidden="true"></div>

        <div className={cn(styles.container, styles.ctaContent)}>
          <div className={styles.ctaInner}>
            <Badge variant="secondary" className={styles.badge}>
              Get Started Today
            </Badge>
            <h2 className={styles.ctaTitle}>
              Ready to Transform Your Packaging?
            </h2>
            <p className={styles.ctaSubtitle}>
              Get a free quote today. Let's discuss your requirements and find the perfect solution for your business needs.
            </p>
            <div className={styles.ctaButtonsContainer}>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className={styles.ctaPrimaryButton}
                aria-label="Request a quote"
              >
                <Link to="/quote">
                  Request a Quote
                  <ArrowRight className={styles.iconLarge} aria-hidden="true" />
                </Link>
              </Button>
              <WhatsAppButton
                phoneNumber={COMPANY_WHATSAPP}
                message="Hello, I'm interested in your plastic containers. Please share more details."
                variant="inline"
                size="lg"
                className={styles.ctaWhatsAppButton}
              />
              <Button
                asChild
                size="lg"
                variant="outline"
                className={styles.ctaOutlineButton}
                aria-label="Call us"
              >
                <a href={`tel:${COMPANY_PHONE}`}>
                  <Phone className={cn(styles.iconLarge, styles.iconRight)} aria-hidden="true" />
                  Call Now
                </a>
              </Button>
            </div>

            {/* Trust indicators - Enhanced */}
            <div className={styles.trustIndicators}>
              <div className={styles.trustIndicatorsInner}>
                <div className={styles.trustIndicator}>
                  <CheckCircle className={styles.trustIcon} aria-hidden="true" />
                  <span>Free Consultation</span>
                </div>
                <div className={styles.trustIndicator}>
                  <Clock className={styles.trustIcon} aria-hidden="true" />
                  <span>Quick Response</span>
                </div>
                <div className={styles.trustIndicator}>
                  <Award className={styles.trustIcon} aria-hidden="true" />
                  <span>Expert Support</span>
                </div>
                <div className={styles.trustIndicator}>
                  <MapPin className={styles.trustIcon} aria-hidden="true" />
                  <span>Serving India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton
        phoneNumber={COMPANY_WHATSAPP}
        message="Hello, I'm interested in your plastic containers. Please share more details."
        variant="floating"
      />
    </div>
  );
};

export default Home;
