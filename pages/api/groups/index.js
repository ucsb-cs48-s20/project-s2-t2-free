import validate from "validate.js";
import { authenticatedAction } from "../../../utils/api";
import { initDatabase } from "../../../utils/mongodb";

// export async function getGroup(group) {
//   const client = await initDatabase();
//   const groups = client.collection("groups");
//   const query = {
//     groupid: group,
//   };
//   return groups.find(query).toArray();
// }

const eventConstraints = {
  name: {
    presence: true,
  },
};

export async function createGroup(req) {
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

  console.log("inserting into events:", group);

  const client = await initDatabase();
  const groups = client.collection("groups");

  const query = { groupid: 100 };
  const mutation = {
    $setOnInsert: {
      groupname: group.name,
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
      return createGroup(req);
  }

  throw { status: 405 };
}

export default authenticatedAction(performAction);
