import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
  faCircle,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";

const Carousel = () => {
  const [state, setState] = useState({ activeIndex: 1, length: 5 });
  const testimonials = [
    {
      logoUrl: "./ebay.svg",
      quote:
        "Everyone loves it; it has democratized our finance function. In some ways Hustlo shattered hierarchy and brought us together.",
      name: "Bharath Sundar",
      industry: "eCommerce",
      company: "Finance, eBay",
    },
    {
      logoUrl: "./egencia.svg",
      quote:
        "Very simple to use, great automation and keeps me on track with all I need to do. I also like that it can be shared with others.",
      name: "Kerry Parker-Evens",
      industry: "Travel",
      company: "IT Project Manager, Egencia",
    },
    {
      logoUrl: "./detroit-red-wings.png",
      quote:
        "Hustlo makes it easy to keep everyone one the same page. As changes happen, the real-time updates with email notifications have been key.",
      name: "Haydon Dotson",
      industry: "Sport",
      company: "Sales Manager, Detroit Red Wings",
    },
    {
      logoUrl: "./sprout-social.svg",
      quote:
        "Now that we've switched to a remote environment, with the use of Trello, we can now limit the number of meetings we have regarding specific projects and turn to Trello for updates instead.",
      name: "Haley Ennes",
      industry: "Marketing",
      company: "HR Manager, Sprout Social",
    },
  ];

  const goToNextSlide = () => {
    let index = state.activeIndex;
    let length = state.length;
    if (index === length - 1) {
      index = 1;
    } else {
      index++;
    }
    setState({ ...state, activeIndex: index });
  };

  const goToCertainSlide = (clickedIndex: number) => {
    setState({ ...state, activeIndex: clickedIndex });
  };

  const goToPrevSlide = () => {
    let index = state.activeIndex;
    let length = state.length;
    if (index < 1) {
      index = length - 1;
    } else {
      index--;
    }
    setState({ ...state, activeIndex: index });
  };

  return (
    <section className="w-full h-full p-4 flex-col justify-center items-center bg-blue-light font-nunito">
      {testimonials.map((testimonial, index) => {
        const visibility =
          index + 1 === state.activeIndex ? "active" : "inactive";
        const style = `relative flex flex-col justify-center items-center text-center transition-all ${visibility}`;
        return (
          <div key={index} className={style}>
            <div className="flex justify-center align-center m-20">
              <img alt="logo" src={testimonial.logoUrl} className="w-60" />
            </div>
            <h5 className="uppercase">industry</h5>
            <h3>{testimonial.industry}</h3>
            <FontAwesomeIcon icon={faQuoteLeft} className="absolute left-0" />
            <blockquote className="text-lg m-8">{testimonial.quote}</blockquote>
            <h5 className="uppercase">{testimonial.name}</h5>
            <h3 className="">{testimonial.company}</h3>
          </div>
        );
      })}
      <div className="h-1 w-full my-10 border-t-4"></div>
      <ul className="flex justify-center items-center">
        <span onClick={() => goToPrevSlide()}>
          <FontAwesomeIcon icon={faArrowCircleLeft} className="m-2" />
        </span>
        {testimonials.map((testimonial, index) => (
          <span key={index + 1} onClick={() => goToCertainSlide(index + 1)}>
            <FontAwesomeIcon icon={faCircle} className="m-2 w-2.5 h-2.5" />
          </span>
        ))}
        <span onClick={() => goToNextSlide()}>
          <FontAwesomeIcon icon={faArrowCircleRight} className="m-2" />
        </span>
      </ul>
    </section>
  );
};
export default Carousel;
