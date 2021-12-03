import {
  faComment,
  faFileArchive,
  faPen,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FocusEvent } from "react";
import InputBox from "../InputBox";
import Content from "./Content";
import { LabelType } from "./Label";

interface ContentsProps {
  description: string;
  labels: LabelType[];
  attachments: [];
  comments: [];
  descriptionEnabled: boolean;
  focusDescription: () => void;
  changeDescription: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  updateDescription: (event: FocusEvent<HTMLTextAreaElement>) => void;
  changeComment: (event: ChangeEvent<HTMLInputElement>) => void;
  clickAddCommentButton: () => void;
  clickFilename: (fileId: string, filename: string) => void;
  clickDeleteFileIcon: (fileId: string) => void;
}

type Comment = {
  _id: string;
  created_at: Date;
  comment: string;
};

const Contents = (props: ContentsProps) => (
  <div className="w-2/3 h-full flex flex-col justify-between items-start">
    {props.labels.find((label: LabelType) => label.checked) !== undefined ? (
      <Content title={"LABELS"}>
        <ul className="flex justify-center items-center">
          {props.labels.map((label: LabelType, index: number) =>
            label.checked ? (
              <button
                key={index}
                className={`w-12 h-8 mx-1 bg-${label.color} hover:opacity-25 text-white rounded`}
              >
                {label.title}
              </button>
            ) : null
          )}
        </ul>
      </Content>
    ) : null}
    <Content title={"Description"} icon={faPen}>
      <div onClick={props.focusDescription} className="w-full h-auto">
        <textarea
          className="w-full h-full m-2 p-2 bg-gray-regular rounded"
          defaultValue={props.description}
          placeholder="Add more detailed description..."
          disabled={!props.descriptionEnabled}
          onChange={props.changeDescription}
          onBlur={props.updateDescription}
        />
      </div>
    </Content>
    {props.attachments.length > 0 ? (
      <Content title={"Attachments"} icon={faFileArchive}>
        <ul className="w-full p-4 bg-gray-regular rounded">
          {props.attachments.map((file: any) => (
            <li key={file._id} className="flex justify-between cursor-pointer">
              <span
                className="hover:text-blue hover:underline"
                onClick={() => props.clickFilename(file.fileId, file.filename)}
              >
                {file.filename}
              </span>
              <span onClick={() => props.clickDeleteFileIcon(file.fileId)}>
                <FontAwesomeIcon
                  icon={faTimes}
                  color="gray"
                  className="hover:text-red"
                />
              </span>
            </li>
          ))}
        </ul>
      </Content>
    ) : null}
    <Content title={"Comment"} icon={faComment}>
      <div className="w-full flex flex-col justify-between items-end">
        <InputBox
          type={"text"}
          height={"full"}
          width={"full"}
          placeholder={"Add a comment..."}
          change={props.changeComment}
        />
        <button
          className="w-1/3 md:w-1/5 h-8 my-2 bg-blue text-white rounded hover:opacity-25"
          onClick={props.clickAddCommentButton}
        >
          Add
        </button>
      </div>
      <ul className="w-full h-auto m-2 font-gray overflow-y-scroll">
        {props.comments.map((comment: Comment) => (
          <li
            key={comment._id}
            className="w-full my-2 flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <span className="">{comment.comment}</span>
            <span className="text-xs">{comment.created_at}</span>
          </li>
        ))}
      </ul>
    </Content>
  </div>
);
export default Contents;
