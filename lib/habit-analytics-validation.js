const MAX_FILE_BYTES = 2 * 1024 * 1024;
const MAX_EVENTS = 10_000;
const MAX_JOURNALS = 5_000;
const MAX_ACTION_LENGTH = 200;
const MAX_CONTEXT_LENGTH = 5_000;
const MAX_TAGS = 30;
const MAX_TAG_LENGTH = 80;

const isRecord = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const isString = (value, maxLength) =>
  typeof value === "string" && value.length <= maxLength;

const isIsoDate = (value) =>
  typeof value === "string" &&
  Number.isFinite(Date.parse(value)) &&
  /^\d{4}-\d{2}-\d{2}T/.test(value);

export const MAX_BACKUP_BYTES = MAX_FILE_BYTES;

/**
 * Validate and normalize an imported Habit Analytics backup.
 * Throws a descriptive error rather than accepting partially valid records.
 */
export function validateBackup(value) {
  if (!isRecord(value) || value.version !== 1 ||
      !Array.isArray(value.events) || !Array.isArray(value.journals)) {
    throw new Error("This file is not a supported Habit Analytics backup.");
  }

  if (value.events.length > MAX_EVENTS || value.journals.length > MAX_JOURNALS) {
    throw new Error("This backup contains too many records.");
  }

  const ids = new Set();
  const events = value.events.map((event) => {
    if (!isRecord(event) ||
        !isString(event.id, 100) || event.id.length === 0 ||
        ids.has(event.id) ||
        !isString(event.action, MAX_ACTION_LENGTH) || !event.action.trim() ||
        !isIsoDate(event.start) || !isIsoDate(event.end) ||
        Date.parse(event.end) <= Date.parse(event.start) ||
        !Array.isArray(event.tags) || event.tags.length > MAX_TAGS ||
        !event.tags.every((tag) => isString(tag, MAX_TAG_LENGTH)) ||
        !isString(event.context, MAX_CONTEXT_LENGTH) ||
        !isIsoDate(event.createdAt) || !isIsoDate(event.updatedAt)) {
      throw new Error("The backup contains an invalid action record.");
    }
    ids.add(event.id);
    return {
      id: event.id,
      action: event.action,
      start: event.start,
      end: event.end,
      tags: [...new Set(event.tags.map((tag) => tag.trim()).filter(Boolean))],
      context: event.context,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };
  });

  const journalDates = new Set();
  const journals = value.journals.map((journal) => {
    if (!isRecord(journal) ||
        typeof journal.date !== "string" ||
        !/^\d{4}-\d{2}-\d{2}$/.test(journal.date) ||
        !Number.isFinite(Date.parse(journal.date + "T00:00:00Z")) ||
        !isString(journal.text, 20_000) ||
        !isIsoDate(journal.updatedAt) ||
        journalDates.has(journal.date)) {
      throw new Error("The backup contains an invalid journal record.");
    }
    journalDates.add(journal.date);
    return { date: journal.date, text: journal.text, updatedAt: journal.updatedAt };
  });

  return { version: 1, events, journals };
}
