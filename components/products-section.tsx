"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Star, Heart, ShoppingCart, Eye, Filter, Grid, List, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  images: string[]
  featured: boolean
  status: string
  stock_quantity: number
  sku: string
  material?: string
  color?: string
  rating?: number
  reviews_count?: number
}

interface ProductsSectionProps {
  lang: string
  dict: any
}

export default function ProductsSection({ lang, dict }: ProductsSectionProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  // Sample products data for demo
  useEffect(() => {
    const sampleProducts: Product[] = [
      {
        id: "1",
        name: "Luxury Sofa Set",
        description: "Premium leather sofa with modern design",
        price: 2499.99,
        category: "furniture",
        images: ["/images/projects/modern-living-1.jpg"],
        featured: true,
        status: "active",
        stock_quantity: 5,
        sku: "LSS001",
        material: "Genuine Leather",
        color: "Charcoal Gray",
        rating: 4.8,
        reviews_count: 24,
      },
      {
        id: "2",
        name: "Crystal Chandelier",
        description: "Elegant crystal chandelier for dining rooms",
        price: 1899.99,
        category: "lighting",
        images: ["/images/projects/elegant-dining-1.jpg"],
        featured: true,
        status: "active",
        stock_quantity: 3,
        sku: "CC002",
        material: "Crystal & Brass",
        color: "Gold",
        rating: 4.9,
        reviews_count: 18,
      },
      {
        id: "3",
        name: "Modern Coffee Table",
        description: "Minimalist coffee table with glass top",
        price: 899.99,
        category: "furniture",
        images: ["/images/projects/minimalist-living-1.jpg"],
        featured: false,
        status: "active",
        stock_quantity: 8,
        sku: "MCT003",
        material: "Glass & Steel",
        color: "Clear",
        rating: 4.6,
        reviews_count: 12,
      },
      {
        id: "4",
        name: "Decorative Vase Set",
        description: "Handcrafted ceramic vases for home decoration",
        price: 299.99,
        category: "decor",
        images: ["/images/projects/luxury-living-2.jpg"],
        featured: false,
        status: "active",
        stock_quantity: 15,
        sku: "DVS004",
        material: "Ceramic",
        color: "White & Gold",
        rating: 4.4,
        reviews_count: 8,
      },
    ]

    setProducts(sampleProducts)
    setLoading(false)
  }, [])

  const filters = [
    { key: "all", label: "All Products" },
    { key: "furniture", label: "Furniture" },
    { key: "lighting", label: "Lighting" },
    { key: "decor", label: "Decor" },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesFilter = activeFilter === "all" || product.category === activeFilter
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const addToCart = async (productId: string) => {
    console.log("Adding to cart:", productId)
    // Add to cart logic here
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-black to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-white/60 mt-4">Loading products...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-b from-black to-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-light text-white mb-6">
            <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-emerald-400 bg-clip-text text-transparent">
              Premium Products
            </span>
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6" />
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Discover our curated collection of luxury furniture and decor pieces
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-center justify-between mb-12 gap-6"
        >
          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-full interactive-element"
              data-cursor="Search"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-white/60" />
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <motion.button
                  key={filter.key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 interactive-element ${
                    activeFilter === filter.key
                      ? "bg-gradient-to-r from-amber-400 to-rose-400 text-white shadow-lg"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white backdrop-blur-sm"
                  }`}
                  data-cursor={filter.label}
                >
                  {filter.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* View Mode */}
          <div className="flex items-center space-x-2 bg-white/10 rounded-full p-1 backdrop-blur-sm">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-full transition-colors interactive-element ${
                viewMode === "grid" ? "bg-white/20 text-white" : "text-white/60 hover:text-white"
              }`}
              data-cursor="Grid View"
            >
              <Grid className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-full transition-colors interactive-element ${
                viewMode === "list" ? "bg-white/20 text-white" : "text-white/60 hover:text-white"
              }`}
              data-cursor="List View"
            >
              <List className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeFilter}-${viewMode}-${searchQuery}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" : "space-y-8"}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                className={`group cursor-pointer ${viewMode === "list" ? "flex gap-6" : ""}`}
              >
                <div
                  className={`relative overflow-hidden ${
                    viewMode === "list" ? "w-80 h-60" : "aspect-[4/5]"
                  } rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900`}
                >
                  {/* Product Image */}
                  <Image
                    src={product.images[0] || "/placeholder.svg?height=400&width=300"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Hover Actions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredProduct === product.id ? 1 : 0,
                      y: hoveredProduct === product.id ? 0 : 20,
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="flex items-center space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors interactive-element"
                        data-cursor="Quick View"
                      >
                        <Eye className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors interactive-element"
                        data-cursor="Add to Wishlist"
                      >
                        <Heart className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => addToCart(product.id)}
                        className="w-12 h-12 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full flex items-center justify-center text-white shadow-lg interactive-element"
                        data-cursor="Add to Cart"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full capitalize">
                      {product.category}
                    </span>
                  </div>

                  {/* Featured Badge */}
                  {product.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-rose-400 text-white text-xs font-medium rounded-full">
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Stock Status */}
                  {product.stock_quantity === 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-full">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className={`${viewMode === "list" ? "flex-1" : "mt-6"}`}>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-white/70 mb-4 line-clamp-2">{product.description}</p>

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < product.rating! ? "text-yellow-400 fill-current" : "text-gray-400"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-white/60 text-sm">({product.reviews_count || 0} reviews)</span>
                    </div>
                  )}

                  {/* Material & Color */}
                  {(product.material || product.color) && (
                    <div className="flex items-center space-x-4 mb-3 text-sm text-white/60">
                      {product.material && <span>Material: {product.material}</span>}
                      {product.color && <span>Color: {product.color}</span>}
                    </div>
                  )}

                  {/* Price & Actions */}
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-white">${product.price.toFixed(2)}</div>

                    <Button
                      onClick={() => addToCart(product.id)}
                      disabled={product.stock_quantity === 0}
                      className="bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-500 hover:to-rose-500 text-white border-0 interactive-element"
                      data-cursor="Add to Cart"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-white mb-2">No products found</h3>
            <p className="text-white/60">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-amber-400 to-rose-400 text-white rounded-full font-medium shadow-2xl hover:shadow-amber-400/25 transition-shadow interactive-element"
              data-cursor="Load More"
            >
              Load More Products
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
