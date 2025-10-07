import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Collection } from '@/lib/supabase'
import { ArrowRight, Sparkles } from 'lucide-react'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
}

export const CollectionCard = ({ collection, onViewProducts }: CollectionCardProps) => {
  return (
    <Card className="bg-white border-2 border-border overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-xl group">
      <CardContent className="p-0">
        <div className="aspect-[4/3] bg-secondary overflow-hidden relative">
          {collection.image ? (
            <img 
              src={collection.image} 
              alt={collection.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
          
          {collection.featured && (
            <div className="absolute top-3 right-3 bg-primary text-white text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1 shadow-lg">
              <Sparkles className="h-3 w-3" />
              Featured
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-foreground font-bold text-xl mb-2 group-hover:text-primary transition-colors">
            {collection.name}
          </h3>
          
          {collection.description && (
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {collection.description}
            </p>
          )}
          
          <Button 
            variant="outline" 
            className="w-full border-2 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
            onClick={() => onViewProducts(collection.id)}
          >
            Explore Collection
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}