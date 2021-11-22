import { ChangeEvent, useState, useEffect } from "react";
import Button from "../Button";
import InputBox from "../InputBox";
import Modal from "./Modal";

export type WorkspaceFormProps = {
  type: string,
  name: { value: string; valid: boolean };
  description: { value: string; valid: boolean };
};

const WorkspaceModal = (props: any) => {
  const [form, setForm] = useState<WorkspaceFormProps>({
    type: "Create" || "Update",
    name: { value: "", valid: false },
    description: { value: "", valid: false },
  });

  useEffect(() => {
    if (props.type === "Update" && props.formValues) {
      setForm({ type: props.type, name: props.formValues.name, description: props.formValues.description });
    }
  }, []);

  const nameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let name = event.target.value;
    if (name.length > 0) {
      setForm({ ...form, name: { value: name, valid: true } });
    } else {
      setForm({ ...form, name: { value: name, valid: false } });
    }
  };

  const descriptionHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let description = event.target.value;
    if (description.length > 0) {
      setForm({ ...form, description: { value: description, valid: true } });
    } else {
      setForm({ ...form, description: { value: description, valid: false } });
    }
  };

  return (
    <Modal
      width="screen md:w-1/3"
      height="auto md:h-1/2"
      title={`${props.type} workspace`}
      dismiss={props.dismiss}
    >
      <h3 className="mb-4 text-gray-light">
        Boost your productivity by making it easier for everyone to access
        boards in one location.
      </h3>
      <form>
        <h6 className="text-sm">Workspace name</h6>
        <InputBox
          type="text"
          placeholder="Blake's side projects"
          height="1/5"
          width="full"
          marginY="2"
          border={true}
          borderColor={"border-gray-lightest"}
          value={props.type === "Update" && props.formValues.name ? props.formValues.name : null}
          change={(event: ChangeEvent<HTMLInputElement>) => nameHandler(event)}
        />
        <h6 className="text-sm">Description</h6>
        <InputBox
          type="textarea"
          placeholder="Tell us about your project"
          height="24"
          width="full"
          marginY="2"
          border={true}
          borderColor={"border-gray-lightest"}
          value={props.type === "Update" && props.formValues.description ? props.formValues.description : null}
          change={(event: ChangeEvent<HTMLInputElement>) =>
            descriptionHandler(event)
          }
        />
        <Button
          height="10"
          width="full"
          bgColor="green"
          textColor="white"
          hoverColor="green hover:opacity-25"
          value="Continue"
          marginY="2"
          click={(event: React.FormEvent<HTMLButtonElement>) =>
            props.submit(event, {
              name: form.name,
              description: form.description,
            })
          }
          disabled={form.name.valid && form.description.valid ? false : true}
        />
      </form>
    </Modal>
  );
};

export default WorkspaceModal;
