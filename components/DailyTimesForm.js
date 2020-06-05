import { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { InputGroup, Container, Row, Col } from "react-bootstrap";
import useSWR from "swr";
import { useToasts } from "./Toasts";
import { Accordion, Card } from "react-bootstrap";
import { convertTime, numToTime } from "../utils/timeFuncs";

function validateForm(e, startTime, endTime, addEvent) {
  e.preventDefault();
  e.stopPropagation();
  if (convertTime(startTime) >= convertTime(endTime)) {
    window.alert("Start time must be before end time.");
    return false;
  }
  return addEvent(e);
}

function EditBeginEndTimeForm() {
  const { showToast } = useToasts();
  const { mutate: mutateEvents } = useSWR("/api/event");
  const { mutate: mutateGetDailyTimes, data } = useSWR(
    "/api/event/getDailyTimes"
  );

  const [startTime, setStartTime] = useState("9:00 AM");
  const [endTime, setEndTime] = useState("5:00 PM");

  const timeOptions = [];
  for (let i = 0; i < 1439; i = i + 5) {
    timeOptions.push(<option>{numToTime(i)}</option>);
  }

  const addEvent = useCallback(
    async (e) => {
      // override default form submission behavior
      e.preventDefault();
      e.stopPropagation();

      setStartTime(startTime);
      setEndTime(endTime);
      showToast("Daily Start/End Time Set!");

      await fetch("/api/event/getDailyTimes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "",
          isMonday: true,
          isTuesday: true,
          isWednesday: true,
          isThursday: true,
          isFriday: true,
          isSaturday: true,
          isSunday: true,
          startTime: startTime,
          endTime: endTime,
        }),
      });
      await mutateEvents();
      await mutateGetDailyTimes();
    },
    [startTime, endTime]
  );

  if (typeof data === "object" && data.length === 2) {
    return (
      <Accordion defaultActiveKey="1" className="mb-3">
        <Card>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="0"
            className="acc-toggle"
          >
            Daily Start/End Times
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Form
                onSubmit={(e) => validateForm(e, startTime, endTime, addEvent)}
                className="mb-3"
              >
                <Form.Group>
                  <Container>
                    <Row>
                      <Col>
                        <InputGroup className="mb-3">
                          <InputGroup.Prepend>
                            <InputGroup.Text>Daily Start Time</InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            as="select"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                          >
                            {timeOptions}
                          </Form.Control>
                        </InputGroup>
                      </Col>
                      <Col>
                        <InputGroup className="mb-3">
                          <InputGroup.Prepend>
                            <InputGroup.Text>Daily End Time</InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            as="select"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                          >
                            {timeOptions}
                          </Form.Control>
                        </InputGroup>
                      </Col>
                      <Col md="auto" className="mb-3">
                        <Button type="submit">Confirm</Button>
                      </Col>
                    </Row>
                    <Row className="justify-content-center">
                      Day currently starts are {data[0].endTime} and ends at{" "}
                      {data[1].startTime}
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
  return <div></div>;
}

export default EditBeginEndTimeForm;
