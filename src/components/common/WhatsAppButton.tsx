import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import styles from '../css/WhatsAppButton.module.css';
import { cn } from '@/lib/utils';

interface WhatsAppButtonProps {
    phoneNumber: string;
    message?: string;
    className?: string;
    variant?: 'floating' | 'inline';
    size?: 'sm' | 'lg' | 'default' | 'icon';
}

/**
 * WhatsAppButton - Floating or inline WhatsApp CTA button
 * Optimized for Indian market where WhatsApp is primary communication channel
 */
const WhatsAppButton = ({
    phoneNumber,
    message = "Hello, I'm interested in your plastic containers.",
    className,
    variant = 'floating',
    size = 'default'
}: WhatsAppButtonProps) => {
    // Format phone number (remove any non-digits)
    const formattedPhone = phoneNumber.replace(/\D/g, '');

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;

    const handleClick = () => {
        // Analytics tracking can be added here
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    if (variant === 'floating') {
        return (
            <Button
                onClick={handleClick}
                className={cn(styles.floatingButton, className)}
                size={size}
                aria-label="Chat with us on WhatsApp"
            >
                <MessageCircle className={styles.iconLarge} aria-hidden="true" />
                <span className={styles.floatingText}>Chat with Us</span>
            </Button>
        );
    }

    return (
        <Button
            onClick={handleClick}
            variant="default"
            className={cn(styles.inlineButton, className)}
            size={size}
            aria-label="Contact us on WhatsApp"
        >
            <MessageCircle className={styles.iconSmallWithMargin} aria-hidden="true" />
            WhatsApp Us
        </Button>
    );
};

export default WhatsAppButton;

