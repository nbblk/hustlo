import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SlideDownContent from "./SlideDownContent";

const SlideDown = (props: any) => (
  <div>
    <button
      data-id={props.id}
      className="self-end my-4 hover:underline"
      onClick={(event) => props.click(event)}
    >
      <FontAwesomeIcon icon={faPlus} className="mx-4" />
      Learn more
    </button>
    <SlideDownContent
      isExpanded={props.isExpanded}
      body={props.body}
      bullets={props.bullets}
    />
  </div>
);

export default SlideDown;
