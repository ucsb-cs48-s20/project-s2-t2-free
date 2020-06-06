import useSWR from "swr";
import { useCallback, useState } from "react";
import { useToasts } from "./Toasts";
import Table from "react-bootstrap/Table";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import EditEventForm from "../components/EditEventForm";
import Modal from "react-bootstrap/Modal";

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
  return day;
}

export default function createTable() {
  const { showToast } = useToasts();
  const { data, mutate } = useSWR("/api/event");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteId = useCallback(async (eventId) => {
    showToast(`Deleted event`);
    await fetch(`/api/event/${eventId}`, { method: "DELETE" });
    await mutate();
  }, []);

  function resetSchedule() {
    var reset = confirm("Are you sure you want to reset your schedule?");
    if (reset == true) {
      if (typeof data === "object") {
        for (let i = 0; i < data.length; i++) {
          deleteId(data[i]._id);
        }
      }
      showToast("Cleared schedule!");
    }
  }

  if (typeof data === "object") {
    const eventRow = [];
    const editForm = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].name != "") {
        editForm.push(<EditEventForm event={data[i]} />);
        eventRow.push(
          <tr>
            <td>{data[i].name}</td>
            <td>{dayOfTheWeek(data[i])}</td>
            <td>{data[i].startTime}</td>
            <td>{data[i].endTime}</td>
            <td></td>
          </tr>
        );
      }
    }

    return (
      <>
        <Table striped bordered className="mb-3" id="schedule">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Day of the Week</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>
                <Form.Group>
                  <Button
                    variant="primary"
                    onClick={handleShow}
                    className="m-0"
                  >
                    Edit
                  </Button>
                </Form.Group>
              </th>
            </tr>
          </thead>
          <tbody>{eventRow}</tbody>
        </Table>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Edit Events</Modal.Title>
          </Modal.Header>
          <Modal.Body>{editForm}</Modal.Body>
          <Modal.Footer>
            <Form.Group>
              <Button variant="danger" onClick={() => resetSchedule()}>
                Reset All
              </Button>
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else {
    return <div></div>;
  }
}
