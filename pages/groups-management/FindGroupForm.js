// "Find Existing Group" Card

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { InputGroup, Container, Row, Col } from "react-bootstrap";
import { Accordion, Card } from "react-bootstrap";
import { useRouter } from "next/router";

function JoinGroupForm() {
  const router = useRouter();
  const [groupCode, setGroupCode] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    router.push("/my-group/" + groupCode);
  };

  return (
    <Form onSubmit={handleClick}>
      <Form.Group>
        <Container>
          <Row>
            <Col>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Find Existing Group</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Enter Group Code"
                  type="text"
                  value={groupCode}
                  onChange={(e) => setGroupCode(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md="auto">
              <Button type="submit">Find</Button>
            </Col>
          </Row>
        </Container>
      </Form.Group>
    </Form>
  );
}

export default JoinGroupForm;
