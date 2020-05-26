import Layout from "../../components/Layout";
import { requiredAuth } from "../../utils/ssr";
import GroupsTable from "../../components/GroupsTable";
import CreateGroupForm from "../../components/CreateGroupForm";
import FindGroupForm from "../../components/FindGroupForm";

export const getServerSideProps = requiredAuth;

function GroupsPage(props) {
  const user = props.user;

  return (
    <Layout user={user}>
      <h1 className="mb-3">Groups Management</h1>
      <FindGroupForm />
      <CreateGroupForm />
      <GroupsTable />
    </Layout>
  );
}

export default GroupsPage;
