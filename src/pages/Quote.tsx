import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    Calculator,
    Package,
    CheckCircle,
    Send,
    Phone,
    MessageSquare,
    AlertCircle
} from "lucide-react";
import { sanitizeInput } from "@/lib/validation";
import { quoteFormSchema } from "@/lib/validation-schemas";
import { COMPANY_PHONE, COMPANY_WHATSAPP, IS_DEV } from "@/config/constants";
import { logError } from "@/lib/errorHandler";
import { ErrorSeverity } from "@/lib/errorHandler";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import productsData from "@/data/products.json";
import styles from "./css/Quote.module.css";

const Quote = () => {
    const [searchParams] = useSearchParams();
    const productSlug = searchParams.get("product");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        productType: "",
        quantity: "",
        material: "",
        customRequirements: "",
        message: "",
        urgent: false
    });
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Pre-fill form when product is passed via URL
    useEffect(() => {
        if (productSlug) {
            const product = productsData.products.find((p) => p.slug === productSlug);
            if (product) {
                setFormData(prev => {
                    // Only pre-fill if form is empty (hasn't been filled yet)
                    if (prev.productType) {
                        return prev; // Form already has data, don't overwrite
                    }

                    // Map product category to productType
                    const categoryToProductType: Record<string, string> = {
                        "Sweet Boxes": "Containers & Tubs",
                        "PET Container": "Containers & Tubs",
                        "Container": "Containers & Tubs",
                        "Meal Boxes": "Containers & Tubs",
                        "Bakery Products": "Containers & Tubs",
                        "Hinge Boxes": "Containers & Tubs",
                        "Ice Cream Cups & Glasses": "Containers & Tubs",
                    };

                    const mappedProductType = categoryToProductType[product.category] || "Containers & Tubs";

                    // Set material if it matches available options
                    const availableMaterials = ["HDPE", "PP", "PET", "Not Sure"];
                    const productMaterial = availableMaterials.includes(product.material)
                        ? product.material
                        : "";

                    // Build custom requirements text with product details
                    const productDetails = [
                        `Product: ${product.name}`,
                        `SKU: ${product.sku}`,
                        `Category: ${product.category}`,
                        `Capacity: ${product.capacity_ml >= 1000 ? `${product.capacity_ml / 1000}L` : `${product.capacity_ml}ml`}`,
                        `Material: ${product.material}`,
                        `Packing: ${product.packing}`
                    ].join("\n");

                    return {
                        ...prev,
                        productType: mappedProductType,
                        material: productMaterial,
                        customRequirements: productDetails
                    };
                });
            }
        }
    }, [productSlug]);

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

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field
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
            const validatedData = quoteFormSchema.parse(formData);

            // Log in development mode only
            if (IS_DEV) {
                console.log("Quote request submitted:", validatedData);
            }

            // In a real app, this would send data to an API
            // await submitQuoteRequest(validatedData);

            // Log successful submission
            logError("Quote request submitted successfully", { component: 'Quote' }, ErrorSeverity.INFO);

            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    company: "",
                    productType: "",
                    quantity: "",
                    material: "",
                    customRequirements: "",
                    message: "",
                    urgent: false
                });
            }, 5000);
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
                logError(error as Error, { component: 'Quote', action: 'form_submit' });
                setErrors({ submit: "An error occurred. Please try again." });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const productTypes = [
        "Bottles & Jars",
        "Containers & Tubs",
        "Crates & Boxes",
        "Custom Molding",
        "Other"
    ];

    const materials = [
        "HDPE",
        "PP",
        "PET",
        "Not Sure"
    ];

    const quantityRanges = [
        "1,000 - 5,000 units",
        "5,000 - 10,000 units",
        "10,000 - 50,000 units",
        "50,000+ units"
    ];

    return (
        <div className={styles.pageContainer}>
            <div className={styles.container}>
                {/* Hero Section */}
                <div className={`${styles.hero} -mt-[5rem] pt-[7rem] pb-[2rem]`}>
                    <Badge className={styles.badge} variant="secondary">
                        <Calculator className={styles.iconSmall} />
                        Get a Quote
                    </Badge>
                    <h1 className={styles.title}>Request a Custom Quote</h1>
                    <p className={styles.subtitle}>
                        Tell us about your requirements and we'll provide a detailed quote promptly.
                        For bulk orders and custom solutions, we offer competitive pricing and flexible terms.
                    </p>
                </div>

                <div className={styles.contentGrid}>
                    {/* Quote Form */}
                    <Card className={styles.formCard}>
                        <CardHeader>
                            <CardTitle>Quote Request Form</CardTitle>
                            <CardDescription>
                                Fill out the form below with your requirements. All fields marked with * are required.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {submitted ? (
                                <div className={styles.successMessage}>
                                    <CheckCircle className={styles.successIcon} />
                                    <h3 className={styles.successTitle}>Quote Request Submitted!</h3>
                                    <p className={styles.successText}>
                                        Thank you for your request. Our sales team will review your requirements
                                        and send you a detailed quote as soon as possible. We'll contact you via email or phone.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className={styles.form}>
                                    {/* Contact Information */}
                                    <div className={styles.section}>
                                        <h3 className={styles.sectionTitle}>Contact Information</h3>
                                        <div className={styles.formGrid}>
                                            <div className={styles.formGroup}>
                                                <label htmlFor="name" className={styles.label}>
                                                    Full Name <span className={styles.required}>*</span>
                                                </label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="John Doe"
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
                                                    Phone <span className={styles.required}>*</span>
                                                </label>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    required
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
                                                    Company Name
                                                </label>
                                                <Input
                                                    id="company"
                                                    name="company"
                                                    type="text"
                                                    value={formData.company}
                                                    onChange={handleChange}
                                                    placeholder="Your Company"
                                                    className={styles.input}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product Requirements */}
                                    <div className={styles.section}>
                                        <h3 className={styles.sectionTitle}>Product Requirements</h3>
                                        <div className={styles.formGrid}>
                                            <div className={styles.formGroup}>
                                                <label htmlFor="productType" className={styles.label}>
                                                    Product Type <span className={styles.required}>*</span>
                                                </label>
                                                <Select
                                                    value={formData.productType}
                                                    onValueChange={(value) => handleSelectChange("productType", value)}
                                                >
                                                    <SelectTrigger
                                                        className={styles.input}
                                                        aria-invalid={errors.productType ? "true" : "false"}
                                                        aria-describedby={errors.productType ? "productType-error" : undefined}
                                                    >
                                                        <SelectValue placeholder="Select product type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {productTypes.map((type) => (
                                                            <SelectItem key={type} value={type}>
                                                                {type}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.productType && (
                                                    <p id="productType-error" className={styles.errorMessage} role="alert">
                                                        <AlertCircle className={styles.errorIcon} />
                                                        {errors.productType}
                                                    </p>
                                                )}
                                            </div>

                                            <div className={styles.formGroup}>
                                                <label htmlFor="quantity" className={styles.label}>
                                                    Quantity <span className={styles.required}>*</span>
                                                </label>
                                                <Select
                                                    value={formData.quantity}
                                                    onValueChange={(value) => handleSelectChange("quantity", value)}
                                                >
                                                    <SelectTrigger
                                                        className={styles.input}
                                                        aria-invalid={errors.quantity ? "true" : "false"}
                                                        aria-describedby={errors.quantity ? "quantity-error" : undefined}
                                                    >
                                                        <SelectValue placeholder="Select quantity range" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {quantityRanges.map((range) => (
                                                            <SelectItem key={range} value={range}>
                                                                {range}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.quantity && (
                                                    <p id="quantity-error" className={styles.errorMessage} role="alert">
                                                        <AlertCircle className={styles.errorIcon} />
                                                        {errors.quantity}
                                                    </p>
                                                )}
                                            </div>

                                            <div className={styles.formGroup}>
                                                <label htmlFor="material" className={styles.label}>
                                                    Material Preference
                                                </label>
                                                <Select
                                                    value={formData.material}
                                                    onValueChange={(value) => handleSelectChange("material", value)}
                                                >
                                                    <SelectTrigger className={styles.input}>
                                                        <SelectValue placeholder="Select material" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {materials.map((material) => (
                                                            <SelectItem key={material} value={material}>
                                                                {material}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label htmlFor="customRequirements" className={styles.label}>
                                                Custom Requirements
                                            </label>
                                            <Textarea
                                                id="customRequirements"
                                                name="customRequirements"
                                                value={formData.customRequirements}
                                                onChange={handleChange}
                                                placeholder="Specify dimensions, colors, closures, or any special requirements..."
                                                rows={4}
                                                className={styles.textarea}
                                            />
                                        </div>
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
                                                <span className="mr-2">Submitting...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className={styles.iconMedium} />
                                                Request Quote
                                            </>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>

                    {/* Info Card */}
                    <div className={styles.infoSection}>
                        <Card className={styles.infoCard}>
                            <CardHeader>
                                <CardTitle>What Happens Next?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={styles.stepsList}>
                                    <div className={styles.step}>
                                        <div className={styles.stepNumber}>1</div>
                                        <div className={styles.stepContent}>
                                            <h4 className={styles.stepTitle}>Review</h4>
                                            <p className={styles.stepText}>Our team reviews your requirements</p>
                                        </div>
                                    </div>
                                    <div className={styles.step}>
                                        <div className={styles.stepNumber}>2</div>
                                        <div className={styles.stepContent}>
                                            <h4 className={styles.stepTitle}>Quote</h4>
                                            <p className={styles.stepText}>We send a detailed quote promptly</p>
                                        </div>
                                    </div>
                                    <div className={styles.step}>
                                        <div className={styles.stepNumber}>3</div>
                                        <div className={styles.stepContent}>
                                            <h4 className={styles.stepTitle}>Follow-up</h4>
                                            <p className={styles.stepText}>We contact you to discuss and finalize</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className={styles.helpCard}>
                            <CardContent className={styles.helpContent}>
                                <Package className={styles.helpIcon} />
                                <h3 className={styles.helpTitle}>Need Help?</h3>
                                <p className={styles.helpText}>
                                    For immediate assistance or complex requirements, contact our sales team directly.
                                </p>
                                <div className={styles.helpButtons}>
                                    <Button asChild variant="outline" size="lg" className={styles.helpButton}>
                                        <a href={`tel:${COMPANY_PHONE}`}>
                                            <Phone className={styles.iconMedium} />
                                            Call Us
                                        </a>
                                    </Button>
                                    <Button asChild variant="outline" size="lg" className={styles.helpButton}>
                                        <a href="/contact">
                                            <MessageSquare className={styles.iconMedium} />
                                            Contact
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            {/* Floating WhatsApp Button */}
            <WhatsAppButton
                phoneNumber={COMPANY_WHATSAPP}
                message="Hello, I'm interested in getting a quote for plastic containers. Please share more details."
                variant="floating"
            />
        </div>
    );
};

export default Quote;

