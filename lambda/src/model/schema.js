'use strict';

const Schema = require('validate');
 
module.exports.ReadingSchema = new Schema({
  location: {
    type: String,
    required: true,
    message: 'Reading location is required.'
  },
  timestamp: {
    type: Number,
    required: true,
    message: 'Reading timestamp is required.'
  },
  temperature: {
    celsius: {
      type: Number,
      required: true,
      message: 'Celsius reading is required.'
    },
    kelvin: {
      type: Number,
      required: true,
      message: 'Kelvin reading is required.'
    },
    fahrenheit: {
      type: Number,
      required: true,
      message: 'Fahrenheit reading is required.'
    }
  }
});
