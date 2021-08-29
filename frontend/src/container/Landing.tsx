import Header from "../components/Header/Header";
import TopContent from "../components/Landing/TopContent";
import MiddleContent from "../components/Landing/MiddleContent";
import Features from "../components/Landing/Features";
import Carousel from "../components/Landing/Carousel";
import BottomContent from "../components/Landing/BottomContent";
import Footer from "../components/Landing/Footer";

function Landing() {
  return (
    <div className="h-screen w-screen m-0 p-0 overflow-x-hidden text-center">
      <Header bgColor="white" fontSize="md" textColor="white" isShadowed />
      <div className="p-4 sm:p-12 md:p-48">
        <TopContent />
        <MiddleContent />
        <Features />
        <Carousel />
        <BottomContent />
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
