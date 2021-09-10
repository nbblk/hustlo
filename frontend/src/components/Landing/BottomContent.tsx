import { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../Button";
import InputBox from "../InputBox";

const BottomContent = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");

  return (
    <section>
      <div className="ctabox w-full h-60 my-16 flex flex-col justify-center items-center rounded-md">
        <p className="m-5 font-nunito font-bold text-white text-center">
          Sign up and get started with Hustlo today. A world of productive
          teamwork awaits!
        </p>
        <div className="w-2/3 flex flex-col md:flex-row justify-center items-center">
          <InputBox
            type="email"
            width="full md:w-2/5"
            height="10"
            marginX="0 md:mx-4"
            marginY="4"
            placeholder="Email"
            change={(event: ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
          />
          <Button
            width="full md:w-1/5"
            height="10"
            marginX="0 md:mx-4"
            marginY="0 md:4"
            value="Sign up"
            textSize="md"
            textColor="white"
            borderColor="transparent"
            bgColor="emerald"
            hoverColor="emerald hover:opacity-50"
            click={() => {
              history.push("/signup", { email: email });
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default BottomContent;
