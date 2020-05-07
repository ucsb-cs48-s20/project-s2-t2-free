import Layout from "../../components/Layout";
import { requiredAuth } from "../../utils/ssr";
import NewEventForm from "./NewEventForm";
import useSWR from "swr";

export const getServerSideProps = requiredAuth;

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
