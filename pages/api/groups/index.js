import { authenticatedAction } from "../../../utils/api";
import { initDatabase } from "../../../utils/mongodb";

export async function getGroup(group) {
  const client = await initDatabase();
  const groups = client.collection("groups");
  const query = {
    groupid: group,
  };
  return groups.find(query).toArray();
}

export async function createGroup(user, group, groupname) {
  const client = await initDatabase();
  const groups = client.collection("groups");

  const query = { groupid: group };
  const mutation = {
    $setOnInsert: {
      groupid: group,
      groupname: groupname,
      $push: { groupusers: user.sub },
    },
  };

  const result = await groups.findOneAndUpdate(query, mutation, {
    upsert: true,
    returnOriginal: false,
  });

  return result.value;
}

async function performAction(req, user, group, groupname) {
  switch (req.method) {
    case "GET":
      return getGroup(group);
    case "POST":
      return createGroup(user, group, groupname);
  }

  throw { status: 405 };
}

export default authenticatedAction(performAction);
