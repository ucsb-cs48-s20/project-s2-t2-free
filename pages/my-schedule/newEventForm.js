import { requiredAuth } from "../../utils/ssr";
import { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import useSWR from "swr";

export const getServerSideProps = requiredAuth;

function NewEventForm() {
  const { data, mutate } = useSWR("/api/event", {});
  const [newEventName, setNewEventName] = useState("");
  const [newDay, setNewDay] = useState("");
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");
  const addEvent = useCallback(
    async (e) => {
      // override default form submission behavior
      e.preventDefault();
      e.stopPropagation();

      setNewEventName("");
      setNewDay("");
      setNewStartTime("");
      setNewEndTime("");
      await mutate(
        [
          {
            eventname: newEventName,
            day: newDay,
            starttime: newStartTime,
            endtime: newEndTime,
          },
        ],
        false
      );
      await fetch("/api/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventname: newEventName,
          day: newDay,
          starttime: newStartTime,
          endtime: newEndTime,
        }),
      });
      await mutate();
    },
    [newEventName, newDay, newStartTime, newEndTime]
  );

  return (
    <Form onSubmit={addEvent} className="mb-5">
      <Form.Group>
        <Form.Label>Event Name</Form.Label>
        <FormControl
          type="text"
          value={newEventName}
          onChange={(e) => setNewEventName(e.target.value)}
        />
        <Form.Label>Day</Form.Label>
        <FormControl
          type="text"
          value={newDay}
          onChange={(e) => setNewDay(e.target.value)}
        />
        <Form.Label>Start Time</Form.Label>
        <FormControl
          type="text"
          value={newStartTime}
          onChange={(e) => setNewStartTime(e.target.value)}
        />
        <Form.Label>End Time</Form.Label>
        <FormControl
          type="text"
          value={newEndTime}
          onChange={(e) => setNewEndTime(e.target.value)}
        />
      </Form.Group>
      <Button type="submit">Add Event</Button>
    </Form>
  );
}

export default NewEventForm;
