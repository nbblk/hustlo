import React, { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Content from "./Content";
import SlideDown from "../SlideDown";

interface slideMenus {
  first: boolean;
  second: boolean;
}

const Features = () => {
  const [expand, isExpanded] = useState({ first: false, second: false });

  const slideDown = (event: any) => {
    const target: string = event.currentTarget.dataset.id;
    const value = expand[target as keyof slideMenus];
    isExpanded({ ...expand, [target]: !value });
  };

  return (
    <section className="flex flex-col justify-center items-center">
      <Content
        title="Features to help your team succeed"
        body="Powering a productive team means using a powerful tool (and plenty of
        snacks). From meetings and projects to events and goal setting, Hustlo’s
        intuitive features give any team the ability to quickly set up and
        customize workflows for just about anything."
      />
      <div className="w-full my-12 flex md:text-left">
        <img
          src="./feature-1.jpg"
          width="200"
          height="100"
          className="block w-1/2 hidden md:block"
          alt=""
        />
        <div className="md:w-1/2 flex flex-col mx-4">
          <h6 className="uppercase my-4">Choose a view</h6>
          <Content
            title="The board is just the beginning"
            body=" Lists and cards are the building blocks of organizing work on a Hustlo
        board. Grow from there with task assignments, timelines, productivity
        metrics, calendars, and more."
          />
          <button
            data-id="first"
            className="self-end my-4 hover:underline"
            onClick={(event) => slideDown(event)}
          >
            <FontAwesomeIcon icon={faPlus} className="mx-4" />
            Learn more
          </button>
          <SlideDown
            isExpanded={expand["first"]}
            body="You can start up a Hustlo board in seconds. With the ability to view board data from many different angles, the entire project stays up-to-date in the way that suits it"
            bullets={[
              "Use a Timeline view for project planning",
              "Calendar helps with time management",
              "Table view connects work across boards",
              "See board stats with Dashboard, and more!",
            ]}
          />
        </div>
      </div>
      <div className="flex flex-col my-12 md:flex-row md:text-left">
        <div className="md:w-1/2 flex flex-col mx-4">
          <h6 className="uppercase my-4">Dive into the details</h6>
          <Content
            title="Cards contain everything you need"
            body="
                Hustlo cards are your portal to more organized work—where every single
                part of your task can be managed, tracked, and shared with teammates.
                Open any card to uncover an ecosystem of checklists, due dates,
                attachments, conversations, and more."
          />
          <button
            data-id="second"
            className="self-end my-4 hover:underline"
            onClick={(event) => slideDown(event)}
          >
            <FontAwesomeIcon icon={faPlus} className="mx-4" />
            Learn more
          </button>
          <SlideDown
            isExpanded={expand["second"]}
            body=" Spin up a Hustlo card with a click, then uncover everything it can
            hold. Break down bigger card tasks into steps with file attachment
            previews, reminders, checklists and comments-emoji reactions
            included! Plus, gain powerful perspective by seeing all cards by
            list and status at the board level. You can:"
            bullets={[
              "Manage deadlines",
              "Provide and track feedback",
              "Assign tasks and hand off work",
              "Connect work across apps",
            ]}
          />
        </div>
        <img
          src="./feature-2.jpg"
          width="200"
          height="100"
          className="block w-1/2 hidden md:block"
          alt=""
        />
      </div>
    </section>
  );
};

export default Features;
