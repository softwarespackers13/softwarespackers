import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Send,
    MessageSquare,
    CheckCircle,
    AlertCircle
} from "lucide-react";
import { sanitizeInput } from "@/lib/validation";
import { contactFormSchema, type ContactFormData } from "@/lib/validation-schemas";
import { COMPANY_PHONE, COMPANY_EMAIL, COMPANY_ADDRESS, COMPANY_WHATSAPP, IS_DEV } from "@/config/constants";
import { logError } from "@/lib/errorHandler";
import { ErrorSeverity } from "@/lib/errorHandler";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import styles from "./css/Contact.module.css";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: ""
    });
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: sanitizeInput(value)
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        try {
            // Validate form data
            const validatedData = contactFormSchema.parse(formData);

            // Log in development mode only
            if (IS_DEV) {
                console.log("Form submitted:", validatedData);
            }

            // In a real app, this would send data to an API
            // await submitContactForm(validatedData);

            // Log successful submission
            logError("Contact form submitted successfully", { component: 'Contact' }, ErrorSeverity.INFO);

            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    company: "",
                    message: ""
                });
            }, 3000);
        } catch (error) {
            if (error instanceof Error && 'issues' in error) {
                // Zod validation errors
                const zodError = error as any;
                const fieldErrors: Record<string, string> = {};
                zodError.issues?.forEach((issue: any) => {
                    if (issue.path && issue.path.length > 0) {
                        fieldErrors[issue.path[0]] = issue.message;
                    }
                });
                setErrors(fieldErrors);
            } else {
                logError(error as Error, { component: 'Contact', action: 'form_submit' });
                setErrors({ submit: "An error occurred. Please try again." });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: Phone,
            title: "Phone",
            content: COMPANY_PHONE.replace(/(\d{2})(\d{5})(\d{5})/, "+$1-$2-$3"), // Format: +91-88728-32012
            link: `tel:${COMPANY_PHONE}`
        },
        {
            icon: Mail,
            title: "Email",
            content: COMPANY_EMAIL,
            link: `mailto:${COMPANY_EMAIL}`
        },
        {
            icon: MapPin,
            title: "Address",
            content: COMPANY_ADDRESS,
            link: null
        },
        {
            icon: Clock,
            title: "Business Hours",
            content: "Mon - Sat: 9:00 AM - 6:00 PM",
            link: null
        }
    ];

    return (
        <div className={styles.pageContainer}>
            <div className={styles.container}>
                {/* Hero Section */}
                <div className={styles.hero}>
                    <Badge className={styles.badge} variant="secondary">
                        <MessageSquare className={styles.iconSmall} />
                        Get in Touch
                    </Badge>
                    <h1 className={styles.title}>Contact Us</h1>
                    <p className={styles.subtitle}>
                        Have questions about our products or services? We're here to help.
                        Reach out to our team and we'll get back to you as soon as possible.
                    </p>
                </div>

                <div className={styles.contentGrid}>
                    {/* Contact Form */}
                    <Card className={styles.formCard}>
                        <CardHeader>
                            <CardTitle>Send us a Message</CardTitle>
                            <CardDescription>
                                Fill out the form below and we'll respond as soon as possible
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {submitted ? (
                                <div className={styles.successMessage}>
                                    <CheckCircle className={styles.successIcon} />
                                    <p>Thank you! Your message has been sent. We'll get back to you soon.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className={styles.form}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="name" className={styles.label}>
                                            Name <span className={styles.required}>*</span>
                                        </label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your full name"
                                            className={styles.input}
                                            aria-invalid={errors.name ? "true" : "false"}
                                            aria-describedby={errors.name ? "name-error" : undefined}
                                        />
                                        {errors.name && (
                                            <p id="name-error" className={styles.errorMessage} role="alert">
                                                <AlertCircle className={styles.errorIcon} />
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="email" className={styles.label}>
                                            Email <span className={styles.required}>*</span>
                                        </label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="your.email@example.com"
                                            className={styles.input}
                                            aria-invalid={errors.email ? "true" : "false"}
                                            aria-describedby={errors.email ? "email-error" : undefined}
                                        />
                                        {errors.email && (
                                            <p id="email-error" className={styles.errorMessage} role="alert">
                                                <AlertCircle className={styles.errorIcon} />
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="phone" className={styles.label}>
                                            Phone
                                        </label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91-8872832012"
                                            className={styles.input}
                                            aria-invalid={errors.phone ? "true" : "false"}
                                            aria-describedby={errors.phone ? "phone-error" : undefined}
                                        />
                                        {errors.phone && (
                                            <p id="phone-error" className={styles.errorMessage} role="alert">
                                                <AlertCircle className={styles.errorIcon} />
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="company" className={styles.label}>
                                            Company
                                        </label>
                                        <Input
                                            id="company"
                                            name="company"
                                            type="text"
                                            value={formData.company}
                                            onChange={handleChange}
                                            placeholder="Your company name"
                                            className={styles.input}
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="message" className={styles.label}>
                                            Message <span className={styles.required}>*</span>
                                        </label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell us about your requirements..."
                                            rows={6}
                                            className={styles.textarea}
                                            aria-invalid={errors.message ? "true" : "false"}
                                            aria-describedby={errors.message ? "message-error" : undefined}
                                        />
                                        {errors.message && (
                                            <p id="message-error" className={styles.errorMessage} role="alert">
                                                <AlertCircle className={styles.errorIcon} />
                                                {errors.message}
                                            </p>
                                        )}
                                    </div>

                                    {errors.submit && (
                                        <div className={styles.alertMessage} role="alert">
                                            <p className={styles.alertText}>
                                                <AlertCircle className={styles.alertIcon} />
                                                {errors.submit}
                                            </p>
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className={styles.submitButton}
                                        disabled={isSubmitting}
                                        aria-busy={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="mr-2">Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className={styles.iconMedium} />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <div className={styles.infoSection}>
                        <Card className={styles.infoCard}>
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                                <CardDescription>
                                    Reach out to us through any of these channels
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className={styles.infoGrid}>
                                    {contactInfo.map((info, index) => {
                                        const Icon = info.icon;
                                        const content = info.link ? (
                                            <a href={info.link} className={styles.infoLink}>
                                                {info.content}
                                            </a>
                                        ) : (
                                            <span>{info.content}</span>
                                        );

                                        return (
                                            <div key={index} className={styles.infoItem}>
                                                <div className={styles.infoIconWrapper}>
                                                    <Icon className={styles.infoIcon} />
                                                </div>
                                                <div className={styles.infoContent}>
                                                    <h3 className={styles.infoTitle}>{info.title}</h3>
                                                    <p className={styles.infoText}>{content}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className={styles.helpCard}>
                            <CardContent className={styles.helpContent}>
                                <h3 className={styles.helpTitle}>Need Immediate Assistance?</h3>
                                <p className={styles.helpText}>
                                    For urgent inquiries or bulk orders, call us directly or use WhatsApp for faster response.
                                </p>
                                <Button asChild size="lg" className={styles.helpButton}>
                                    <a href={`tel:${COMPANY_PHONE}`}>
                                        <Phone className={styles.iconMedium} />
                                        Call Now
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
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

export default Contact;

