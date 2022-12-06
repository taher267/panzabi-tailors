export const Measurement = `
type Measurement {
    _id: ID!
    label: String!
    name: String!
    type:String
    sl_id: String!
    template: String!
    status: String!
    options: String
    params: String
    validation:String
    placeholder:String
    icon: Icon
  }`;
export const InputMeasurement = `
input InputMeasurement {
  label: String!
  name: String!
  sl_id: String!
  type:String
  template: String!
  status: String!
  validation:String
  placeholder:String
  options: String
  params: String
  icon: InpIcon
}`;

export const MeasurementQueries = `
allMeasurements(key: String, value: String, options:String): [Measurement!]!
getMeasurement(key: String!, value: String!): Measurement!`;

export const MeasurementMutations = `
createMeasurement(measures: InputMeasurement!): Measurement!
updateMeasurement(id: String!, update: InputMeasurement): Measurement
deleteMeasurement(id: ID!): Boolean`;
