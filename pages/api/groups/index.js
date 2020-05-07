import { authenticatedAction } from "../../../utils/api";
import { initDatabase } from "../../../utils/mongodb";

export async function getGroupEvents() {
  const client = await initDatabase();
  const events = client.collection("events");
  return events.find({}).toArray();
}

async function performAction(req, user) {
  switch (req.method) {
    case "GET":
      return getGroupEvents();
  }

  throw { status: 405 };
}

export default authenticatedAction(performAction);
