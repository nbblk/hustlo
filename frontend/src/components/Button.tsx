const Button = (props: any) => {
  const textColor = props.color === "blue" ? "white" : "black";
  const style = `h-10 w-24 ml-2 rounded bg-${props.color} hover:${props.color} text-${textColor} text-sm`;
  return (
    <button className={style} onClick={props.click}>
      {props.value}
    </button>
  );
};

export default Button;
