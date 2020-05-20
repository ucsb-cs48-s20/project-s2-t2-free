import useSWR from "swr";
import Table from "react-bootstrap/Table";
import { Accordion, Card } from "react-bootstrap";

// converts time hh:mm AM/PM to minute of the day
function convertTime(str) {
  var min = 0;
  var morn = 0; // 0 if morning, 1 if afternoon
  if (str.charAt(str.length - 2) == "P") {
    morn = 1;
  }
  str = str.slice(0, -3);
  var str_split = str.split(":");

  if (str_split[0] == 12) {
    str_split[0] = 0;
  }

  min = +str_split[0] * 60 + +str_split[1];

  if (morn == 1) {
    min = min + 720;
  }
  return min;
}

// converts time from number to string
function numToTime(num) {
  let str = "";
  if (Math.floor(num / 60) % 12 == 0) {
    str += "12";
  } else if (num > 720) {
    str += Math.floor((num - 720) / 60) % 60;
  } else {
    str += Math.floor(num / 60) % 60;
  }
  str += ":";
  if (num % 60 < 10) {
    str = str + "0" + (num % 60).toString();
  } else {
    str += (num % 60).toString();
  }

  // decide AM or PM
  if (num >= 720) {
    str += " PM";
  } else {
    str += " AM";
  }
  return str;
}

// dictionary of busy times with format 'string day':'true/false'
function makeBusy() {
  let busy = {};
  for (let i = 0; i < 1436; i = i + 5) {
    busy[numToTime(i)] = true;
  }
  return busy;
}

// populates busy with events
function convertEvent(events) {
  var busy = makeBusy();
  var len = events.length;
  for (let i = 0; i < len; i++) {
    var start_time = convertTime(events[i][0]);
    var end_time = convertTime(events[i][1]);

    for (let j = start_time + 5; j <= end_time - 5; j = j + 5) {
      busy[numToTime(j)] = false;
    }
  }
  return busy;
}

// converts busy_times to free_times as time strings
function makeFree(busy_times) {
  var free_times = [];
  for (var key in busy_times) {
    if (busy_times[key] == true) {
      free_times.push(key);
    }
  }
  return free_times;
}

function freeIntervals(free_times) {
  var free_intervals = [];
  var start = free_times[0];
  free_intervals.push(start);
  var i = 1;
  while (i < free_times.length) {
    while (
      i < free_times.length &&
      convertTime(free_times[i]) == convertTime(free_times[i - 1]) + 5
    ) {
      i++;
    }
    free_intervals.push(free_times[i - 1]);
    if (i < free_times.length) {
      free_intervals.push(free_times[i]);
    }
    i++;
  }
  return free_intervals;
}

// converts free_times from min to string time format
function freeTime(event_logs) {
  var busy = convertEvent(event_logs);
  var free_times = makeFree(busy);
  var free_intervals = freeIntervals(free_times);

  // make a list of lists
  var free_times_str = [];
  for (let i = 0; i < free_intervals.length; i = i + 2) {
    free_times_str.push([free_intervals[i], free_intervals[i + 1]]);
  }
  return free_times_str;
}

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

export default function FreeTime() {
  const { data } = useSWR("/api/event");
  var free_time_byDay = findFreeTime(data);
  const items = [];

  for (var key in free_time_byDay) {
    var str = "";
    for (let k = 0; k < free_time_byDay[key].length; k++) {
      if (free_time_byDay[key][k][0] == "11:55 PM") {
        free_time_byDay[key][k][0] = "11:59 PM";
      }
      if (free_time_byDay[key][k][1] == "11:55 PM") {
        free_time_byDay[key][k][1] = "11:59 PM";
      }
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
    <Accordion className="mb-3">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0" className="acc-toggle">
          Your Free Time
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Table striped bordered className="mb-3">
              <thead>
                <tr>
                  <th>Day of the Week</th>
                  <th>Available Free Time</th>
                </tr>
              </thead>
              <tbody>{items}</tbody>
            </Table>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
