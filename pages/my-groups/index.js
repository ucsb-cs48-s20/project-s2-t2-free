import Layout from "../../components/Layout";
// import { requiredAuth } from "../../utils/ssr";
import { getGroupEvents } from "../api/groups";
import auth0 from "../../utils/auth0";
import { serializeDocument } from "../../utils/mongodb";
import useSWR from "swr";

export const getServerSideProps = async ({ req, res }) => {
  const session = await auth0.getSession(req);
  if (session && session.user) {
    const initialData = (await getGroupEvents()).map(serializeDocument);
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
  const { data } = useSWR("/api/groups", {});
  return (
    <Layout user={user}>
      <h1>Group Schedule</h1>

      <pre>{JSON.stringify(data, null, "\t")}</pre>
    </Layout>
  );
}

export default SchedulePage;
