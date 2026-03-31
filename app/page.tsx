import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import MarqueeBanner from "@/components/MarqueeBanner";
import MusicSection from "@/components/MusicSection";
import AboutSection from "@/components/AboutSection";
import DocumentaryTeaser from "@/components/DocumentaryTeaser";
import GraffitiWall from "@/components/GraffitiWall";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";
import AnnouncementBar from "@/components/AnnouncementBar";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      <EmailPopup />
      <main>
        <Hero />
        <MarqueeBanner />
        <MusicSection />
        <hr className="y2k-hr max-w-md mx-auto" />
        <AboutSection />
        <DocumentaryTeaser />
        <hr className="y2k-hr max-w-md mx-auto" />
        <GraffitiWall />
        <hr className="y2k-hr max-w-md mx-auto" />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
