import { authenticatedAction } from "../../../../utils/api";
import { initDatabase } from "../../../../utils/mongodb";

export async function joinGroup(code, userSub) {
  const client = await initDatabase();
  const groups = client.collection("groups");

  let membersArray = (await groups.find({ code: code }).toArray())[0].members;

  if (membersArray.indexOf(userSub) === -1) {
    membersArray[membersArray.length] = userSub;
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
    case "POST":
      return joinGroup(code, user.sub);
  }

  throw { status: 405 };
}

export default authenticatedAction(performAction);
