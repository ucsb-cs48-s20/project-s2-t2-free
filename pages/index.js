import Layout from "../components/Layout";
import { optionalAuth } from "../utils/ssr";

export const getServerSideProps = async (req) => {
  return optionalAuth(req);
};

function HomePage(props) {
  const user = props.user;

  //Here
  return (
    <Layout user={user}>
      <h1>Welcome to FreeFromClass!</h1>
      <p>
        Here is a list of resources you can reference while using our app! For a
        full user's guide, click{" "}
        <a href="https://github.com/ucsb-cs48-s20/s2-t2-free-REPORT/blob/master/users_guide.md">
          here
        </a>
        .
      </p>
      <p>
        To get started with our app, log in by navigating to the top right
        corner of our home page and pressing our "Login" button.
      </p>
      <h2> My Schedule Page</h2>
      <p>The My Schedule page contains four main components:</p>
      <h5>1. Daily Start/End Times</h5>
      <p>
        Allows you to set global start and end times to your schedule. For
        example, you can set your default work hours from 9 a.m. to 5 p.m. each
        week.
      </p>
      <h5>2. Create New Event</h5>
      <p>
        Allows you to add events to your schedule. You can add events for
        multiple days at a time and select start and end times from the
        drop-down menus.
      </p>
      <h5>3. Schedule Table</h5>
      <p>
        Text output of all events that have been added to your schedule. If you
        wish to edit or delete a specific event, navigate to the "Edit" button
        in the right column of the table.
      </p>
      <h5>4. Free Time</h5>
      <p>
        Text output of your available free time calculated from the daily
        start/end times and all events entered.
      </p>

      <h2> Groups Management Page </h2>
      <p>
        The Groups Management page allows you create and join groups through
        shareable links and codes.
      </p>
      <h5>Creating Groups</h5>
      <p>
        To create a group, enter a group name and press "Create". The new group
        will be added to your list of groups along with a list of current
        members, a unique group code, and a unique shareable link. To have
        members join your group, send them either the shareable link or the
        unique group code.
      </p>
      <h5>Joining Groups</h5>
      <p>
        If you received a shareable link, navigate to the respective group page
        and press "Join". If you received a unique group code, entering the code
        on the Groups Management page will redirect you to the group page where
        you can press "Join".
      </p>

      <h2> My Groups </h2>
      <p>
        The My Groups page contains a list of members, each member's free time,
        and a text output of when everyone in the group is free. From this, you
        can easily determine an optimal time for everyone to meet.
      </p>
    </Layout>
  );
}

export default HomePage;
