import Layout from "../../../components/Layout";
import { requiredAuth } from "../../../utils/ssr";
import { useRouter } from "next/router";
import useSWR from "swr";
import JoinButton from "./JoinButton";
import LeaveButton from "./LeaveButton";
import MembersList from "./MembersList";
import Button from "react-bootstrap/Button";
import GroupFreeTime from "../../../components/GroupFreeTime";
import MembersFreeTime from "../../../components/MembersFreeTime";
import { Form, FromGroup, Row, Col } from "react-bootstrap";

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
          <h1 className="mb-3">
            Welcome to{" "}
            <span>
              <em>{data[0].name.toUpperCase()}</em>
            </span>
            !
          </h1>
          <h2>Group Code: {code}</h2>
          <Form inline>
            <Form.Group>
              <JoinButton />
              <LeaveButton />
            </Form.Group>
          </Form>
          <MembersList />
          <MembersFreeTime />
          <GroupFreeTime />
        </div>
      )}
      {data && !data[0] && (
        <div>
          <h1>Group does not exist :(</h1>
        </div>
      )}
      <form action="/groups-management" className="mb-3">
        <Button type="btn btn-primary">Return to Groups Management</Button>
      </form>
    </Layout>
  );
}

export default GroupPage;
