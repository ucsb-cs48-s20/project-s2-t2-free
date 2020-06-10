import useSWR from "swr";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavItem } from "react-bootstrap";

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
  if (items.length !== 0) {
    return items;
  }
  return <NavDropdown.Item>Not in a Groups :(</NavDropdown.Item>;
}
