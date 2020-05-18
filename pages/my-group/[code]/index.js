import Layout from "../../../components/Layout";
import { requiredAuth } from "../../../utils/ssr";
import { useRouter } from "next/router";
import useSWR from "swr";
import JoinButton from "./JoinButton";
import ScheduleTable from "./ScheduleTable";
import { useState } from "react";

export const getServerSideProps = requiredAuth;

export function GroupPage(props) {
  const user = props.user;
  const router = useRouter();
  const { code } = router.query;
  const { data } = useSWR(`/api/groups/${code}`);

  if (typeof data === "object" && data.length !== 0) {
    return (
      <Layout user={user}>
        <div>
          <h1>Group Code: {code}</h1>
          <JoinButton />
          <pre>{JSON.stringify(data, null, "\t")}</pre>
          <ScheduleTable />
        </div>
      </Layout>
    );
  }
  return (
    <Layout user={user}>
      <h1>Group Page does not Exists!</h1>
    </Layout>
  );
}

export default GroupPage;
