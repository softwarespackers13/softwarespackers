import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ChevronRight, Instagram, Facebook, MessageCircle, Download } from "lucide-react";
import { COMPANY_PHONE, COMPANY_PHONE_SECONDARY, COMPANY_EMAIL, COMPANY_ADDRESS, COMPANY_WHATSAPP, COMPANY_WEBSITE } from "@/config/constants";
import categoriesData from "@/data/categories.json";
import styles from "./Footer.module.css";


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Left Section - Logo & Quick Info */}
          <div className={styles.leftSection}>
            <div className={styles.logoContainer}>
              <img
                src="/assets/logos/swp-logo.webp"
                alt="Softwares Packers"
                className={styles.logoImage}
              />
              <span className={styles.companyName}>Softwares Packers</span>
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

          {/* Quick Links Section */}
          <div className={styles.middleSection}>
            <h3 className={styles.sectionTitle}>
              <span>QUICK LINKS</span>
            </h3>
            <ul className={styles.linkList}>
              {[
                { name: "Home", href: "/" },
                { name: "Categories", href: "/categories" },
                { name: "About Us", href: "/about" },
                { name: "Get Quote", href: "/quote" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className={styles.footerLink}>
                    <ChevronRight className={styles.linkArrow} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Section */}
          <div className={styles.productsSection}>
            <h3 className={styles.sectionTitle}>
              <span>PRODUCTS</span>
            </h3>
            <ul className={styles.linkList}>
              {categoriesData.categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/categories?category=${category.slug}`}
                    className={styles.footerLink}
                  >
                    <ChevronRight className={styles.linkArrow} />
                    <span>{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className={styles.rightSection}>
            <h3 className={styles.sectionTitle}>
              <span>CONTACT</span>
            </h3>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <MapPin className={styles.contactIcon} />
                <span className={styles.contactText}>{COMPANY_ADDRESS}</span>
              </div>
              <a href={`tel:${COMPANY_PHONE}`} className={styles.contactItem}>
                <Phone className={styles.contactIcon} />
                <span className={styles.contactText}>+91-{COMPANY_PHONE.slice(2, 7)}-{COMPANY_PHONE.slice(7)}</span>
              </a>
              <a href={`tel:${COMPANY_PHONE_SECONDARY}`} className={styles.contactItem}>
                <Phone className={styles.contactIcon} />
                <span className={styles.contactText}>+91-{COMPANY_PHONE_SECONDARY.slice(2, 7)}-{COMPANY_PHONE_SECONDARY.slice(7)}</span>
              </a>
              <a href={`mailto:${COMPANY_EMAIL}`} className={styles.contactItem}>
                <Mail className={styles.contactIcon} />
                <span className={styles.contactText}>{COMPANY_EMAIL}</span>
              </a>
              <div className={styles.contactItem}>
                <span className={styles.contactText}>{COMPANY_WEBSITE}</span>
              </div>
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
