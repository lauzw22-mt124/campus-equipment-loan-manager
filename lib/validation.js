const mongoose = require('mongoose');
const { fail } = require('./errors');
function text(value, label, { required = true, max = 120 } = {}) {
  if (value === undefined || value === null) value = '';
  if (typeof value !== 'string')
    fail(400, 'INVALID_INPUT', `${label} has an invalid format.`);
  value = value.trim();
  if ((required && !value) || value.length > max)
    fail(
      400,
      'INVALID_INPUT',
      `${label} is required when applicable and must not exceed ${max} characters.`,
    );
  return value;
}
function id(value) {
  if (
    typeof value !== 'string' ||
    !/^[a-f0-9]{24}$/i.test(value) ||
    !mongoose.isValidObjectId(value)
  )
    fail(400, 'INVALID_ID', 'Invalid record ID.');
  return value;
}
function choice(value, choices, label) {
  value = text(value, label);
  if (!choices.includes(value))
    fail(400, 'INVALID_INPUT', `${label} is not an allowed value.`);
  return value;
}
function allowed(data, keys) {
  if (!data || typeof data !== 'object' || Array.isArray(data))
    fail(400, 'INVALID_INPUT', 'Invalid request body.');
  for (const key of Object.keys(data))
    if (!keys.includes(key))
      fail(400, 'UNKNOWN_FIELD', `Field is not writable: ${key}`);
}
function literal(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function filters(query, keys) {
  for (const key of Object.keys(query))
    if (!keys.includes(key))
      fail(400, 'INVALID_QUERY', `Unsupported query parameter: ${key}`);
}
module.exports = { text, id, choice, allowed, literal, filters };
