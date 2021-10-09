import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddNewCard = (props: any) => (
    <div className="my-2 cursor-pointer hover:opacity-25" onClick={props.click}>
    <span>
      <FontAwesomeIcon icon={faPlus} className="mx-2" />
      Add a card
    </span>
  </div>
)

export default AddNewCard;