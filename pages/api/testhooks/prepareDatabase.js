import { initDatabase } from "../../../utils/mongodb";

export async function performPrepareDatabase() {
  const client = await initDatabase();

  const users = client.collection("users");
  const events = client.collection("events");

  const result = {};
  result.removeUsers = await users.deleteMany({}); // removes all users
  result.removeEvents = await events.deleteMany({}); // removes all events

  console.log("Database has been reset for cypress tests");
  return result;
}

export default async function prepareDatabase(req, res) {
  if (!process.env.USE_TEST_AUTH) {
    res.statusCode = 400;
    res.end(
      JSON.stringify({
        message: "This endpoint only valid when running cypress tests",
      })
    );
    return;
  }
  switch (req.method) {
    case "POST":
      const result = await performPrepareDatabase();
      res.statusCode = 200;
      res.end(JSON.stringify(result));
      return;
  }

  throw { status: 405 };
}
