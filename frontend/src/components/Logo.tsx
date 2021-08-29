type LogoProps = {
  withImage: boolean;
  textSize: string;
};

const Logo = (props: LogoProps) => {
  return (
    <div className="flex justify-center items-center">
      {props.withImage ? <img className="" alt="logo"></img> : null}
      <span className={`ml-2 text-${props.textSize} font-krona`}>Hustlo</span>
    </div>
  );
};

export default Logo;
