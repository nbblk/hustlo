import React from "react";

import Header from "../components/Header";
import TopContent from "../components/Landing/TopContent";
import MiddleContent from "../components/Landing/MiddleContent";
import Features from "../components/Features";
import Carousel from "../components/Carousel";
import BottomContent from "../components/Landing/BottomContent";
import Footer from "../components/Landing/Footer";

class Landing extends React.Component {
  render() {
    return (
      <div className="h-screen w-screen m-0 p-0 overflow-x-hidden text-center">
        <Header color="transparent" />
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
}

export default Landing;
