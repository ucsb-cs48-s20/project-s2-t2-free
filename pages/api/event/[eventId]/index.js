import { ObjectId } from "mongodb";
import { authenticatedAction } from "../../../../utils/api";
import { initDatabase } from "../../../../utils/mongodb";

async function deleteEvent(eventId) {
  const client = await initDatabase();
  const events = client.collection("events");

  const query = {
    _id: ObjectId(eventId),
  };

  const result = await event.deleteOne(query);

  if (!result.deletedCount) {
    throw {
      status: 404,
      message: "Idea not found",
    };
  }
}

async function performAction(req, user) {
  const { eventId } = req.query;

  switch (req.method) {
    case "DELETE":
      return deleteEvent(eventId);
  }

  throw { status: 405 };
}

export default authenticatedAction(performAction);
