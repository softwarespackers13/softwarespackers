import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";
import CategoryCard from "@/components/common/CategoryCard";
import ProductCard from "@/components/common/ProductCard";
import { sanitizeInput } from "@/lib/validation";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import styles from "./css/Categories.module.css";
import { cn } from "@/lib/utils";

// Import company constants from config
import { COMPANY_WHATSAPP } from "@/config/constants";

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const categoryFilter = searchParams.get("category");
  const categories = categoriesData.categories;

  // Filter categories by search
  const filteredCategories = useMemo(() => {
    let filtered = [...categories];

    if (searchQuery) {
      const sanitizedQuery = sanitizeInput(searchQuery).toLowerCase();
      filtered = filtered.filter(
        (cat) =>
          cat.name.toLowerCase().includes(sanitizedQuery) ||
          cat.description.toLowerCase().includes(sanitizedQuery)
      );
    }

    return filtered;
  }, [searchQuery, categories]);

  // Filter products if category is selected
  const filteredProducts = useMemo(() => {
    if (!categoryFilter) return [];

    let filtered = [...productsData.products];
    const categoryName = categories.find(c => c.slug === categoryFilter)?.name;

    if (categoryName) {
      filtered = filtered.filter((p) => p.category === categoryName);
    }

    // Search filter with sanitization
    if (searchQuery) {
      const sanitizedQuery = sanitizeInput(searchQuery).toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(sanitizedQuery) ||
          p.sku.toLowerCase().includes(sanitizedQuery) ||
          p.category.toLowerCase().includes(sanitizedQuery)
      );
    }

    // Sort
    if (sortBy === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "capacity-asc") {
      filtered.sort((a, b) => (a.capacity_ml || 0) - (b.capacity_ml || 0));
    } else if (sortBy === "capacity-desc") {
      filtered.sort((a, b) => (b.capacity_ml || 0) - (a.capacity_ml || 0));
    }

    return filtered;
  }, [searchQuery, categoryFilter, sortBy, categories]);

  const clearFilters = () => {
    setSearchQuery("");
    setSearchParams({});
    setSortBy("featured");
  };

  const hasActiveFilters = searchQuery || categoryFilter;
  const showProducts = categoryFilter !== null;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>
            {showProducts
              ? categories.find(c => c.slug === categoryFilter)?.name || "Products"
              : "Product Categories"}
          </h1>
          <p className={styles.subtitle}>
            {showProducts
              ? `Browse products in ${categories.find(c => c.slug === categoryFilter)?.name || "this category"}`
              : "Explore our comprehensive range of plastic packaging solutions organized by application and industry"}
          </p>
        </div>

        {/* Filter Bar */}
        <div className={styles.filterBar}>
          <div className={styles.filterGrid}>
            {/* Search */}
            <div className={cn(styles.searchContainer, "md:col-span-4")}>
              <Search className={styles.searchIcon} aria-hidden="true" />
              <Input
                placeholder="Search products, SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(styles.searchInput, "focus-ring")}
                aria-label="Search products"
                type="search"
                autoComplete="off"
              />
            </div>

            {/* Category */}
            <div className="md:col-span-3">
              <Select
                value={categoryFilter || "all"}
                onValueChange={(value) =>
                  value === "all" ? setSearchParams({}) : setSearchParams({ category: value })
                }
              >
                <SelectTrigger className="focus-ring">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.slug}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <div className="md:col-span-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="focus-ring">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="capacity-asc">Capacity (Low-High)</SelectItem>
                  <SelectItem value="capacity-desc">Capacity (High-Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Clear */}
            <div className="md:col-span-2">
              <Button
                variant="outline"
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                className={cn(styles.fullWidth, "focus-ring")}
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className={styles.activeFilters}>
              {categoryFilter && (
                <Badge variant="secondary" className="cursor-pointer" onClick={clearFilters}>
                  {categories.find(c => c.slug === categoryFilter)?.name} ×
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Show Products if category is selected, otherwise show Categories */}
        {showProducts ? (
          <>
            {/* Results Count */}
            <div className={styles.resultsCount}>
              {filteredProducts.length > 0 ? (
                <>Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} in {categories.find(c => c.slug === categoryFilter)?.name}</>
              ) : (
                <>No products found in {categories.find(c => c.slug === categoryFilter)?.name}</>
              )}
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className={styles.productsGrid}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p className={styles.emptyStateText}>No products found matching your criteria</p>
                <Button onClick={clearFilters} variant="outline" className="focus-ring">
                  Clear all filters
                </Button>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Results Count */}
            {searchQuery && (
              <div className={styles.resultsCount}>
                Showing {filteredCategories.length} categor{filteredCategories.length !== 1 ? "ies" : "y"}
              </div>
            )}

            {/* Categories Grid */}
            <div className={styles.categoriesGrid}>
              {filteredCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </>
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
