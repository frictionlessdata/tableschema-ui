// Module API

exports.IS_BROWSER = typeof window !== 'undefined'
exports.FIELD_TYPES_AND_FORMATS = {
  string: ['default', 'email', 'uri', 'binary', 'uuid'],
  number: ['default'],
  integer: ['default'],
  boolean: ['default'],
  object: ['default'],
  array: ['default'],
  date: ['default', 'custom', 'any'],
  time: ['default', 'custom', 'any'],
  datetime: ['default', 'custom', 'any'],
  year: ['default'],
  yearmonth: ['default'],
  duration: ['default'],
  geopoint: ['default', 'array', 'object'],
  geojson: ['default', 'topojson'],
  any: ['default'],
}
