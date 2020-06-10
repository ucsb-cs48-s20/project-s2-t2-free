import Layout from "../../../components/Layout";
import { requiredAuth } from "../../../utils/ssr";
import { useRouter } from "next/router";
import useSWR from "swr";
import JoinLeaveButton from "../../../components/JoinLeaveButton";
import MembersList from "../../../components/MembersList";
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
          <h2>Code: {code}</h2>
          <MembersList />
          <Form inline>
            <Form.Group>
              <JoinLeaveButton />
            </Form.Group>
          </Form>
          <MembersFreeTime />
          <GroupFreeTime />
        </div>
      )}
      {data && !data[0] && (
        <div>
          <h1 id="groupdoesnotexist">Group Does Not Exist :(</h1>
        </div>
      )}
      <form action="/groups-management" className="mb-3">
        <Button type="btn btn-primary">Return to Groups Management</Button>
      </form>
    </Layout>
  );
}

export default GroupPage;
