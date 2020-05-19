import useSWR from "swr";
import { useRouter } from "next/router";

export default function MembersTable() {
  const router = useRouter();
  const { code } = router.query;
  const { data: members } = useSWR("/api/user");
  const { data } = useSWR(`/api/groups/${code}`);
  let items = [];
  if (typeof data === "object" && typeof members === "object") {
    for (let i = 0; i < data[0].members.length; i++) {
      items.push(members[data[0].members[i]]);
    }
  }
  return <div>Members: {items.join(", ")}</div>;
}
