const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validate = require('mongoose-validator');
const { Country, State, City } = require('country-state-city');

// Custom validator for date of birth (DOB) - must be older than 14 years
const dobValidator = [
  validate({
    validator: (value) => {
      const currentDate = new Date();
      const dob = new Date(value);
      const diffInYears = (currentDate - dob) / (1000 * 60 * 60 * 24 * 365);
      return diffInYears >= 14;
    },
    message: 'Date of birth must be older than 14 years.',
  }),
];

const formDataSchema = new Schema({
  first: {
    type: String,
    required: true,
    validate: [
      validate({
        validator: 'isAlpha',
        message: 'First Name must contain only alphabets.',
      }),
    ],
  },
  last: {
    type: String,
    required: true,
    validate: [
      validate({
        validator: 'isAlpha',
        message: 'Last Name must contain only alphabets.',
      }),
    ],
  },
  email: {
    type: String,
    required: true,
    validate: [
      validate({
        validator: 'isEmail',
        message: 'Invalid email format.',
      }),
    ],
  },
  country: {
    type: String,
    required: true,
    validate: [
      {
        validator: (value) => {
          const countries = Country.getAllCountries();
          return countries.some((country) => country.isoCode === value);
        },
        message: 'Invalid country selected.',
      },
    ],
  },
  state: {
    type: String,
    required: true,
    validate: [
      {
        validator: function (value) {
          const states = State.getStatesOfCountry(this.country);
          return states.some((state) => state.isoCode === value);
        },
        message: 'Invalid state selected.',
      },
    ],
  },
  city: {
    type: String,
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female'],
  },
  dob: {
    type: Date,
    required: true,
    validate: dobValidator,
  },
});

const FormDataModel = mongoose.model('FormData', formDataSchema);

module.exports = FormDataModel;