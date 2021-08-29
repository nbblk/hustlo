import ContextPopupHeader from "./ContextPropHeader";

const NotificationMenu = (props: { click: () => void }) => {
  return (
    <>
      <ContextPopupHeader title="Notification" click={props.click} />
      <ul className="my-4 text-left font-nunito">No notifications...</ul>
    </>
  );
};

export default NotificationMenu;
