import { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { InputGroup, Container, Row, Col } from "react-bootstrap";
import useSWR from "swr";
import { useToasts } from "./Toasts";
import { Accordion, Card } from "react-bootstrap";
import numToTime from "../utils/numToTime";

function EditBeginEndTimeForm() {
  const { showToast } = useToasts();
  const { mutate } = useSWR("/api/event");

  const [startTime, setStartTime] = useState("5:00 PM");
  const [endTime, setEndTime] = useState("9:00 AM");

  const timeOptions = [];
  for (let i = 0; i < 288; i++) {
    timeOptions.push(<option>{numToTime(i)}</option>);
  }

  const addEvent = useCallback(
    async (e) => {
      // override default form submission behavior
      e.preventDefault();
      e.stopPropagation();

      setStartTime("5:00 PM");
      setEndTime("9:00 AM");
      showToast("Removed times from your Free Time!");

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
          Set a Do Not Disturb Time!
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Form onSubmit={addEvent} className="mb-3">
              <Form.Group>
                <Container>
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
                          onChange={(e) => setEndTime(e.target.value)}
                        >
                          {timeOptions}
                        </Form.Control>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col md="auto" className="mb-3">
                      <Button type="submit">
                        Remove hours from my list of free times
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

export default EditBeginEndTimeForm;
