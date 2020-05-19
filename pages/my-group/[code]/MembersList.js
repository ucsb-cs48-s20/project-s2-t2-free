import useSWR from "swr";
import Table from "react-bootstrap/Table";
import { useRouter } from "next/router";

export default function MembersTable() {
  const router = useRouter();
  const { code } = router.query;
  const { data: members } = useSWR("/api/user");
  const { data } = useSWR(`/api/groups/${code}`);
  let items = [<span> Members: </span>];
  if (typeof data === "object" && typeof members === "object") {
    for (let i = 0; i < data[0].members.length; i++) {
      if (i + 1 !== data[0].members.length) {
        items.push(<span>{members[data[0].members[i]]}, </span>);
      } else {
        items.push(<span>{members[data[0].members[i]]}</span>);
      }
    }
  }
  return <div>{items}</div>;
}
