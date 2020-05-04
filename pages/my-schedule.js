import Layout from "../components/Layout";
import { requiredAuth } from "../utils/ssr";
import { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Head from "next/head";
import { useToasts } from "../components/Toasts";

export const getServerSideProps = requiredAuth;

export default function ManageDefaultSchedulePage(props) {
  const { user, initialData } = props;
  const { showToast } = useToasts();
  const [newEventName, setNewEventName] = useState("");
  const [newDay, setNewDay] = useState("");
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");
  const addEvent = useCallback(async (e) => {
    // override default form submission behavior
    e.preventDefault();
    e.stopPropagation();

    setNewEventName("");
    setNewDay("");
    setNewStartTime("");
    setNewEndTime("");
    showToast(`Added event ${newEventName}`);
  });

  return (
    <Layout user={user}>
      <Head>
        <title>Edit Schedule</title>
      </Head>
      <h1>Edit Schedule</h1>
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
    </Layout>
  );
}
