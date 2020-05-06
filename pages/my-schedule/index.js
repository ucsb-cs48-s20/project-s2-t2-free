// import useSWR from "swr";
// import Spinner from "react-bootstrap/Spinner";
// import Image from "react-bootstrap/Image";
// import { fetch } from "../utils/fetch";
import Layout from "../../components/Layout";
import { requiredAuth } from "../../utils/ssr";
import NewEventForm from "./NewEventForm";

export const getServerSideProps = requiredAuth;

function SchedulePage(props) {
  const user = props.user;

  return (
    <Layout user={user}>
      <NewEventForm />
    </Layout>
  );
}

export default SchedulePage;
