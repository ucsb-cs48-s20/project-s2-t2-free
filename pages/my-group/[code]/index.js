import Layout from "../../../components/Layout";
import { requiredAuth } from "../../../utils/ssr";
import { useRouter } from "next/router";
import useSWR from "swr";
import JoinButton from "./JoinButton";
import ScheduleTable from "./ScheduleTable";
import MembersList from "./MembersList";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const getServerSideProps = requiredAuth;

export function GroupPage(props) {
  const user = props.user;
  const router = useRouter();
  const { code } = router.query;
  let { data } = useSWR(`/api/groups/${code}`);

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
          <div className="mb-3">
            <MembersList />
          </div>
          <JoinButton />
          <ScheduleTable />
        </div>
      )}
      {data && !data[0] && (
        <div>
          <h1>Group does not exist :(</h1>
          <Form action="/groups-management">
            <Button type="btn btn-primary">
              Return to Groups Management page
            </Button>
          </Form>
        </div>
      )}
    </Layout>
  );
}

export default GroupPage;
