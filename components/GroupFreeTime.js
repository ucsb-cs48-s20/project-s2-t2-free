import useSWR from "swr";
import Table from "react-bootstrap/Table";
import { useRouter } from "next/router";
import { freeTime } from "../utils/timeFuncs";
import { Accordion, Card } from "react-bootstrap";

function findFreeTime(data) {
  // create dictionary with format 'day of week':'list of free time intervals'
  var free_time_byDay = {};

  var sun = [];
  var mon = [];
  var tues = [];
  var wed = [];
  var thurs = [];
  var fri = [];
  var sat = [];

  if (typeof data === "object") {
    for (let i = 0; i < data.length; i++) {
      if (data[i].isSunday) {
        sun.push([data[i].startTime, data[i].endTime]);
      }
      if (data[i].isMonday) {
        mon.push([data[i].startTime, data[i].endTime]);
      }
      if (data[i].isTuesday) {
        tues.push([data[i].startTime, data[i].endTime]);
      }
      if (data[i].isWednesday) {
        wed.push([data[i].startTime, data[i].endTime]);
      }
      if (data[i].isThursday) {
        thurs.push([data[i].startTime, data[i].endTime]);
      }
      if (data[i].isFriday) {
        fri.push([data[i].startTime, data[i].endTime]);
      }
      if (data[i].isSaturday) {
        sat.push([data[i].startTime, data[i].endTime]);
      }
    }
  }

  // evaluate free times on each day and store in dict
  free_time_byDay["Sunday"] = freeTime(sun);
  free_time_byDay["Monday"] = freeTime(mon);
  free_time_byDay["Tuesday"] = freeTime(tues);
  free_time_byDay["Wednesday"] = freeTime(wed);
  free_time_byDay["Thursday"] = freeTime(thurs);
  free_time_byDay["Friday"] = freeTime(fri);
  free_time_byDay["Saturday"] = freeTime(sat);

  return free_time_byDay;
}

function FreeTime(data) {
  var free_time_byDay = findFreeTime(data);
  const items = [];

  for (var key in free_time_byDay) {
    var str = "";
    for (let k = 0; k < free_time_byDay[key].length; k++) {
      str =
        str +
        free_time_byDay[key][k][0] +
        "-" +
        free_time_byDay[key][k][1] +
        ", ";
    }
    if (str != "") {
      str = str.slice(0, -2);
    }
    items.push(
      <tr>
        <td> {key} </td>
        <td> {str} </td>
      </tr>
    );
  }
  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>Day of the Week</th>
          <th>Available Free Time</th>
        </tr>
      </thead>
      <tbody>{items}</tbody>
    </Table>
  );
}

export default function returnTable() {
  const router = useRouter();
  const { code } = router.query;
  const { data } = useSWR(`/api/groups/getGroupFreeTime/${code}`);
  if (typeof data === "object") {
    return (
      <Accordion defaultActiveKey="0" className="mb-3">
        <Card>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="0"
            className="acc-toggle"
          >
            Everyone's Free Time
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>{FreeTime(data)}</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
  return <div></div>;
}
