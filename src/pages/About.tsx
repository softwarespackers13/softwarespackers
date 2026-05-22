import { useRef } from "react";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { COMPANY_WHATSAPP } from "@/config/constants";
import { useScrollFade } from "@/hooks/use-scroll-fade";
import { ArrowRight, Cpu, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./css/About.module.css";

const About = () => {
    const heroFade = useScrollFade();
    const bentoFade = useScrollFade();
    const infraFade = useScrollFade();
    const journeyFade = useScrollFade();
    const specsFade = useScrollFade();

    const bentoRef = useRef<HTMLDivElement>(null);
    const specsRef = useRef<HTMLDivElement>(null);
    const journeyRef = useRef<HTMLDivElement>(null);

    const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className={styles.pageContainer}>
            {/* Chapter I: Engineering Precision (Hero Section) */}
            <section
                ref={heroFade.elementRef}
                className={`${styles.heroSection} ${styles.scrollFade} ${heroFade.isVisible ? styles.visible : ""}`}
            >
                <div className={styles.heroImageWrapper}>
                    <img
                        alt="Industrial plastic manufacturing plant automation"
                        className={styles.heroImage}
                        src="/assets/temp3/industrial.webp"
                    />
                    <div className={styles.heroGradient}></div>
                </div>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <span className={styles.heroBadge}>Chapter I: Engineering Precision</span>
                        <h1 className={styles.heroTitle}>
                            Precision Engineered Container Solutions.
                        </h1>
                        <p className={styles.heroDescription}>
                            Architecting premium packaging configurations that serve as the structural backbone of high-volume food service, storage, and industrial operations.
                        </p>
                        <div className={styles.heroButtons}>
                            <Link to="/categories">
                                <button className={styles.btnPrimary}>
                                    Explore Systems
                                </button>
                            </Link>
                            <button
                                className={styles.btnSecondary}
                                onClick={() => scrollToRef(bentoRef)}
                            >
                                Our Process
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chapter II: Our Works & Engineering Standards (Bento Grid) */}
            <div ref={bentoRef} style={{ scrollMarginTop: "2rem" }}>
                <section
                    ref={bentoFade.elementRef}
                    className={`${styles.bentoSection} ${styles.scrollFade} ${bentoFade.isVisible ? styles.visible : ""}`}
                >
                    <div className={styles.container}>
                        <div className={styles.sectionHeader}>
                            <span className={styles.specsTag} style={{ display: "inline-block", marginBottom: "0.5rem" }}>Chapter II: Our Works</span>
                            <h2 className={styles.sectionTitle}>Works &amp; Engineering Standards</h2>
                            <p className={styles.sectionSubtitle}>
                                From custom mold designs to high-speed automated production, our packaging systems guarantee product safety and structural integrity.
                            </p>
                        </div>

                        <div className={styles.bentoGrid}>
                            {/* Bento Item 1: Large Image (Our Works - Printing & Assembly) */}
                            <div className={styles.bentoItemLarge}>
                                <img
                                    alt="Advanced packaging printing and process line"
                                    className={styles.bentoItemLargeImg}
                                    src="/assets/home-hero/factory_process.webp"
                                />
                                <div className={styles.bentoOverlay}>
                                    <span className={styles.bentoTag}>Manufacturing Excellence</span>
                                    <h3 className={styles.bentoItemTitle}>Thermally Optimized Polymer Systems</h3>
                                    <p className={styles.bentoItemDesc}>
                                        Engineering thermal stability and high-adhesion moisture barriers for safe preservation across food-service and logistics networks.
                                    </p>
                                </div>
                            </div>

                            {/* Bento Item 2: Text Card (Works details) */}
                            <div className={styles.bentoItemText}>
                                <Cpu className={styles.bentoIcon} />
                                <h4 className={styles.bentoHeadingSmall}>Precision Thermoforming</h4>
                                <p className={styles.bentoParaSmall}>
                                    State-of-the-art thermoforming production lines calibrated to the micron, producing durable, leak-proof, and stackable clear plastic containers.
                                </p>
                                <button
                                    onClick={() => scrollToRef(specsRef)}
                                    className={styles.bentoLink}
                                    style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                                >
                                    Technical Specs <ArrowRight size={16} />
                                </button>
                            </div>

                            {/* Bento Item 3: Aesthetic Image (Thermoforming Production line) */}
                            <div className={styles.bentoItemImage}>
                                <img
                                    alt="Thermoforming packaging production line"
                                    className={styles.bentoItemImageInner}
                                    src="/assets/home-hero/factory_thermoform.webp"
                                />
                                <div className={styles.bentoImageOverlay}></div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Chapter III: Global Scale */}
            <section
                ref={infraFade.elementRef}
                className={`${styles.infrastructureSection} ${styles.scrollFade} ${infraFade.isVisible ? styles.visible : ""}`}
            >
                <div className={styles.container}>
                    <div className={styles.infraGrid}>
                        {/* Left Column: Stats */}
                        <div className={styles.infraLeft}>
                            <span className={styles.heroBadge} style={{ color: "var(--about-outline-variant)", display: "block", marginBottom: "1rem" }}>Chapter III: Global Scale</span>
                            <h2 className={styles.infraTitle}>Infrastructure for Modern Distribution.</h2>
                            <div className={styles.statsList}>
                                <div className={styles.statItem}>
                                    <h3 className={styles.statHeading}>99.9% Integrity Rate</h3>
                                    <p className={styles.statDesc}>
                                        Our vacuum-sealing protocols are the gold standard for global distribution chains.
                                    </p>
                                </div>
                                <div className={styles.statItem}>
                                    <h3 className={styles.statHeading}>Sustainable Materials</h3>
                                    <p className={styles.statDesc}>
                                        Bio-derived polymers that maintain structural rigidity without environmental cost.
                                    </p>
                                </div>
                                <div className={styles.statItem}>
                                    <h3 className={styles.statHeading}>Smart Monitoring</h3>
                                    <p className={styles.statDesc}>
                                        IoT-integrated containers that report thermal stability in real-time during transit.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Image with Overlay */}
                        <div className={styles.infraRight}>
                            <img
                                alt="Automated packaging lines and facility machinery"
                                className={styles.infraImage}
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNbdXbjAm9p49KP4RLv3IlkNk7AqR9Q8EU3KUQgZK5Ajtq5_v6MGAAVr_rDxDf55zHQAO0ipDeJVh8NVgKCPeL592mB032lwcCTvC6FZxhsKisuLsiFVg6MCqTMhbpk80jHyQAwv26g64yFt00MQvveNLZAiZwf-GPMiJWGCXHIm3YfoAdWvbj5lPQ_d1dpPJFTw-e1bmPY1EPWxZqTii5llnhQzmNI2QYa0X7qlzPjDIQ2THT8ziA8EpzJjpbH58Dff6uynsgg3HL"
                            />
                            <div className={`${styles.caseStudyOverlay} ${styles.glassPanel}`}>
                                <div>
                                    <p className={styles.caseTag}>Case Study 042</p>
                                    <h4 className={styles.caseTitle}>High-Volume Food Containers</h4>
                                </div>
                                <Link to="/contact">
                                    <button className={styles.btnCaseStudy}>
                                        Read Full Narrative
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chapter V: Our Journey & Inception */}
            <div ref={journeyRef} style={{ scrollMarginTop: "2rem" }}>
                <section
                    ref={journeyFade.elementRef}
                    className={`${styles.journeySection} ${styles.scrollFade} ${journeyFade.isVisible ? styles.visible : ""}`}
                >
                    <div className={styles.container}>
                        <div className={styles.journeyGrid}>
                            {/* Left Column: Journey timeline */}
                            <div className={styles.journeyLeft}>
                                <span className={styles.specsTag} style={{ display: "block", marginBottom: "1rem" }}>Chapter V: Journey &amp; Inception</span>
                                <h2 className={styles.sectionTitle} style={{ textAlign: "left" }}>Our Evolution &amp; Journey</h2>
                                <p className={styles.sectionSubtitle} style={{ marginLeft: 0, textAlign: "left" }}>
                                    Softwares Packers was founded to revolutionize packaging reliability, scaling manufacturing limits to meet global distribution needs.
                                </p>
                                <div className={styles.journeyTimeline}>
                                    <div className={styles.timelineItem}>
                                        <div className={styles.timelineYear}>2012</div>
                                        <div className={styles.timelineTitle}>Inception &amp; Vision</div>
                                        <div className={styles.timelineDesc}>
                                            Established as a boutique container manufacturer, investing in our first thermoforming system to supply food-grade safe storage.
                                        </div>
                                    </div>
                                    <div className={styles.timelineItem}>
                                        <div className={styles.timelineYear}>2018</div>
                                        <div className={styles.timelineTitle}>Automation &amp; Scaling</div>
                                        <div className={styles.timelineDesc}>
                                            Transitioned to advanced cleanroom environments, introducing high-speed automated extrusion lines and computer-vision QC checking.
                                        </div>
                                    </div>
                                    <div className={styles.timelineItem}>
                                        <div className={styles.timelineYear}>2024</div>
                                        <div className={styles.timelineTitle}>Global Certification &amp; Scale</div>
                                        <div className={styles.timelineDesc}>
                                            Attained ISO-9001 certificates and launched IoT smart container systems, scaling container distributions globally.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Mission Block */}
                            <div className={styles.journeyRight}>
                                <div className={styles.missionBlock}>
                                    <h3 className={styles.missionHeading}>Our Core Mission</h3>
                                    <p className={styles.missionPara}>
                                        We are driven by a commitment to deliver unmatched container quality, safety, and functionality. We research, test, and innovate to ensure our polymer configurations provide absolute preservation.
                                    </p>
                                    <p className={styles.missionPara}>
                                        Our engineers design and test every layout to ensure stackability, thermal persistence, and structural adherence under high loading.
                                    </p>
                                    <div className={styles.missionQuote}>
                                        "Challenging our own manufacturing boundaries daily to serve customer packaging demands with zero-compromise precision."
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Chapter IV: Technical Specs */}
            <div ref={specsRef} style={{ scrollMarginTop: "2rem" }}>
                <section
                    ref={specsFade.elementRef}
                    className={`${styles.specsSection} ${styles.scrollFade} ${specsFade.isVisible ? styles.visible : ""}`}
                >
                    <div className={styles.container}>
                        <div className={styles.specsHeader}>
                            <div className={styles.specsHeaderLeft}>
                                <span className={styles.specsTag}>Chapter IV: Precision List</span>
                                <h2 className={styles.specsTitle}>The Technical Standard</h2>
                            </div>
                            <p className={styles.specsSubtitle}>
                                Data-driven performance for high-volume hospitality and retail.
                            </p>
                        </div>

                        <div className={styles.specsList}>
                            <div className={styles.specRow}>
                                <div className={styles.specRowLeft}>
                                    <span className={styles.specIndex}>01</span>
                                    <h3 className={styles.specName}>Poly-Barrier 7</h3>
                                </div>
                                <span className={styles.specDesc}>Heat-resistant up to 240°C</span>
                                <Plus className={styles.specIcon} size={24} />
                            </div>

                            <div className={styles.specRow}>
                                <div className={styles.specRowLeft}>
                                    <span className={styles.specIndex}>02</span>
                                    <h3 className={styles.specName}>Flexi-Grip Sealant</h3>
                                </div>
                                <span className={styles.specDesc}>Molecular adhesion for moisture locking</span>
                                <Plus className={styles.specIcon} size={24} />
                            </div>

                            <div className={styles.specRow}>
                                <div className={styles.specRowLeft}>
                                    <span className={styles.specIndex}>03</span>
                                    <h3 className={styles.specName}>Static-Shield Liner</h3>
                                </div>
                                <span className={styles.specDesc}>Prevents particle adherence in dry goods</span>
                                <Plus className={styles.specIcon} size={24} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Floating WhatsApp Button */}
            <WhatsAppButton
                phoneNumber={COMPANY_WHATSAPP}
                message="Hello, I'm interested in your premium packaging systems. Please share more details."
                variant="floating"
            />
        </div>
    );
};

export default About;
