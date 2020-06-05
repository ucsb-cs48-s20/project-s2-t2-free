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
    _id: ObjectId(eventId),
  };
  return await events.find(query).toArray();
}

async function editEvents(event, eventId) {
  const client = await initDatabase();
  const events = client.collection("events");

  const query = { _id: ObjectId(eventId) };

  const mutation = {
    $set: {
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

  console.log(mutation);

  const result = await events.findOneAndUpdate(query, mutation, {
    returnOriginal: false,
  });

  return result.value;
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
