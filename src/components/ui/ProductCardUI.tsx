import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { HeadlessProductCard } from "@/components/headless/HeadlessProductCard"
import type { Product } from "@/lib/supabase"
import { Moon } from "lucide-react"

interface ProductCardUIProps {
  product: Product
}

export const ProductCardUI = ({ product }: ProductCardUIProps) => {
  return (
    <HeadlessProductCard product={product}>
      {(logic) => (
        <Card className="bg-white border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-xl group">
          <CardContent className="p-0">
            <Link to={`/products/${logic.product.slug}`} className="block">
              <div className="aspect-square bg-secondary rounded-t-lg overflow-hidden relative">
                {(logic.matchingVariant?.image || (logic.product.images && logic.product.images.length > 0)) ? (
                  <img
                    src={(logic.matchingVariant?.image as any) || logic.product.images![0]}
                    alt={logic.product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <Moon className="h-12 w-12" />
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {logic.discountPercentage && (
                    <span className="bg-destructive text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                      Save {logic.discountPercentage}%
                    </span>
                  )}
                  {logic.product.featured && (
                    <span className="bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                      Bestseller
                    </span>
                  )}
                  {!logic.inStock && (
                    <span className="bg-foreground text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                      Out of stock
                    </span>
                  )}
                </div>
              </div>
            </Link>

            <div className="p-4">
              <Link to={`/products/${logic.product.slug}`}>
                <h3 className="text-foreground font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {logic.product.title}
                </h3>
                {logic.product.description && (
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {logic.product.description.replace(/<[^>]*>/g, '')}
                  </p>
                )}
              </Link>

              {logic.hasVariants && logic.options && (
                <div className="mb-4 space-y-2">
                  {logic.options.map((opt) => (
                    <div key={opt.id}>
                      <div className="text-xs font-medium text-foreground mb-1.5">{opt.name}</div>
                      <div className="flex flex-wrap gap-2">
                        {opt.values.filter(val => logic.isOptionValueAvailable(opt.name, val)).map((val) => {
                          const isSelected = logic.selected[opt.name] === val
                          const swatch = opt.name.toLowerCase() === 'color' ? opt.swatches?.[val] : undefined

                          if (swatch) {
                            return (
                              <button
                                key={val}
                                type="button"
                                onClick={() => logic.handleOptionChange(opt.name, val)}
                                title={`${opt.name}: ${val}`}
                                className={`h-7 w-7 rounded-full border-2 transition-all ${
                                  isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                                } ${logic.selected[opt.name] && !isSelected ? 'opacity-40' : ''}`}
                                style={{ backgroundColor: swatch }}
                                aria-label={`${opt.name}: ${val}`}
                              />
                            )
                          }

                          return (
                            <button
                              key={val}
                              type="button"
                              onClick={() => logic.handleOptionChange(opt.name, val)}
                              className={`border-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                                isSelected 
                                  ? 'border-primary bg-primary text-white shadow-sm' 
                                  : logic.selected[opt.name] && !isSelected
                                    ? 'border-border bg-white text-muted-foreground opacity-40'
                                    : 'border-border bg-white text-foreground hover:border-primary'
                              }`}
                              aria-pressed={isSelected}
                              aria-label={`${opt.name}: ${val}`}
                              title={`${opt.name}: ${val}`}
                            >
                              {val}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex flex-col">
                  <span className="text-foreground font-bold text-lg">
                    {logic.formatMoney(logic.currentPrice)}
                  </span>
                  {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                    <span className="text-muted-foreground text-sm line-through">
                      {logic.formatMoney(logic.currentCompareAt)}
                    </span>
                  )}
                </div>
                <Button
                  variant={logic.inStock ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    logic.onAddToCartSuccess()
                    logic.handleAddToCart()
                  }}
                  disabled={!logic.canAddToCart}
                  className={logic.inStock ? "bg-primary hover:bg-primary/90 shadow-sm" : ""}
                >
                  {logic.inStock ? 'Add to Cart' : 'Out of stock'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </HeadlessProductCard>
  )
}