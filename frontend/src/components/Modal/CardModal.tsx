import {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import Modal from "./Modal";
import Contents from "../Card/Contents";
import SideMenu from "../Card/SideMenu";
import axios from "axios";
import LabelModal from "./LabelModal";
import { LabelType } from "../Card/Label";
import AttachmentModal from "./AttachmentModal";

interface CardModalProps {
  id: string;
  title: string;
  boardId: string;
  workspaceId: string;
  listId: string;
  labels?: LabelType[];
  isMainLabel: boolean;
  isEditLabel: boolean;
  isAddLabel: boolean;
  dismiss: () => void;
  //create: (event: FormEvent<HTMLButtonElement>) => void;
  clickLabelColor: (index: number, color: string) => void;
  clickEditLabelTitleIcon: (index: MouseEvent<HTMLSpanElement>) => void;
  changeOldLabelTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  clickEditLabelTitleButton: () => void;
  clickAddNewLabelButton: () => void;
  submitAddNewLabelButton: (index: number, title: string) => void;
  clickArchiveCardButton: () => void;
  goBack: () => void;
}

type CardModalType = {
  title: string;
  labelsSelected: LabelType[];
  description?: string;
  descriptionEnabled: boolean;
  comments?: [];
  comment: string;
  attachments: [];
  fetch: boolean;
  update: boolean;
  loading: boolean;
  labelModalClicked: boolean;
  attachmentClicked: boolean;
  isEditLabel: boolean;
  isAddLabel: boolean;
  selectedFile: File | null;
  selectedFilename: string;
};

const CardModal = (props: CardModalProps) => {
  const [card, setCard] = useState<CardModalType>({
    title: "",
    labelsSelected: props.labels!,
    description: "",
    descriptionEnabled: true,
    comments: [],
    comment: "",
    attachments: [],
    fetch: false,
    update: false,
    loading: false,
    labelModalClicked: false,
    attachmentClicked: false,
    isEditLabel: false,
    isAddLabel: false,
    selectedFile: null,
    selectedFilename: "",
  });

  const blurDescription = async () => {
    setCard({ ...card, descriptionEnabled: false });
    await updateDescription();
  };

  const updateDescription = async () => {
    let user = JSON.parse(sessionStorage.getItem("user")!);
    try {
      await axios.request({
        method: "POST",
        url: `${process.env.REACT_APP_BASEURL}/card/description`,
        headers: { _id: user._id, Authorization: `Bearer ${user.token}` },
        data: {
          workspaceId: props.workspaceId,
          boardId: props.boardId,
          listId: props.listId,
          cardId: props.id,
          description: card.description,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const changeComment = (event: ChangeEvent<HTMLInputElement>) => {
    let comment = event.target.value;
    if (comment.length > 0) {
      setCard({ ...card, comment: comment });
    }
  };

  const clickAddCommentButton = async () => {
    if (card.comment.length > 0) {
      let user = JSON.parse(sessionStorage.getItem("user")!);
      try {
        await axios.request({
          method: "POST",
          url: `${process.env.REACT_APP_BASEURL}/card/comment`,
          headers: {
            _id: user._id,
            Authorization: `Bearer ${user.token}`,
          },
          data: {
            workspaceId: props.workspaceId,
            boardId: props.boardId,
            listId: props.listId,
            cardId: props.id,
            comment: card.comment,
          },
        });
        setCard({
          ...card,
          loading: false,
          fetch: true,
        });
      } catch (error) {
        console.error(error);
        setCard({ ...card, loading: false, fetch: false });
      }
    }
  };

  const changeAttachment = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      setCard({ ...card, selectedFile: file, selectedFilename: file.name });
    }
  };

  const clickUploadButton = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (card.selectedFile === null) return;

    let user = JSON.parse(sessionStorage.getItem("user")!);
    try {
      const formData = new FormData();
      formData.append("File", card.selectedFile);

      await axios.request({
        method: "POST",
        url: `${process.env.REACT_APP_BASEURL}/card/attachment`,
        headers: {
          _id: user._id,
          workspaceId: props.workspaceId,
          boardId: props.boardId,
          listId: props.listId,
          cardId: props.id,
          filename: card.selectedFilename,
          Authorization: `Bearer ${user.token}`,
        },
        data: formData,
      });
      setCard({
        ...card,
        loading: false,
        fetch: true,
        attachmentClicked: false,
        selectedFile: null,
        selectedFilename: "",
      });
    } catch (error) {
      console.error(error);
      setCard({
        ...card,
        loading: false,
        fetch: false,
        selectedFile: null,
        selectedFilename: "",
      });
    }
  };

  const downloadAttachment = async (fileId: string, filename: string) => {
    if (!fileId || !filename) return;

    let extension = filename.split(".")[1];

    let user = JSON.parse(sessionStorage.getItem("user")!);
    try {
      const result = await axios.request({
        method: "GET",
        url: `${process.env.REACT_APP_BASEURL}/card/attachment/${fileId}`,
        headers: {
          _id: user._id,
          filename: filename,
          Authorization: `Bearer ${user.token}`,
        },
        responseType: "blob",
      });

      if (result.data) {
        const url = window.URL.createObjectURL(new Blob([result.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Filename.${extension}`);

        document.body.appendChild(link);
        link.click();
        link.parentNode!.removeChild(link);
      }

      setCard({
        ...card,
        loading: false,
        fetch: true,
      });
    } catch (error) {
      console.error(error);
      setCard({
        ...card,
        loading: false,
        fetch: false,
      });
    }
  };

  const deleteAttachment = async (fileId: string) => {
    let user = JSON.parse(sessionStorage.getItem("user")!);
    try {
      await axios.request({
        method: "DELETE",
        url: `${process.env.REACT_APP_BASEURL}/card/attachment/${fileId}`,
        headers: {
          _id: user._id,
          workspaceId: props.workspaceId,
          boardId: props.boardId,
          listId: props.listId,
          cardId: props.id,
          Authorization: `Bearer ${user.token}`,
        },
      });

      setCard({
        ...card,
        loading: false,
        fetch: true,
      });
    } catch (error) {
      console.error(error);
      setCard({
        ...card,
        loading: false,
        fetch: false,
      });
    }
  };

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user")!);

    const fetch = async () => {
      let result;
      try {
        result = await axios.request({
          method: "GET",
          url: `${process.env.REACT_APP_BASEURL}/card/${props.id}`,
          headers: {
            _id: user._id,
            workspaceId: props.workspaceId,
            boardId: props.boardId,
            listId: props.listId,
            Authorization: `Bearer ${user.token}`,
          },
        });
        result = result.data[0].boards.lists.cards;
        const labelsSelected = result.labelsSelected;
        const newLabels = [...card.labelsSelected];

        newLabels.map((label: LabelType) => {
          label.title = "";
          label.checked = false;
        });

        if (labelsSelected.length === 0) {
          newLabels.map((label: LabelType) => {
            label.checked = false;
            return;
          });
        } else {
          newLabels.map((label: LabelType) => {
            labelsSelected.map((selected: LabelType) => {
              if (label.color === selected.color) {
                label.checked = true;
                label.title = selected.title;
              }
            });
          });
        }

        setCard({
          ...card,
          labelsSelected: newLabels,
          description: result.description,
          comments: result.comments,
          attachments: result.attachments,
          loading: false,
          fetch: false,
        });
      } catch (error) {
        console.error(error);
        setCard({ ...card, loading: false, fetch: false });
      }
    };

    fetch();
  }, [card.fetch]);

  return (
    <>
      {card.labelModalClicked ? (
        <LabelModal
          isEdit={props.isEditLabel}
          isAdd={props.isAddLabel}
          isMain={props.isMainLabel}
          labels={props.labels}
          clickLabelColor={props.clickLabelColor}
          clickEditLabelTitleIcon={props.clickEditLabelTitleIcon}
          changeOldLabelTitle={props.changeOldLabelTitle}
          clickAddNewLabelButton={props.clickAddNewLabelButton}
          submitAddNewLabelButton={(index: number, title: string) =>
            props.submitAddNewLabelButton(index, title)
          }
          clickEditLabelTitleButton={props.clickEditLabelTitleButton}
          dismiss={() =>
            setCard({ ...card, labelModalClicked: !card.labelModalClicked })
          }
          goBack={props.goBack}
        />
      ) : null}
      {card.attachmentClicked ? (
        <AttachmentModal
          selectedFile={card.selectedFile}
          dismiss={() => setCard({ ...card, attachmentClicked: false })}
          changeFile={(event: ChangeEvent<HTMLInputElement>) =>
            changeAttachment(event)
          }
          clickUploadButton={(event: MouseEvent<HTMLButtonElement>) =>
            clickUploadButton(event)
          }
        />
      ) : null}
      <Modal
        width={"full md:w-1/2"}
        height={"full md:h-4/5 "}
        zIndex={"40"}
        title={props.title}
        bgColor="gray-lightest"
        dismiss={props.dismiss}
      >
        <div className="w-full h-2/3 flex justify-around font-nunito text-gray">
          <Contents
            description={card.description ? card.description : ""}
            labels={props.labels ? props.labels : []}
            attachments={card.attachments}
            comments={card.comments ? card.comments : []}
            descriptionEnabled={card.descriptionEnabled}
            focusDescription={() =>
              setCard({ ...card, descriptionEnabled: true })
            }
            changeDescription={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setCard({ ...card, description: event.target.value })
            }
            updateDescription={(event: FocusEvent<HTMLTextAreaElement>) =>
              blurDescription()
            }
            changeComment={(event: ChangeEvent<HTMLInputElement>) =>
              changeComment(event)
            }
            clickAddCommentButton={() => clickAddCommentButton()}
            clickFilename={(fileId: string, filename: string) =>
              downloadAttachment(fileId, filename)
            }
            clickDeleteFileIcon={(fileId: string) => deleteAttachment(fileId)}
          />
          <SideMenu
            clickLabelButton={() =>
              setCard({ ...card, labelModalClicked: !card.labelModalClicked })
            }
            clickAttachmentButton={() =>
              setCard({ ...card, attachmentClicked: !card.attachmentClicked })
            }
            clickArchiveButton={props.clickArchiveCardButton}
          />
        </div>
      </Modal>
    </>
  );
};

export default CardModal;
