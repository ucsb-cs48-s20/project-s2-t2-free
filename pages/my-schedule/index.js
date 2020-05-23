import Layout from "../../components/Layout";
import { requiredAuth } from "../../utils/ssr";
import NewEventForm from "./NewEventForm";
import ScheduleTable from "./ScheduleTable";
import FreeTime from "./FreeTime";
import Image from "react-bootstrap/Image";
import { Container, Row, Col } from "react-bootstrap";

export const getServerSideProps = requiredAuth;

function SchedulePage(props) {
  const user = props.user;
  let num = 6;
  return (
    <Layout user={user}>
      <Row className="justify-content-between">
        <Col xs={1}>
          <Image src="profiles/user-4.png/" thumbnail width="90%" />
        </Col>
        <Col>
          <h1 className="mb-3 p-0">
            {user.given_name} {user.family_name}'s Schedule
          </h1>
        </Col>
      </Row>
      <NewEventForm />
      <ScheduleTable />
      <FreeTime />
    </Layout>
  );
}

export default SchedulePage;
