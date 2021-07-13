const Content = (props: any) => (
  <article>
    <h1 className="font-krona leading-normal text-2xl md:text-4xl">
      {props.title}
    </h1>
    <p className="m-4 font-nunito text-md md:text-xl md:p-12">{props.body}</p>
  </article>
);

export default Content;
