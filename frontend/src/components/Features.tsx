const Features = () => (
  <section className="h-full w-screen flex flex-col justify-center items-center">
    <div className="w-1/2 my-8 flex flex-col">
      <h2 className="font-krona text-xl my-4">
        Features to help your team succeed
      </h2>
      <p className="w-full font-nunito text-gray">
        Powering a productive team means using a powerful tool (and plenty of
        snacks). From meetings and projects to events and goal setting, Trello’s
        intuitive features give any team the ability to quickly set up and
        customize workflows for just about anything.
      </p>
    </div>
    <div className="w-full my-8 flex">
      <img width="400" height="100"></img>
      <div className="flex flex-col mx-4">
        <h6 className="uppercase">Choose a view</h6>
        <h2 className="font-krona text-xl my-4">
          The board is just the beginning
        </h2>
        <p className="w-1/2 font-nunito text-gray">
          Lists and cards are the building blocks of organizing work on a Trello
          board. Grow from there with task assignments, timelines, productivity
          metrics, calendars, and more.
        </p>
        <a href="#slidedown1" className="self-start my-4 hover:underline">
          Learn more
        </a>
        <div
          id="slidedown1"
          className="expandable font-nunito h-0 overflow-hidden transition-all"
        >
          <p>
            You can start up a Hustlo board in seconds. With the ability to view
            board data from many different angles, the entire project stays
            up-to-date in the way that suits it best:
          </p>
          <ul>
            <li>Use a Timeline view for project planning</li>
            <li>Calendar helps with time management</li>
            <li>Table view connects work across boards</li>
            <li>See board stats with Dashboard, and more!</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="w-full my-8 flex">
      <div className="w-1/2 flex flex-col">
        <h6 className="uppercase">Dive into the details</h6>
        <h2 className="font-krona text-xl my-4">
          Cards contain everything you need
        </h2>
        <p className="w-1/2 font-nunito text-gray">
          Trello cards are your portal to more organized work—where every single
          part of your task can be managed, tracked, and shared with teammates.
          Open any card to uncover an ecosystem of checklists, due dates,
          attachments, conversations, and more.
        </p>
        <a href="#slidedown2" className="self-start my-4 hover:underline">
          Learn more
        </a>
        <div
          id="slidedown2"
          className="relative expandable font-nunito h-0 overflow-hidden transition-all"
        >
          <p>
            Spin up a Hustlo card with a click, then uncover everything it can
            hold. Break down bigger card tasks into steps with file attachment
            previews, reminders, checklists and comments-emoji reactions
            included! Plus, gain powerful perspective by seeing all cards by
            list and status at the board level. You can:
          </p>
          <ul>
            <li>Manage deadlines</li>
            <li>Provide and track feedback</li>
            <li>Assign tasks and hand off work</li>
            <li>Connect work across apps</li>
          </ul>
        </div>
      </div>
      <img width="200" height="250"></img>
    </div>
  </section>
);

export default Features;
