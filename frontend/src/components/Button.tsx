const Button = (props: any) => {
  const isBordered = props.border ? "border" : "";
  const style = `h-${props.height} w-${props.width} mx-${props.marginX} my-${
    props.marginY
  } rounded bg-${props.disabled ? "gray-lightest" : props.color} text-${
    props.disabled ? "gray-dark" : props.textColor
  } hover:${
    props.disabled ? "gray-lightest" : props.color
  } ${isBordered} border-${props.borderColor} text-${props.textSize} cursor-${
    props.disabled ? "not-allowed" : "pointer"
  }`;
  return (
    <button
      className={style}
      onClick={props.click}
      disabled={props.disabled ? true : false}
    >
      {props.value}
    </button>
  );
};

export default Button;
