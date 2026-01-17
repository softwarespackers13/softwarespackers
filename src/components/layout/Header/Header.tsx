import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "./Header.module.css";
import { cn } from "@/lib/utils";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "Custom Solutions", href: "/custom" },
    { name: "About", href: "/about" },
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
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(styles.navLink, isActive(item.href) && styles.navLinkActive)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className={styles.desktopNav}>
            <Button asChild className={styles.ctaButton}>
              <Link to="/quote">
                <Phone className="h-4 w-4 mr-2" />
                Get Quote
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn("focus-ring", styles.mobileMenuButton)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuInner}>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(styles.mobileNavLink, isActive(item.href) && styles.mobileNavLinkActive)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className={styles.mobileMenuDivider}>
                <Button asChild className={styles.mobileCtaButton}>
                  <Link to="/quote" onClick={() => setMobileMenuOpen(false)}>
                    <Phone className="h-4 w-4 mr-2" />
                    Get Quote
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
