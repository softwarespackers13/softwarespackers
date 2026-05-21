import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Download, ChevronDown, Search, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "./Header.module.css";
import { cn } from "@/lib/utils";
import categoriesData from "@/data/categories.json";
import MadeInIndiaModal from "@/components/common/MadeInIndiaModal";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isIndiaModalOpen, setIsIndiaModalOpen] = useState(false);
  const location = useLocation();
  const categories = categoriesData.categories;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparentPage = useMemo(() => {
    // Only use transparent navbar at the top on these specific pages
    const transparentPages = ["/", "/about", "/contact", "/quote"];
    if (transparentPages.includes(location.pathname)) return true;

    // For categories page, only be transparent if we are on the main grid (no sub-category selected)
    if (location.pathname === "/categories") {
      const searchParams = new URLSearchParams(location.search);
      return !searchParams.has("category");
    }

    return false;
  }, [location.pathname, location.search]);

  const showTransparent = isTransparentPage && !isScrolled;

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories", hasDropdown: true },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  return (
    <header className={cn(styles.header, showTransparent && styles.headerTop)}>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          {/* Left Side: Logo and Navigation */}
          <div className={styles.navLeft}>
            {/* Logo */}
            <div className={styles.logoContainer}>
              <Link to="/" className={styles.logoLink}>
                {/* Both logos always in DOM — crossfade via opacity, no src swap flash */}
                <div className={styles.logoStack}>
                  <img
                    src="/assets/logos/swp-logo-white.png"
                    alt=""
                    aria-hidden="true"
                    className={cn(styles.logoImage, styles.logoWhite, showTransparent && styles.logoVisible)}
                  />
                  <img
                    src="/assets/logos/swp-logo.png"
                    alt="Softwares Packers Logo"
                    className={cn(styles.logoImage, styles.logoDark, !showTransparent && styles.logoVisible)}
                  />
                </div>
                <span className={styles.logoText}>Softwares Packers</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className={styles.desktopNav}>
              {navigation.map((item) => {
                if (item.hasDropdown && item.name === "Categories") {
                  return (
                    <div key={item.name} className={styles.dropdownContainer}>
                      <Link
                        to={item.href}
                        className={cn(styles.navLink, styles.navLinkWithDropdown, isActive(item.href) && styles.navLinkActive)}
                      >
                        {item.name}
                        <ChevronDown className={styles.dropdownIcon} />
                      </Link>
                      <div className={styles.dropdown}>
                        {categories.map((category) => (
                          <Link
                            key={category.id}
                            to={`/categories?category=${category.slug}`}
                            className={styles.dropdownItem}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(styles.navLink, isActive(item.href) && styles.navLinkActive)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

          </div>

          {/* Desktop Actions */}
          <div className={styles.desktopActions}>
            <button
              onClick={() => setIsIndiaModalOpen(true)}
              className={styles.madeInIndiaButton}
              aria-label="Learn about our Made in India manufacturing"
            >
              <img
                src="/assets/made-in-india.jpg"
                alt="Made in India"
                className={styles.madeInIndiaImage}
              />
            </button>
            <a href="/products.pdf" target="_blank" rel="noopener noreferrer" className={styles.navCtaBtn}>
              Catalogue
            </a>
          </div>

          {/* Mobile menu button */}
          <div className={styles.mobileMenuButtonWrapper}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn("focus-ring", styles.mobileMenuButton)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className={styles.mobileMenuIcon} />
              ) : (
                <Menu className={styles.mobileMenuIcon} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu backdrop */}
        {mobileMenuOpen && (
          <div
            className={styles.mobileMenuBackdrop}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuInner}>
              {navigation.map((item) => {
                if (item.hasDropdown && item.name === "Categories") {
                  return (
                    <div key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(styles.mobileNavLink, isActive(item.href) && styles.mobileNavLinkActive)}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                      <div className={styles.mobileDropdown}>
                        {categories.map((category) => (
                          <Link
                            key={category.id}
                            to={`/categories?category=${category.slug}`}
                            className={styles.mobileDropdownItem}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(styles.mobileNavLink, isActive(item.href) && styles.mobileNavLinkActive)}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsIndiaModalOpen(true);
                }}
                className={styles.mobileIndiaButton}
              >
                <span className={styles.mobileIndiaFlag}>🇮🇳</span>
                <span className={styles.mobileIndiaText}>Proudly Made in India</span>
              </button>
              <div className={styles.mobileMenuDivider}>
                <Button asChild className={styles.mobileCtaButton}>
                  <a href="/products.pdf" download onClick={() => setMobileMenuOpen(false)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Catalogue
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
      <MadeInIndiaModal isOpen={isIndiaModalOpen} onClose={() => setIsIndiaModalOpen(false)} />
    </header>
  );
};

export default Header;
