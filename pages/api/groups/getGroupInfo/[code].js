import { authenticatedAction } from "../../../../utils/api";
import { initDatabase } from "../../../../utils/mongodb";

export async function getGroupInfo(code) {
  const client = await initDatabase();
  const groups = client.collection("groups");
  const query = {
    code: code,
  };
  return groups.find(query).toArray();
}

async function performAction(req, user) {
  const { code } = req.query;

  switch (req.method) {
    case "GET":
      return getGroupInfo(code);
  }
  throw { status: 405 };
}

export default authenticatedAction(performAction);
