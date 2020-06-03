import Layout from "../../components/Layout";
import { requiredAuth } from "../../utils/ssr";
import EditBeginEndTimeForm from "../../components/EditBeginEndTimeForm";
import useSWR from "swr";
import Button from "react-bootstrap/Button";

export const getServerSideProps = requiredAuth;

function EditBeginEndTime(props) {
  const user = props.user;
  return (
    <Layout user={user}>
      <h1 className="mb-3">
        For those times when you obviously can't meet with people.
      </h1>
      <EditBeginEndTimeForm />
      <form action="/my-schedule" className="mb-3">
        <Button type="btn btn-primary">Return to My Schedule</Button>
      </form>
    </Layout>
  );
}

export default EditBeginEndTime;
