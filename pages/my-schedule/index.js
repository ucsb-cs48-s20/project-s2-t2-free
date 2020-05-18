import Layout from "../../components/Layout";
import { requiredAuth } from "../../utils/ssr";
import NewEventForm from "./NewEventForm";
import ScheduleTable from "./ScheduleTable";
import useSWR from "swr";

export const getServerSideProps = requiredAuth;

function SchedulePage(props) {
  const user = props.user;
  return (
    <Layout user={user}>
      <h1 className="mb-3">
        {user.given_name} {user.family_name}'s Schedule
      </h1>
      <NewEventForm />
      <ScheduleTable />
    </Layout>
  );
}

export default SchedulePage;
