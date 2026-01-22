import { useMemo, useCallback } from 'react';
import LogoLoop from './LogoLoop';
import { cn } from '@/lib/utils';
import styles from '../css/BrandCarousel.module.css';

interface Client {
    id: string;
    name: string;
    logo: string;
    industry: string;
}

interface BrandCarouselProps {
    clients: Client[];
    title?: string;
    subtitle?: string;
}

/**
 * BrandCarousel - Auto-scrolling brand logo carousel
 * Displays client logos in a continuous horizontal scroll using LogoLoop
 */
const BrandCarousel = ({
    clients,
    title = "Trusted by Industry Leaders",
    subtitle = "Serving businesses across India"
}: BrandCarouselProps) => {
    // Memoize to prevent unnecessary re-renders
    const validClients = useMemo(() =>
        clients.filter(client => client.logo && client.name),
        [clients]
    );

    if (validClients.length === 0) {
        return null;
    }

    // Convert clients to LogoLoop format with size information
    const logoItems = useMemo(() =>
        validClients.map(client => ({
            src: client.logo,
            alt: `${client.name} logo`,
            title: client.name,
            name: client.name // Keep name for size detection
        })),
        [validClients]
    );

    // Logos that should be larger
    const largerLogos = ['Super Cremica', 'Ginni', 'Lovely'];
    const largerLogoHeight = 72; // 28% larger than default 56px
    const defaultLogoHeight = 56;

    // Custom render function to apply different sizes
    const renderLogoItem = useCallback((item: { src?: string; alt?: string; title?: string; name?: string }, key: string) => {
        const isLarger = item.name && largerLogos.includes(item.name);
        const logoHeight = isLarger ? largerLogoHeight : defaultLogoHeight;

        return (
            <img
                src={item.src}
                alt={item.alt ?? ''}
                title={item.title}
                loading="lazy"
                decoding="async"
                draggable={false}
                className={cn(
                    styles.logoImage,
                    isLarger ? styles.logoImageLarge : styles.logoImageDefault
                )}
                style={{
                    height: `${logoHeight}px`,
                    maxHeight: `${logoHeight}px`
                }}
            />
        );
    }, []);

    return (
        <section className={styles.brandCarouselSection} aria-label="Our clients">
            <div className={styles.container}>
                {(title || subtitle) && (
                    <div className={styles.header}>
                        {title && <h2 className={styles.title}>{title}</h2>}
                        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                    </div>
                )}
            </div>
            <div className={styles.carouselWrapper}>
                <LogoLoop
                    logos={logoItems}
                    speed={120}
                    direction="left"
                    logoHeight={defaultLogoHeight}
                    gap={40}
                    hoverSpeed={0}
                    scaleOnHover
                    fadeOut
                    fadeOutColor="hsl(var(--background))"
                    ariaLabel="Trusted by Industry Leaders"
                    renderItem={renderLogoItem}
                />
            </div>
        </section>
    );
};

export default BrandCarousel;

