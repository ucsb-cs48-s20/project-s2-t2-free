import useSWR from "swr";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function UserGroups() {
  const { data } = useSWR("/api/groups/getUserGroups");
  const { data: membersJSON } = useSWR("/api/user");
  const items = [];

  if (data && membersJSON) {
    for (let i = 0; i < data.length; i++) {
      items.push(
        <NavDropdown.Item href={`/my-group/${data[i].code}`}>
          {data[i].name}
        </NavDropdown.Item>
      );
    }
  }
  return items;
}
