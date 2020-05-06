import Layout from "../../components/Layout";
// import { requiredAuth } from "../../utils/ssr";
import NewEventForm from "./NewEventForm";
import { getEvents } from "../api/event";
import auth0 from "../../utils/auth0";
import { serializeDocument } from "../../utils/mongodb";
import useSWR from "swr";

export const getServerSideProps = async ({ req, res }) => {
  const session = await auth0.getSession(req);
  if (session && session.user) {
    const initialData = (await getEvents(session.user.sub)).map(
      serializeDocument
    );
    return {
      props: {
        user: session.user,
        initialData: initialData,
      },
    };
  }

  res.writeHead(302, {
    Location: "/api/login",
  });
  res.end();
};

function SchedulePage(props) {
  const user = props.user;
  const { data } = useSWR("/api/event", {});
  return (
    <Layout user={user}>
      <h1>Create New Event</h1>
      <NewEventForm />
      <h1>My Schedule</h1>

      <pre>{JSON.stringify(data, null, "\t")}</pre>
    </Layout>
  );
}

export default SchedulePage;
