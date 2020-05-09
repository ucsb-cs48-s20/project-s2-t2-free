import Layout from "../../components/Layout";
import { requiredAuth } from "../../utils/ssr";
import useSWR from "swr";

export const getServerSideProps = requiredAuth;

function SchedulePage(props) {
  const user = props.user;
  const { data } = useSWR("/api/groups");
  return (
    <Layout user={user}>
      <h1>Group Schedule</h1>
      <pre>{JSON.stringify(data, null, "\t")}</pre>
    </Layout>
  );
}

export default SchedulePage;
