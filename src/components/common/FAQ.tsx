import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import styles from '../css/FAQ.module.css';
import { cn } from '@/lib/utils';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

interface FAQProps {
    faqs: FAQItem[];
    title?: string;
    subtitle?: string;
}

/**
 * FAQ - Accordion-style FAQ section
 * Optimized with proper accessibility and keyboard navigation
 */
const FAQ = ({
    faqs,
    title = "Frequently Asked Questions",
    subtitle = "Everything you need to know about our products and services"
}: FAQProps) => {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());

    const toggleItem = (id: string) => {
        setOpenItems((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    if (faqs.length === 0) {
        return null;
    }

    return (
        <section className={styles.faqSection} aria-label="Frequently asked questions">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                </div>

                <div className={styles.faqList}>
                    {faqs.map((faq) => {
                        const isOpen = openItems.has(faq.id);
                        return (
                            <Card
                                key={faq.id}
                                className={cn(styles.faqItem, isOpen && styles.faqItemOpen)}
                            >
                                <button
                                    className={styles.faqQuestion}
                                    onClick={() => toggleItem(faq.id)}
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-answer-${faq.id}`}
                                >
                                    <span className={styles.questionText}>{faq.question}</span>
                                    <ChevronDown
                                        className={cn(
                                            styles.chevron,
                                            isOpen && styles.chevronOpen
                                        )}
                                        aria-hidden="true"
                                    />
                                </button>
                                <div
                                    id={`faq-answer-${faq.id}`}
                                    className={cn(styles.faqAnswer, isOpen && styles.faqAnswerOpen)}
                                    role="region"
                                    aria-hidden={!isOpen}
                                >
                                    <CardContent className={styles.answerContent}>
                                        <p className={styles.answerText}>{faq.answer}</p>
                                    </CardContent>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQ;

