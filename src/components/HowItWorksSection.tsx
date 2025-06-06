import { Button } from "@/components/ui/button";
import IntersectionObserver from "./IntersectionObserver";

const steps = [
  {
    number: "01",
    title: "Upload Your Photo",
    description: "Simply upload any photo from your device or cloud storage that needs enhancement.",
  },
  {
    number: "02",
    title: "AI Processing",
    description: "Our advanced AI algorithms analyze your image and apply intelligent adjustments.",
  },
  {
    number: "03",
    title: "Download Enhanced Image",
    description: "Within seconds, download your professionally enhanced photo ready to share.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 animate-on-scroll">
      <div className="container mx-auto px-4">
        <IntersectionObserver>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How <span className="gradient-text">It Works</span>
            </h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Our process is simple and fast, delivering amazing results in just three easy steps.
            </p>
          </div>
        </IntersectionObserver>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <IntersectionObserver key={index} threshold={0.1}>
              <div className="relative">
                <div className="bg-background rounded-lg p-8 border border-border shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                  <div className="text-5xl font-bold text-primary/20 mb-4">{step.number}</div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-foreground/70">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground/30">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            </IntersectionObserver>
          ))}
        </div>

        <IntersectionObserver>
          <div className="flex justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
              Try It Yourself
            </Button>
          </div>
        </IntersectionObserver>
      </div>
    </section>
  );
};

export default HowItWorksSection;
