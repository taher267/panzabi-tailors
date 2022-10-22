import mg from 'mongoose';

export default mg.model(
  'MeasurementTemplate',
  new mg.Schema({
    template_name: {
      type: String,
      required: [true, 'Template name is mandatory!'],
      unique: true,
      trim: true,
    },
    template_type: {
      type: String,
      required: [true, 'Template name is mandatory!'],
      trim: true,
    },
    template_status: {
      type: String,
      enum: ['ACTIVE', 'DEACTIVE'],
      default: 'ACTIVE',
    },

    template_items: [
      {
        _id: false,
        name: {
          type: String,
          required: [true, 'Template items is mandatory!'],
          trim: true,
        },
        label: {
          type: String,
          required: [true, 'Template items is mandatory!'],
          trim: true,
        },
        id: {
          type: mg.Types.ObjectId,
          ref: 'Measurement',
          required: [true, 'Template items is mandatory!'],
        },
        validation: mg.Schema.Types.Mixed,
      },
    ],
  })
);
