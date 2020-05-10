import { useCallback } from "react";
import Head from "next/head";
import useSWR from "swr";
import fetch from "isomorphic-unfetch";
import Button from "react-bootstrap/Button";
import BootstrapTable from "react-bootstrap/Table";
import { useToasts } from "../../components/Toasts";
import Table from "react-bootstrap/Table";
import { requiredAuth } from "../../utils/ssr";

function createTable(data) {
  if (typeof data === "object") {
    const items = [];

    for (let i = 0; i < data.length; i++) {
      items.push(
        <tr>
          <td> {data[i].name} </td>
          <td> {data[i].isMonday} </td>
          <td> {data[i].startTime} </td>
          <td> {data[i].endTime} </td>
        </tr>
      );
    }

    return (
      <Table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Day of the Week</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </Table>
    );
  }
}

export default function ScheduleTable() {
  const { showToast } = useToasts();
  const { data } = useSWR("/api/event");

  return <div>{createTable(data)}</div>;
}
