import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Search,
    MessageSquare,
    FileText,
    Factory,
    Truck,
    CheckCircle
} from 'lucide-react';
import styles from '../css/HowItWorks.module.css';
import { cn } from '@/lib/utils';

interface Step {
    id: string;
    number: number;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
}

const STEPS: Step[] = [
    {
        id: 'step-1',
        number: 1,
        title: 'Browse & Select',
        description: 'Explore our catalog or describe your custom requirements.',
        icon: Search
    },
    {
        id: 'step-2',
        number: 2,
        title: 'Get Quote',
        description: 'Receive a detailed quote with transparent pricing.',
        icon: MessageSquare
    },
    {
        id: 'step-3',
        number: 3,
        title: 'Confirm Order',
        description: 'Review and approve the quote or design mockups.',
        icon: FileText
    },
    {
        id: 'step-4',
        number: 4,
        title: 'Production',
        description: 'We manufacture your order with quality checks.',
        icon: Factory
    },
    {
        id: 'step-5',
        number: 5,
        title: 'Quality Check',
        description: 'Rigorous testing ensures high standards.',
        icon: CheckCircle
    },
    {
        id: 'step-6',
        number: 6,
        title: 'Fast Delivery',
        description: 'Carefully packaged and shipped to you.',
        icon: Truck
    }
];

interface HowItWorksProps {
    title?: string;
    subtitle?: string;
}

/**
 * HowItWorks - Visual process flow showing how customers work with the company
 * Optimized for clarity and conversion
 */
const HowItWorks = ({
    title = "How It Works",
    subtitle = "Simple process from inquiry to delivery"
}: HowItWorksProps) => {
    return (
        <section className={styles.howItWorksSection} aria-label="How it works">
            <div className={styles.container}>
                <div className={styles.header}>
                    <Badge variant="outline" className={styles.badge}>
                        Our Process
                    </Badge>
                    <h2 className={styles.title}>{title}</h2>
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                </div>

                <div className={styles.stepsContainer}>
                    {STEPS.map((step, index) => {
                        const Icon = step.icon;
                        const isLast = index === STEPS.length - 1;
                        // Determine position in C-shape: 0-2 top, 3 right, 4-5 bottom
                        const position = index < 3 ? 'top' : index === 3 ? 'right' : 'bottom';
                        // For bottom row: step 5 (index 4) goes left (col 1), step 6 (index 5) goes right (col 2)
                        const positionInRow = index < 3 ? index : index === 3 ? 0 : index === 4 ? 0 : 1;

                        return (
                            <div
                                key={step.id}
                                className={cn(
                                    styles.stepWrapper,
                                    styles[`step${position.charAt(0).toUpperCase() + position.slice(1)}`],
                                    styles[`stepPosition${positionInRow}`]
                                )}
                            >
                                <Card className={cn(styles.stepCard, styles.stepCardGroup)}>
                                    <CardContent className={styles.stepContent}>
                                        <div className={styles.stepNumber}>{step.number}</div>
                                        <div className={styles.stepIconContainer}>
                                            <Icon className={styles.stepIcon} aria-hidden="true" />
                                        </div>
                                        <h3 className={styles.stepTitle}>{step.title}</h3>
                                        <p className={styles.stepDescription}>{step.description}</p>
                                    </CardContent>
                                </Card>
                                {!isLast && (
                                    <div
                                        className={cn(
                                            styles.connector,
                                            index === 3 ? styles.connectorRightToBottom : styles[`connector${position.charAt(0).toUpperCase() + position.slice(1)}`]
                                        )}
                                        aria-hidden="true"
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;

