const Button = (props: any) => {
const textColor = props.color === "blue" ? "white" : "black";
  const style = `h-${props.height} w-${props.width} mx-2 rounded bg-${props.color} text-${textColor} hover:${props.color} text-sm`;
  return (
    <button className={style} onClick={props.click}>
      {props.value}
    </button>
  );
};

export default Button;
