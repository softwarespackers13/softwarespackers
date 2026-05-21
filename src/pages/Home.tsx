import { useMemo, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Check,
  Package,
  Award,
} from "lucide-react";
import categoriesData from "@/data/categories.json";
import clientsData from "@/data/clients.json";
import BrandCarousel from "@/components/common/BrandCarousel";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { useScrollFade } from "@/hooks/use-scroll-fade";
import styles from "./css/Home.module.css";
import { cn } from "@/lib/utils";
import { COMPANY_WHATSAPP } from "@/config/constants";

const Home = () => {
  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);

  const brandCarouselFade = useScrollFade();
  const ctaFade = useScrollFade();

  const categories = useMemo(() => categoriesData.categories, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIdx((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {/* Redesigned Hero Carousel Section */}
      <header className={styles.heroHeader} id="hero-carousel">
        {/* Slide 1: Restaurant Focus - Cluster View */}
        <div className={cn(styles.heroSlide, currentHeroIdx === 0 ? styles.heroSlideActive : styles.heroSlideInactive)}>
          <div className={styles.heroBg}>
            <img alt="Sophisticated restaurant kitchen" className={styles.heroBgImg} src="/assets/temp3/kitchen.webp" />
            <div className={styles.heroGradient}></div>
          </div>
          <div className={styles.heroContentWrapper}>
            <div className={styles.heroGrid}>
              <div className={cn(styles.heroTextCol, currentHeroIdx === 0 ? styles.animateSlideUp : "", styles.delay200)}>
                <h1 className={styles.heroTitle}>Complete Packaging <span className={styles.textPrimaryItalic}>Solutions</span> Under One Roof</h1>
                <div className={styles.heroGlassPanel}>
                  <p className={styles.heroDesc}>
                    High-speed precision for global industry. Our state-of-the-art, ISO-certified facilities ensure unparalleled consistency and performance in every unit produced — trusted by 10,000+ businesses across India.
                  </p>
                </div>
                <p className={styles.heroActionPrompt}>Ready to transform your packaging?</p>
                <div className={styles.heroActions}>
                  <a
                    href={`https://wa.me/${COMPANY_WHATSAPP.replace(/\D/g, '')}?text=${encodeURIComponent("Hello, I'm interested in your packaging solutions. Please share more details.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnPrimary}
                  >
                    <svg className={styles.whatsappIcon} viewBox="0 0 448 512" fill="currentColor">
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                    </svg>
                    Contact Us
                  </a>
                  <Link to="/categories" className={styles.btnSecondaryGlass}>Explore Products</Link>
                </div>
              </div>
              <div className={cn(styles.heroImgCluster, currentHeroIdx === 0 ? styles.animateSlideUp : "", styles.delay400)}>
                <div className={cn(styles.heroFloatingImg, styles.floatDelay0)}>
                  <img alt="Primary packaging unit" className={styles.heroClusterImg} src="/assets/temp3/container.webp" />
                </div>
                <div className={cn(styles.heroFloatingImg, styles.floatDelay2)}>
                  <img alt="Secondary packaging unit" className={styles.heroClusterImg} src="/assets/temp3/container2.webp" />
                </div>
                <div className={cn(styles.heroFloatingImg, styles.floatDelay4)}>
                  <img alt="Complementary product" className={cn(styles.heroClusterImg, styles.width50)} src="/assets/temp3/container3.webp" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2: Process & Infrastructure */}
        <div className={cn(styles.heroSlide, currentHeroIdx === 1 ? styles.heroSlideActive : styles.heroSlideInactive)}>
          <div className={styles.heroBg}>
            <img alt="Industrial automation" className={styles.heroBgImg} src="/assets/temp3/industrial.webp" />
            <div className={styles.heroGradient}></div>
          </div>
          <div className={styles.heroContentWrapper}>
            <div className={styles.heroGrid}>
              <div className={cn(styles.heroTextCol, currentHeroIdx === 1 ? styles.animateSlideUp : "", styles.delay200)}>
                <h1 className={styles.heroTitle}>Four Colours, <span className={styles.textPrimaryItalic}> Infinite</span> Impact</h1>
                <div className={styles.heroGlassPanel}>
                  <p className={styles.heroDesc}>
                    Stand out on every shelf. SWP offers integrated multi-colour printing with up to 4 vibrant colours — so your packaging doesn't just protect your product, it tells your story.
                  </p>
                </div>
                <div className={styles.heroActions}>
                  <Link to="/about" className={styles.btnPrimary}>Explore Facilities</Link>
                  <Link to="/categories" className={styles.btnSecondaryGlass}>Explore Products</Link>
                </div>
              </div>
              <div className={cn(styles.heroImgCluster, currentHeroIdx === 1 ? styles.animateSlideUp : "", styles.delay400)}>
                <div className={cn(styles.heroFloatingImg, styles.floatDelay0)}>
                  <img alt="Advanced packaging printing process line" className={styles.heroClusterImg} src="/assets/home-hero/factory_process.webp" />
                </div>
                <div className={cn(styles.heroFloatingImg, styles.floatDelay2)}>
                  <img alt="Thermoforming packaging production line" className={styles.heroClusterImg} src="/assets/home-hero/factory_thermoform.webp" />
                </div>
                <div className={cn(styles.heroFloatingImg, styles.floatDelay4)}>
                  <img alt="QC scanner scanning food packaging containers" className={cn(styles.heroClusterImg, styles.width50)} src="/assets/home-hero/factory_quality.webp" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 3: Bakery Focus */}
        <div className={cn(styles.heroSlide, currentHeroIdx === 2 ? styles.heroSlideActive : styles.heroSlideInactive)}>
          <div className={styles.heroBg}>
            <img alt="Modern bakery interior" className={styles.heroBgImg} src="/assets/temp3/bakery.webp" />
            <div className={styles.heroGradient}></div>
          </div>
          <div className={styles.heroContentWrapper}>
            <div className={styles.heroGrid}>
              <div className={cn(styles.heroTextCol, currentHeroIdx === 2 ? styles.animateSlideUp : "")}>
                <h1 className={styles.heroTitle}>Freshness, <span className={styles.textPrimaryItalic}>Framed </span>Beautifully</h1>
                <div className={styles.heroGlassPanel}>
                  <p className={styles.heroDesc}>
                    Engineered for the modern palate. Our high-clarity polymer bakery containers provide the perfect stage for cakes, muffins, and confectionery — ensuring extended shelf life through advanced barrier technology. From individual cupcake holders to full display boxes, our 27+ bakery SKUs are built to protect what your hands craft with care.
                  </p>
                </div>
                <div className={styles.heroActions}>
                  <Link to="/categories?category=bakery-products" className={styles.btnPrimary}>Bakery Catalog</Link>
                  <Link to="/categories" className={styles.btnSecondaryGlass}>Explore Products</Link>
                </div>
              </div>
              <div className={cn(styles.heroGridSplit, currentHeroIdx === 2 ? styles.animateSlideUp : "", styles.delay400)}>
                <div className={cn(styles.heroSplitCard, styles.splitDelay1)}>
                  <img alt="Clear container A" className={styles.splitImg75} src="/assets/temp3/container.webp" />
                  <p className={styles.splitLabel}>Vented Solutions</p>
                </div>
                <div className={cn(styles.heroSplitCard, styles.splitDelay3)}>
                  <img alt="Clear container B" className={styles.splitImg75} src="/assets/temp3/container.webp" />
                  <p className={styles.splitLabel}>Stackable Design</p>
                </div>
                <div className={cn(styles.heroSplitCardWide, styles.splitDelay5)}>
                  <img alt="Clear container C" className={styles.splitImgH8} src="/assets/temp3/container.webp" />
                  <div>
                    <p className={styles.splitTitle}>Ultra-Clarity™</p>
                    <p className={styles.splitSub}>Industrial Grade Polymer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.heroIndicators}>
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              aria-label={`Slide ${idx + 1}`}
              className={cn(styles.heroDot, currentHeroIdx === idx ? styles.heroDotActive : "")}
              onClick={() => setCurrentHeroIdx(idx)}
            />
          ))}
        </div>
      </header>
      {/* Browse Categories Section */}
      <section className={styles.catsSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.catsHeader}>
            <div>
              <h2 className={styles.catsTitle}>
                Product <span className={styles.textPrimaryItalic}>Range</span>
              </h2>
              <p className={styles.catsSubtitle}>
                Premium solutions tailored for your industry. Discover our comprehensive range of packaging solutions for every need.
              </p>
            </div>
            <div className={styles.catsControls}>
              <button
                onClick={scrollPrev}
                className={styles.catsControlBtn}
                aria-label="Previous slide"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={scrollNext}
                className={styles.catsControlBtn}
                aria-label="Next slide"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
          <div className={styles.catsCarouselViewport} ref={emblaRef}>
            <div className={styles.catsCarouselTrack}>
              {categories.map((cat, idx) => (
                <Link key={idx} to={`/categories?category=${cat.slug}`} className={styles.catCard}>
                  <div className={styles.catCardInner}>
                    <img alt={cat.name} className={styles.catImg} src={cat.image} />
                    <div className={styles.catOverlay}>
                      <span className={styles.catLabel}>Category</span>
                      <h3 className={styles.catName}>{cat.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Brands Section */}
      <div className={styles.brandsSection}>
        <div className={styles.sectionContainer}>
          <h3 className={styles.brandsTitle}>Trusted by Brands</h3>
        </div>
        <div ref={brandCarouselFade.elementRef} className={cn(styles.brandsContainer, brandCarouselFade.isVisible && styles.brandsContainerVisible)}>
          <BrandCarousel clients={clientsData.clients} />
        </div>
      </div>

      {/* Industry Specialization Section */}
      <section className={styles.indSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.indHeader}>
            <span className={styles.indLabel}>Industries We Serve</span>
            <h2 className={styles.indTitle}>Precision for Every Sector</h2>
          </div>
          <div className={styles.indGrid}>
            {[
              { name: "Bakeries", desc: "Muffin trays & display cases", image: "/assets/industries/bakery.webp" },
              { name: "Restaurants", desc: "Chef-grade prep containers", image: "/assets/industries/restaurant.webp" },
              { name: "Ice-Cream Parlours", desc: "Sturdy cups & glasses", image: "/assets/industries/ice-cream-parlour.webp" },
              { name: "Sweet Shops", desc: "Premium mithai packaging", image: "/assets/industries/sweet-shops.webp" },
              { name: "Confectionery", desc: "High-clarity display boxes", image: "/assets/industries/confectionery.webp" }
            ].map((ind, idx) => (
              <div key={idx} className={styles.indCard}>
                <img alt={ind.name} className={styles.indImg} src={ind.image} />
                <div className={styles.indGradient}></div>
                <div className={styles.indOverlay}>
                  <h3 className={styles.indName}>{ind.name}</h3>
                  <p className={styles.indDesc}>{ind.desc}</p>
                  <div className={styles.indExplore}>
                    <span className={styles.indExploreText}>Explore Range</span>
                    <ArrowRight className={cn("w-4 h-4", styles.indExploreIcon)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className={styles.aboutSection}>
        <div className={cn(styles.sectionContainer, styles.aboutGrid)}>
          <div className={styles.aboutVisual}>
            <div className={styles.aboutBgText}>PRECISION</div>
            <div className={styles.aboutImgWrapper}>
              <img alt="Manufacturing facility" className={styles.aboutImg} src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNbdXbjAm9p49KP4RLv3IlkNk7AqR9Q8EU3KUQgZK5Ajtq5_v6MGAAVr_rDxDf55zHQAO0ipDeJVh8NVgKCPeL592mB032lwcCTvC6FZxhsKisuLsiFVg6MCqTMhbpk80jHyQAwv26g64yFt00MQvveNLZAiZwf-GPMiJWGCXHIm3YfoAdWvbj5lPQ_d1dpPJFTw-e1bmPY1EPWxZqTii5llnhQzmNI2QYa0X7qlzPjDIQ2THT8ziA8EpzJjpbH58Dff6uynsgg3HL" />
            </div>
            <div className={styles.aboutBadge}>
              <div className={styles.aboutBadgeTitle}>25+ Years</div>
              <div className={styles.aboutBadgeSubtitle}>Engineering Mastery</div>
            </div>
          </div>
          <div className={styles.aboutContent}>
            <span className={styles.aboutLabel}>About Us</span>
            <h2 className={styles.aboutTitle}>
              Premium Plastic Containers & Packaging Solutions in <span className={styles.textPrimaryItalic}>India</span>
            </h2>
            <p className={styles.aboutDesc}>
              Softwares Packers is a leading manufacturer of premium plastic containers and packaging solutions, specializing in food-grade containers, storage solutions, and industrial packaging. We are committed to delivering quality products that meet the highest standards for food safety, durability, and functionality.
            </p>
            <div className={styles.aboutFeatures}>
              <div className={styles.aboutFeature}>
                <div className={styles.aboutIcon}>
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h4 className={styles.aboutFeatureTitle}>Complete Packaging Solutions</h4>
                  <p className={styles.aboutFeatureDesc}>Our comprehensive range includes containers for food service, storage applications, and industrial use.</p>
                </div>
              </div>
              <div className={styles.aboutFeature}>
                <div className={styles.aboutIcon}>
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className={styles.aboutFeatureTitle}>Trusted Partner</h4>
                  <p className={styles.aboutFeatureDesc}>Our dedication to excellence, innovation, and customer satisfaction makes us a trusted partner for all your packaging needs.</p>
                </div>
              </div>
            </div>
            <Link to="/about" className={styles.aboutBtn}>
              Know More
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section (Retained styling from original, kept intact per request) */}
      <section
        ref={ctaFade.elementRef}
        className={cn(styles.ctaSection, "scroll-fade", ctaFade.isVisible ? "visible" : "")}
        aria-label="Call to action"
      >
        <div className={styles.ctaBackgroundImage} aria-hidden="true"></div>
        <div className={styles.ctaProductLeft} aria-hidden="true"></div>
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
                <Link to="/about">
                  Learn More
                  <ArrowRight className={styles.ctaButtonIcon} aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.ctaFeatures}>
          <div className={styles.ctaFeaturesContainer}>
            <div className={styles.ctaFeatureItem}>
              <Check className={styles.ctaFeatureCheck} aria-hidden="true" />
              <span>Custom Sizes</span>
            </div>
            <div className={styles.ctaFeatureSeparator} aria-hidden="true"></div>
            <div className={styles.ctaFeatureItem}>
              <Check className={styles.ctaFeatureCheck} aria-hidden="true" />
              <span>Bulk Pricing</span>
            </div>
            <div className={styles.ctaFeatureSeparator} aria-hidden="true"></div>
            <div className={styles.ctaFeatureItem}>
              <Check className={styles.ctaFeatureCheck} aria-hidden="true" />
              <span>Fast Delivery Across India</span>
            </div>
            <div className={styles.ctaFeatureSeparator} aria-hidden="true"></div>
            <div className={styles.ctaFeatureItem}>
              <Check className={styles.ctaFeatureCheck} aria-hidden="true" />
              <span>Food-Grade & Leakproof</span>
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
