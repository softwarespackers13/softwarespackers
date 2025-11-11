import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Package, Ruler, CheckCircle } from "lucide-react";
import productsData from "@/data/products.json";
import ProductCard from "@/components/ProductCard";
import OptimizedImage from "@/components/OptimizedImage";

const ProductDetail = () => {
  const { slug } = useParams();
  const product = productsData.products.find((p) => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button asChild>
            <Link to="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const relatedProducts = productsData.products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button asChild variant="ghost" className="focus-ring">
            <Link to="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
        </div>

        {/* Product Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div>
            <OptimizedImage
              src={product.images[selectedImage]}
              alt={`${product.name} - view ${selectedImage + 1}`}
              className="aspect-square bg-secondary rounded-lg overflow-hidden mb-4"
              loading="eager"
            />
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded border-2 overflow-hidden focus-ring ${
                      selectedImage === idx ? "border-primary" : "border-border"
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <OptimizedImage 
                      src={img} 
                      alt={`Thumbnail ${idx + 1}`} 
                      className="w-20 h-20"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex gap-2 mb-3">
              <Badge variant="secondary">{product.material}</Badge>
              <Badge variant="outline">{product.category}</Badge>
              {product.certifications?.map((cert) => (
                <Badge key={cert} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {cert}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-muted-foreground mb-4">SKU: {product.sku}</p>
            <p className="text-lg mb-6">{product.short_description}</p>

            {/* Quick Specs */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Key Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Capacity</p>
                    <p className="font-medium">
                      {product.capacity_ml >= 1000
                        ? `${product.capacity_ml / 1000} L`
                        : `${product.capacity_ml} ml`}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Material</p>
                    <p className="font-medium">{product.material}</p>
                  </div>
                  {product.dimensions_mm && (
                    <div>
                      <p className="text-muted-foreground">Dimensions</p>
                      <p className="font-medium">
                        {product.dimensions_mm.dia && `Ø${product.dimensions_mm.dia}mm`}
                        {product.dimensions_mm.length && `${product.dimensions_mm.length}mm`}
                        {product.dimensions_mm.height && ` × H${product.dimensions_mm.height}mm`}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-muted-foreground">MOQ</p>
                    <p className="font-medium">{product.moq} units</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Packing</p>
                    <p className="font-medium">{product.packing}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Price Range</p>
                    <p className="font-medium">{product.price_range}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTAs */}
            <div className="flex gap-3">
              <Button size="lg" className="flex-1 focus-ring">
                Request Sample
              </Button>
              <Button asChild size="lg" variant="outline" className="flex-1 focus-ring">
                <Link to="/quote">Add to Quote</Link>
              </Button>
            </div>

            {/* Downloads */}
            <div className="mt-6 flex gap-3">
              <Button variant="ghost" size="sm" className="focus-ring">
                <Download className="mr-2 h-4 w-4" />
                Technical Datasheet
              </Button>
              <Button variant="ghost" size="sm" className="focus-ring">
                <Download className="mr-2 h-4 w-4" />
                Packaging Layout
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger value="description" className="focus-ring">
              Description
            </TabsTrigger>
            <TabsTrigger value="specs" className="focus-ring">
              Technical Specs
            </TabsTrigger>
            <TabsTrigger value="certifications" className="focus-ring">
              Certifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">{product.long_description}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specs" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Material Type</span>
                    <span className="text-muted-foreground">{product.material}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Capacity</span>
                    <span className="text-muted-foreground">
                      {product.capacity_ml >= 1000
                        ? `${product.capacity_ml / 1000} L`
                        : `${product.capacity_ml} ml`}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Available Colors</span>
                    <span className="text-muted-foreground">{product.colors.join(", ")}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Minimum Order</span>
                    <span className="text-muted-foreground">{product.moq} units</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium">Packing Details</span>
                    <span className="text-muted-foreground">{product.packing}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-3">
                  {product.certifications?.map((cert) => (
                    <Badge key={cert} variant="outline" className="text-base py-2 px-4">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
