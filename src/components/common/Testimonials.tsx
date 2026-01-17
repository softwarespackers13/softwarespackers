import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import styles from '../css/Testimonials.module.css';
import { cn } from '@/lib/utils';

interface Testimonial {
    id: string;
    text: string;
    author: string;
    position: string;
    company: string;
    rating: number;
    location?: string;
}

interface TestimonialsProps {
    testimonials: Testimonial[];
    title?: string;
    subtitle?: string;
    maxDisplay?: number;
}

/**
 * Testimonials - Displays customer testimonials with ratings
 * Optimized with memoization and accessibility features
 */
const Testimonials = ({
    testimonials,
    title = "What Our Clients Say",
    subtitle = "Trusted by businesses across North India",
    maxDisplay = 3
}: TestimonialsProps) => {
    // Memoize filtered testimonials
    const displayedTestimonials = useMemo(() =>
        testimonials.slice(0, maxDisplay),
        [testimonials, maxDisplay]
    );

    if (displayedTestimonials.length === 0) {
        return null;
    }

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={`star-${index}`}
                className={cn(
                    styles.star,
                    index < rating
                        ? styles.starFilled
                        : styles.starEmpty
                )}
                aria-hidden="true"
            />
        ));
    };

    return (
        <section className={styles.testimonialsSection} aria-label="Customer testimonials">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                </div>

                <div className={styles.testimonialsGrid}>
                    {displayedTestimonials.map((testimonial) => (
                        <Card
                            key={testimonial.id}
                            className={cn(styles.testimonialCard, styles.testimonialCardGroup)}
                        >
                            <CardContent className={styles.cardContent}>
                                {/* Rating */}
                                <div
                                    className={styles.rating}
                                    role="img"
                                    aria-label={`${testimonial.rating} out of 5 stars`}
                                >
                                    {renderStars(testimonial.rating)}
                                </div>

                                {/* Testimonial Text */}
                                <blockquote className={styles.quote}>
                                    <p className={styles.quoteText}>"{testimonial.text}"</p>
                                </blockquote>

                                {/* Author Info */}
                                <div className={styles.author}>
                                    <div className={styles.authorInfo}>
                                        <div className={styles.authorName}>{testimonial.author}</div>
                                        <div className={styles.authorPosition}>
                                            {testimonial.position}
                                        </div>
                                        <div className={styles.authorCompany}>
                                            {testimonial.company}
                                            {testimonial.location && (
                                                <span className={styles.location}>
                                                    {' '}• {testimonial.location}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

