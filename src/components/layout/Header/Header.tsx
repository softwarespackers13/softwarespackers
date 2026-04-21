import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "./Header.module.css";
import { cn } from "@/lib/utils";
import categoriesData from "@/data/categories.json";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const categories = categoriesData.categories;

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories", hasDropdown: true },
    { name: "Custom Solutions", href: "/custom" },
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
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          {/* Logo */}
          <div className={styles.logoContainer}>
            <Link to="/" className={styles.logoLink}>
              <div className={styles.logoWrapper}>
                <img
                  src="/assets/logos/swp-logo.png"
                  alt="Softwares Packers"
                  className={styles.logoImage}
                />
                <div className={styles.logoGlow}></div>
              </div>
              <div className="hidden sm:block">
                <span className={styles.logoText}>Softwares Packers</span>
              </div>
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

          {/* Desktop Actions */}
          <div className={styles.desktopNav}>
            <Button asChild className={styles.ctaButton}>
              <Link to="#">
                <Download className="h-4 w-4 mr-2" />
                Download Brochure
              </Link>
            </Button>
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
              <div className={styles.mobileMenuDivider}>
                <Button asChild className={styles.mobileCtaButton}>
                  <Link to="#" onClick={() => setMobileMenuOpen(false)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Brochure
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
