export const Measurement = `
type Measurement {
    _id: ID!
    sl_id: String!
    name: String!
    icon: Icon
  }`;
export const example = ``;
export const InputMeasurement = `
input InputMeasurement {
  sl_id: String!
  name: String!
  icon: InpIcon
}`;

export const MeasurementQueries = `
allMeasurements(key: String, value: String): [Measurement!]!
getMeasurement(key: String!, value: String!): Measurement!`;

export const MeasurementMutations = `
createMeasurement(measures: InputMeasurement): Measurement
updateMeasurement(id: String!, update: InputMeasurement): Measurement
deleteMeasurement(id: ID!): Boolean`;
