import Content from "./Content";
import InputBox from "../InputBox";
import Button from "../Button";
import { useHistory } from "react-router";
import { ChangeEvent, useState } from "react";

const TopContent = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");

  return (
    <section className="my-24">
      <Content
        title="Hustlo helps your side hustle move forward."
        body="
  Collaborate, manage projects, and reach new productivity peaks. From high
  rises to the home office, the way your team works is unique—accomplish it
  all with Hustlo."
      />
      <InputBox
        type="email"
        width="full md:w-2/5"
        height="10"
        marginX="0 md:mx-4"
        marginY="4"
        border={true}
        borderColor="border-gray-lightest"
        placeholder="Email"
        change={(event: ChangeEvent<HTMLInputElement>) =>
          setEmail(event.target.value)
        }
      />
      <Button
        width="full md:w-2/5 xl:w-1/5"
        height="10"
        marginX="0 md:mx-4"
        marginY="4"
        bgColor="blue"
        hoverColor="blue hover:opacity-50"
        textColor="white"
        value="Sign up — it’s free!"
        click={() => {
          history.push("/signup", { email: email });
        }}
        textSize="md"
      />
    </section>
  );
};
export default TopContent;
