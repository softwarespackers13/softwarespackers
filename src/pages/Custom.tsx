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
} from "lucide-react";
import { Link } from "react-router-dom";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { COMPANY_WHATSAPP } from "@/config/constants";
import styles from "./css/Custom.module.css";

const Custom = () => {
    const services = [
        {
            icon: Package,
            title: "Custom Molding",
            description: "Design and manufacture containers tailored to your exact specifications. From unique shapes to specialized closures.",
            features: ["Custom dimensions", "Brand colors", "Logo embossing", "Specialized closures"]
        },
        {
            icon: Ruler,
            title: "Size Variations",
            description: "Need a size that's not in our catalog? We can create containers in any size from 50ml to 50L capacity.",
            features: ["Any capacity", "Custom dimensions", "Standard or custom lids", "Bulk pricing"]
        },
        {
            icon: Palette,
            title: "Color Matching",
            description: "Match your brand colors exactly. We offer custom color mixing for HDPE, PP, and PET materials.",
            features: ["Pantone matching", "Brand consistency", "Food-safe dyes", "UV protection"]
        },
        {
            icon: Factory,
            title: "Bulk Manufacturing",
            description: "Large volume orders? We specialize in bulk manufacturing with competitive pricing and reliable delivery.",
            features: ["MOQ: 10,000 units", "Volume discounts", "Consistent quality", "Fast turnaround"]
        }
    ];

    const process = [
        {
            step: 1,
            title: "Consultation",
            description: "Share your requirements and we'll provide expert recommendations"
        },
        {
            step: 2,
            title: "Design & Prototyping",
            description: "We create 3D designs and provide physical prototypes for approval"
        },
        {
            step: 3,
            title: "Production",
            description: "Once approved, we manufacture your custom containers with quality assurance"
        },
        {
            step: 4,
            title: "Delivery",
            description: "Fast delivery across North India with reliable logistics partners"
        }
    ];

    const benefits = [
        { icon: CheckCircle, text: "No minimum order for standard customizations" },
        { icon: CheckCircle, text: "2-3 week prototype turnaround" },
        { icon: CheckCircle, text: "Expert design consultation included" },
        { icon: CheckCircle, text: "Quality assurance at every step" },
        { icon: CheckCircle, text: "Competitive pricing for bulk orders" },
        { icon: CheckCircle, text: "Ongoing support and modifications" }
    ];

    return (
        <div className={styles.pageContainer}>
            <div className={styles.container}>
                {/* Hero Section */}
                <div className={styles.hero}>
                    <Badge className={styles.badge} variant="secondary">
                        <Wrench className="h-3.5 w-3.5 mr-1.5" />
                        Custom Solutions
                    </Badge>
                    <h1 className={styles.title}>Custom Plastic Container Solutions</h1>
                    <p className={styles.subtitle}>
                        Need containers that don't exist in our catalog? We design and manufacture custom plastic containers
                        tailored to your exact requirements. From unique shapes to brand-specific colors, we bring your vision to life.
                    </p>
                </div>

                {/* Services Grid */}
                <div className={styles.servicesGrid}>
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <Card key={index} className={styles.serviceCard}>
                                <CardHeader>
                                    <div className={styles.iconWrapper}>
                                        <Icon className={styles.icon} />
                                    </div>
                                    <CardTitle>{service.title}</CardTitle>
                                    <CardDescription>{service.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className={styles.featuresList}>
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className={styles.featureItem}>
                                                <CheckCircle className={styles.checkIcon} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Process Section */}
                <div className={styles.processSection}>
                    <h2 className={styles.sectionTitle}>Our Custom Manufacturing Process</h2>
                    <p className={styles.sectionSubtitle}>
                        From concept to delivery, we guide you through every step
                    </p>
                    <div className={styles.processGrid}>
                        {process.map((item) => (
                            <Card key={item.step} className={styles.processCard}>
                                <CardHeader>
                                    <div className={styles.stepNumber}>{item.step}</div>
                                    <CardTitle>{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className={styles.processDescription}>{item.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <Card className={styles.ctaCard}>
                    <CardHeader>
                        <CardTitle className={styles.ctaTitle}>Ready to Start Your Custom Project?</CardTitle>
                        <CardDescription className={styles.ctaDescription}>
                            Get a free consultation and quote for your custom container requirements
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.ctaButtons}>
                            <Button asChild size="lg" className={styles.primaryButton}>
                                <Link to="/quote">
                                    Get Custom Quote
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className={styles.outlineButton}>
                                <Link to="/contact">
                                    Contact Us
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

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

