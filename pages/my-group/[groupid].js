import Layout from "../../components/Layout";
import { requiredAuth } from "../../utils/ssr";
import useSWR from "swr";
import ScheduleTable from "../my-schedule/ScheduleTable";
import { useRouter } from "next/router";

export const getServerSideProps = requiredAuth;

function GroupPage(props) {
  const user = props.user;
  const router = useRouter();
  const { groupid } = router.query;
  return (
    <Layout user={user}>
      <h1>Group Code: {groupid}</h1>
    </Layout>
  );
}

export default GroupPage;
