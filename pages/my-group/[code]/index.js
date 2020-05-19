import Layout from "../../../components/Layout";
import { requiredAuth } from "../../../utils/ssr";
import { useRouter } from "next/router";
import useSWR from "swr";
import JoinButton from "./JoinButton";
import ScheduleTable from "./ScheduleTable";
import MembersList from "./MembersList";

export const getServerSideProps = requiredAuth;

export function GroupPage(props) {
  const user = props.user;
  const router = useRouter();
  const { code } = router.query;
  const { data } = useSWR(`/api/groups/${code}`);
  if (data === []) {
    data = null;
  }

  if (typeof data === "object" && data.length !== 0) {
    return (
      <Layout user={user}>
        {data && (
          <div>
            <h1>Group Code: {code}</h1>
            <JoinButton />
            <MembersList />
            <ScheduleTable />
            <pre>{JSON.stringify(data, null, "\t")}</pre>
          </div>
        )}
      </Layout>
    );
  }
  return (
    <Layout user={user}>
      {data && (
        <div>
          <h1>Group Code: {code}</h1>
          <JoinButton />
          <MembersList />
          <ScheduleTable />
          <pre>{JSON.stringify(data, null, "\t")}</pre>
        </div>
      )}
    </Layout>
  );
}

export default GroupPage;
