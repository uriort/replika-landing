import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import HowItWorks from "@/components/sections/HowItWorks";
import InPractice from "@/components/sections/InPractice";
import DigitalTwin from "@/components/sections/DigitalTwin";
import Science from "@/components/sections/Science";
import UseCases from "@/components/sections/UseCases";
import PullQuote from "@/components/sections/PullQuote";
import WhyReplika from "@/components/sections/WhyReplika";
import EarlyAccess from "@/components/sections/EarlyAccess";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <InPractice />
        <DigitalTwin />
        <Science />
        <UseCases />
        <PullQuote />
        {/* WhyReplika section removed */}
        <EarlyAccess />
      </main>
      <Footer />
    </>
  );
}
