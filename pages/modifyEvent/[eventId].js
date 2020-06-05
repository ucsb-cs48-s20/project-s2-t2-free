import Layout from "../../components/Layout";
import { requiredAuth } from "../../utils/ssr";
import EditEventForm from "../../components/EditEventForm";
import useSWR from "swr";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";

export const getServerSideProps = requiredAuth;

function editEvent(props) {
  const router = useRouter();
  const { eventId } = router.query;
  const user = props.user;
  const { data } = useSWR(`/api/event/${eventId}`);
  return (
    <Layout user={user}>
      {data ? (
        <div>
          <h1 className="mb-3">Edit Event</h1>
          <EditEventForm event={data} />
          <form action="/my-schedule" className="mb-3">
            <Button type="btn btn-primary">Return to My Schedule</Button>
          </form>{" "}
        </div>
      ) : (
        <h1>Edit Loading</h1>
      )}
    </Layout>
  );
}

export default editEvent;