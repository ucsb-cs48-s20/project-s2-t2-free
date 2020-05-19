import useSWR from "swr";
import Table from "react-bootstrap/Table";

function createTable(data) {
  if (typeof data === "object") {
    const items = [];
    for (let i = 0; i < data.length; i++) {
      items.push(
        <tr>
          <td> {data[i].name} </td>
        </tr>
      );
    }
    return (
      <Table striped bordered className="mt-3">
        <thead>
          <tr>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </Table>
    );
  }
}

export default function MembersTable() {
  const { data } = useSWR("/api/user");
  return <div>{createTable(data)}</div>;
}
