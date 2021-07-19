const InputBox = (props: any) => {
  const style = `border border-gray-lightest h-${props.height} w-${props.width} mx-${props.marginX} my-${props.marginY} p-2 rounded`;
  return (
    <input
      type={props.type}
      size={props.size}
      className={style}
      placeholder={props.placeholder}
      onChange={props.change}
    />
  );
};

export default InputBox;
