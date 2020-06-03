// converts time from number to string
export default function numToTime(num) {
  let str = "";
  if (Math.floor(num / 60) % 12 == 0) {
    str += "12";
  } else if (num > 720) {
    str += Math.floor((num - 720) / 60) % 60;
  } else {
    str += Math.floor(num / 60) % 60;
  }
  str += ":";
  if (num % 60 < 10) {
    str = str + "0" + (num % 60).toString();
  } else {
    str += (num % 60).toString();
  }

  // decide AM or PM
  if (num >= 720) {
    str += " PM";
  } else {
    str += " AM";
  }
  return str;
}
