import validate from "validate.js";
import { authenticatedAction } from "../../../utils/api";
// import { initDatabase } from "../../../utils/mongodb";

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

  //   const client = await initDatabase();
  //   const events = client.collection("events");

  // store to database here
}

async function performAction(req, user) {
  const { section } = req.query;

  if (user.role !== "admin") {
    throw { status: 403 };
  }

  switch (req.method) {
    // case "GET":
    //   return getStudents(section);
    case "POST":
      return createEvent(req);
  }

  throw { status: 405 };
}

export default authenticatedAction(performAction);
