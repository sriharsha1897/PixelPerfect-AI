import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import IntersectionObserver from "./IntersectionObserver";

const plans = [
  {
    name: "Basic",
    price: "Free",
    features: [
      "10 AI photo enhancements per month",
      "Basic resolution upscaling",
      "Standard noise reduction",
      "Export in JPEG format",
      "Email support"
    ],
    isPopular: false,
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "per month",
    features: [
      "100 AI photo enhancements per month",
      "Advanced resolution upscaling",
      "Premium noise reduction",
      "Export in JPEG and PNG",
      "Priority email support",
      "Batch processing"
    ],
    isPopular: true,
    cta: "Start Free Trial",
  },
  {
    name: "Business",
    price: "$29.99",
    period: "per month",
    features: [
      "Unlimited AI photo enhancements",
      "Maximum resolution upscaling",
      "Advanced color correction",
      "Export in all formats",
      "Priority phone and email support",
      "Batch processing",
      "API access"
    ],
    isPopular: false,
    cta: "Contact Sales",
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 animate-on-scroll bg-muted/30">
      <div className="container mx-auto px-4">
        <IntersectionObserver>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Choose the perfect plan for your needs. All plans include our core AI enhancement technology.
            </p>
          </div>
        </IntersectionObserver>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <IntersectionObserver key={index} threshold={0.1}>
              <div className={`relative bg-background rounded-lg border ${plan.isPopular ? 'gradient-border' : 'border-border'} shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col`}>
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-tr-lg rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-foreground/70 ml-2">{plan.period}</span>}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto p-8 pt-0">
                  <Button 
                    variant={plan.isPopular ? "default" : "outline"} 
                    className={`w-full ${plan.isPopular ? 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600' : ''}`}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            </IntersectionObserver>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
