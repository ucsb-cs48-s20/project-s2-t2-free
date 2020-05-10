import { useCallback } from "react";
import Head from "next/head";
import useSWR from "swr";
import fetch from "isomorphic-unfetch";
import Button from "react-bootstrap/Button";
import BootstrapTable from "react-bootstrap/Table";
import { useToasts } from "../../components/Toasts";
import Table from "react-bootstrap/Table";
import { serializeDocument } from "../../utils/mongodb";

export const getServerSideProps = async ({ req, res }) => {
  const session = await auth0.getSession(req);
  if (session && session.user) {
    const intialData = (await getEvents(session.user)).map(serializeDocument);
    return {
      props: {
        user: session.user,
        intialData: intialData,
      },
    };
  }

  res.writeHead(302, {
    Location: "/api/login",
  });
  res.end();
};

function createTable(intialData) {
  console.log(intialData);

  const items = [];

  for (let i = 0; i < intialData.length; i++) {
    items.push(
      <tr>
        <td> {intialData[i].name} </td>
        <td> {intialData[i].isMonday} </td>
        <td> {intialData[i].startTime} </td>
        <td> {intialData[i].endTime} </td>
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

export default function ScheduleTable(props) {
  const { user, intialData } = props;
  const { showToast } = useToasts();
  const { data, mutate } = useSWR("/api/event", { intialData });

  return (
    <div>
      <pre>{JSON.stringify(intialData, null, "\t")}</pre>
    </div>
  );
}
