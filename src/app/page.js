"use client"
import CTASection from "@/components/home/CTASection";
import FeatureSection from "@/components/home/FeatureSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import TestimonialSection from "@/components/home/TestimonialSection";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { generateRandomId } from "@/utils/util";

export default function Home() {
  // console.log(generateRandomId(30));
  
  return (
    <div className="min-h-screen">
      <Navbar/>
      <main>
        <HeroSection/>
        <FeatureSection/>
        <HowItWorks/>
        <TestimonialSection/>
        <CTASection/>
      </main>
      <Footer/>
      
    </div>
  );
}
