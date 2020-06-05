import {
  convertTime,
  numToTime,
  makeBusy,
  convertEvent,
  makeFree,
  freeIntervals,
  freeTime,
} from "../utils/timeFuncs";

describe("utils/timeFuncs", () => {
  describe("convertTime", () => {
    it("converts time hh:mm AM/PM to minute of the day", () => {
      expect(convertTime("12:00 AM")).toBe(0);
    });
    it("converts time hh:mm AM/PM to minute of the day", () => {
      expect(convertTime("12:02 AM")).toBe(2);
    });
    it("converts time hh:mm AM/PM to minute of the day", () => {
      expect(convertTime("12:00 PM")).toBe(720);
    });
  });

  describe("numToTime", () => {
    it("converts minute of the day to time hh:mm AM/PM", () => {
      expect(numToTime(0)).toBe("12:00 AM");
    });
    it("converts minute of the day to time hh:mm AM/PM", () => {
      expect(numToTime(1)).toBe("12:01 AM");
    });
    it("converts minute of the day to time hh:mm AM/PM", () => {
      expect(numToTime(720)).toBe("12:00 PM");
    });
    it("converts minute of the day to time hh:mm AM/PM", () => {
      expect(numToTime(1439)).toBe("11:59 PM");
    });
  });

  describe("makeBusy", () => {
    it("dictionary of busy times with format string day:true/false", () => {
      expect(makeBusy()["12:00 AM"]).toBe(true);
    });
    it("dictionary of busy times with format string day:true/false", () => {
      expect(makeBusy()["12:00 PM"]).toBe(true);
    });
    it("dictionary of busy times with format string day:true/false", () => {
      expect(makeBusy()["13:00 PM"]).toBe(undefined);
    });
  });

  describe("convertEvent", () => {
    let event1 = [["11:00 AM", "12:00 PM"]];
    let busy1 = convertEvent(event1);
    it("populates busy with events", () => {
      expect(busy1["11:05 AM"]).toBe(false);
    });
    let event2 = [["12:00 AM", "11:00 AM"]];
    let busy2 = convertEvent(event2);
    it("populates busy with events", () => {
      expect(busy2["12:00 AM"]).toBe(false);
    });
    it("populates busy with events", () => {
      expect(busy2["11:00 AM"]).toBe(true);
    });
    let event3 = [
      ["11:00 AM", "12:00 PM"],
      ["11:55 AM", "12:05 PM"],
    ];
    let busy3 = convertEvent(event3);
    it("populates busy with events", () => {
      expect(busy3["11:55 AM"]).toBe(false);
    });
    it("populates busy with events", () => {
      expect(busy3["11:05 AM"]).toBe(false);
    });
  });

  describe("makeFree", () => {
    let event1 = [["11:00 AM", "12:00 PM"]];
    let busy1 = convertEvent(event1);
    let free1 = makeFree(busy1);
    it("converts busy_times to free_times as time strings", () => {
      expect(free1).toContain("11:00 AM");
    });
    it("converts busy_times to free_times as time strings", () => {
      expect(free1).not.toContain("11:10 AM");
    });
    it("converts busy_times to free_times as time strings", () => {
      expect(free1).toContain("12:10 AM");
    });
    let event2 = [
      ["11:00 AM", "12:00 PM"],
      ["11:55 AM", "12:05 PM"],
    ];
    let busy2 = convertEvent(event2);
    let free2 = makeFree(busy2);
    it("converts busy_times to free_times as time strings", () => {
      expect(free2).not.toContain("12:00 PM");
    });
    it("converts busy_times to free_times as time strings", () => {
      expect(free2).not.toContain("11:55 AM");
    });
    it("converts busy_times to free_times as time strings", () => {
      expect(free2).toContain("1:00 PM");
    });
  });

  describe("freeIntervals", () => {
    let event1 = [["11:00 AM", "12:00 PM"]];
    let busy1 = convertEvent(event1);
    let free1 = makeFree(busy1);
    let freeIntervals1 = freeIntervals(free1);
    it("converts free times as free intervals", () => {
      expect(freeIntervals1).toContain("12:00 AM");
    });
    it("converts free times as free intervals", () => {
      expect(freeIntervals1).toContain("11:00 AM");
    });
    it("converts free times as free intervals", () => {
      expect(freeIntervals1).toContain("12:00 PM");
    });
    let event2 = [
      ["11:00 AM", "12:00 PM"],
      ["11:55 AM", "12:05 PM"],
    ];
    let busy2 = convertEvent(event2);
    let free2 = makeFree(busy2);
    let freeIntervals2 = freeIntervals(free2);
    it("converts free times as free intervals", () => {
      expect(freeIntervals2).toContain("12:00 AM");
    });
    it("converts free times as free intervals", () => {
      expect(freeIntervals2).toContain("11:00 AM");
    });
    it("converts free times as free intervals", () => {
      expect(freeIntervals2).toContain("12:05 PM");
    });
    it("converts free times as free intervals", () => {
      expect(freeIntervals2).not.toContain("12:15 PM");
    });
    it("converts free times as free intervals", () => {
      expect(freeIntervals2).not.toContain("12:25 PM");
    });
  });
});
