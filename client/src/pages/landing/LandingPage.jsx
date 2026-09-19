import Navbar from "../../components/navigation/Navbar";

import Hero from "../../components/landing/Hero";
import AboutSystem from "../../components/landing/AboutSystem";
import SystemCapabilities from "../../components/landing/SystemCapabilities";
import Workflow from "../../components/landing/Workflow";
import Footer from "../../components/landing/Footer";

function LandingPage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <AboutSystem />
        <SystemCapabilities />
        <Workflow />
      </main>

      <Footer />
    </>
  );
}

export default LandingPage;