import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal } from "lucide-react";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import ProductCard from "@/components/ProductCard";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  
  const categoryFilter = searchParams.get("category");
  const materials = ["HDPE", "PP", "PET"];
  const categories = categoriesData.categories;

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...productsData.products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter) {
      const categoryName = categories.find(c => c.slug === categoryFilter)?.name;
      if (categoryName) {
        filtered = filtered.filter((p) => p.category === categoryName);
      }
    }

    // Material filter
    if (selectedMaterials.length > 0) {
      filtered = filtered.filter((p) => selectedMaterials.includes(p.material));
    }

    // Sort
    if (sortBy === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "capacity-asc") {
      filtered.sort((a, b) => a.capacity_ml - b.capacity_ml);
    } else if (sortBy === "capacity-desc") {
      filtered.sort((a, b) => b.capacity_ml - a.capacity_ml);
    }

    return filtered;
  }, [searchQuery, categoryFilter, selectedMaterials, sortBy, categories]);

  const toggleMaterial = (material: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedMaterials([]);
    setSearchParams({});
    setSortBy("featured");
  };

  const hasActiveFilters = searchQuery || categoryFilter || selectedMaterials.length > 0;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-lg text-muted-foreground">
            Browse our complete range of plastic containers and packaging solutions
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search */}
            <div className="md:col-span-4 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products, SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 focus-ring"
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
                className="w-full focus-ring"
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Material Filters */}
          <div className="mt-4 flex flex-wrap gap-4">
            <span className="text-sm font-medium flex items-center">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Materials:
            </span>
            {materials.map((material) => (
              <label key={material} className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={selectedMaterials.includes(material)}
                  onCheckedChange={() => toggleMaterial(material)}
                  className="focus-ring"
                />
                <span className="text-sm">{material}</span>
              </label>
            ))}
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap gap-2">
              {categoryFilter && (
                <Badge variant="secondary" className="cursor-pointer" onClick={clearFilters}>
                  {categories.find(c => c.slug === categoryFilter)?.name} ×
                </Badge>
              )}
              {selectedMaterials.map((mat) => (
                <Badge
                  key={mat}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => toggleMaterial(mat)}
                >
                  {mat} ×
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-muted-foreground">
          Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">No products found matching your criteria</p>
            <Button onClick={clearFilters} variant="outline" className="focus-ring">
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
