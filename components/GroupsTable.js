import useSWR from "swr";
import Table from "react-bootstrap/Table";
import Link from "next/link";
import { useToasts } from "./Toasts";
import { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

function createTable(data, membersJSON) {
  const [isLeaveMode, setIsLeaveMode] = useState(false);
  const { mutate } = useSWR("/api/groups/getUserGroups");
  const { showToast } = useToasts();
  const leaveGroup = useCallback(async (groupID, groupName) => {
    showToast("Left Group: " + groupName);
    await fetch(`/api/groups/leaveGroup/${groupID}`, { method: "DELETE" });
    mutate();
  });

  function resetGroups() {
    var reset = confirm("Are you sure you want to leave all groups?");
    if (reset == true) {
      if (typeof data === "object" && typeof membersJSON === "object") {
        for (let i = 0; i < data.length; i++) {
          leaveGroup(data[i].code, data[i].name);
        }
      }
      showToast("Left all groups!");
    }
  }

  if (typeof data === "object" && typeof membersJSON === "object") {
    const items = [];

    for (let i = 0; i < data.length; i++) {
      items.push(
        <tr>
          <td id={`group-name-${i}`}> {data[i].name} </td>
          <td id={`group-members-${i}`}>
            {" "}
            {data[i].members.map((id) => membersJSON[id]).join(", ")}{" "}
          </td>
          <td id={`group-code-${i}`}> {data[i].code} </td>
          <td>
            {" "}
            <Link
              href="/my-group/[data[i].code]"
              as={`/my-group/${data[i].code}`}
            >
              <a id={`group-link-${i}`}>
                https://cs48-s20-s2-t2-prod.herokuapp.com/my-group/
                {data[i].code}
              </a>
            </Link>{" "}
          </td>
          <td>
            {isLeaveMode && (
              <Button
                variant="danger"
                onClick={() => leaveGroup(data[i].code, data[i].name)}
              >
                Leave
              </Button>
            )}
          </td>
        </tr>
      );
    }

    if (isLeaveMode) {
      items.push(
        <tr style={{ backgroundColor: "#ffbfc2" }}>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            {
              <Form.Group>
                <Button variant="danger" onClick={() => resetGroups()}>
                  Leave All
                </Button>
              </Form.Group>
            }
          </td>
        </tr>
      );
    }

    return (
      <Table striped bordered className="mt-3">
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Members</th>
            <th>Code</th>
            <th>Link</th>
            <th>
              <Form.Check
                label="Leave"
                type="switch"
                id="isLeaveMode"
                onChange={(e) => setIsLeaveMode(e.target.checked)}
              />
            </th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </Table>
    );
  }
}

export default function ScheduleTable() {
  const { data } = useSWR("/api/groups/getUserGroups");
  const { data: membersJSON } = useSWR("/api/user");
  return <div>{createTable(data, membersJSON)}</div>;
}
