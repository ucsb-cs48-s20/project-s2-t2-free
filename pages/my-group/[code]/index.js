import Layout from "../../../components/Layout";
import { requiredAuth } from "../../../utils/ssr";
import { useRouter } from "next/router";
import useSWR from "swr";
import JoinButton from "./JoinButton";
import LeaveButton from "./LeaveButton";
import MembersList from "./MembersList";
import GroupFreeTime from "./GroupFreeTime";
import MembersFreeTime from "./MembersFreeTime";

export const getServerSideProps = requiredAuth;

export function GroupPage(props) {
  const user = props.user;
  const router = useRouter();
  const { code } = router.query;
  let { data } = useSWR(`/api/groups/getGroupInfo/${code}`);

  return (
    <Layout user={user}>
      {data && data[0] && (
        <div>
          <h1>
            Welcome to{" "}
            <span>
              <em>{data[0].name.toUpperCase()}</em>
            </span>
            !
          </h1>
          <h2>Group Code: {code}</h2>
          <MembersList />
          <JoinButton />
          <LeaveButton />
          <MembersFreeTime />
          <GroupFreeTime />
        </div>
      )}
      {data && !data[0] && (
        <div>
          <h1>Group Does not Exist :(</h1>
        </div>
      )}
    </Layout>
  );
}

export default GroupPage;
