import { cn } from '@/lib/utils';
import styles from '../css/LoadingAnimation.module.css';

interface LoadingAnimationProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    showText?: boolean;
    variant?: 'default' | 'minimal';
}

/**
 * LoadingAnimation - Professional loading animation using company logo
 * 
 * A refined, subtle loading animation designed for a plastic container
 * manufacturing company. Features the Softwares Packers logo with
 * elegant, non-distracting animations that convey professionalism
 * and reliability.
 * 
 * Design principles:
 * - Minimal and purposeful
 * - Smooth, natural motion
 * - Respects user preferences
 * - Accessible and performant
 * 
 * @param className - Additional CSS classes
 * @param size - Size variant: 'sm', 'md', or 'lg' (default: 'md')
 * @param showText - Whether to show loading text (default: true)
 * @param variant - Visual variant: 'default' or 'minimal' (default: 'default')
 */
const LoadingAnimation = ({
    className,
    size = 'md',
    showText = true,
    variant = 'default'
}: LoadingAnimationProps) => {
    return (
        <div
            className={cn(
                styles.loaderContainer,
                styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`],
                variant === 'minimal' && styles.minimal,
                className
            )}
            role="status"
            aria-label="Loading"
        >
            <div className={styles.logoWrapper}>
                {/* Subtle progress indicator - only in default variant */}
                {variant === 'default' && (
                    <>
                        <div className={styles.progressRing} aria-hidden="true">
                            <svg className={styles.progressSvg} viewBox="0 0 100 100">
                                <circle
                                    className={styles.progressCircle}
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="none"
                                    strokeWidth="2"
                                />
                            </svg>
                        </div>
                        {/* Subtle background glow */}
                        <div className={styles.backgroundGlow} aria-hidden="true" />
                    </>
                )}

                {/* Logo container with refined animation */}
                <div className={styles.logoContainer}>
                    <img
                        src="/assets/logos/swp-logo.png"
                        alt="Softwares Packers"
                        className={styles.logo}
                        loading="eager"
                    />
                    {/* Subtle shine effect on logo - only in default variant */}
                    {variant === 'default' && (
                        <div className={styles.logoShine} aria-hidden="true" />
                    )}
                </div>
            </div>

            {/* Optional loading text with refined animation */}
            {showText && (
                <div className={styles.loadingText}>
                    <span className={styles.loadingLabel}>Loading</span>
                    <span className={styles.dots} aria-hidden="true">
                        <span className={styles.dot}></span>
                        <span className={styles.dot}></span>
                        <span className={styles.dot}></span>
                    </span>
                </div>
            )}

            <span className="sr-only">Loading content...</span>
        </div>
    );
};

export default LoadingAnimation;
