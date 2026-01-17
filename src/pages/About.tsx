import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Factory,
    Award,
    Users,
    Target,
    CheckCircle,
    MapPin,
    Calendar,
    TrendingUp
} from "lucide-react";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { COMPANY_WHATSAPP } from "@/config/constants";
import styles from "./css/About.module.css";

const About = () => {
    const values = [
        {
            icon: Award,
            title: "Quality First",
            description: "We maintain strict quality standards across all our manufacturing processes, ensuring every container meets industry specifications."
        },
        {
            icon: Users,
            title: "Customer Focus",
            description: "Your success is our priority. We work closely with clients to understand their needs and deliver solutions that exceed expectations."
        },
        {
            icon: Target,
            title: "Innovation",
            description: "We continuously invest in new technologies and processes to improve our products and manufacturing capabilities."
        },
        {
            icon: TrendingUp,
            title: "Growth",
            description: "From a small local manufacturer to serving businesses across North India, we're committed to sustainable growth and expansion."
        }
    ];

    const milestones = [
        { year: "2010", event: "Company founded in North India" },
        { year: "2015", event: "Expanded production capacity by 300%" },
        { year: "2018", event: "Launched custom molding services" },
        { year: "2020", event: "Reached 10,000+ business clients" },
        { year: "2024", event: "Leading manufacturer in North India" }
    ];

    const stats = [
        { label: "Years of Experience", value: "14+", icon: Calendar },
        { label: "Happy Clients", value: "10,000+", icon: Users },
        { label: "Products Manufactured", value: "50M+", icon: Factory },
        { label: "Cities Served", value: "50+", icon: MapPin }
    ];

    return (
        <div className={styles.pageContainer}>
            <div className={styles.container}>
                {/* Hero Section */}
                <div className={styles.hero}>
                    <Badge className={styles.badge} variant="secondary">
                        <Factory className="h-3.5 w-3.5 mr-1.5" />
                        About Us
                    </Badge>
                    <h1 className={styles.title}>Leading Plastic Container Manufacturer in North India</h1>
                    <p className={styles.subtitle}>
                        For over 14 years, Softwares Packers has been manufacturing high-quality plastic containers
                        for businesses across North India. From food packaging to industrial storage, we deliver
                        reliable solutions that keep your products safe and fresh.
                    </p>
                </div>

                {/* Stats Section */}
                <div className={styles.statsGrid}>
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={index} className={styles.statCard}>
                                <CardContent className={styles.statContent}>
                                    <Icon className={styles.statIcon} />
                                    <div className={styles.statValue}>{stat.value}</div>
                                    <div className={styles.statLabel}>{stat.label}</div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Story Section */}
                <div className={styles.storySection}>
                    <div className={styles.storyContent}>
                        <h2 className={styles.sectionTitle}>Our Story</h2>
                        <div className={styles.storyText}>
                            <p>
                                Founded in 2010, Softwares Packers started as a small manufacturing unit with a vision
                                to provide high-quality plastic containers to local businesses. What began as a modest
                                operation has grown into one of North India's most trusted plastic container manufacturers.
                            </p>
                            <p>
                                Over the years, we've expanded our product range, invested in modern manufacturing
                                equipment, and built lasting relationships with thousands of businesses across Delhi,
                                Punjab, Haryana, and beyond. Our commitment to quality, customer service, and innovation
                                has been the cornerstone of our success.
                            </p>
                            <p>
                                Today, we manufacture millions of containers annually, serving industries ranging from
                                food and beverages to pharmaceuticals, chemicals, and agriculture. Our state-of-the-art
                                facility combines traditional craftsmanship with modern technology to deliver products
                                that meet the highest standards.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className={styles.valuesSection}>
                    <h2 className={styles.sectionTitle}>Our Core Values</h2>
                    <p className={styles.sectionSubtitle}>
                        The principles that guide everything we do
                    </p>
                    <div className={styles.valuesGrid}>
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <Card key={index} className={styles.valueCard}>
                                    <CardContent className={styles.valueContent}>
                                        <div className={styles.valueIconWrapper}>
                                            <Icon className={styles.valueIcon} />
                                        </div>
                                        <h3 className={styles.valueTitle}>{value.title}</h3>
                                        <p className={styles.valueDescription}>{value.description}</p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* Milestones Section */}
                <div className={styles.milestonesSection}>
                    <h2 className={styles.sectionTitle}>Our Journey</h2>
                    <div className={styles.milestonesTimeline}>
                        {milestones.map((milestone, index) => (
                            <div key={index} className={styles.milestoneItem}>
                                <div className={styles.milestoneYear}>{milestone.year}</div>
                                <div className={styles.milestoneEvent}>
                                    <CheckCircle className={styles.milestoneIcon} />
                                    {milestone.event}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mission Section */}
                <Card className={styles.missionCard}>
                    <CardContent className={styles.missionContent}>
                        <h2 className={styles.missionTitle}>Our Mission</h2>
                        <p className={styles.missionText}>
                            To be India's most trusted partner for plastic container solutions, delivering
                            exceptional quality, innovative designs, and outstanding customer service. We're committed
                            to helping businesses succeed by providing reliable, cost-effective packaging solutions
                            that protect their products and enhance their brand.
                        </p>
                    </CardContent>
                </Card>
            </div>
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

