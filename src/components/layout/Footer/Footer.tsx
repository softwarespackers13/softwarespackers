import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight, Sparkles, Instagram, Facebook, MessageCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY_PHONE, COMPANY_PHONE_SECONDARY, COMPANY_EMAIL, COMPANY_ADDRESS, COMPANY_WHATSAPP, COMPANY_WEBSITE } from "@/config/constants";
import categoriesData from "@/data/categories.json";
import styles from "./Footer.module.css";
import { cn } from "@/lib/utils";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Left Section - Logo & Quick Info */}
          <div className={styles.leftSection}>
            <div className={styles.logoContainer}>
              <img
                src="/assets/logos/swp-logo.png"
                alt="Softwares Packers"
                className={styles.logoImage}
              />
              <div>
                <span className={styles.companyName}>Softwares Packers</span>
              </div>
            </div>
            <p className={styles.companyDescription}>
              Leading manufacturer of premium plastic containers for food, storage, and industrial applications. We provide high-quality packaging solutions with custom sizes, bulk pricing, and fast delivery across India.
            </p>
            <button
              type="button"
              className={styles.downloadCatalogButton}
              aria-label="Download catalog"
            >
              <Download className={styles.downloadIcon} />
              <span>Download Catalog</span>
            </button>
          </div>

          {/* Middle Section - Quick Links */}
          <div className={styles.middleSection}>
            <h3 className={styles.sectionTitle}>Quick Links</h3>
            <ul className={styles.linkList}>
              {[
                { name: "Home", href: "/" },
                { name: "Categories", href: "/categories" },
                { name: "About Us", href: "/about" },
                { name: "Custom Solutions", href: "/custom" },
                { name: "Get Quote", href: "/quote" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className={styles.footerLink}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Section - Categories */}
          <div className={styles.productsSection}>
            <h3 className={styles.sectionTitle}>Products</h3>
            <ul className={styles.linkList}>
              {categoriesData.categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/categories?category=${category.slug}`}
                    className={styles.footerLink}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section - Contact & Social */}
          <div className={styles.rightSection}>
            <h3 className={styles.sectionTitle}>Contact</h3>
            <div className={styles.contactList}>
              <div className={styles.addressItem}>
                <MapPin className={styles.contactIcon} />
                <span className={styles.addressText}>{COMPANY_ADDRESS}</span>
              </div>
              <a href={`tel:${COMPANY_PHONE}`} className={styles.contactLink}>
                <Phone className={styles.contactIcon} />
                <span>{COMPANY_PHONE.replace(/(\d{2})(\d{5})(\d{5})/, "$1-$2-$3")}</span>
              </a>
              <a href={`tel:${COMPANY_PHONE_SECONDARY}`} className={styles.contactLink}>
                <Phone className={styles.contactIcon} />
                <span>{COMPANY_PHONE_SECONDARY.replace(/(\d{2})(\d{5})(\d{5})/, "$1-$2-$3")}</span>
              </a>
              <a href={`mailto:${COMPANY_EMAIL}`} className={styles.contactLink}>
                <Mail className={styles.contactIcon} />
                <span>{COMPANY_EMAIL}</span>
              </a>
              <a href={`https://${COMPANY_WEBSITE}`} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                <span>{COMPANY_WEBSITE}</span>
              </a>
            </div>
            <div className={styles.socialLinks}>
              <a
                href="https://www.instagram.com/softwares_packers/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Follow us on Instagram"
              >
                <Instagram className={styles.socialIcon} />
              </a>
              <a
                href="https://www.facebook.com/SoftwaresPackers12"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Follow us on Facebook"
              >
                <Facebook className={styles.socialIcon} />
              </a>
              <a
                href={`https://wa.me/${COMPANY_WHATSAPP.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Chat with us on WhatsApp"
              >
                <MessageCircle className={styles.socialIcon} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © 2025 Softwares Packers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
