import Layout from "../../components/Layout";
import { requiredAuth } from "../../utils/ssr";
import NewEventForm from "../../components/NewEventForm";
import ScheduleTable from "../../components/ScheduleTable";
import FreeTime from "../../components/FreeTime";
import EditBeginEndTimeForm from "../../components/EditBeginEndTimeForm";
import Button from "react-bootstrap/Button";

export const getServerSideProps = requiredAuth;

function SchedulePage(props) {
  const user = props.user;
  return (
    <Layout user={user}>
      <h1 id="greetings" className="mb-3">
        {user.given_name} {user.family_name}'s Schedule
      </h1>
      <EditBeginEndTimeForm />
      <NewEventForm />
      <ScheduleTable />
      <FreeTime />
    </Layout>
  );
}

export default SchedulePage;
