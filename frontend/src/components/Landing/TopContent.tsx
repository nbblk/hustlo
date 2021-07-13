import Content from "./Content";
import InputBox from "../InputBox";
import Button from "../Button";

const TopContent = () => (
  <section className="my-24">
    <Content
      title="Hustlo helps your side hustle move forward."
      body="
    Collaborate, manage projects, and reach new productivity peaks. From high
    rises to the home office, the way your team works is unique—accomplish it
    all with Hustlo."
    />
    <InputBox
      type="text"
      width="full md:w-2/5"
      height="10"
      marginX="0 md:mx-4"
      marginY="4"
      placeholder="Email"
    />
    <Button
      width="full md:w-1/5"
      height="10"
      marginX="0 md:mx-4"
      marginY="2"
      color="blue"
      textColor="white"
      value="Sign up — it’s free!"
    />
  </section>
);
export default TopContent;
