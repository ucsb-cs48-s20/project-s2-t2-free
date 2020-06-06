import { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { InputGroup, Container, Row, Col } from "react-bootstrap";
import useSWR from "swr";
import { useToasts } from "./Toasts";
import { Accordion, Card } from "react-bootstrap";
import { convertTime, numToTime } from "../utils/timeFuncs";
import Router from "next/router";

function validateForm(
  e,
  isSunday,
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isSaturday,
  startTime,
  endTime,
  addEvent
) {
  e.preventDefault();
  e.stopPropagation();
  if (convertTime(startTime) >= convertTime(endTime)) {
    window.alert("Start time must be before end time.");
    return false;
  }
  if (
    !isSunday &&
    !isMonday &&
    !isTuesday &&
    !isWednesday &&
    !isThursday &&
    !isFriday &&
    !isSaturday
  ) {
    window.alert("Must select at least one day of the week.");
    return false;
  }
  return addEvent(e);
}

function EditEventForm(props) {
  const { mutate } = useSWR("/api/event");
  const { showToast } = useToasts();
  const event = props.event;

  const [name, setName] = useState(event.name);

  const [isMonday, setIsMonday] = useState(event.isMonday);
  const [isTuesday, setIsTuesday] = useState(event.isTuesday);
  const [isWednesday, setIsWednesday] = useState(event.isWednesday);
  const [isThursday, setIsThursday] = useState(event.isThursday);
  const [isFriday, setIsFriday] = useState(event.isFriday);
  const [isSaturday, setIsSaturday] = useState(event.isSaturday);
  const [isSunday, setIsSunday] = useState(event.isSunday);

  const [startTime, setStartTime] = useState(event.startTime);
  const [endTime, setEndTime] = useState(event.endTime);

  const timeOptions = [];
  for (let i = 0; i < 1339; i = i + 5) {
    timeOptions.push(<option>{numToTime(i)}</option>);
  }

  const deleteId = useCallback(async (eventId) => {
    showToast(`Deleted event`);
    await fetch(`/api/event/${eventId}`, { method: "DELETE" });
    await mutate();
  }, []);

  const addEvent = useCallback(
    async (e) => {
      // override default form submission behavior
      console.log(e);
      e.preventDefault();
      e.stopPropagation();

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
            startTime: startTime,
            endTime: endTime,
          },
        ],
        false
      );
      await fetch(`/api/event/${event._id}`, {
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
          startTime: startTime,
          endTime: endTime,
        }),
      });
      await mutate();
      Router.push("/my-schedule");
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
    <Accordion defaultActiveKey="1" className="mb-3">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0" className="acc-toggle">
          <Row className="justify-content-between">
            <Col xs="auto">{event.name}</Col>
            <Col xs="auto">
              <Button variant="danger" onClick={() => deleteId(event._id)}>
                Delete
              </Button>
            </Col>
          </Row>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Form
              id="createnewevent"
              onSubmit={(e) =>
                validateForm(
                  e,
                  isSunday,
                  isMonday,
                  isTuesday,
                  isWednesday,
                  isThursday,
                  isFriday,
                  isSaturday,
                  startTime,
                  endTime,
                  addEvent
                )
              }
              className="mb-3"
            >
              <Form.Group>
                <Container>
                  <Row>
                    <Col>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Text>Event Name</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          placeholder="Untitled"
                          type="text"
                          value={name}
                          id={`${event._id}-eventname`}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Text>Start Time</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          as="select"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          id={`${event._id}-starttime`}
                        >
                          {timeOptions}
                        </Form.Control>
                      </InputGroup>
                    </Col>
                    <Col xs={12} md={6}>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Text>End Time</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          as="select"
                          value={endTime}
                          id={`${event._id}-endtime`}
                          onChange={(e) => setEndTime(e.target.value)}
                        >
                          {timeOptions}
                        </Form.Control>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col md="auto" className="mb-3">
                      <Form.Check
                        label="Mon"
                        type="switch"
                        id={`${event._id}-Monday`}
                        checked={isMonday}
                        onChange={(e) => setIsMonday(e.target.checked)}
                      />
                    </Col>
                    <Col md="auto" className="mb-3">
                      <Form.Check
                        label="Tues"
                        type="switch"
                        id={`${event._id}-Tuesday`}
                        checked={isTuesday}
                        onChange={(e) => setIsTuesday(e.target.checked)}
                      />
                    </Col>
                    <Col md="auto" className="mb-3">
                      <Form.Check
                        label="Wed"
                        type="switch"
                        id={`${event._id}-Wednesday`}
                        checked={isWednesday}
                        onChange={(e) => setIsWednesday(e.target.checked)}
                      />
                    </Col>
                    <Col md="auto" className="mb-3">
                      <Form.Check
                        label="Thur"
                        type="switch"
                        id={`${event._id}-Thursday`}
                        checked={isThursday}
                        onChange={(e) => setIsThursday(e.target.checked)}
                      />
                    </Col>
                    <Col md="auto" className="mb-3">
                      <Form.Check
                        label="Fri"
                        type="switch"
                        id={`${event._id}-Friday`}
                        checked={isFriday}
                        onChange={(e) => setIsFriday(e.target.checked)}
                      />
                    </Col>
                    <Col md="auto" className="mb-3">
                      <Form.Check
                        label="Sat"
                        type="switch"
                        id={`${event._id}-Saturday`}
                        checked={isSaturday}
                        onChange={(e) => setIsSaturday(e.target.checked)}
                      />
                    </Col>
                    <Col md="auto" className="mb-3">
                      <Form.Check
                        label="Sun"
                        type="switch"
                        id={`${event._id}-Sunday`}
                        checked={isSunday}
                        onChange={(e) => setIsSunday(e.target.checked)}
                      />
                    </Col>
                  </Row>
                  <Row className="justify-content-end">
                    <Col md="auto" className="mb-3">
                      <Button id={`${event._id}-updateevent`} type="submit">
                        Update Event
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Form.Group>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default EditEventForm;
