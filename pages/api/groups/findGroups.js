import { authenticatedAction } from "../../../utils/api";
import { initDatabase } from "../../../utils/mongodb";

export async function findGroups(userSub) {
  const client = await initDatabase();
  const groups = client.collection("groups");
  const query = {
    array: { $all: [userSub] },
  };
  return groups.find(query).toArray();
}

async function performAction(req, user) {
  switch (req.method) {
    case "GET":
      return findGroups(user.sub);
  }
  throw { status: 405 };
}

export default authenticatedAction(performAction);
