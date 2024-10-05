import HeroSection from "./components/HeroSection";
import SectionDivider from "./components/SectionDivider";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <div className="container mt-24 mx-auto px-12 py-4">
        <HeroSection />
        <SectionDivider />
      </div>
    </main>
  );
}
