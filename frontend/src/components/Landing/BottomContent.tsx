import Button from "../Button";
import InputBox from "../InputBox";

const BottomContent = () => (
  <section>
    <div className="ctabox w-full h-60 my-16 flex flex-col justify-center items-center rounded-md">
      <p className="m-5 font-nunito font-bold text-white text-center">
        Sign up and get started with Hustlo today. A world of productive
        teamwork awaits!
      </p>
      <div className="w-2/3 flex flex-col md:flex-row justify-center items-center">
        <InputBox
          type="email"
          width="full"
          height="10"
          marginX="0 md:mx-4"
          marginY="4"
          placeholder="Email"
        />
        <Button
          width="full"
          height="10"
          marginX="0 md:mx-4"
          marginY="0 md:4"
          value="Sign up"
          textColor="white"
          borderColor="transparent"
          color="emerald hover:green"
        />
      </div>
    </div>
  </section>
);

export default BottomContent;
