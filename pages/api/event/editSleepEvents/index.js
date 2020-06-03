import { authenticatedAction } from "../../../../utils/api";
import { initDatabase } from "../../../../utils/mongodb";
import validate from "validate.js";
import convertTime from "../../../../utils/convertTime";
import numToTime from "../../../../utils/numToTime";

async function editSleepEvents(event, userSub) {
  const client = await initDatabase();
  const events = client.collection("events");

  //Remove Sleep Event
  const query = {
    name: "",
    userid: userSub,
  };

  const result = await events.deleteMany(query);

  // Create Sleep Event

  // IMPLEMENT THIS NEXT (TIMES ARE IN STR FORMAT TO BEGIN WITH)
  const query1 = { name: "always insert event" };
  if (numToTime(event.startTime) < numToTime(event.endTime)) {
    // Sleep Event is on one day
    const altMutation = {
      $setOnInsert: {
        userid: userSub,
        name: "",
        isMonday: true,
        isTuesday: true,
        isWednesday: true,
        isThursday: true,
        isFriday: true,
        isSaturday: true,
        isSunday: true,
        startTime: event.startTime,
        endTime: event.endTime,
      },
    };
    const altResult = await events.findOneAndUpdate(query1, altMutation, {
      upsert: true,
      returnOriginal: false,
    });
    return altResult.value;
  } else {
    // Sleep Event crosses over into the next day (must be entered as 2 events)
    const mutation = {
      $setOnInsert: {
        userid: userSub,
        name: "",
        isMonday: true,
        isTuesday: true,
        isWednesday: true,
        isThursday: true,
        isFriday: true,
        isSaturday: true,
        isSunday: true,
        startTime: event.startTime,
        endTime: "11:59 PM",
      },
    };

    const result0 = await events.findOneAndUpdate(query1, mutation, {
      upsert: true,
      returnOriginal: false,
    });

    const mutation1 = {
      $setOnInsert: {
        userid: userSub,
        name: "",
        isMonday: true,
        isTuesday: true,
        isWednesday: true,
        isThursday: true,
        isFriday: true,
        isSaturday: true,
        isSunday: true,
        startTime: "12:00 AM",
        endTime: event.endTime,
      },
    };

    const result1 = await events.findOneAndUpdate(query1, mutation1, {
      upsert: true,
      returnOriginal: false,
    });
    return result0.value && result1.value; // what are these functions returning?
  }
}

async function performAction(req, user) {
  switch (req.method) {
    case "POST":
      return editSleepEvents(req.body, user.sub);
  }
  throw { status: 405 };
}

export default authenticatedAction(performAction);
