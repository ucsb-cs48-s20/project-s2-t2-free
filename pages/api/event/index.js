import validate from "validate.js";
import { authenticatedAction } from "../../../utils/api";
import { initDatabase } from "../../../utils/mongodb";

export async function getEvents(user) {
  const client = await initDatabase();
  const events = client.collection("events");

  const query = {
    userid: user.sub,
  };

  return events.find(query).toArray();
}

const eventConstraints = {
  eventname: {
    presence: true,
  },
  day: {
    presence: true,
  },
  starttime: {
    presence: true,
  },
  endtime: {
    presence: true,
  },
};

async function createEvent(req, user) {
  let event;

  try {
    event = await validate.async(req.body, eventConstraints, {
      cleanAttributes: true,
      format: "flat",
    });
  } catch (err) {
    throw {
      status: 400,
      message: err.join(", "),
    };
  }

  console.log("inserting into events:", event);

  const client = await initDatabase();
  const events = client.collection("events");

  const query = { eventname: "always insert event" };
  const mutation = {
    $setOnInsert: {
      userid: user.sub,
      eventname: event.eventname,
      eventday: event.day,
      eventstarttime: event.starttime,
      eventendtime: event.endtime,
    },
  };

  const result = await events.findOneAndUpdate(query, mutation, {
    upsert: true,
    returnOriginal: false,
  });

  return result.value;
}

async function performAction(req, user) {
  switch (req.method) {
    case "GET":
      return getEvents();
    case "POST":
      return createEvent(res, user);
  }

  throw { status: 405 };
}

export default authenticatedAction(performAction);
