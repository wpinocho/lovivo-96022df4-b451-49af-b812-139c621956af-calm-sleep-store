import { ReactNode } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Moon } from 'lucide-react'
import { useCartUI } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'

interface EcommerceTemplateProps {
  children: ReactNode
  pageTitle?: string
  showCart?: boolean
  className?: string
  headerClassName?: string
  footerClassName?: string
  layout?: 'default' | 'full-width' | 'centered'
}

export const EcommerceTemplate = ({
  children,
  pageTitle,
  showCart = true,
  className,
  headerClassName,
  footerClassName,
  layout = 'default'
}: EcommerceTemplateProps) => {
  const { openCart } = useCartUI()
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  const header = (
    <div className={`py-4 bg-white border-b border-border ${headerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary rounded-lg p-2">
                <Moon className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">SleepWell</span>
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              <Link 
                to="/" 
                className="text-foreground/70 hover:text-primary transition-colors font-medium"
              >
                Home
              </Link>
              <Link 
                to="/blog" 
                className="text-foreground/70 hover:text-primary transition-colors font-medium"
              >
                Sleep Guide
              </Link>
            </nav>
          </div>

          {/* Cart */}
          {showCart && (
            <Button
              variant="ghost"
              size="icon"
              onClick={openCart}
              className="relative hover:bg-secondary"
            >
              <ShoppingCart className="h-5 w-5 text-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Button>
          )}
        </div>

        {/* Page Title */}
        {pageTitle && (
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-foreground">
              {pageTitle}
            </h1>
          </div>
        )}
      </div>
    </div>
  )

  const footer = (
    <div className={`bg-foreground text-white py-12 ${footerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary rounded-lg p-2">
                <Moon className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">SleepWell</span>
            </div>
            <p className="text-white/70">
              Premium sleep products for better rest and recovery. Transform your nights, transform your life.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
            <div className="space-y-2">
              <Link 
                to="/" 
                className="block text-white/70 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/blog" 
                className="block text-white/70 hover:text-white transition-colors"
              >
                Sleep Guide
              </Link>
              <a 
                href="#" 
                className="block text-white/70 hover:text-white transition-colors"
              >
                About Us
              </a>
              <a 
                href="#" 
                className="block text-white/70 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Follow Us</h3>
            <SocialLinks />
            <p className="text-white/70 text-sm mt-4">
              Join our community for sleep tips and exclusive offers.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20 text-center text-white/70">
          <p>&copy; 2024 SleepWell. All rights reserved. Sweet dreams guaranteed.</p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <PageTemplate 
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>
      
      {showCart && <FloatingCart />}
    </>
  )
}