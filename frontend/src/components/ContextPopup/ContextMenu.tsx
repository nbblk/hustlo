const ContextMenu = (props: any) => (
  <div
    className={`${
      props.active ? "block" : "hidden"
    } z-50 absolute top-0 left-4 w-32 h-20 p-4 flex flex-col justify-center items-start bg-gray-lightest rounded shadowed font-nunito cursor-pointer`}
  >
    <ul>
      <li onClick={props.edit}>Edit</li>
      <li onClick={props.delete}>Delete</li>
    </ul>
  </div>
);

export default ContextMenu;
