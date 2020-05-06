import { authenticatedAction } from "../../../utils/api";
import { initDatabase } from "../../../utils/mongodb";

export async function createUser(user) {
  const client = await initDatabase();
  const events = client.collection("users");

  const query = { userid: user.sub };
  const mutation = {
    $setOnInsert: {
      fname: user.given_name,
      lname: user.family_name,
      userid: user.sub,
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
