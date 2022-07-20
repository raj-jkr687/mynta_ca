const mongoose = require('mongoose')
const { Schema, SchemaTypes } = mongoose


const contactSchema = new Schema({
  first_name: {
    type: String,
    required: [true, 'first name is required'],
	unique: true
  },
   last_name: {
    type: String,
    required: [true, 'Last name is required'],
  },
   address: {
    type: String,
    required: [true, 'address is required'],
  },
   home_tel: {
    type: String,
    required: [true, 'home tel is required'],
  },
  mobile: {
    type: String,
  },
  work_ph: {
    type: String
  }

})

contactSchema.index({first_name: 1}, {unique: true, dropDups: true});

const Contact = mongoose.model('contact', contactSchema)

module.exports = Contact