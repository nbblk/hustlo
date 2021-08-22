const Content = (props: any) => (
  <article className="w-full my-20 flex flex-col mx-4 text-center">
    <h6 className="uppercase my-4">{props.smallTitle}</h6>
    <h1 className="font-krona leading-normal text-2xl md:text-4xl">
      {props.title}
    </h1>
    <p className="m-4 font-nunito text-md md:text-xl">{props.body}</p>
    {props.children}
  </article>
);

export default Content;
