interface ContextMenuProps {
  active: boolean;
  edit: () => void;
  delete: () => void;
}

const ContextMenu = (props: ContextMenuProps) => (
  <div
    className={`${
      props.active ? "block" : "hidden"
    } z-40 absolute top-6 right-0 w-24 h-14 p-4 flex flex-col justify-center items-start bg-white border rounded shadowed font-nunito cursor-pointer`}
  >
    <ul className="w-full text-sm">
      <li className="hover:bg-gray-lightest" onClick={props.edit}>Edit</li>
      <li className="hover:bg-gray-lightest" onClick={props.delete}>Delete</li>
    </ul>
  </div>
);

export default ContextMenu;
