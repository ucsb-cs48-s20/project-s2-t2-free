import { authenticatedAction } from "../../../utils/api";
import { initDatabase } from "../../../utils/mongodb";

export async function createUser(user) {
  const client = await initDatabase();
  const events = client.collection("users");

  const query = { _id: user.sub };
  const mutation = {
    $setOnInsert: {
      _id: user.sub,
      name: user.given_name + " " + user.family_name,
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
    case "POST":
      return createUser(user);
  }

  throw { status: 405 };
}

export default authenticatedAction(performAction);
