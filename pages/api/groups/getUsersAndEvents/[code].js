import { authenticatedAction } from "../../../../utils/api";
import { getGroupInfo } from "../getGroupInfo/[code]";
import { getEvents } from "../../event/index";

export async function getUsersAndEvents(code) {
  let groupData = await getGroupInfo(code);

  let usersAndEvents = Promise.all(
    groupData[0].members.map(async (id) => {
      let json = {};
      json.id = id;
      json.events = await getEvents(id);
      return json;
    })
  );

  return usersAndEvents;
}

async function performAction(req, user) {
  const { code } = req.query;

  switch (req.method) {
    case "GET":
      return getUsersAndEvents(code);
  }
  throw { status: 405 };
}

export default authenticatedAction(performAction);
