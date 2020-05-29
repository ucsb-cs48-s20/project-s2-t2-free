import useSWR from "swr";
import { useCallback } from "react";
import { useToasts } from "./Toasts";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default function clearSchedule() {
  const { showToast } = useToasts();
  const { data, mutate } = useSWR("/api/event");

  const deleteId = useCallback(async (eventId) => {
    showToast(`Cleared schedule!`);
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
    }
  }

  return (
    <Form.Group>
      <Button variant="danger" onClick={() => resetSchedule()}>
        Reset Schedule
      </Button>
    </Form.Group>
  );
}
