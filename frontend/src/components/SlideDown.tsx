const SlideDown = (props: any) => (
  <div
    id={props.id}
    className="expandable font-nunito h-0 overflow-hidden transition-all"
  >
    <p>{props.body}</p>
    <ul>
      {props.bullets.map((bullet: String, index: Number) => (
        <li key={index.toString()}>{bullet}</li>
      ))}
    </ul>
  </div>
);

export default SlideDown;
