import Layout from "../../components/Layout";
import { requiredAuth } from "../../utils/ssr";
import ScheduleTable from "./ScheduleTable";
import useSWR from "swr";

export const getServerSideProps = requiredAuth;

function SchedulePage(props) {
  const user = props.user;
  const { data } = useSWR("/api/groups");
  return (
    <Layout user={user}>
      <h1>Group Schedule</h1>
      <ScheduleTable />
    </Layout>
  );
}

export default SchedulePage;
