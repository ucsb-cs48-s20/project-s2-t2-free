import useSWR from "swr";
import { useCallback, useState } from "react";
import { useToasts } from "../../../components/Toasts";
import Table from "react-bootstrap/Table";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function dayOfTheWeek(param) {
  let day = "";
  if (param.isSunday == true) {
    day += "Sun  ";
  }
  if (param.isMonday == true) {
    day += "Mon  ";
  }
  if (param.isTuesday == true) {
    day += "Tues  ";
  }
  if (param.isWednesday == true) {
    day += "Wed  ";
  }
  if (param.isThursday == true) {
    day += "Thur  ";
  }
  if (param.isFriday == true) {
    day += "Fri  ";
  }
  if (param.isSaturday == true) {
    day += "Sat";
  }
  return day;
}

export default function createTable() {
  const { data, mutate } = useSWR("/api/event");
  const { data: membersJSON } = useSWR("/api/user");

  if (typeof data === "object") {
    const items = [];

    for (let i = 0; i < data.length; i++) {
      items.push(
        <tr>
          <td>{data[i].name}</td>
          <td>Member Name</td>
          <td>{dayOfTheWeek(data[i])}</td>
          <td>{data[i].startTime}</td>
          <td>{data[i].endTime}</td>
        </tr>
      );
    }

    return (
      <Table striped bordered className="mt-3">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>User</th>
            <th>Day of the Week</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </Table>
    );
  } else {
    return <div></div>;
  }
}
