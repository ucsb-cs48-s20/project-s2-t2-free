import { authenticatedAction } from "../../../utils/api";
import { initDatabase } from "../../../utils/mongodb";

const eventConstraints = {
  eventName: {
    presence: true,
  },
  day: {
    presence: true,
  },
  startTime: {
    presence: true,
  },
  endTime: {
    presence: true,
  },
};

async function createEvent(req) {
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

  const client = await initDatabase();
  const events = client.collection("events");

  const query = { email: event.eventname };
  const mutation = {
    $setOnInsert: {
      eventname: event.eventname,
      eventday: event.eventday,
      eventstarttime: event.eventstarttime,
      eventendtime: event.eventendtime,
    },
    $set: {
      role: "event",
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
    // case "GET":
    //   return getStudents(section);
    case "POST":
      return createEvent(req);
  }

  throw { status: 405 };
}

export default authenticatedAction(performAction);
