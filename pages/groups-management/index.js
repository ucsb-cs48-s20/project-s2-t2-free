import Layout from "../../components/Layout";
import { requiredAuth } from "../../utils/ssr";
import GroupsTable from "./GroupsTable";
import useSWR from "swr";
import GroupForm from "./GroupForm";
import FindGroupForm from "./FindGroupForm";

export const getServerSideProps = requiredAuth;

function GroupsPage(props) {
  const user = props.user;
  const { data } = useSWR("/api/groups");
  return (
    <Layout user={user}>
      <h1>Groups Page</h1>
      <GroupForm />
      <FindGroupForm />
      <GroupsTable />
    </Layout>
  );
}

export default GroupsPage;
