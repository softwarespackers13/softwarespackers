import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight, Sparkles, Instagram, Facebook, MessageCircle } from "lucide-react";
import { COMPANY_PHONE, COMPANY_EMAIL, COMPANY_ADDRESS, COMPANY_WHATSAPP } from "@/config/constants";
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
                <span className={styles.companyTagline}>
                  <Sparkles className={styles.taglineIcon} />
                  Premium Solutions
                </span>
              </div>
            </div>
            <p className={styles.companyDescription}>
              Quality plastic containers for food, storage, and industrial applications.
            </p>
          </div>

          {/* Middle Section - Quick Links */}
          <div className={styles.middleSection}>
            <h3 className={styles.sectionTitle}>Quick Links</h3>
            <ul className={styles.linkList}>
              {[
                { name: "About Us", href: "/about" },
                { name: "Custom Solutions", href: "/custom" },
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

          {/* Right Section - Contact & Social */}
          <div className={styles.rightSection}>
            <h3 className={styles.sectionTitle}>Connect</h3>
            <div className={styles.contactList}>
              <a href={`tel:${COMPANY_PHONE}`} className={styles.contactLink}>
                <Phone className={styles.contactIcon} />
                <span>{COMPANY_PHONE.replace(/(\d{2})(\d{5})(\d{5})/, "+$1-$2-$3")}</span>
              </a>
              <a href={`mailto:${COMPANY_EMAIL}`} className={styles.contactLink}>
                <Mail className={styles.contactIcon} />
                <span>{COMPANY_EMAIL}</span>
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
