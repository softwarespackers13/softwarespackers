import {
    Award,
    Users
} from "lucide-react";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import FactoryCarousel from "@/components/common/FactoryCarousel";
import { COMPANY_WHATSAPP } from "@/config/constants";
import { useScrollFade } from "@/hooks/use-scroll-fade";
import styles from "./css/About.module.css";

const About = () => {
    const knowWhoWeAreFade = useScrollFade();
    const whatMakesUsDifferentFade = useScrollFade();
    const statsFade = useScrollFade();
    const missionFade = useScrollFade();
    const infrastructureFade = useScrollFade();

    const stats = [
        { label: "Quality Products", value: "100%" },
        { label: "Happy customers", value: "10k+" },
        { label: "Product Range", value: "Wide" },
        { label: "Customer Satisfaction", value: "Premium" }
    ];

    const factoryImages = [
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&q=80",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80",
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop&q=80",
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&q=80",
    ];


    return (
        <div className={styles.pageContainer}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Premium Plastic Containers & Packaging Solutions
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Softwares Packers is a leading manufacturer of premium plastic containers and packaging solutions,
                        specializing in food-grade containers, storage solutions, and industrial packaging for businesses across India.
                    </p>
                </div>
            </section>

            {/* Know Who We Are Section */}
            <section
                ref={knowWhoWeAreFade.elementRef}
                className={`${styles.knowWhoWeAreSection} ${styles.scrollFade} ${knowWhoWeAreFade.isVisible ? styles.visible : ''}`}
            >
                <div className={styles.container}>
                    <div className={styles.knowWhoWeAreContent}>
                        {/* Left Column - Text */}
                        <div className={styles.knowWhoWeAreText}>
                            <div className={styles.knowWhoWeAreBadge}>
                                <div className={styles.knowWhoWeAreBadgeLine}></div>
                                <span>Know who we are</span>
                            </div>
                            <h2 className={styles.knowWhoWeAreTitle}>
                                It all started with a simple idea.
                            </h2>
                            <p className={styles.knowWhoWeAreDescription}>
                                Backed by experience, teamwork, and a drive for excellence, Softwares Packers was founded
                                to revolutionize plastic packaging solutions. Today, we work with brands across industries
                                to deliver innovative packaging that turns challenges into measurable results. We specialize
                                in manufacturing premium plastic containers for food service, storage, and industrial applications,
                                ensuring quality and reliability in every product we create.
                            </p>
                        </div>
                        {/* Right Column - Image Grid */}
                        <div className={styles.knowWhoWeAreImages}>
                            <div className={styles.knowWhoWeAreImageGrid}>
                                <div className={styles.knowWhoWeAreImageItem}>
                                    <img
                                        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&q=80"
                                        alt="Manufacturing growth and data"
                                        className={styles.knowWhoWeAreImage}
                                    />
                                </div>
                                <div className={styles.knowWhoWeAreImageItem}>
                                    <img
                                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=600&fit=crop&q=80"
                                        alt="Modern manufacturing technology"
                                        className={styles.knowWhoWeAreImage}
                                    />
                                </div>
                                <div className={styles.knowWhoWeAreImageItem}>
                                    <img
                                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=600&fit=crop&q=80"
                                        alt="Quality control and planning"
                                        className={styles.knowWhoWeAreImage}
                                    />
                                </div>
                                <div className={styles.knowWhoWeAreImageItem}>
                                    <img
                                        src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=600&fit=crop&q=80"
                                        alt="Innovation and ideas"
                                        className={styles.knowWhoWeAreImage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What Makes Us Different Section */}
            <section
                ref={whatMakesUsDifferentFade.elementRef}
                className={`${styles.whatMakesUsDifferentSection} ${styles.scrollFade} ${whatMakesUsDifferentFade.isVisible ? styles.visible : ''}`}
            >
                <div className={styles.container}>
                    {/* Header Section */}
                    <div className={styles.whatMakesUsDifferentHeader}>
                        <div className={styles.whatMakesUsDifferentAccent}>
                            <div className={styles.whatMakesUsDifferentAccentLine}></div>
                            <span>We're different</span>
                        </div>
                        <h2 className={styles.whatMakesUsDifferentTitle}>
                            What Makes Us Different
                        </h2>
                        <p className={styles.whatMakesUsDifferentSubtitle}>
                            We're not here for surface-level solutions.
                        </p>
                    </div>

                    {/* Content Section - Two Column Layout */}
                    <div className={styles.whatMakesUsDifferentContent}>
                        {/* Left Column - Image with Overlay Card */}
                        <div className={styles.whatMakesUsDifferentImageColumn}>
                            <div className={styles.whatMakesUsDifferentImageWrapper}>
                                <img
                                    src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=1000&fit=crop&q=80"
                                    alt="Professional business consultation"
                                    className={styles.whatMakesUsDifferentMainImage}
                                />
                                {/* Overlay Card */}
                                <div className={styles.whatMakesUsDifferentCard}>
                                    <div className={styles.whatMakesUsDifferentCardTitle}>Engagements</div>
                                    <div className={styles.whatMakesUsDifferentProgressCircle}>
                                        <svg className={styles.whatMakesUsDifferentProgressSvg} viewBox="0 0 120 120">
                                            <circle
                                                cx="60"
                                                cy="60"
                                                r="54"
                                                fill="none"
                                                stroke="rgba(255, 255, 255, 0.3)"
                                                strokeWidth="12"
                                            />
                                            <circle
                                                cx="60"
                                                cy="60"
                                                r="54"
                                                fill="none"
                                                stroke="#ffffff"
                                                strokeWidth="12"
                                                strokeDasharray="332.5 339.29"
                                                strokeDashoffset="0"
                                                transform="rotate(-90 60 60)"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className={styles.whatMakesUsDifferentProgressContent}>
                                            <div className={styles.whatMakesUsDifferentProgressValue}>98%</div>
                                            <div className={styles.whatMakesUsDifferentProgressLabel}>success</div>
                                        </div>
                                    </div>
                                    <div className={styles.whatMakesUsDifferentProgressBar}>
                                        <div className={styles.whatMakesUsDifferentProgressBarFill}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Text Blocks */}
                        <div className={styles.whatMakesUsDifferentTextColumn}>
                            <div className={styles.whatMakesUsDifferentTextBlock}>
                                <h3 className={styles.whatMakesUsDifferentTextHeading}>
                                    We focus on quality and reliability, not just products.
                                </h3>
                                <p className={styles.whatMakesUsDifferentTextParagraph}>
                                    Our commitment extends beyond manufacturing — we ensure every container meets the highest
                                    standards of quality, safety, and functionality to help your business succeed.
                                </p>
                            </div>
                            <div className={styles.whatMakesUsDifferentTextBlock}>
                                <h3 className={styles.whatMakesUsDifferentTextHeading}>
                                    Premium materials, precision manufacturing, and customer-focused solutions.
                                </h3>
                                <p className={styles.whatMakesUsDifferentTextParagraph}>
                                    Everything we create is designed with your needs in mind, using premium materials and
                                    advanced manufacturing techniques to deliver packaging solutions that make a difference.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className={styles.statsSection}>
                <div className={styles.statsContainer}>
                    <div className={styles.statsGrid}>
                        {stats.map((stat, index) => (
                            <div key={index} className={styles.statItem}>
                                <div className={styles.statValue}>{stat.value}</div>
                                <div className={styles.statLabel}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Mission Section */}
            <section
                ref={missionFade.elementRef}
                className={`${styles.missionSection} ${styles.scrollFade} ${missionFade.isVisible ? styles.visible : ''}`}
            >
                <div className={styles.container}>
                    <div className={styles.missionContent}>
                        <div className={styles.missionBadge}>
                            <div className={styles.missionBadgeLine}></div>
                            <span>Our Mission</span>
                        </div>
                        <h2 className={styles.missionTitle}>
                            Excellence in Every Container
                        </h2>
                        <p className={styles.missionText}>
                            Our mission is to continue challenging our own standards and to serve our esteemed customers with the best of our products, always. We strive to deliver the best product quality and customer service in the packaging industry. Driven by innovation and powered by our dedicated team, we're here to provide complete packaging solutions that help your business thrive. At Softwares Packers, we believe in excellence in every container we manufacture, ensuring that our products meet the highest standards of quality, safety, and functionality.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Infrastructure Section */}
            <section
                ref={infrastructureFade.elementRef}
                className={`${styles.infrastructureSection} ${styles.scrollFade} ${infrastructureFade.isVisible ? styles.visible : ''}`}
            >
                <div className={styles.container}>
                    <div className={styles.infrastructureContent}>
                        <div className={styles.infrastructureLayout}>
                            <div className={styles.infrastructureTextColumn}>
                                <div className={styles.infrastructureBadge}>
                                    <div className={styles.infrastructureBadgeLine}></div>
                                    <span>Our Infrastructure</span>
                                </div>
                                <h2 className={styles.infrastructureTitle}>
                                    State-of-the-Art Manufacturing Facilities
                                </h2>
                                <p className={styles.infrastructureDescription}>
                                    Softwares Packers operates state-of-the-art manufacturing facilities equipped with the latest
                                    technology and quality control systems. Our facilities are designed to produce high-quality
                                    plastic containers that meet stringent quality standards. With a focus on innovation and continuous improvement, we regularly upgrade our manufacturing
                                    capabilities and invest in new technologies to stay ahead in the industry. Our commitment to
                                    excellence is reflected in our ISO-certified processes and our dedication to sustainable
                                    manufacturing practices.

                                </p>

                            </div>
                            <div className={styles.infrastructureCarouselColumn}>
                                <FactoryCarousel images={factoryImages} autoPlayInterval={5000} />
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

export default About;
