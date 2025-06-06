
import { Button } from "@/components/ui/button";
import IntersectionObserver from "./IntersectionObserver";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Animated gradient blob */}
      <div className="hero-blob top-0 left-1/2 -translate-x-1/2"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 max-w-2xl">
            <IntersectionObserver>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Transform Your Photos With <span className="gradient-text">AI Magic</span>
              </h1>
            </IntersectionObserver>
            
            <IntersectionObserver threshold={0.2}>
              <p className="text-lg text-foreground/80 mb-8">
                Our advanced AI photo enhancement technology brings your images to life with 
                stunning clarity, perfect lighting, and vivid colors. Say goodbye to dull, 
                blurry photos and hello to professional-quality images in seconds.
              </p>
            </IntersectionObserver>
            
            <IntersectionObserver threshold={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
                  Try For Free
                </Button>
                <Button variant="outline" size="lg">
                  See Examples
                </Button>
              </div>
            </IntersectionObserver>
          </div>
          
          <div className="flex-1">
            <IntersectionObserver threshold={0.1}>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl blur-md opacity-75"></div>
                <div className="relative bg-background rounded-lg overflow-hidden border border-border shadow-xl animate-float">
                  <img 
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                    alt="AI Photo Enhancement Demo" 
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-background/0 p-4">
                    <div className="text-sm font-medium">Enhanced with PixelPerfect AI</div>
                  </div>
                </div>
              </div>
            </IntersectionObserver>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
