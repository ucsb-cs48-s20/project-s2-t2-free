import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";

var calendar = new Calendar(calendarEl, {
  plugins: [dayGridPlugin],
  defaultView: "dayGridWeek",
});

calendar.render();

export default function eventsCalendar() {
  return calendar;
}
