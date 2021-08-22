import React, { useState } from "react";
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

  const features = [
    {
      smallTitle: "",
      title: "Features to help your team succeed",
      body: `Powering a productive team means using a powerful tool (and plenty of
        snacks). From meetings and projects to events and goal setting, Hustlo’s
        intuitive features give any team the ability to quickly set up and
        customize workflows for just about anything.`,
      slideDownId: "",
      slideDownTitle: "",
      slideDownBody: "",
      slideDownBullets: [],
      slideDown: null,
    },
    {
      smallTitle: "Choose a view",
      title: "The board is just the beginning",
      body: `Lists and cards are the building blocks of organizing work on a Hustlo
      board. Grow from there with task assignments, timelines, productivity
      metrics, calendars, and more.`,
      slideDownId: "first",
      slideDownBody:
        "You can start up a Hustlo board in seconds. With the ability to view board data from many different angles, the entire project stays up-to-date in the way that suits it",
      slideDownBullets: [
        "Use a Timeline view for project planning",
        "Calendar helps with time management",
        "Table view connects work across boards",
        "See board stats with Dashboard, and more!",
      ],
    },
    {
      title: "Dive into the details",
      body: `Hustlo cards are your portal to more organized work—where every single
      part of your task can be managed, tracked, and shared with teammates.
      Open any card to uncover an ecosystem of checklists, due dates,
      attachments, conversations, and more.`,
      slideDownId: "second",
      slideDownBody: `Spin up a Hustlo card with a click, then uncover everything it can
      hold. Break down bigger card tasks into steps with file attachment
      previews, reminders, checklists and comments-emoji reactions
      included! Plus, gain powerful perspective by seeing all cards by
      list and status at the board level. You can:`,
      slideDownBullets: [
        "Manage deadlines",
        "Provide and track feedback",
        "Assign tasks and hand off work",
        "Connect work across apps",
      ],
    },
  ];

  return (
    <section className="flex flex-col justify-center items-center">
      {features.map((feature, index) => (
        <Content
          key={index}
          smallTitle={feature.smallTitle ? feature.smallTitle : ""}
          title={feature.title}
          body={feature.body}
          children={
            <SlideDown
              id={feature.slideDownId}
              click={(event: any) => slideDown(event)}
              isExpanded={expand[feature.slideDownId as keyof slideMenus]}
              body={feature.slideDownBody}
              bullets={feature.slideDownBullets}
            />
          }
        />
      ))}
    </section>
  );
};

export default Features;
