import validate from "validate.js";
import { authenticatedAction } from "../../../utils/api";
import { initDatabase } from "../../../utils/mongodb";

export async function getEvents(userSub) {
  const client = await initDatabase();
  const events = client.collection("events");

  const query = {
    userid: userSub,
  };

  return events.find(query).toArray();
}

const eventConstraints = {
  name: {
    presence: true,
  },
  endTime: {
    presence: true,
  },
  isFriday: {
    presence: true,
  },
  isMonday: {
    presence: true,
  },
  isSaturday: {
    presence: true,
  },
  isSunday: {
    presence: true,
  },
  isThursday: {
    presence: true,
  },
  isTuesday: {
    presence: true,
  },
  isWednesday: {
    presence: true,
  },
  startTime: {
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

  const query = { name: "always insert event" };
  const mutation = {
    $setOnInsert: {
      userid: user.sub,
      name: event.name,
      isMonday: event.isMonday,
      isTuesday: event.isTuesday,
      isWednesday: event.isWednesday,
      isThursday: event.isThursday,
      isFriday: event.isFriday,
      isSaturday: event.isSaturday,
      isSunday: event.isSunday,
      startTime: event.startTime,
      endTime: event.endTime,
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
      return getEvents(user.sub);
    case "POST":
      return createEvent(req, user);
  }

  throw { status: 405 };
}

export default authenticatedAction(performAction);
