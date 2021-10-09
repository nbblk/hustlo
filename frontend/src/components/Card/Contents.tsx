import {
  faComment,
  faFileArchive,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import Content from "./Content";

interface ContentsProps {
  description: string;
  labels: [];
  attachments: [];
  comments: [];
}

const Contents = (props: ContentsProps) => (
  <div className="w-2/3 h-full flex flex-col justify-between items-start">
    {props.labels.length > 0 ? (
      <Content title={"LABELS"}>
        <ul>
          {props.labels.map((label: any, index: number) => (
            <button
              className="w-20 h-10 mx-2 hover:opacity-25 white rounded"
              key={index}
              value={label.name}
            />
          ))}
        </ul>
      </Content>
    ) : null}
    <Content title={"Description"} icon={faPen}>
      <textarea
        defaultValue={props.description}
        placeholder="Add more detailed description..."
        className="w-full h-1/3 m-2 p-2 bg-gray-regular rounded"
      />
    </Content>
    {props.attachments.length > 0 ? (
      <Content title={"Attachments"} icon={faFileArchive}>
        <ul>
          {props.attachments.map((file: any) => (
            <li key={file._id}>{file.name}</li>
          ))}
        </ul>
      </Content>
    ) : null}
    <Content title={"Comment"} icon={faComment}>
      <ul className="w-full h-2/3 m-2 bg-gray-regular rounded">
        {props.comments.map((comment: any) => (
          <li key={comment._id}>{comment.content}</li>
        ))}
      </ul>
    </Content>
  </div>
);
export default Contents;
