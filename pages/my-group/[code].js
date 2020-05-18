import Layout from "../../components/Layout";
import { requiredAuth } from "../../utils/ssr";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useCallback } from "react";

export const getServerSideProps = requiredAuth;

function GroupPage(props) {
  const user = props.user;
  const router = useRouter();
  const { code } = router.query;
  const { data } = useSWR(`/api/groups/${code}`);

  return (
    <Layout user={user}>
      <h1>Group Code: {code}</h1>
      <pre>{JSON.stringify(data, null, "\t")}</pre>
    </Layout>
  );
}

export default GroupPage;
