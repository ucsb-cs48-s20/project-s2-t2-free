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
  let { data } = useSWR(`/api/groups/${code}`);

  return (
    <Layout user={user}>
      {data && data[0] ? (
        <div>
          <h1>Group Code: {code}</h1>
          <div className="mb-3">
            <MembersList />
          </div>
          <JoinButton />
          <ScheduleTable />
          <pre>{JSON.stringify(data, null, "\t")}</pre>
        </div>
      ) : (
        <div>
          <h1>Group Does not Exist :(</h1>
        </div>
      )}
    </Layout>
  );
}

export default GroupPage;
