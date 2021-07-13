import Button from "../Button";

const BottomContent = () => (
  <section>
    <div className="ctabox w-full h-60 my-16 flex flex-col justify-center items-center rounded-md">
      <p className="m-5 font-nunito font-bold text-white text-center">
        Sign up and get started with Hustlo today. A world of productive
        teamwork awaits!
      </p>
      <Button
        width="2/3"
        height="1/5"
        value="Sign up"
        textColor="white"
        borderColor="transparent"
        color="emerald"
      />
    </div>
  </section>
);

export default BottomContent;
