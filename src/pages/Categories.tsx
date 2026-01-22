import { useMemo, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";
import CategoryCard from "@/components/common/CategoryCard";
import ProductCard from "@/components/common/ProductCard";
import Pagination from "@/components/common/Pagination";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import styles from "./css/Categories.module.css";

// Import company constants from config
import { COMPANY_WHATSAPP } from "@/config/constants";

const PRODUCTS_PER_PAGE = 9;

const Categories = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categorySlug = searchParams.get("category");
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const categories = useMemo(() => categoriesData.categories, []);

  // Get selected category
  const selectedCategory = useMemo(
    () => categories.find((cat) => cat.slug === categorySlug),
    [categories, categorySlug]
  );

  // Filter products by category
  // Special case: PET Container category shows all PET products regardless of their category
  const categoryProducts = useMemo(() => {
    if (!categorySlug || !selectedCategory) return [];

    // If viewing PET Container category, show all PET products
    if (selectedCategory.slug === "pet-container") {
      return productsData.products.filter(
        (product) => product.material === "PET"
      );
    }

    // Otherwise, filter by category name
    return productsData.products.filter(
      (product) => product.category === selectedCategory.name
    );
  }, [categorySlug, selectedCategory]);

  // Calculate pagination
  const totalPages = useMemo(() => {
    return Math.ceil(categoryProducts.length / PRODUCTS_PER_PAGE);
  }, [categoryProducts.length]);

  // Get paginated products (only render current page's products for performance)
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return categoryProducts.slice(startIndex, endIndex);
  }, [categoryProducts, currentPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    navigate(`/categories?${newSearchParams.toString()}`, { replace: true });
    // Scroll to top of products section
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset to page 1 if current page is invalid
  useEffect(() => {
    if (categorySlug && selectedCategory && currentPage > totalPages && totalPages > 0) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("page", "1");
      navigate(`/categories?${newSearchParams.toString()}`, { replace: true });
    }
  }, [categorySlug, selectedCategory, currentPage, totalPages, searchParams, navigate]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          {categorySlug && selectedCategory ? (
            <>
              <div className={styles.backButtonContainer}>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className={styles.backButton}
                >
                  <Link to="/categories">
                    <ArrowLeft className={styles.backIcon} />
                    Back to Categories
                  </Link>
                </Button>
              </div>
              <h1 className={styles.title}>
                {selectedCategory.name}
              </h1>
              <p className={styles.subtitle}>
                {selectedCategory.description}
              </p>
              {categoryProducts.length > 0 && (
                <p className={styles.resultsCount}>
                  {categoryProducts.length} {categoryProducts.length === 1 ? "product" : "products"} found
                </p>
              )}
            </>
          ) : (
            <>
              <h1 className={styles.title}>Product Categories</h1>
              <p className={styles.subtitle}>
                Explore our comprehensive range of plastic packaging solutions organized by application and industry
              </p>
            </>
          )}
        </div>

        {/* Products Grid - Show when category is selected */}
        {categorySlug && selectedCategory && (
          <>
            {categoryProducts.length > 0 ? (
              <>
                <div className={styles.productsGrid}>
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            ) : (
              <div className={styles.emptyState}>
                <p className={styles.emptyStateText}>
                  No products found in this category.
                </p>
                <Button asChild variant="outline" className={styles.backButton}>
                  <Link to="/categories">
                    <ArrowLeft className={styles.backIcon} />
                    Back to Categories
                  </Link>
                </Button>
              </div>
            )}
          </>
        )}

        {/* Categories Grid - Show when no category is selected */}
        {!categorySlug && (
          <div className={styles.categoriesGrid}>
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
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

export default Categories;
