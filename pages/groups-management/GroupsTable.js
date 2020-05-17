// List of Groups
// delete functionality that allows user to leave group
// link to group page? or just output of free time?
// copy link button
// copy code button

import useSWR from "swr";
import { useToasts } from "../../components/Toasts";
import Table from "react-bootstrap/Table";

function createTable(data) {
  if (typeof data === "object") {
    const items = [];

    for (let i = 0; i < data.length; i++) {
      items.push(
        <tr>
          <td> {data[i].name} </td>
          <td> {data[i].users} </td>
          <td> {data[i].freetime} </td>
          <td> {data[i].code} </td>
          <td> {data[i].link} </td>
        </tr>
      );
    }

    return (
      <Table striped bordered className="mt-3">
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Participants</th>
            <th>Free Time</th>
            <th>Code</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </Table>
    );
  }
}

export default function ScheduleTable() {
  const { showToast } = useToasts();
  const { data } = useSWR("/api/groups");

  return <div>{createTable(data)}</div>;
}
