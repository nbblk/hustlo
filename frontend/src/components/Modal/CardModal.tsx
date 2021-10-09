import { FormEvent, useState } from "react";
import Modal from "./Modal";
import Contents from "../Card/Contents";
import SideMenu from "../Card/SideMenu";

interface CardModalProps {
  id: string;
  dismiss: () => void;
  create: (event: FormEvent<HTMLButtonElement>) => void;
}

type CardModalType = {
  id: string;
  title: string;
  description?: string;
  comments: [];
  attachments: [];
  labels: [];
  fetch: boolean;
  loading: boolean;
};

const CardModal = (props: CardModalProps) => {
  const [card, setCard] = useState<CardModalType>({
    id: "",
    title: "",
    description: "",
    comments: [],
    attachments: [],
    labels: [],
    fetch: false,
    loading: false,
  });

  return (
    <>
      <Modal
        width={"full md:1/2"}
        height={"1/2"}
        title={card.title}
        bgColor="gray-lightest"
        dismiss={props.dismiss}
      >
        <div className="w-full h-2/3 flex justify-around font-nunito text-gray">
          <Contents
            description={card.description ? card.description : ""}
            labels={card.labels}
            attachments={card.attachments}
            comments={card.comments}
          />
          <SideMenu />
        </div>
      </Modal>
    </>
  );
};

export default CardModal;
