import useSWR from "swr";
import { useRouter } from "next/router";

export default function MembersTable() {
  const router = useRouter();
  const { code } = router.query;
  const { data: membersJSON } = useSWR("/api/user");
  const { data } = useSWR(`/api/groups/${code}`);
  let items = [];
  if (typeof data === "object" && typeof membersJSON === "object") {
    items = data[0].members.map((id) => membersJSON[id]).join(", ");
  }
  return <div>Members: {items}</div>;
}
