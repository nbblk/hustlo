type LogoProps = {
  withImage: boolean;
  textSize: string;
};

const Logo = (props: LogoProps) => {
  return (
    <div className="flex justify-center items-center">
      {props.withImage ? <img src="./logo.png" className="h-8 w-8" alt="logo"></img> : null}
      <span className={`ml-2 text-${props.textSize} text-blue font-krona`}>Hustlo</span>
    </div>
  );
};

export default Logo;
