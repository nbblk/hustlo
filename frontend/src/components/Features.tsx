import Content from "./Landing/Content";
import SlideDown from "./SlideDown";

const Features = () => (
  <section className="flex flex-col justify-center items-center">
    <Content
      title="Features to help your team succeed"
      body="Powering a productive team means using a powerful tool (and plenty of
        snacks). From meetings and projects to events and goal setting, Trello’s
        intuitive features give any team the ability to quickly set up and
        customize workflows for just about anything."
    />
    <div className="w-full my-8 flex">
      <img width="400" height="100" className="hidden md:block" />
      <div className="flex flex-col mx-4">
        <h6 className="uppercase">Choose a view</h6>
        <Content
          title="The board is just the beginning"
          body=" Lists and cards are the building blocks of organizing work on a Trello
        board. Grow from there with task assignments, timelines, productivity
        metrics, calendars, and more."
        />
        <a href="#slidedown1" className="self-start my-4 hover:underline">
          Learn more
        </a>
        <SlideDown
          id="slidedown1"
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
    <div className="w-1/2 flex flex-col">
      <h6 className="uppercase">Dive into the details</h6>
      <Content
        title="Cards contain everything you need"
        body="
                Trello cards are your portal to more organized work—where every single
                part of your task can be managed, tracked, and shared with teammates.
                Open any card to uncover an ecosystem of checklists, due dates,
                attachments, conversations, and more."
      />
      <a href="#slidedown2" className="self-start my-4 hover:underline">
        Learn more
      </a>
      <SlideDown
        id="slidedown2"
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
      <img width="200" height="250" className="hidden md:block" />
    </div>
  </section>
);

export default Features;
