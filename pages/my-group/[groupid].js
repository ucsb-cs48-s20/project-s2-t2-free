import Layout from "../../components/Layout";
import { requiredAuth } from "../../utils/ssr";
import useSWR from "swr";
import ScheduleTable from "../my-schedule/ScheduleTable";

export const getServerSideProps = requiredAuth;

function GroupPage(props) {
  const user = props.user;
  const { data } = useSWR("/api/groups/[groupid].js");
  return (
    <Layout user={user}>
      <h1>Group Page</h1>
      <h1>Welcome to ${groupid}</h1>
      <ScheduleTable />
    </Layout>
  );
}

export default GroupPage;
