import { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import useSWR from "swr";
import { useToasts } from "../../components/Toasts";

export const getServerSideProps = async ({ req, res }) => {
  const session = await auth0.getSession(req);
  if (session && session.user) {
    const intialData = (await getEvents(session.user)).map(serializeDocument);
    return {
      props: {
        user: session.user,
        intialData: intialData,
      },
    };
  }

  res.writeHead(302, {
    Location: "/api/login",
  });
  res.end();
};

function NewEventForm(props) {
  const { user, initialData } = props;
  const { showToast } = useToasts();
  const { data, mutate } = useSWR("/api/event", { initialData });
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
      showToast("Added event: " + newEventName);
      await mutate(
        [
          {
            eventname: newEventName,
            eventday: newDay,
            eventstarttime: newStartTime,
            eventendtime: newEndTime,
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
