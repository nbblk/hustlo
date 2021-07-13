import React from "react";

import Header from "../components/Header";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BrandLogos from "../components/BrandLogos";
import Features from "../components/Features";
import Carousel from "../components/Carousel";

class Landing extends React.Component {
  render() {
    return (
      <div className="h-screen w-screen m-0 p-0 overflow-x-hidden">
        <Header color="transparent" />
        <div className="p-40">
          <section className="h-full">
            <h1 className="w-2/3 my-4 font-krona leading-normal text-5xl">
              Hustlo helps your side hustle move forward.
            </h1>
            <p className="w-3/4 my-8 font-nunito text-xl">
              Collaborate, manage projects, and reach new productivity peaks.
              From high rises to the home office, the way your team works is
              unique—accomplish it all with Hustlo.
            </p>
            <InputBox type="text" width="2/5" height="10" placeholder="Email" />
            <Button
              width="1/5"
              height="10"
              color="blue"
              textColor="white"
              value="Sign up — it’s free!"
            />
          </section>
          <section className="w-full h-full my-40 flex flex-col items-center justify-center">
            <h1 className="my-4 font-krona text-4xl text-center">
              Start your personal project
            </h1>
            <p className="my-8 px-40 w-screen font-nunito text-center text-xl">
              Start with a Hustlo board, lists, and cards. Customize and expand
              with more features as your teamwork grows. Manage projects,
              organize tasks, and build team spirit—all in one place.
            </p>
            <div className="flex flex-col items-center justify-center">
              <Button
                width="1/6"
                height="10"
                color="transparent"
                textColor="blue"
                textSize="md"
                border="true"
                borderColor="blue"
                value="Start doing"
              />
              <img
                src="./Landing preview.png"
                height="700"
                width="1080"
                className="m-8 filter drop-shadow-2xl"
              />
              <h3 className="m-8 font-nunito text-center text-xl">
                Join over 1,000,000 projects worldwide that are using Hustlo to
                get more done.
              </h3>
              <BrandLogos />
            </div>
          </section>
          <Features />
          <Carousel />
          <section>
            <div className="ctabox w-full h-60 my-16 flex flex-col justify-center items-center rounded-md">
              <p className="m-5 font-nunito font-bold text-white text-center">
                Sign up and get started with Hustlo today. A world of productive
                teamwork awaits!
              </p>
              <Button
                width="2/3"
                height="1/5"
                value="Sign up"
                textColor="white"
                borderColor="transparent"
                color="emerald"
              />
            </div>
          </section>
          <footer className="flex flex-col justify-center items-center">
            <select className="block">
              <option>English(US)</option>
              <option>Korean</option>
            </select>
            <small className="m-5">
              © Copyright 2021 by Blake Sim. All rights reserved.
            </small>
          </footer>
        </div>
      </div>
    );
  }
}

export default Landing;
