import Layout from "../../components/Layout";
import { requiredAuth } from "../../utils/ssr";
import NewEventForm from "../../components/NewEventForm";
import ScheduleTable from "../../components/ScheduleTable";
import FreeTime from "../../components/FreeTime";
import Button from "react-bootstrap/Button";

export const getServerSideProps = requiredAuth;

function SchedulePage(props) {
  const user = props.user;
  return (
    <Layout user={user}>
      <h1 id="greetings" className="mb-3">
        {user.given_name} {user.family_name}'s Schedule
      </h1>
      <form action="/editBeginEndTime" className="mb-3">
        <Button type="btn btn-primary">
          Edit Beginning and End Times of your Schedule
        </Button>
      </form>
      <NewEventForm />
      <ScheduleTable />
      <FreeTime />
    </Layout>
  );
}

export default SchedulePage;
