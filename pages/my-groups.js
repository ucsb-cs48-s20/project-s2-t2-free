// import useSWR from "swr";
// import Spinner from "react-bootstrap/Spinner";
// import Image from "react-bootstrap/Image";
// import { fetch } from "../utils/fetch";
import Layout from "../components/Layout";
import { requiredAuth } from "../utils/ssr";

export const getServerSideProps = requiredAuth;

function GroupPage(props) {
  const user = props.user;

  return (
    <Layout user={user}>
      <div>
        <p>Groups Page</p>
      </div>
    </Layout>
  );
}

export default GroupPage;
