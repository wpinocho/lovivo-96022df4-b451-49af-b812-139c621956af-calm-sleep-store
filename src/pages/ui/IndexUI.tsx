import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Moon, Sparkles, CheckCircle2, ArrowRight, Bed, Pill, ShoppingBag } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { CollectionCard } from '@/components/CollectionCard';
import { FloatingCart } from '@/components/FloatingCart';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    searchTerm,
    selectedCollectionId,
    filteredProducts,
    setSearchTerm,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic;

  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});

  const quizQuestions = [
    {
      question: "What's your primary sleep concern?",
      options: ["Falling asleep", "Staying asleep", "Waking refreshed", "Pain/discomfort"]
    },
    {
      question: "What's your preferred sleep position?",
      options: ["Back", "Side", "Stomach", "Combination"]
    },
    {
      question: "Do you sleep hot or cold?",
      options: ["Hot sleeper", "Cold sleeper", "Just right", "Varies"]
    }
  ];

  const handleQuizAnswer = (answer: string) => {
    setQuizAnswers({ ...quizAnswers, [quizStep]: answer });
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({});
  };

  const pillowsCollection = collections.find(c => c.name === "Premium Pillows");
  const toppersCollection = collections.find(c => c.name === "Mattress Toppers");
  const beddingCollection = collections.find(c => c.name === "Luxury Bedding");
  const supplementsCollection = collections.find(c => c.name === "Sleep Supplements");

  return (
    <EcommerceTemplate showCart={true}>
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-calm py-20 md:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-primary/20">
                <Moon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Science-backed sleep solutions</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                Sleep better,
                <span className="block text-primary">live better</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Transform your nights with premium sleep products designed for deep rest and recovery. Wake up refreshed, every day.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                  Find Your Setup
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                  Take Sleep Quiz
                </Button>
              </div>
              
              <div className="mt-12 flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">30-night trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Free shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Expert support</span>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=800&fit=crop" 
                  alt="Premium sleep products"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-primary/10 rounded-full p-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground">Better Sleep Guaranteed</span>
                </div>
                <p className="text-sm text-muted-foreground">Join 50,000+ happy sleepers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillow vs Topper Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Pillow or Topper? Find Your Perfect Match
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Not sure what you need? Compare our premium pillows and mattress toppers to find the ideal solution for your sleep style.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Pillows */}
            <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-8">
                <div className="bg-secondary rounded-2xl p-6 mb-6">
                  <Bed className="h-12 w-12 text-primary mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 text-center">Premium Pillows</h3>
                <p className="text-muted-foreground mb-6 text-center">
                  Perfect for neck support and alignment. Choose from memory foam, cooling gel, and more.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Optimal neck and spine alignment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Temperature regulation options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Hypoallergenic materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Starting at $79</span>
                  </li>
                </ul>
                {pillowsCollection && (
                  <Button 
                    className="w-full" 
                    onClick={() => handleViewCollectionProducts(pillowsCollection.id)}
                  >
                    Shop Pillows
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Toppers */}
            <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-8">
                <div className="bg-secondary rounded-2xl p-6 mb-6">
                  <ShoppingBag className="h-12 w-12 text-primary mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 text-center">Mattress Toppers</h3>
                <p className="text-muted-foreground mb-6 text-center">
                  Transform your entire sleep surface. Add comfort and support to any mattress.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Full-body pressure relief</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Extends mattress lifespan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">3-inch premium memory foam</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Starting at $199</span>
                  </li>
                </ul>
                {toppersCollection && (
                  <Button 
                    className="w-full"
                    onClick={() => handleViewCollectionProducts(toppersCollection.id)}
                  >
                    Shop Toppers
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 gradient-sleep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Complete Sleep Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From premium bedding to natural supplements, everything you need for restorative sleep.
            </p>
          </div>

          {!loadingCollections && collections.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {beddingCollection && (
                <div className="group cursor-pointer" onClick={() => handleViewCollectionProducts(beddingCollection.id)}>
                  <Card className="overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
                    <CardContent className="p-0">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src={beddingCollection.image || ''} 
                          alt={beddingCollection.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Bed className="h-5 w-5 text-primary" />
                          <h3 className="text-2xl font-bold text-foreground">{beddingCollection.name}</h3>
                        </div>
                        <p className="text-muted-foreground mb-4">{beddingCollection.description}</p>
                        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                          Explore Bedding
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {supplementsCollection && (
                <div className="group cursor-pointer" onClick={() => handleViewCollectionProducts(supplementsCollection.id)}>
                  <Card className="overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
                    <CardContent className="p-0">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src={supplementsCollection.image || ''} 
                          alt={supplementsCollection.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Pill className="h-5 w-5 text-primary" />
                          <h3 className="text-2xl font-bold text-foreground">{supplementsCollection.name}</h3>
                        </div>
                        <p className="text-muted-foreground mb-4">{supplementsCollection.description}</p>
                        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                          Explore Supplements
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Sleep Quiz Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-4">
              <Moon className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Personalized Recommendations</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Find Your Perfect Sleep Setup
            </h2>
            <p className="text-lg text-muted-foreground">
              Take our quick 3-question quiz to get personalized product recommendations.
            </p>
          </div>

          <Card className="border-2 shadow-xl">
            <CardContent className="p-8">
              {quizStep < quizQuestions.length ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      Question {quizStep + 1} of {quizQuestions.length}
                    </span>
                    <div className="flex gap-2">
                      {quizQuestions.map((_, idx) => (
                        <div 
                          key={idx}
                          className={`h-2 w-12 rounded-full transition-colors ${
                            idx <= quizStep ? 'bg-primary' : 'bg-secondary'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    {quizQuestions[quizStep].question}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {quizQuestions[quizStep].options.map((option) => (
                      <Button
                        key={option}
                        variant="outline"
                        size="lg"
                        className="h-auto py-6 text-left justify-start hover:bg-primary hover:text-white hover:border-primary transition-all"
                        onClick={() => handleQuizAnswer(option)}
                      >
                        <span className="text-base">{option}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="bg-secondary rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Great! We've found your perfect setup
                  </h3>
                  <p className="text-muted-foreground">
                    Based on your answers, we recommend exploring our Premium Pillows and Sleep Supplements collections.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button size="lg" onClick={handleShowAllProducts}>
                      View Recommendations
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button size="lg" variant="outline" onClick={resetQuiz}>
                      Retake Quiz
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 gradient-sleep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-2">
                {selectedCollectionId 
                  ? collections.find(c => c.id === selectedCollectionId)?.name || 'Products'
                  : 'Featured Products'
                }
              </h2>
              <p className="text-muted-foreground">
                Premium sleep solutions for better rest and recovery
              </p>
            </div>
            {selectedCollectionId && (
              <Button 
                variant="outline" 
                onClick={handleShowAllProducts}
                className="hidden md:flex"
              >
                See All Products
              </Button>
            )}
          </div>

          {/* Search Bar */}
          <div className="max-w-md mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                type="text" 
                placeholder="Search products..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="pl-10 bg-white"
              />
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg h-96 animate-pulse"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchTerm 
                  ? 'No products found matching your search.' 
                  : 'No products available.'
                }
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to transform your sleep?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers who've discovered the secret to better rest. Start your journey to deeper, more restorative sleep tonight.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-white text-foreground hover:bg-white/90"
              onClick={handleShowAllProducts}
            >
              Find Your Setup
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white/10"
            >
              Contact Sleep Expert
            </Button>
          </div>
          
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>30-night trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>Free shipping & returns</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>Lifetime warranty</span>
            </div>
          </div>
        </div>
      </section>

      <FloatingCart />
    </EcommerceTemplate>
  );
};