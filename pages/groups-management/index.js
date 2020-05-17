import Layout from "../../components/Layout";
import { requiredAuth } from "../../utils/ssr";
import GroupsTable from "./GroupsTable";
import useSWR from "swr";
import CreateGroupForm from "./CreateGroupForm";
import FindGroupForm from "./FindGroupForm";

export const getServerSideProps = requiredAuth;

function GroupsPage(props) {
  const user = props.user;
  // const { data } = useSWR("/api/groups");

  return (
    <Layout user={user}>
      <h1 className="mb-3">Groups Management</h1>
      <FindGroupForm />
      <CreateGroupForm />
    </Layout>
  );
}

export default GroupsPage;
