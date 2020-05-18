import validate from "validate.js";
import { authenticatedAction } from "../../../utils/api";
import { initDatabase } from "../../../utils/mongodb";

const eventConstraints = {
  name: {
    presence: true,
  },
};

export async function createGroup(req, userSub) {
  let group;

  try {
    group = await validate.async(req.body, eventConstraints, {
      cleanAttributes: true,
      format: "flat",
    });
  } catch (err) {
    throw {
      status: 400,
      message: err.join(", "),
    };
  }

  const client = await initDatabase();
  const groups = client.collection("groups");

  // generating code
  group.code = Math.random().toString(36).substring(2, 8);
  let codeArray = [];
  while (codeArray.length !== 0) {
    codeArray = await groups.find({ code: group.code }).toArray();
    group.code = Math.random().toString(36).substring(2, 8);
    console.log("collision! generating new group code...");
  }

  console.log("inserting into groups:", group);

  const query = { code: 100 };
  const mutation = {
    $setOnInsert: {
      name: group.name,
      code: group.code,
      members: [userSub],
    },
  };

  const result = await groups.findOneAndUpdate(query, mutation, {
    upsert: true,
    returnOriginal: false,
  });

  return result.value;
}

async function performAction(req, user) {
  switch (req.method) {
    case "POST":
      return createGroup(req, user.sub);
  }

  throw { status: 405 };
}

export default authenticatedAction(performAction);
