const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
  airport: {
      type: String,
      enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
  },
  arrival: Date
});

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United'],
    }, 
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: 'Den'
    },  
    flightNo: {
        type: Number,
        min: 10,
        max: 9999,  
        required: true
    }, 
    departs: {
        type: Date,
        default: function () {
            let today = new Date();
            let nextYear = new Date().getFullYear() + 1;
            today.setFullYear(nextYear);
            return today;
        }
    }, 
    destinations: [destinationSchema] 
  });

  

  
  module.exports = mongoose.model('Flight', flightSchema);