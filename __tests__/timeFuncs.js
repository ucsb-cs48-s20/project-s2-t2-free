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
});
