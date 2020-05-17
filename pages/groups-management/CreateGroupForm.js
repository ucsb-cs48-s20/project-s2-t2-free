// "Create Group" Card

import { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { InputGroup, Container, Row, Col } from "react-bootstrap";
import useSWR from "swr";
import { useToasts } from "../../components/Toasts";

function JoinGroupForm() {
  const { showToast } = useToasts();
  // needed later to find groups that the user is in
  // const { mutate } = useSWR("/api/groups");
  const [name, setName] = useState("");

  const addGroup = useCallback(
    async (e) => {
      // override default form submission behavior
      e.preventDefault();
      e.stopPropagation();
      setName("");
      if (name === "") {
        showToast("Added to Group!");
      } else {
        showToast("Added to Group: " + name);
      }
      await fetch("/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
        }),
      });
      // await mutate();
    },
    [name]
  );

  return (
    <Form onSubmit={addGroup}>
      <Form.Group>
        <Container>
          <Row>
            <Col>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Create New Group</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Enter New Group Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md="auto">
              <Button type="submit">Create</Button>
            </Col>
          </Row>
        </Container>
      </Form.Group>
    </Form>
  );
}

export default JoinGroupForm;
