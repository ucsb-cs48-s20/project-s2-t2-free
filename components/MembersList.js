import useSWR from "swr";
import { useRouter } from "next/router";

//Returns list of members for front-end
export default function MembersTable() {
  const router = useRouter();
  const { code } = router.query;
  const { data: membersJSON } = useSWR("/api/user");
  const { data: groupInfo } = useSWR(`/api/groups/getGroupInfo/${code}`);
  let items = [];
  if (typeof groupInfo === "object" && typeof membersJSON === "object") {
    items = groupInfo[0].members.map((id) => membersJSON[id]).join(", ");
  }
  if (items.length !== 0) {
    return <div className="">Members: {items}</div>;
  }
  return <div>No Members :(</div>;
}
