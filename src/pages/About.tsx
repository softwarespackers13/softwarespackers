import { useRef, useState } from "react";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { COMPANY_WHATSAPP } from "@/config/constants";
import { useScrollFade } from "@/hooks/use-scroll-fade";
import { ArrowRight, Cpu, Plus, Quote, AlertTriangle, Factory, Radio, Recycle, X, Award, Leaf, Layers, ShieldCheck, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./css/About.module.css";

const PHASES = [
    {
        id: "01",
        tag: "Phase 01",
        title: "The Beginning",
        shortTitle: "Ludhiana Roots",
        description: "In the industrial heart of Ludhiana, an early workshop housed a single manual extruder. It wasn't about mass production; it was an obsession with material resilience. We saw the gap between what the industry manufactured and how poorly it was protected in transit.",
        type: "stats",
        specs: [
            { label: "Origin", value: "Ludhiana, IN" },
            { label: "Initial Focus", value: "Polymer Stress Testing" }
        ],
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQ6A9pld1-VEKzgrmlerqux_SHhpJ0MIf6uoIboA886dxusZLcccaidUSG0vEIKTa__juhbBdcAODVYblnYdoHPlD36WKXd7aelgHu8jHK_Db-9t9g8X4a8MVvrKTIWJNfeQJwB7DXY8VxmqPm2jFQ2Wyl_WbeZnGneMoO_EZih3qm2Ts8bG1dFLCxUMsPER6qG6arGo6XX3IpVD0vDolotJKfSbh1cPY8uL0b6IDGo1pt8xKrNs-pWPGMi89--WPglT2l7rc4REr-",
        caption: "ARCHIVE_01: MANUAL_EXTRUSION"
    },
    {
        id: "02",
        tag: "Phase 02",
        title: "The Frustration",
        shortTitle: "Failure Points",
        quote: "We watched clients lose millions in inventory to generic, leaking containers. The industry accepted micro-fractures and seal degradation as the 'cost of doing business.' We refused.",
        type: "failures",
        failures: [
            "Thermal expansion causing hairline rim fractures.",
            "Inconsistent wall thickness leading to structural collapse under stacked weight.",
            "Gasket material degradation from chemical exposure."
        ],
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuByuGVE4KV66w4mR7dR03llhw2iglTrcSA3WBSJ9l3rgkwi8jqKtk93lE18szQ6Q26TodKXyg-mNdagad7JHQ4mH8o3OlDgPvcp6pXxX9VaZ-i36xsGDw3wEFewHFNb-OK0R45UaHm3_skdFUGHwpqU3KFdAeu9--wewkzwWZ5l9v4z8hReQFcoMLQ0O2JCGPCJfkM6tWj_8AUXUlbfo4aDvX_ttoPXmPX6ANDTrbnrANveJH7ORb39GMsiClfAM4ket1t8KeDfBULa",
        caption: "SPEC_02: COMPRESSION MECHANISM"
    },
    {
        id: "03",
        tag: "Phase 03",
        title: "The Turning Point",
        shortTitle: "Airtight Seal",
        description: "Engineering the airtight seal. Moving from reactive manufacturing to proactive structural design. Redefining the injection molding parameters led to a seamless integration of base and lid, rendering traditional gasket failures obsolete.",
        type: "schematic",
        tolerance: "TOLERANCE: ±0.01mm",
        toleranceDesc: "Gasket compression ratio optimized for vacuum integrity.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-HsXkyQqlaZ5x5h79Wb34UOmXeYWIDA_OpGm1pHzL6Vr3cmiDKrzn2E_TzKG3lqXqkrJ2Ax-rOYVrE2vaDKc-gzNrUAD8BK13vdsuab1K4k7zh_wkU0V8Bq2o2E0HiXhI_qpXSJANho6ogyL0wwBmwpYSRvptcv5uiagxZTSSC3guhX3dfRms4aCevWVYdl5j2-fzK87Ivq2Cxs056K6hlUpWNwH2NfFhvbfMVEfZIEbq1mSvBbFruT3UuCqX1acbUUbVPQOJJpOx",
        caption: "ARCHIVE_03: ZERO-LEAK MANDATE"
    },
    {
        id: "04",
        tag: "Phase 04",
        title: "What We Build Now",
        shortTitle: "Automation & IoT",
        description: "Today, our facilities operate at ISO-9001 standards. We've replaced frustration with automation, and intuition with IoT-integrated precision.",
        type: "capabilities",
        capabilities: [
            { icon: "Factory", title: "Class 10k Cleanrooms", desc: "For pharmaceutical grade packaging" },
            { icon: "Radio", title: "IoT Integration", desc: "Real-time telemetry for transit monitoring" },
            { icon: "Recycle", title: "Circular Polymer Tech", desc: "100% recyclable structural plastics" }
        ],
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8dL6b3voHH8sB1b1LL1YDLyj1h8wT0jTwyHXqu-DlLjo7an7PGlL7Boz-frkkJqtCnxICBf4GDE2IGFwyBH3I4icDGtBNCnleY6F78Bsym-OU5G0ss7ssMkcweUQYPF6mUv7XF7LyRZErx0AhWiO3kVfwYwT55bX-NMx9bTAIevC1cWTRulIceM9Z-8CgcXMynmhD1rM1kQiYjIRIwcm8c2xLgIFhYEe5k1zDS9CjbQuY--vNGRq9MH0G-sje6eOGBoSiyq4nLg6i",
        caption: "ARCHIVE_04: CLEANROOM AUTOMATION"
    }
];

const getIcon = (iconName: string) => {
    switch (iconName) {
        case "Factory":
            return <Factory size={20} />;
        case "Radio":
            return <Radio size={20} />;
        case "Recycle":
            return <Recycle size={20} />;
        default:
            return null;
    }
};

const About = () => {
    const [activePhaseIdx, setActivePhaseIdx] = useState(0);
    const heroFade = useScrollFade();
    const bentoFade = useScrollFade();
    const journeyFade = useScrollFade();
    const missionVisionFade = useScrollFade();
    const valuesFade = useScrollFade();
    const teamFade = useScrollFade();
    const socialProofFade = useScrollFade();

    const bentoRef = useRef<HTMLDivElement>(null);
    const valuesRef = useRef<HTMLDivElement>(null);
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
                            Where Polymer Meets Purpose. We don't just make containers
                        </h1>
                        <p className={styles.heroDescription}>
                            Where Polymer Meets Purpose. Anyone can mould a container. We engineer one.
                            Twenty-five years. One ISO-certified facility in Ludhiana. Ten thousand businesses across India. Hundreds of products engineered with a single obsession — precision. That's the Softwares Packers difference.
                        </p>
                        <div className={styles.heroButtons}>
                            <Link to="/categories">
                                <button className={styles.btnPrimary}>
                                    Explore Systems
                                </button>
                            </Link>
                            <button
                                className={styles.btnSecondary}
                                onClick={() => scrollToRef(journeyRef)}
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
                                    onClick={() => scrollToRef(valuesRef)}
                                    className={styles.bentoLink}
                                    style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                                >
                                    Core Values <ArrowRight size={16} />
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

            {/* Chapter III: Our Story / Journey */}
            <div ref={journeyRef} style={{ scrollMarginTop: "2rem" }}>
                <section
                    ref={journeyFade.elementRef}
                    className={`${styles.journeyChapterSection} ${styles.scrollFade} ${journeyFade.isVisible ? styles.visible : ""}`}
                >
                    <div className={styles.container}>
                        {/* Section Header */}
                        <div className={styles.journeyHeader}>
                            <span className={styles.specsTag}>Chapter III: Our Journey</span>
                            <h2 className={styles.sectionTitle} style={{ textAlign: "left" }}>Our Story: Engineering Through Frustration</h2>
                            <p className={styles.journeySubtitle}>
                                We didn't start in a boardroom. We started on a factory floor, watching precision goods destroyed by generic, failing containers.
                            </p>
                        </div>

                        {/* Interactive Story Console */}
                        <div className={styles.storyConsole}>
                            {/* Left Panel: Tabs and details */}
                            <div className={styles.consoleLeft}>
                                <div className={styles.consoleTabs}>
                                    {PHASES.map((phase, idx) => (
                                        <button
                                            key={phase.id}
                                            onClick={() => setActivePhaseIdx(idx)}
                                            className={`${styles.consoleTabButton} ${
                                                activePhaseIdx === idx ? styles.activeTabButton : ""
                                            }`}
                                        >
                                            <span className={styles.tabIndex}>{phase.id}</span>
                                            <span className={styles.tabLabel}>{phase.shortTitle}</span>
                                        </button>
                                    ))}
                                </div>

                                <div className={styles.consoleContent}>
                                    <div className={styles.phaseBadgeWrapper}>
                                        <span className={styles.phaseBadge}>{PHASES[activePhaseIdx].tag}</span>
                                        <span className={styles.phaseBadgeLine}></span>
                                    </div>
                                    
                                    <h3 className={styles.phaseTitle}>{PHASES[activePhaseIdx].title}</h3>
                                    
                                    {PHASES[activePhaseIdx].quote ? (
                                        <blockquote className={styles.phaseQuote}>
                                            "{PHASES[activePhaseIdx].quote}"
                                        </blockquote>
                                    ) : (
                                        <p className={styles.phaseDescription}>
                                            {PHASES[activePhaseIdx].description}
                                        </p>
                                    )}

                                    {/* Phase 1 Specs */}
                                    {PHASES[activePhaseIdx].type === "stats" && PHASES[activePhaseIdx].specs && (
                                        <div className={styles.phaseSpecsGrid}>
                                            {PHASES[activePhaseIdx].specs.map((spec, sIdx) => (
                                                <div key={sIdx}>
                                                    <span className={styles.phaseSpecLabel}>{spec.label}</span>
                                                    <span className={styles.phaseSpecValue}>{spec.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Phase 2 Failures */}
                                    {PHASES[activePhaseIdx].type === "failures" && PHASES[activePhaseIdx].failures && (
                                        <div className={styles.failurePointsCard}>
                                            <h4 className={styles.failurePointsTitle}>
                                                <AlertTriangle className={styles.failureWarningIcon} size={18} /> Identified Failure Points
                                            </h4>
                                            <ul className={styles.failurePointsList}>
                                                {PHASES[activePhaseIdx].failures.map((fail, fIdx) => (
                                                    <li key={fIdx}>
                                                        <X className={styles.failureCrossIcon} size={16} />
                                                        <span>{fail}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Phase 3 Schematic Overlay Card */}
                                    {PHASES[activePhaseIdx].type === "schematic" && (
                                        <div className={styles.toleranceOverlayCard}>
                                            <span className={styles.toleranceLabel}>{PHASES[activePhaseIdx].tolerance}</span>
                                            <span className={styles.toleranceDesc}>{PHASES[activePhaseIdx].toleranceDesc}</span>
                                        </div>
                                    )}

                                    {/* Phase 4 Capabilities */}
                                    {PHASES[activePhaseIdx].type === "capabilities" && PHASES[activePhaseIdx].capabilities && (
                                        <div className={styles.capabilitiesList}>
                                            {PHASES[activePhaseIdx].capabilities.map((cap, cIdx) => (
                                                <div key={cIdx} className={styles.capabilityItem}>
                                                    <div className={styles.capabilityIconWrapper}>
                                                        {getIcon(cap.icon)}
                                                    </div>
                                                    <div>
                                                        <span className={styles.capabilityTitle}>{cap.title}</span>
                                                        <span className={styles.capabilityDesc}>{cap.desc}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right Panel: Showcase Image */}
                            <div className={styles.consoleRight}>
                                <div className={styles.showcaseImageWrapper}>
                                    <img
                                        alt={PHASES[activePhaseIdx].title}
                                        className={styles.showcaseImage}
                                        src={PHASES[activePhaseIdx].image}
                                    />
                                    <div className={styles.phaseImageOverlay}></div>
                                    <div className={styles.phaseImageCaption}>{PHASES[activePhaseIdx].caption}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Chapter IV: Mission & Vision */}
            <section
                ref={missionVisionFade.elementRef}
                className={`${styles.missionVisionSection} ${styles.scrollFade} ${missionVisionFade.isVisible ? styles.visible : ""}`}
            >
                <div className={styles.container}>
                    <div className={styles.missionVisionGrid}>
                        {/* Mission */}
                        <div className={styles.missionBlock}>
                            <div className={styles.sectionHeaderLeft}>
                                <div className={styles.redBadgeLine}></div>
                                <span className={styles.specsTag}>Our Mission</span>
                            </div>
                            <blockquote className={styles.quoteSerif}>
                                "To deliver uncompromising protection through <span className={styles.highlightItalic}>precision engineering</span>, ensuring every vessel we manufacture is a masterpiece of durability and safety."
                            </blockquote>
                            <div className={styles.mediaWrapper}>
                                <img
                                    className={styles.mediaImage}
                                    alt="Clean high-tech industrial manufacturing facility with robotic arms assembling precision containers"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3Qk_0fsYZe5an39omHzWLyS2zj-D_hToO-1YCqikKTb_lE8xw4tuvICbKg_3esS3TWO6de-El4ljmmz2HsYD9afex5lNi8VpdHnRFXWP5lgfELbh392YbUEvrfkxWVJf04mrKhnyyVy7ZBqRH4yYFE0daKzUjo2ya2a53kassR4QjcLAzz-YUryyztaW2LvwSTR5bJ-VMIWbKM8YLUMlOa0Ep_8HCLfWVULvANNz_Ak3QmmxBNSCq2C_WpxAz3cGUdYgRR5AqUwRm"
                                />
                            </div>
                        </div>

                        {/* Vision */}
                        <div className={styles.visionBlock}>
                            <div className={styles.sectionHeaderLeft}>
                                <div className={styles.redBadgeLine}></div>
                                <span className={styles.specsTag}>Our Vision</span>
                            </div>
                            <blockquote className={styles.quoteSerif}>
                                "To set the global standard for industrial packaging systems, driving transit safety, <span className={styles.highlightItalic}>automation</span>, and circular polymer technology."
                            </blockquote>
                            <div className={styles.mediaWrapper}>
                                <img
                                    className={styles.mediaImage}
                                    alt="Futuristic macro close-up of high-quality circular polymer beads reflecting clean studio lights"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBi-t0VhHLvizlpi3C3oSmr51bT-zZ5o1x0CjXI6lGBy6MDwxufWfcRQ-1aZs9FOaVYnhXSlflJGZtQWR8arIoFnpgkRYoF4IomsxZtASK679C-QS3Hxe8SL1T8Sp6k9HgFgNNfvALCK69AbonFk69U8L_mbmN9EaaQpnl8gHBa677eWxo41OapGusgworPXozmFD_du0lyPJ5uiHD_7PVLymzmWOzbuLoJnhC_nmDIH4aH7vTMNTQFIWfG-pxDVohXYV2ZgethdTNn"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chapter V: Core Values */}
            <div ref={valuesRef} style={{ scrollMarginTop: "2rem" }}>
                <section
                    ref={valuesFade.elementRef}
                    className={`${styles.valuesSection} ${styles.scrollFade} ${valuesFade.isVisible ? styles.visible : ""}`}
                >
                    <div className={styles.container}>
                        <div className={styles.valuesHeader}>
                            <span className={styles.specsTag}>Chapter V: Values</span>
                            <h2 className={styles.sectionTitle} style={{ textAlign: "left" }}>The Pillars of Precision</h2>
                            <div className={styles.redLineAccent}></div>
                        </div>

                        <div className={styles.valuesGrid}>
                            {/* Value 1 */}
                            <div className={styles.valueCard}>
                                <span className={styles.valueMeta}>CORE_TENET / 01</span>
                                <h3 className={styles.valueTitle}>
                                    <Settings className={styles.valueIcon} size={24} />
                                    Precision Engineering
                                </h3>
                                <p className={styles.valueDesc}>
                                    An obsessive focus on microns. Every component is measured against aerospace-grade tolerances to ensure perfect structural integrity under extreme pressure.
                                </p>
                            </div>

                            {/* Value 2 */}
                            <div className={styles.valueCard}>
                                <span className={styles.valueMeta}>MATERIAL_SCIENCE / 02</span>
                                <h3 className={styles.valueTitle}>
                                    <Layers className={styles.valueIcon} size={24} />
                                    Material Integrity
                                </h3>
                                <p className={styles.valueDesc}>
                                    Proprietary durable polymers designed for chemical resistance and thermal stability. Our materials don't just hold; they protect the soul of your product.
                                </p>
                            </div>

                            {/* Value 3 */}
                            <div className={styles.valueCard}>
                                <span className={styles.valueMeta}>ECOLOGY / 03</span>
                                <h3 className={styles.valueTitle}>
                                    <Recycle className={styles.valueIcon} size={24} />
                                    Circular Economy
                                </h3>
                                <p className={styles.valueDesc}>
                                    100% recyclable technology that minimizes environmental footprint without compromising on industrial strength. Engineered for a closed-loop future.
                                </p>
                            </div>

                            {/* Value 4 */}
                            <div className={styles.valueCard}>
                                <span className={styles.valueMeta}>LOGISTICS_SEC / 04</span>
                                <h3 className={styles.valueTitle}>
                                    <ShieldCheck className={styles.valueIcon} size={24} />
                                    Transit Security
                                </h3>
                                <p className={styles.valueDesc}>
                                    Zero-leak vacuum seals and impact-absorption geometry. We provide the final layer of defense between your assets and the uncertainties of global transit.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Chapter VI: Team */}
            <section
                ref={teamFade.elementRef}
                className={`${styles.teamSection} ${styles.scrollFade} ${teamFade.isVisible ? styles.visible : ""}`}
            >
                <div className={styles.container}>
                    <div className={styles.teamHeader}>
                        <span className={styles.specsTag}>Chapter VI: Executive Leadership</span>
                        <h2 className={styles.sectionTitle}>The Architects of Protection</h2>
                    </div>

                    <div className={styles.teamGrid}>
                        {/* Member 1 */}
                        <div className={styles.teamCard}>
                            <div className={styles.teamImageWrapper}>
                                <img
                                    className={styles.teamImage}
                                    alt="Marcus Sterling CEO & Founder"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD81439fPN02-RWQFNq6A4GtA4AMTMFV1kaggYsYRkgxt89x17BU0JGSEfqXjb4A5Gl8ahuMnBxu3C0cHLHVqStIjDKeQk--85_2YM-MY2q6Fwbj4rTh_s8BaWoEwcIBL0rSpPelIp1g8c-GhBcnx32G1jHpcb-ANh4XpvDbzwIc0OcAoOmx7pzC3WxrukLvayA8ikgYAEWFI4vLST_Ct3HLepLVJ2bvmlq1F7a-_5hNranzzjgWrvkL8QJfLcl1y_a6ym_4a0Antgk"
                                />
                            </div>
                            <div className={styles.teamInfo}>
                                <h4 className={styles.memberName}>Marcus Sterling</h4>
                                <span className={styles.memberRole}>CEO &amp; FOUNDER</span>
                                <p className={styles.memberDesc}>
                                    Driving the strategic vision and industrial dominance of Softwares Packers for over two decades.
                                </p>
                            </div>
                        </div>

                        {/* Member 2 */}
                        <div className={styles.teamCard}>
                            <div className={styles.teamImageWrapper}>
                                <img
                                    className={styles.teamImage}
                                    alt="Dr. Elena Volkov Head of Polymer Engineering"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAe1T_7RRs8CScTe7DMuoFRt3NYVvqKZllENBRLU-Ymp7OfGDZUar82XUTt0wjQ8pPReAPeTiuQeUeOZoaDtDN3nSCd63Hei8pldkg71CxyccfycS0AqulnfuN5qkr5zePbbiuXXipHc0eqVUihsf1Lj8mO0YATU4DdYdLvuDSxoP7Q0GuIGPrvggaCgMO_gBaW5J1mdGn2UpPxdwHqVqTzGrfK8yl7sswIFMmW1KHzKJEYSAJ_Jt2pb8TPyKZzDwUJv89tlZVmvE7k"
                                />
                            </div>
                            <div className={styles.teamInfo}>
                                <h4 className={styles.memberName}>Dr. Elena Volkov</h4>
                                <span className={styles.memberRole}>HEAD OF POLYMER ENGINEERING</span>
                                <p className={styles.memberDesc}>
                                    A material science expert revolutionizing containment through advanced molecular bond research.
                                </p>
                            </div>
                        </div>

                        {/* Member 3 */}
                        <div className={styles.teamCard}>
                            <div className={styles.teamImageWrapper}>
                                <img
                                    className={styles.teamImage}
                                    alt="Julian Thorne Chief Automation Architect"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX8lnAkyJgiMGgjMLsQntF5srQdMQrH6jLc6nacY-TPBM5pZqTkbWuwgAW1Ps9fP5gvEXI8Gjwcf9VJE1cTUvTxma-oy18O21lOUN5BD2UfvluiT-Zc2hKaggOlAfd7c-gMnmyicjoXH8QwLaIOsJpLCE2nYpjP7-Ii-xZhprfX9pOM0JkgE9X6xwlbG-2JildJCdnhka4Ymm3klRXjaxTnBAO3N_hLSLjeQruGYsnfJP_ClZ_cnrrcs3A6xEQzPc3OB3Whkj2_jUc"
                                />
                            </div>
                            <div className={styles.teamInfo}>
                                <h4 className={styles.memberName}>Julian Thorne</h4>
                                <span className={styles.memberRole}>CHIEF AUTOMATION ARCHITECT</span>
                                <p className={styles.memberDesc}>
                                    Leading the robotics and AI-driven manufacturing processes that define our production precision.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chapter VII: Social Proof */}
            <section
                ref={socialProofFade.elementRef}
                className={`${styles.socialProofSection} ${styles.scrollFade} ${socialProofFade.isVisible ? styles.visible : ""}`}
            >
                <div className={styles.container}>
                    <div className={styles.socialProofGrid}>
                        {/* Testimonial */}
                        <div className={styles.testimonialWrapper}>
                            <span className={styles.quoteMark}>“</span>
                            <div className={styles.testimonialContent}>
                                <p className={styles.testimonialQuote}>
                                    "Softwares Packers transformed our logistics workflow. Their precision containers reduced transit loss by 94% across our entire chemical supply chain."
                                </p>
                                <div className={styles.testimonialAuthor}>
                                    <span className={styles.authorName}>Director of Logistics</span>
                                    <span className={styles.authorCompany}>Global Pharma Alliance</span>
                                </div>
                            </div>
                        </div>

                        {/* Certifications */}
                        <div className={styles.certificationsCard}>
                            <h3 className={styles.certificationsHeader}>Global Compliance Standards</h3>
                            <div className={styles.certificationsGrid}>
                                <div className={styles.certItem}>
                                    <Award className={styles.certIcon} size={40} />
                                    <span className={styles.certLabel}>ISO 9001</span>
                                </div>
                                <div className={styles.certItem}>
                                    <Leaf className={styles.certIcon} size={40} />
                                    <span className={styles.certLabel}>ISO 14001</span>
                                </div>
                                <div className={styles.certItem}>
                                    <ShieldCheck className={styles.certIcon} size={40} />
                                    <span className={styles.certLabel}>CE CONFORMITY</span>
                                </div>
                            </div>
                            <div className={styles.certFootnote}>
                                <p>Audited and verified for extreme industrial application.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
