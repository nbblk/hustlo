import Content from "./Content";
import BrandLogos from "./BrandLogos";
import Button from "../Button";
import { useHistory } from "react-router";

const MiddleContent = () => {
  const history = useHistory();

  return (
    <section className="w-full h-full my-72 flex flex-col items-center justify-center">
      <Content
        title="Start your personal project"
        body="Start with a Hustlo board, lists, and cards. Customize and expand with
    more features as your teamwork grows. Manage projects, organize tasks, and
    build team spirit—all in one place."
      />
      <div className="flex flex-col items-center justify-center">
      <Button
        width="48"
        height="10"
        bgColor="transparent"
        textColor="blue hover:text-white"
        textSize="md"
        bordered={true}
        borderColor="blue"
        hoverColor="blue"
        value="Start doing"
        click={() => history.push("/signup")}
      />
        <img
          alt="preview"
          src="./Landing preview.png"
          height="700"
          width="1080"
          className="hidden md:block my-20 filter drop-shadow-2xl"
        />
        <h3 className="m-8 font-nunito text-center text-xl">
          Join over 1,000,000 projects worldwide that are using Hustlo to get
          more done.
        </h3>
        <BrandLogos />
      </div>
    </section>
  );
};

export default MiddleContent;
