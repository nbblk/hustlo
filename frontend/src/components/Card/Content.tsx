import { IconDefinition as FreeIconDefinition } from "@fortawesome/free-regular-svg-icons";
import { IconDefinition as CommonIconDefinition } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

interface ContentProps {
  title: string;
  icon?: FreeIconDefinition | CommonIconDefinition;
  children: ReactNode;
}

const Content = (props: ContentProps) => (
  <>
    <h1 className="my-2">
      {props.icon ? (
        <span>
          <FontAwesomeIcon icon={props.icon} className="mx-2" />
        </span>
      ) : null}
      {props.title}
    </h1>
    {props.children}
  </>
);

export default Content;
