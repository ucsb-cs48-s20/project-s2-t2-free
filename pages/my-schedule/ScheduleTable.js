import useSWR from "swr";
import { useToasts } from "../../components/Toasts";
import Table from "react-bootstrap/Table";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function dayOfTheWeek(param) {
  let day = "";
  if (param.isSunday == true) {
    day += "Sun  ";
  }
  if (param.isMonday == true) {
    day += "Mon  ";
  }
  if (param.isTuesday == true) {
    day += "Tues  ";
  }
  if (param.isWednesday == true) {
    day += "Wed  ";
  }
  if (param.isThursday == true) {
    day += "Thur  ";
  }
  if (param.isFriday == true) {
    day += "Fri  ";
  }
  if (param.isSaturday == true) {
    day += "Sat";
  }
  return <td> {day} </td>;
}

function createTable(data) {
  if (typeof data === "object") {
    const items = [];
    const deleteEvent = () => {};

    for (let i = 0; i < data.length; i++) {
      items.push(
        <tr>
          <td>{data[i].name}</td>
          <td>{dayOfTheWeek(data[i])}</td>
          <td>{data[i].startTime}</td>
          <td>{data[i].endTime}</td>
          <td
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Form onSubmit={deleteEvent} className="mb-3">
              <Form.Group>
                <Button type="submit">Delete</Button>
              </Form.Group>
            </Form>
          </td>
        </tr>
      );
    }

    return (
      <Table striped bordered className="mt-3">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Day of the Week</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </Table>
    );
  }
}

export default function ScheduleTable() {
  // const { showToast } = useToasts();
  const { data } = useSWR("/api/event");
  return <div>{createTable(data)}</div>;
}
