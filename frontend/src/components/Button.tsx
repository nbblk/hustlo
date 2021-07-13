const Button = (props: any) => {
  const isBordered = props.border ? "border" : "";
  const style = `h-${props.height} w-${props.width} mx-${props.marginX} my-${props.marginY} rounded bg-${props.color} text-${props.textColor} hover:${props.color} ${isBordered} border-${props.borderColor} text-${props.textSize}`;
  return (
    <button className={style} onClick={props.click}>
      {props.value}
    </button>
  );
};

export default Button;
