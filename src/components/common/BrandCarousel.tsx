import { useMemo } from 'react';
import styles from '../css/BrandCarousel.module.css';

interface Client {
    id: string;
    name: string;
    logo?: string;
    industry?: string;
}

interface BrandCarouselProps {
    clients: Client[];
}

/**
 * BrandCarousel - Auto-scrolling brand carousel
 * Renders client logos in a continuous horizontal scrolling loop
 */
const BrandCarousel = ({ clients }: BrandCarouselProps) => {
    // Extract valid clients with logos and duplicate array to create a seamless infinite loop
    const displayClients = useMemo(() => {
        const validClients = clients.filter(c => c.logo && c.name);
        // Duplicate multiple times to ensure it's wide enough to scroll seamlessly
        return [...validClients, ...validClients, ...validClients, ...validClients]; 
    }, [clients]);

    if (displayClients.length === 0) {
        return null;
    }

    const largerLogos = ['Super Cremica', 'Ginni', 'Lovely'];

    return (
        <section className={styles.brandCarouselSection} aria-label="Our clients">
            <div className={styles.scrollContainer}>
                <div className={styles.scrollTrack}>
                    {displayClients.map((client, idx) => {
                        const isLarger = largerLogos.includes(client.name);
                        return (
                            <img
                                key={idx}
                                src={client.logo}
                                alt={client.name}
                                title={client.name}
                                className={isLarger ? styles.brandLogoLarge : styles.brandLogo}
                                loading="lazy"
                                draggable={false}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default BrandCarousel;
