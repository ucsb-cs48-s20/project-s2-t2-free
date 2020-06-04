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
  const { mutate } = useSWR("/api/event/editSleepEvents");

  const [startTime, setStartTime] = useState("9:00 AM");
  const [endTime, setEndTime] = useState("5:00 PM");

  const timeOptions = [];
  for (let i = 0; i < 1339; i = i + 5) {
    timeOptions.push(<option>{numToTime(i)}</option>);
  }

  const addEvent = useCallback(
    async (e) => {
      // override default form submission behavior
      e.preventDefault();
      e.stopPropagation();

      setStartTime("9:00 AM");
      setEndTime("5:00 PM");
      showToast("Set your day start and end time!");

      await mutate(
        [
          {
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
          },
        ],
        false
      );

      await fetch("/api/event/editSleepEvents", {
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
      await mutate();
    },
    ["", true, true, true, true, true, true, true, startTime, endTime]
  );

  return (
    <Accordion defaultActiveKey="0" className="mb-3">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0" className="acc-toggle">
          Set a start time and end time to your day!
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
                          <InputGroup.Text>Start Time</InputGroup.Text>
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
                          <InputGroup.Text>End Time</InputGroup.Text>
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
                </Container>
              </Form.Group>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default EditBeginEndTimeForm;
