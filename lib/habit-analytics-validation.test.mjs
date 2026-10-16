import test from "node:test";
import assert from "node:assert/strict";
import { validateBackup, MAX_BACKUP_BYTES } from "./habit-analytics-validation.js";

const timestamp = "2026-10-16T12:00:00.000Z";
const valid = () => ({
  version: 1,
  events: [{
    id: "event-1", action: "Read", start: "2026-10-16T11:00:00.000Z",
    end: timestamp, tags: ["study"], context: "Morning session",
    createdAt: timestamp, updatedAt: timestamp,
  }],
  journals: [{ date: "2026-10-16", text: "Notes", updatedAt: timestamp }],
});

test("accepts and normalizes a valid backup", () => {
  const result = validateBackup(valid());
  assert.equal(result.version, 1);
  assert.equal(result.events.length, 1);
  assert.deepEqual(result.events[0].tags, ["study"]);
  assert.equal(result.journals[0].date, "2026-10-16");
});

test("rejects an unsupported version or missing arrays", () => {
  assert.throws(() => validateBackup({ version: 2, events: [], journals: [] }));
  assert.throws(() => validateBackup({ version: 1, events: [] }));
});

test("rejects duplicate event identifiers", () => {
  const data = valid();
  data.events.push({ ...data.events[0] });
  assert.throws(() => validateBackup(data), /invalid action/i);
});

test("rejects invalid time ranges and oversized text", () => {
  const data = valid();
  data.events[0].end = data.events[0].start;
  assert.throws(() => validateBackup(data));
  const tooLong = valid();
  tooLong.events[0].context = "x".repeat(5001);
  assert.throws(() => validateBackup(tooLong));
});

test("rejects malformed journal records and excessive record counts", () => {
  const badJournal = valid();
  badJournal.journals[0].date = "not-a-date";
  assert.throws(() => validateBackup(badJournal));
  assert.throws(() => validateBackup({
    version: 1, events: Array(10_001).fill({}), journals: [],
  }), /too many/i);
});

test("exports a maximum accepted import size for the UI to enforce", () => {
  assert.equal(MAX_BACKUP_BYTES, 2 * 1024 * 1024);
});
