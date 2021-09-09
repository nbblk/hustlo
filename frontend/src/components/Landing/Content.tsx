import React from "react";

type ContentProps = {
  smallTitle?: string;
  title: string;
  body: string;
  children?: React.ReactNode;
};

const Content = (props: ContentProps) => (
  <article className="w-full my-24 flex flex-col justify-center items-center text-center">
    <h6 className={`${props.smallTitle ? "block" : "hidden"} my-4 uppercase`}>
      {props.smallTitle}
    </h6>
    <h1 className="my-4 font-krona leading-normal text-2xl md:text-4xl">
      {props.title}
    </h1>
    <p className="sm:w-full md:w-2/3 xl:w-1/2 my-8 font-nunito text-md md:text-xl">
      {props.body}
    </p>
    {props.children}
  </article>
);

export default Content;
