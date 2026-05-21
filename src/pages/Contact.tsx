import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    CheckCircle,
    AlertCircle,
    ChevronDown,
    FacebookIcon,
    Instagram,
} from "lucide-react";
import { sanitizeInput } from "@/lib/validation";
import { contactFormSchema } from "@/lib/validation-schemas";
import { COMPANY_PHONE, COMPANY_EMAIL, COMPANY_ADDRESS, COMPANY_WHATSAPP, IS_DEV, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from "@/config/constants";
import emailjs from "@emailjs/browser";
import { logError } from "@/lib/errorHandler";
import { ErrorSeverity } from "@/lib/errorHandler";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { useScrollFade } from "@/hooks/use-scroll-fade";
import { cn } from "@/lib/utils";
import styles from "./css/Contact.module.css";

const Contact = () => {
    const heroFade = useScrollFade();
    const formFade = useScrollFade();
    const mapFade = useScrollFade();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        interest: "",
        message: ""
    });
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
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
            // Sanitize form data before validation
            const sanitizedData = {
                name: sanitizeInput(formData.name),
                email: sanitizeInput(formData.email),
                phone: sanitizeInput(formData.phone),
                interest: sanitizeInput(formData.interest),
                message: sanitizeInput(formData.message)
            };

            // Validate form data
            const validatedData = contactFormSchema.parse(sanitizedData);

            // Log in development mode only
            if (IS_DEV) {
                console.log("Form submitted:", validatedData);
            }

            // Send email to admin using EmailJS
            if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
                try {
                    await emailjs.send(
                        EMAILJS_SERVICE_ID,
                        EMAILJS_TEMPLATE_ID,
                        {
                            from_name: validatedData.name,
                            from_email: validatedData.email,
                            phone: validatedData.phone || "Not provided",
                            interest: validatedData.interest || "Not specified",
                            message: validatedData.message,
                            to_email: COMPANY_EMAIL,
                        },
                        EMAILJS_PUBLIC_KEY
                    );

                    // Log successful submission
                    logError("Contact form submitted successfully", { component: 'Contact' }, ErrorSeverity.INFO);
                } catch (emailError) {
                    // Log email error but don't fail the form submission
                    logError(emailError as Error, { component: 'Contact', action: 'email_send' });
                    console.error("Failed to send email:", emailError);
                    // Still show success to user, but log the error
                }
            } else {
                // EmailJS not configured - log warning
                if (IS_DEV) {
                    console.warn("EmailJS not configured. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY");
                }
                logError("Contact form submitted successfully (EmailJS not configured)", { component: 'Contact' }, ErrorSeverity.INFO);
            }

            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    interest: "",
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

    const interestOptions = [
        "Product Inquiry",
        "Custom Solutions",
        "Bulk Orders",
        "Partnership",
        "General Inquiry"
    ];

    return (
        <div className={styles.pageContainer}>
            {/* Hero Section */}
            <div
                ref={heroFade.elementRef}
                className={cn(styles.hero, 'scroll-fade', heroFade.isVisible ? 'visible' : '', '-mt-[5rem]')}
            >
                <div className={cn(styles.heroContent, 'pt-[5rem]')}>
                    <h1 className={styles.title}>Contact us.</h1>
                    <p className={styles.subtitle}>
                        Get in touch and ask us anything. Questions about our products, custom solutions, bulk orders, or partnership opportunities - we answer it all.
                    </p>
                </div>
            </div>

            <div className={styles.container}>
                {/* Contact Form */}
                <div
                    ref={formFade.elementRef}
                    className={cn(styles.formSection, 'scroll-fade', formFade.isVisible ? 'visible' : '')}
                >
                    <h2 className={styles.formHeading}>Drop us a mail</h2>
                    <p className={styles.formSubheading}>
                        Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                    {submitted ? (
                        <div className={styles.successMessage}>
                            <CheckCircle className={styles.successIcon} />
                            <p>Thank you! Your message has been sent. We'll get back to you soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name" className={styles.label}>
                                        Your name <span className={styles.required}>*</span>
                                    </label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        className={styles.input}
                                        aria-invalid={errors.name ? "true" : "false"}
                                    />
                                    {errors.name && (
                                        <p className={styles.errorMessage} role="alert">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="email" className={styles.label}>
                                        Email address <span className={styles.required}>*</span>
                                    </label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email address"
                                        className={styles.input}
                                        aria-invalid={errors.email ? "true" : "false"}
                                    />
                                    {errors.email && (
                                        <p className={styles.errorMessage} role="alert">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="phone" className={styles.label}>
                                        Phone number <span className={styles.required}>*</span>
                                    </label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 98140 82012"
                                        className={styles.input}
                                        aria-invalid={errors.phone ? "true" : "false"}
                                    />
                                    {errors.phone && (
                                        <p className={styles.errorMessage} role="alert">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="interest" className={styles.label}>
                                        Interested in <span className={styles.required}>*</span>
                                    </label>
                                    <div className={styles.selectWrapper}>
                                        <select
                                            id="interest"
                                            name="interest"
                                            required
                                            value={formData.interest}
                                            onChange={handleChange}
                                            className={styles.select}
                                        >
                                            <option value="">Select an option</option>
                                            {interestOptions.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className={styles.selectIcon} />
                                    </div>
                                    {errors.interest && (
                                        <p className={styles.errorMessage} role="alert">
                                            {errors.interest}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="message" className={styles.label}>
                                    How can we help? <span className={styles.required}>*</span>
                                </label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="How can we help?"
                                    rows={6}
                                    className={styles.textarea}
                                    aria-invalid={errors.message ? "true" : "false"}
                                />
                                {errors.message && (
                                    <p className={styles.errorMessage} role="alert">
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
                                {isSubmitting ? "Sending..." : "Send your message"}
                            </Button>


                        </form>
                    )}
                </div>

                {/* Map and Contact Info Section */}
                <div
                    ref={mapFade.elementRef}
                    className={cn(styles.mapContactSection, 'scroll-fade', mapFade.isVisible ? 'visible' : '')}
                >
                    <div className={styles.mapColumn}>
                        <div className={styles.map}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1710.5549722632534!2d75.8182403!3d30.9674139!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a85075f9c5067%3A0xfc0b1866caa4bea2!2sVishal%20enterprises!5e0!3m2!1sen!2sin!4v1769291101273!5m2!1sen!2sin"
                                loading="lazy"
                                title="Head Office Location"
                            ></iframe>
                        </div>
                    </div>

                    <div className={styles.contactInfoColumn}>
                        <Card className={styles.contactInfoCard}>
                            <CardContent className={styles.contactInfoContent}>
                                <div className={styles.contactInfoItem}>
                                    <span className={styles.contactInfoLabel}>Address</span>
                                    <p className={styles.contactInfoValue}>{COMPANY_ADDRESS}</p>
                                </div>
                                <div className={styles.contactInfoItem}>
                                    <span className={styles.contactInfoLabel}>Email</span>
                                    <a href={`mailto:${COMPANY_EMAIL}`} className={styles.contactInfoValue}>
                                        {COMPANY_EMAIL}
                                    </a>
                                </div>
                                <div className={styles.contactInfoItem}>
                                    <span className={styles.contactInfoLabel}>Phone</span>
                                    <a href={`tel:${COMPANY_PHONE}`} className={styles.contactInfoValue}>
                                        {COMPANY_PHONE.replace(/(\d{2})(\d{5})(\d{5})/, "+$1 $2 $3")}
                                    </a>
                                </div>
                                <div className={styles.socialIcons}>
                                    <a
                                        href="https://www.facebook.com/SoftwaresPackers12"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialIcon}
                                        aria-label="Facebook"
                                    >
                                        <FacebookIcon className={styles.socialIconSvg} />
                                    </a>
                                    <a
                                        href="https://www.instagram.com/softwares_packers/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialIcon}
                                        aria-label="Instagram"
                                    >
                                        <Instagram className={styles.socialIconSvg} />
                                    </a>
                                </div>
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

