const SlideDownContent = (props: any) => (
  <div
    className={`${
      props.isExpanded ? "expandable" : ""
    } font-nunito h-0 overflow-hidden transition-all`}
  >
    <p className="my-4">{props.body}</p>
    <ul className="list-disc">
      {props.bullets.map((bullet: string, index: number) => (
        <li key={index.toString()}>{bullet}</li>
      ))}
    </ul>
  </div>
);

export default SlideDownContent;
