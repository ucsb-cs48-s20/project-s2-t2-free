import Layout from "../../components/Layout";
import { requiredAuth } from "../../utils/ssr";
import { Accordion, Card } from "react-bootstrap";
import NewEventForm from "./NewEventForm";
import useSWR from "swr";

export const getServerSideProps = requiredAuth;

function SchedulePage(props) {
  const user = props.user;
  const { data } = useSWR("/api/event");
  return (
    <Layout user={user}>
      <br></br>
      <h1 className="mb-3">
        {user.given_name} {user.family_name}'s Schedule
      </h1>
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Create New Event
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <NewEventForm />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <pre>{JSON.stringify(data, null, "\t")}</pre>
    </Layout>
  );
}

export default SchedulePage;
