import { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { Container, Row, Col } from "react-bootstrap";
import useSWR from "swr";
import { useToasts } from "../../components/Toasts";

export const getServerSideProps = async ({ req }) => {
  const session = await auth0.getSession(req);
  if (session && session.user) {
    const intialData = (await getEvents(session.user)).map(serializeDocument);
    return {
      props: {
        intialData: intialData,
      },
    };
  }
};

function numToTime(num) {
  let str = "";
  if (Math.floor(num / 12) % 12 === 0) {
    str += "12";
  } else {
    str += Math.floor(num / 12) % 12;
  }
  str += ":";
  if ((num % 12) * 5 <= 5) {
    str += "0";
  }
  str += (num % 12) * 5;
  if (num >= 144) {
    str += " PM";
  } else {
    str += " AM";
  }
  return str;
}

function NewEventForm(props) {
  const { initialData } = props;
  const { showToast } = useToasts();
  const { mutate } = useSWR("/api/event", { initialData });
  const [name, setName] = useState("");

  const [isMonday, setIsMonday] = useState("false");
  const [isTuesday, setIsTuesday] = useState("false");
  const [isWednesday, setIsWednesday] = useState("false");
  const [isThursday, setIsThursday] = useState("false");
  const [isFriday, setIsFriday] = useState("false");
  const [isSaturday, setIsSaturday] = useState("false");
  const [isSunday, setIsSunday] = useState("false");

  const [startTime, setStartTime] = useState(144);
  const [endTime, setEndTime] = useState(144);
  const addEvent = useCallback(
    async (e) => {
      // override default form submission behavior
      e.preventDefault();
      e.stopPropagation();
      setName("");

      setIsMonday("false");
      setIsTuesday("false");
      setIsWednesday("false");
      setIsThursday("false");
      setIsFriday("false");
      setIsSaturday("false");
      setIsSunday("false");

      setStartTime(144);
      setEndTime(144);
      showToast("Added event: " + name);
      await mutate(
        [
          {
            name: name,
            isMonday: isMonday,
            isTuesday: isTuesday,
            isWednesday: isWednesday,
            isThursday: isThursday,
            isFriday: isFriday,
            isSaturday: isSaturday,
            isSunday: isSunday,
            startTime: numToTime(startTime),
            endTime: numToTime(endTime),
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
          name: name,
          isMonday: isMonday,
          isTuesday: isTuesday,
          isWednesday: isWednesday,
          isThursday: isThursday,
          isFriday: isFriday,
          isSaturday: isSaturday,
          isSunday: isSunday,
          startTime: numToTime(startTime),
          endTime: numToTime(endTime),
        }),
      });
      await mutate();
    },
    [
      name,
      isMonday,
      isTuesday,
      isWednesday,
      isThursday,
      isFriday,
      isSaturday,
      isSunday,
      startTime,
      endTime,
    ]
  );

  return (
    <Form onSubmit={addEvent} className="mb-5">
      <Form.Group>
        <Form.Label>Event Name</Form.Label>
        <FormControl
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Check
          inline
          label="Monday"
          type="switch"
          id="Monday"
          onChange={(e) => setIsMonday(e.target.checked)}
        />
        <Form.Check
          inline
          label="Tuesday"
          type="switch"
          id="Tuesday"
          onChange={(e) => setIsTuesday(e.target.checked)}
        />
        <Form.Check
          inline
          label="Wednesday"
          type="switch"
          id="Wednesday"
          onChange={(e) => setIsWednesday(e.target.checked)}
        />
        <Form.Check
          inline
          label="Thursday"
          type="switch"
          id="Thursday"
          onChange={(e) => setIsThursday(e.target.checked)}
        />
        <Form.Check
          inline
          label="Friday"
          type="switch"
          id="Friday"
          onChange={(e) => setIsFriday(e.target.checked)}
        />
        <Form.Check
          inline
          label="Saturday"
          type="switch"
          id="Saturday"
          onChange={(e) => setIsSaturday(e.target.checked)}
        />
        <Form.Check
          inline
          label="Sunday"
          type="switch"
          id="Sunday"
          onChange={(e) => setIsSunday(e.target.checked)}
        />
        <Form.Label>Start Time: {numToTime(startTime)}</Form.Label>
        <FormControl
          type="range"
          min="0"
          max="288"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <Form.Label>End Time: {numToTime(endTime)}</Form.Label>
        <FormControl
          type="range"
          min="0"
          max="288"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </Form.Group>
      <Button type="submit">Add Event</Button>
    </Form>
  );
}

export default NewEventForm;
