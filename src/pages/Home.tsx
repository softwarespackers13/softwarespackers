import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Clock,
  Award,
  ArrowRight,
  Phone,
  MapPin
} from "lucide-react";
import categoriesData from "@/data/categories.json";
import clientsData from "@/data/clients.json";
import CategoryCard from "@/components/common/CategoryCard";
import CategoryShowcaseCard from "@/components/common/CategoryShowcaseCard";
import BrandCarousel from "@/components/common/BrandCarousel";
import IndustriesCarousel from "@/components/common/IndustriesCarousel";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { useScrollFade } from "@/hooks/use-scroll-fade";
import styles from "./css/Home.module.css";
import { cn } from "@/lib/utils";

// Import company constants from config
import { COMPANY_PHONE, COMPANY_WHATSAPP } from "@/config/constants";

const Home = () => {
  const [currentIndustry, setCurrentIndustry] = useState("Bakery");
  const [isIndustryChanging, setIsIndustryChanging] = useState(false);

  const brandCarouselFade = useScrollFade();
  const industriesFade = useScrollFade();
  const aboutUsFade = useScrollFade();
  const ctaFade = useScrollFade();

  // Memoize categories for consistency
  // Note: Empty dependency array is safe here because categoriesData is imported statically
  const categories = useMemo(() => categoriesData.categories, []); // Static data - safe to use empty array

  // Get first 5 categories for showcase layout
  const showcaseCategories = useMemo(() => {
    const cats = categories.slice(0, 5);
    // If we have fewer than 5, cycle through available categories
    while (cats.length < 5 && categories.length > 0) {
      cats.push(...categories.slice(0, 5 - cats.length));
    }
    return cats.slice(0, 5);
  }, [categories]);

  return (
    <div className={styles.pageContainer}>
      {/* Hero Section - Product-Focused Redesign */}
      <section className={styles.heroSection} aria-label="Hero section">
        <div className={cn(styles.container, styles.heroContainer)}>
          <div className={styles.heroGrid}>
            {/* Left Column - Content */}
            <div className={styles.heroContent}>

              {/* Main Heading */}
              <h1 className={styles.mainHeading}>
                <span className={styles.mainHeadingBlock}>
                  Complete Packaging Solution
                </span>
                <span className={styles.mainHeadingBlock}>
                  Under One Roof
                </span>

              </h1>

              {/* Subtitle */}
              <p className={styles.subtitle}>
                Quality containers for food, storage, and industry. Custom sizes, bulk pricing, and fast delivery across India
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

            {/* Right Column - Category Showcase with Dynamic Layout */}
            <div className={styles.heroProducts}>
              <div className={styles.showcaseContainer}>
                {/* Card 1: Small report preview card - Top-right */}
                {showcaseCategories[0] && (
                  <div className={styles.showcaseCard1}>
                    <CategoryShowcaseCard
                      category={showcaseCategories[0]}
                      variant="small-report"
                    />
                  </div>
                )}
                {/* Card 2: Large blue visualization card - Upper-middle, most prominent */}
                {showcaseCategories[1] && (
                  <div className={styles.showcaseCard2}>
                    <CategoryShowcaseCard
                      category={showcaseCategories[1]}
                      variant="large-blue"
                    />
                  </div>
                )}
                {/* Card 3: Large green grid/chart card - Middle-right */}
                {showcaseCategories[2] && (
                  <div className={styles.showcaseCard3}>
                    <CategoryShowcaseCard
                      category={showcaseCategories[2]}
                      variant="large-green"
                    />
                  </div>
                )}
                {/* Card 4: Medium image/photo card - Bottom-left */}
                {showcaseCategories[3] && (
                  <div className={styles.showcaseCard4}>
                    <CategoryShowcaseCard
                      category={showcaseCategories[3]}
                      variant="medium"
                    />
                  </div>
                )}
                {/* Card 5: Medium video/interview card - Bottom-right */}
                {showcaseCategories[4] && (
                  <div className={styles.showcaseCard5}>
                    <CategoryShowcaseCard
                      category={showcaseCategories[4]}
                      variant="medium"
                    />
                  </div>
                )}
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
      <div
        ref={brandCarouselFade.elementRef}
        className={`scroll-fade ${brandCarouselFade.isVisible ? 'visible' : ''}`}
      >
        <BrandCarousel clients={clientsData.clients} />
      </div>

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

      {/* Industries We Serve Section */}
      <section
        ref={industriesFade.elementRef}
        className={`${styles.industriesWeServeSection} scroll-fade ${industriesFade.isVisible ? 'visible' : ''}`}
        aria-label="Industries we serve"
      >
        <IndustriesCarousel
          industries={[
            {
              image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&h=600&fit=crop&q=80",
              name: "Bakeries"
            },
            {
              image: "https://images.unsplash.com/photo-1587241321921-91a834d6d191?w=1200&h=600&fit=crop&q=80",
              name: "Restaurants"
            },
            {
              image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=1200&h=600&fit=crop&q=80",
              name: "Ice-Cream Parlours"
            },
            {
              image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=600&fit=crop&q=80",
              name: "Sweet Shops"
            },
            {
              image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=1200&h=600&fit=crop&q=80",
              name: "Confectionery"
            }
          ]}
          autoPlayInterval={4000}
          onIndustryChange={(name) => {
            setIsIndustryChanging(true);
            setTimeout(() => {
              setCurrentIndustry(name);
              setIsIndustryChanging(false);
            }, 250);
          }}
        />
        <div className={styles.industriesWeServeContent}>
          <div className={styles.industriesWeServeHeader}>
            <h2 className={styles.industriesWeServeTitle}>
              Industries We Serve
            </h2>
            <p className={styles.industriesWeServeSubtitle}>
              Discover our streamlined process from inquiry to delivery, designed to make packaging solutions simple and efficient
            </p>
            <div className={styles.currentIndustry}>
              <span className={`${styles.currentIndustryName} ${isIndustryChanging ? styles.fading : ''}`}>
                {currentIndustry}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section
        ref={aboutUsFade.elementRef}
        className={`${styles.aboutUsSection} scroll-fade ${aboutUsFade.isVisible ? 'visible' : ''}`}
        aria-label="About us"
      >
        <div className={styles.container}>
          <div className={styles.aboutUsContent}>
            {/* Left Column - Image */}
            <div className={styles.aboutUsImageColumn}>
              <div className={styles.aboutUsImageWrapper}>
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=1000&fit=crop&q=80"
                  alt="Modern manufacturing facility"
                  className={styles.aboutUsImage}
                />
              </div>
            </div>

            {/* Right Column - Text and Button */}
            <div className={styles.aboutUsTextColumn}>
              <h2 className={styles.aboutUsTitle}>
                <span>About Us</span>
              </h2>
              <h3 className={styles.aboutUsSubtitle}>
                <span>Premium Plastic Containers & Packaging Solutions in</span>
                <span className={styles.aboutUsTitleHighlight}> India</span>
              </h3>
              <p className={styles.aboutUsDescription}>
                Softwares Packers is a leading manufacturer of premium <strong>plastic containers</strong> and packaging solutions, specializing in food-grade containers, storage solutions, and industrial packaging. We are committed to delivering <strong>quality products</strong> that meet the highest standards for food safety, durability, and functionality. Our comprehensive range includes containers for food service, storage applications, and industrial use, all designed with precision and manufactured using advanced techniques. At Softwares Packers, we focus on providing <strong>complete packaging solutions</strong> that help businesses across various industries thrive. Our dedication to excellence, innovation, and customer satisfaction makes us a trusted partner for all your packaging needs.
              </p>
              <Button
                asChild
                size="lg"
                className={styles.aboutUsButton}
                aria-label="Learn more about us"
              >
                <Link to="/about">Know More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaFade.elementRef}
        className={`${styles.ctaSection} scroll-fade ${ctaFade.isVisible ? 'visible' : ''}`}
        aria-label="Call to action"
      >
        <div className={styles.ctaBackgroundPattern} aria-hidden="true"></div>
        <div className={cn(styles.container, styles.ctaContent)}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaTextWrapper}>
              <h2 className={styles.ctaTitle}>
                Ready to Transform Your Packaging?
              </h2>
              <p className={styles.ctaSubtitle}>
                Get a free quote today and discover how our premium plastic containers can elevate your business. Join thousands of satisfied customers.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Button
                asChild
                size="lg"
                className={styles.ctaPrimaryButton}
                aria-label="Request a quote"
              >
                <Link to="/quote">
                  Request a Quote
                  <ArrowRight className={styles.ctaButtonIcon} aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className={styles.ctaSecondaryButton}
                aria-label="Learn more"
              >
                <Link to="/about">Learn More</Link>
              </Button>
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
