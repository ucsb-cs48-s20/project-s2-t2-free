export default function numToTime(num) {
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
