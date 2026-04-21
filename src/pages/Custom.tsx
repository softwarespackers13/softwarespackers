import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Wrench,
    Package,
    Ruler,
    Palette,
    CheckCircle,
    ArrowRight,
    Factory,
    Sparkles,
    Zap,
    Shield,
    Clock,
    Users,
    TrendingUp,
    MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { COMPANY_WHATSAPP } from "@/config/constants";
import { useScrollFade } from "@/hooks/use-scroll-fade";
import styles from "./css/Custom.module.css";
import { cn } from "@/lib/utils";
import customCaseIcon from "@/assets/custom-case-icon.png";

const Custom = () => {
    const heroFade = useScrollFade();
    const introFade = useScrollFade();
    const servicesFade = useScrollFade();
    const processFade = useScrollFade();
    const benefitsFade = useScrollFade();

    const services = [
        {
            icon: Package,
            title: "Custom Molding",
            description: "Design and manufacture containers tailored to your exact specifications. From unique shapes to specialized closures.",
            features: ["Custom dimensions", "Brand colors", "Logo embossing", "Specialized closures"],
            iconClass: styles.iconBlue
        },
        {
            icon: Ruler,
            title: "Size Variations",
            description: "Need a size that's not in our catalog? We can create containers in any size from 50ml to 50L capacity.",
            features: ["Any capacity", "Custom dimensions", "Standard or custom lids", "Bulk pricing"],
            iconClass: styles.iconPurple
        },
        {
            icon: Palette,
            title: "Color Matching",
            description: "Match your brand colors exactly. We offer custom color mixing for HDPE, PP, and PET materials.",
            features: ["Pantone matching", "Brand consistency", "Food-safe dyes", "UV protection"],
            iconClass: styles.iconOrange
        },
        {
            icon: Factory,
            title: "Bulk Manufacturing",
            description: "Large volume orders? We specialize in bulk manufacturing with competitive pricing and reliable delivery.",
            features: ["MOQ: 10,000 units", "Volume discounts", "Consistent quality", "Fast turnaround"],
            iconClass: styles.iconGreen
        }
    ];

    const process = [
        {
            step: 1,
            title: "Consultation",
            description: "Share your requirements and we'll provide expert recommendations",
            icon: MessageSquare,
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&q=80"
        },
        {
            step: 2,
            title: "Design & Prototyping",
            description: "We create 3D designs and provide physical prototypes for approval",
            icon: Sparkles,
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&q=80"
        },
        {
            step: 3,
            title: "Production",
            description: "Once approved, we manufacture your custom containers with quality assurance",
            icon: Factory,
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop&q=80"
        },
        {
            step: 4,
            title: "Delivery",
            description: "Fast delivery across North India with reliable logistics partners",
            icon: Package,
            image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop&q=80"
        }
    ];

    const benefits = [
        { icon: Zap, text: "No minimum order for standard customizations", iconClass: styles.benefitIconYellow },
        { icon: Clock, text: "2-3 week prototype turnaround", iconClass: styles.benefitIconBlue },
        { icon: Users, text: "Expert design consultation included", iconClass: styles.benefitIconPurple },
        { icon: Shield, text: "Quality assurance at every step", iconClass: styles.benefitIconGreen },
        { icon: TrendingUp, text: "Competitive pricing for bulk orders", iconClass: styles.benefitIconOrange },
        { icon: Wrench, text: "Ongoing support and modifications", iconClass: styles.benefitIconRed }
    ];

    return (
        <div className={styles.pageContainer}>
            {/* Hero Section */}
            <section
                ref={heroFade.elementRef}
                className={cn(styles.heroSection, 'scroll-fade', heroFade.isVisible ? 'visible' : '')}
            >
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Custom Solutions</h1>
                    <p className={styles.heroSubtitle}>
                        Need containers that don't exist in our catalog? We design and manufacture custom plastic containers
                        tailored to your exact requirements.
                    </p>
                </div>
            </section>

            {/* Intro Section */}
            <section
                ref={introFade.elementRef}
                className={cn(
                    styles.introSection,
                    'scroll-fade',
                    introFade.isVisible ? 'visible' : ''
                )}
            >
                {/* Decorative red accent */}
                <div className={styles.introSectionDecorativeRed1}></div>
                <div className={styles.introSectionDecorativeRed2}></div>

                <div className={styles.introSectionGrid}>
                    {/* LEFT: Illustration - Edge to edge, no padding */}
                    <div className={styles.introSectionLeft}>
                        {/* Red accent dot decoration */}
                        <div className={styles.introSectionRedDot1}></div>
                        <div className={styles.introSectionRedDot2}></div>

                        <div className={styles.introSectionImageContainer}>
                            {/* White shadow/glow background */}
                            <div className={styles.introSectionWhiteShadow}></div>
                            {/* Subtle red glow on hover */}
                            <div className={styles.introSectionRedGlow}></div>
                            <img
                                src="/assets/Screenshot 2026-02-04 at 1.21.05 AM.png"
                                alt="Custom manufacturing and fabrication solutions"
                                className={styles.introSectionImage}
                                loading="lazy"
                            />
                            {/* White gradient fade on right edge to blend with right column */}
                            <div className={styles.introSectionGradientFade}></div>
                            {/* White gradient fade on bottom edge */}
                            <div className={styles.introSectionGradientFadeBottom}></div>
                        </div>
                    </div>

                    {/* RIGHT: Text - With padding */}
                    <div className={styles.introSectionRight}>
                        {/* Red accent line */}
                        <div className={styles.introSectionRedLine}></div>

                        <h1 className={styles.introSectionTitle}>
                            Need Custom <br />
                            <span className={styles.introSectionTitleUnderline}>
                                Solution?
                            </span>
                        </h1>

                        <p className={styles.introSectionParagraph}>
                            Our team specializes in creating bespoke packaging solutions that
                            perfectly match your brand and product requirements.
                        </p>

                        {/* feature chips */}
                        <div className={styles.introSectionFeatureChips}>
                            <span className={styles.introSectionFeatureChip}>
                                <CheckCircle className={styles.introSectionFeatureChipIcon} />
                                Custom Molding
                            </span>
                            <span className={styles.introSectionFeatureChip}>
                                <CheckCircle className={styles.introSectionFeatureChipIcon} />
                                Logo Embossing
                            </span>
                            <span className={styles.introSectionFeatureChip}>
                                <CheckCircle className={styles.introSectionFeatureChipIcon} />
                                Bulk Pricing
                            </span>
                        </div>

                        {/* CTA */}
                        <Button
                            asChild
                            className={styles.introSectionCTAButton}
                        >
                            <Link to="/quote" className={styles.introSectionCTALink}>
                                GET A FREE CONSULTATION
                                <ArrowRight className={styles.introSectionCTAArrow} />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section
                ref={servicesFade.elementRef}
                className={cn(styles.servicesSection, 'scroll-fade', servicesFade.isVisible ? 'visible' : '')}
            >
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Our Custom Services</h2>
                        <p className={styles.sectionSubtitle}>
                            Comprehensive solutions tailored to your unique packaging needs
                        </p>
                    </div>
                    <div className={styles.servicesList}>
                        {services.map((service, index) => (
                            <div key={index} className={cn(styles.serviceItem, index % 2 === 0 ? styles.serviceItemLeft : styles.serviceItemRight)}>
                                <div className={styles.serviceNumber}>{(index + 1).toString().padStart(2, '0')}</div>
                                <div className={styles.serviceContent}>
                                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                                    <p className={styles.serviceDescription}>
                                        {service.description}
                                    </p>
                                    <div className={styles.serviceFeatures}>
                                        {service.features.map((feature, idx) => (
                                            <span key={idx} className={styles.serviceFeatureTag}>
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {index < services.length - 1 && <div className={styles.serviceDivider}></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section
                ref={processFade.elementRef}
                className={cn(styles.processSection, 'scroll-fade', processFade.isVisible ? 'visible' : '')}
            >
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Our Custom Manufacturing Process</h2>
                        <p className={styles.sectionSubtitle}>
                            From concept to delivery, we guide you through every step
                        </p>
                    </div>
                    <div className={styles.processWrapper}>
                        <div className={styles.processTimeline}>
                            <div className={styles.timelineLine}></div>
                            {process.map((item) => (
                                <div key={item.step} className={styles.timelineItem}>
                                    <div className={styles.timelineNumber}>{item.step}</div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.processContainer}>
                            {process.map((item) => {
                                return (
                                    <Card key={item.step} className={styles.processCard}>
                                        <CardHeader>
                                            <CardTitle className={styles.processTitle}>{item.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className={styles.processDescription}>{item.description}</p>
                                            <div className={styles.processImageWrapper}>
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className={styles.processImage}
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                        <div className={styles.processCTA}>
                            <Button asChild size="lg" className={styles.getStartedButton}>
                                <Link to="/quote">GET STARTED</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Floating WhatsApp Button */}
            <WhatsAppButton
                phoneNumber={COMPANY_WHATSAPP}
                message="Hello, I'm interested in your custom plastic container solutions. Please share more details."
                variant="floating"
            />
        </div>
    );
};

export default Custom;
