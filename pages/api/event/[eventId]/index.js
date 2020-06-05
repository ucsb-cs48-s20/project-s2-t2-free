import { ObjectId } from "mongodb";
import { authenticatedAction } from "../../../../utils/api";
import { initDatabase } from "../../../../utils/mongodb";

async function deleteEvent(eventId) {
  const client = await initDatabase();
  const events = client.collection("events");

  const query = {
    _id: ObjectId(eventId),
  };

  const result = await events.deleteOne(query);

  if (!result.deletedCount) {
    throw {
      status: 404,
      message: "Idea not found",
    };
  }
}

async function getEvents(eventId) {
  const client = await initDatabase();
  const events = client.collection("events");
  const query = {
    _id: eventId,
  };
  return await events.find(query).toArray();
}

async function editEvents(event, eventId) {
  const client = await initDatabase();
  const events = client.collection("events");

  //Remove Sleep Event
  const query = {
    name: "",
    userid: userSub,
  };

  const result = await events.deleteMany(query);

  // Create Sleep Event
  const query1 = { name: "always insert event" };
  const mutation = {
    $setOnInsert: {
      userid: userSub,
      name: "",
      isMonday: true,
      isTuesday: true,
      isWednesday: true,
      isThursday: true,
      isFriday: true,
      isSaturday: true,
      isSunday: true,
      startTime: "12:00 AM",
      endTime: event.startTime,
    },
  };

  const result0 = await events.findOneAndUpdate(query1, mutation, {
    upsert: true,
    returnOriginal: false,
  });

  const mutation1 = {
    $setOnInsert: {
      userid: userSub,
      name: "",
      isMonday: true,
      isTuesday: true,
      isWednesday: true,
      isThursday: true,
      isFriday: true,
      isSaturday: true,
      isSunday: true,
      startTime: event.endTime,
      endTime: "11:55 PM",
    },
  };

  const result1 = await events.findOneAndUpdate(query1, mutation1, {
    upsert: true,
    returnOriginal: false,
  });
  return result0.value && result1.value; // what are these functions returning?
}

async function performAction(req, user) {
  const { eventId } = req.query;

  switch (req.method) {
    case "DELETE":
      return deleteEvent(eventId);
    case "GET":
      return getEvents(eventId);
    case "POST":
      return editEvents(req.body, eventId);
  }

  throw { status: 405 };
}

export default authenticatedAction(performAction);
