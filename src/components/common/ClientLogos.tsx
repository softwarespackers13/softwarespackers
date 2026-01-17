import { useMemo } from 'react';
import OptimizedImage from './OptimizedImage';
import styles from '../css/ClientLogos.module.css';

interface Client {
    id: string;
    name: string;
    logo: string;
    industry: string;
}

interface ClientLogosProps {
    clients: Client[];
    title?: string;
    subtitle?: string;
}

/**
 * ClientLogos - Displays client logos in an auto-scrolling carousel
 * Optimized for performance with lazy loading and error handling
 */
const ClientLogos = ({
    clients,
    title = "Trusted by Industry Leaders",
    subtitle = "Serving businesses across North India"
}: ClientLogosProps) => {
    // Memoize to prevent unnecessary re-renders
    const validClients = useMemo(() =>
        clients.filter(client => client.logo && client.name),
        [clients]
    );

    if (validClients.length === 0) {
        return null;
    }

    // Duplicate clients for seamless infinite scroll
    const duplicatedClients = [...validClients, ...validClients];

    return (
        <section className={styles.clientLogosSection} aria-label="Our clients">
            <div className={styles.container}>
                {(title || subtitle) && (
                    <div className={styles.header}>
                        {title && <h2 className={styles.title}>{title}</h2>}
                        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                    </div>
                )}

                <div className={styles.carouselWrapper}>
                    <div className={styles.carouselTrack} aria-hidden="true">
                        {duplicatedClients.map((client, index) => (
                            <div
                                key={`${client.id}-${index}`}
                                className={styles.logoItem}
                                title={client.name}
                            >
                                <OptimizedImage
                                    src={client.logo}
                                    alt={`${client.name} logo`}
                                    className={styles.logoImage}
                                    loading="lazy"
                                    errorMessage={`${client.name} logo`}
                                />
                                <span className="sr-only">{client.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClientLogos;

