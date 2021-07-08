const Button = (props: any) => {
  const textColor = props.color !== "white" ? "white" : "black";
  const style = `h-10 w-24 ml-2 border rounded bg-${props.color}-400 hover:${props.color} text-${textColor}`;
  return (
    <button className={style} onClick={props.click}>
      {props.value}
    </button>
  );
};

export default Button;
