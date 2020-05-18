import validate from "validate.js";
import { authenticatedAction } from "../../../utils/api";
import { initDatabase } from "../../../utils/mongodb";

export async function addUser(groupCode, userSub) {
  const client = await initDatabase();
  const groups = client.collection("groups");

  let userArray = (await groups.find({ code: groupCode }).toArray())[0].array;
  let user = false;
  for (let i = 0; i < userArray.length; i++) {
    if (userArray[i] === userSub) {
      user = true;
    }
  }
  if (user === false) {
    userArray[userArray.length] = userSub;
  }

  console.log(userArray);
  const query = { code: groupCode };
  const mutation = {
    $set: {
      array: userArray,
    },
  };

  const result = await groups.findOneAndUpdate(query, mutation, {
    upsert: true,
    returnOriginal: false,
  });

  return result.value;
}

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
      array: [userSub],
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
    case "GET":
      return getGroup(user);
    case "POST":
      return createGroup(req, user.sub);
  }

  throw { status: 405 };
}

export default authenticatedAction(performAction);
