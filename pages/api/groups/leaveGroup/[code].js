import { authenticatedAction } from "../../../../utils/api";
import { initDatabase } from "../../../../utils/mongodb";

export async function leaveGroup(code, userSub) {
  const client = await initDatabase();
  const groups = client.collection("groups");

  let membersArray = (await groups.find({ code: code }).toArray())[0].members;

  const index = membersArray.indexOf(userSub);
  if (index > -1) {
    membersArray.splice(index, 1);
  }

  const query = { code: code };
  const mutation = {
    $set: {
      members: membersArray,
    },
  };

  const result = await groups.findOneAndUpdate(query, mutation, {
    upsert: true,
    returnOriginal: false,
  });

  return result.value;
}

async function performAction(req, user) {
  const { code } = req.query;

  switch (req.method) {
    case "DELETE":
      return leaveGroup(code, user.sub);
  }

  throw { status: 405 };
}

export default authenticatedAction(performAction);
