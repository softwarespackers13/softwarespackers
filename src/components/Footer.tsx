import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded" />
              <span className="text-lg font-bold">Software Packers</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Quality plastic containers for food, storage, and industrial applications. Over 20 years of manufacturing excellence.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91-XXXXXXXXXX</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>sales@softwarepackers.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Industrial Area, City, State</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products?category=food-jars" className="text-muted-foreground hover:text-foreground smooth-transition">
                  Food Jars
                </Link>
              </li>
              <li>
                <Link to="/products?category=storage-tubs" className="text-muted-foreground hover:text-foreground smooth-transition">
                  Storage Tubs
                </Link>
              </li>
              <li>
                <Link to="/products?category=bottles" className="text-muted-foreground hover:text-foreground smooth-transition">
                  Bottles
                </Link>
              </li>
              <li>
                <Link to="/products?category=industrial-crates" className="text-muted-foreground hover:text-foreground smooth-transition">
                  Industrial Crates
                </Link>
              </li>
              <li>
                <Link to="/products?category=caps-accessories" className="text-muted-foreground hover:text-foreground smooth-transition">
                  Caps & Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground smooth-transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/custom" className="text-muted-foreground hover:text-foreground smooth-transition">
                  Custom Solutions
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-foreground smooth-transition">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground smooth-transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to receive product updates and industry news.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="focus-ring"
              />
              <Button type="submit" className="focus-ring">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2024 Software Packers. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link to="/terms" className="hover:text-foreground smooth-transition">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-foreground smooth-transition">
              Privacy
            </Link>
            <Link to="/sitemap" className="hover:text-foreground smooth-transition">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
