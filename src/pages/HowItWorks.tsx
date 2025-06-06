import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HowItWorksSection from "@/components/HowItWorksSection";

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks; 