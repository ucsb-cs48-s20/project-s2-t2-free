import Layout from "../../components/Layout";
// import { requiredAuth } from "../../utils/ssr";
import NewEventForm from "./NewEventForm";
import { getEvents } from "../api/event";
import auth0 from "../../utils/auth0";
import { serializeDocument } from "../../utils/mongodb";

export const getServerSideProps = async ({ req, res }) => {
  const session = await auth0.getSession(req);
  if (session && session.user) {
    const intialData = (await getEvents(session.user)).map(serializeDocument);
    return {
      props: {
        user: session.user,
        intialData: intialData,
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
  const intialData = props.intialData;
  return (
    <Layout user={user}>
      <NewEventForm />
      <pre>{JSON.stringify(intialData, null, "\t")}</pre>
    </Layout>
  );
}

export default SchedulePage;
