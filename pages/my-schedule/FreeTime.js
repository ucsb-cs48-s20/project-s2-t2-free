import useSWR from "swr";

// converts time hh:mm AM/PM to minute of the day
function convertTime(str) {
  var min = 0;
  var morn = 0; // 0 if morning, 1 if afternoon
  if (str.charAt(str.length - 2) == "P") {
    morn = 1;
  }
  str = str.slice(0, -3);
  var str_split = str.split(":");

  if (str_split[0] == 12) {
    str_split[0] = 0;
  }

  min = +str_split[0] * 60 + +str_split[1];

  if (morn == 1) {
    min = min + 720;
  }
  return min;
}

// dictionary of busy times with format 'min_of_day':'true/false'
function makeBusy() {
  let busy = {};
  for (let i = 0; i < 1436; i = i + 5) {
    busy[i] = true;
  }
  return busy;
}

// populates busy with events
function convertEvent(events) {
  var busy = makeBusy();
  var len = events.length;
  for (let i = 0; i < len; i++) {
    var start_time = convertTime(events[i][0]);
    var end_time = convertTime(events[i][1]);

    for (let j = start_time; j <= end_time; j = j + 5) {
      busy[j] = false;
    }
  }
  return busy;
}

// converts busy_times to free_times
function makeFree(busy_times) {
  var free_times = [];
  for (let i = 0; i < 1436; i++) {
    if (busy_times[i] == true) {
      free_times.push(i);
    }
  }
  return free_times;
}

// create dictionary with format 'min of day':'time as string'
function numToTime(num) {
  let str = "";
  if (Math.floor(num / 12) % 12 === 0) {
    str += "12";
  } else {
    str += Math.floor(num / 12) % 12;
  }
  str += ":";
  if ((num % 12) * 5 <= 5) {
    str += "0";
  }
  str += (num % 12) * 5;
  if (num >= 144) {
    str += " PM";
  } else {
    str += " AM";
  }
  return str;
}

function makeTimesDict() {
  let times_str = {};
  let iterate = 0;
  for (let i = 0; i < 288; i++) {
    times_str[iterate] = numToTime(i);
    iterate = iterate + 5;
  }
  return times_str;
}

function freeIntervals(free_times) {
  var free_intervals = [];
  var start = free_times[0];
  free_intervals.push(start);
  var i = 1;
  while (i < free_times.length) {
    while (i < free_times.length && free_times[i] == free_times[i - 1] + 5) {
      i++;
    }
    free_intervals.push(free_times[i - 1]);
    if (i < free_times.length) {
      free_intervals.push(free_times[i]);
    }
    i++;
  }
  return free_intervals;
}

// converts free_times from min to string time format
function freeTime(event_logs) {
  var busy = convertEvent(event_logs);
  var free_times = makeFree(busy);
  var free_intervals = freeIntervals(free_times);
  var times_str = makeTimesDict();

  var free_times_str = [];
  for (let i = 0; i < free_intervals.length; i = i + 2) {
    free_times_str.push([
      times_str[free_intervals[i]],
      times_str[free_intervals[i + 1]],
    ]);
  }
  return free_times_str;
}

/* TEST DATA
var event_1 = ["5:00 PM", "6:15 PM"];
var event_2 = ["2:00 AM", "2:30 PM"];
var event_3 = ["10:00 PM", "11:55 PM"];

var event_log = [event_1, event_2, event_3];

free_time_str = freeTime(event_log);

console.log(free_time_str); */

function findFreeTime(data) {
  // create dictionary with format 'day of week':'list of free time intervals'
  var free_time_byDay = {};

  var sun = [];
  var mon = [];
  var tues = [];
  var wed = [];
  var thurs = [];
  var fri = [];
  var sat = [];

  if (typeof data === "object") {
    for (let i = 0; i < data.length; i++) {
      if (data[i].isSunday) {
        sun.push([data[i].startTime, data[i].endTime]);
      } else if (data[i].isMonday) {
        mon.push([data[i].startTime, data[i].endTime]);
      } else if (data[i].isTuesday) {
        tues.push([data[i].startTime, data[i].endTime]);
      } else if (data[i].isWednesday) {
        wed.push([data[i].startTime, data[i].endTime]);
      } else if (data[i].isThursday) {
        thurs.push([data[i].startTime, data[i].endTime]);
      } else if (data[i].isFriday) {
        fri.push([data[i].startTime, data[i].endTime]);
      } else if (data[i].isSaturday) {
        sat.push([data[i].startTime, data[i].endTime]);
      }
    }
  }

  // evaluate free times on each day and store in dict
  free_time_byDay["Sunday"] = freeTime(sun);
  free_time_byDay["Monday"] = freeTime(mon);
  free_time_byDay["Tuesday"] = freeTime(tues);
  free_time_byDay["Wednesday"] = freeTime(wed);
  free_time_byDay["Thursday"] = freeTime(thurs);
  free_time_byDay["Friday"] = freeTime(fri);
  free_time_byDay["Saturday"] = freeTime(sat);

  return free_time_byDay;
}

export default function FreeTime() {
  const { data } = useSWR("/api/event");
  var free_time_byDay = findFreeTime(data);
  return (
    <div>
      {Object.keys(free_time_byDay).map((key, index) => (
        <p>
          {" "}
          You are free on {key} from {free_time_byDay[key]}{" "}
        </p>
      ))}
    </div>
  );
}
