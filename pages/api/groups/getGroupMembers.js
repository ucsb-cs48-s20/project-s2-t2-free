// import { authenticatedAction } from "../../../utils/api";
// import { initDatabase } from "../../../utils/mongodb";

// export async function findMembers(groupid) {
//   const client = await initDatabase();
//   const groups = client.collection("groups");
//   const users = client.collection("users");
//   let query = {
//     code : groupid
//   };
//   let membersList = await groups.find(query).toArray().members;
//   query = {
//     name: { $in: [membersList] },
//   };
//   return await users.find(query).toArray();
// }

// async function performAction(req, code) {
//   switch (req.method) {
//     case "GET":
//       return findMembers(code);
//   }
//   throw { status: 405 };
// }

// export default authenticatedAction(performAction);
