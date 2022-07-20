const mongoose = require('mongoose')
const { Schema, SchemaTypes } = mongoose


const groupSchema = new Schema({
  name: {
    type: String,
    required: [true, 'group name is required'],
	unique: true
  },
   contacts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "contact",
	  unique: true
   }]
})

groupSchema.index({contacts: 1}, {unique: true, dropDups: true});

const Group = mongoose.model('group', groupSchema)

module.exports = Group