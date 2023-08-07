const mongoose=require("mongoose")
const { Schema } = mongoose;


const UserSchema = new Schema({
  name: {
    type: String,
    max: 32,
    required: true,
    min: 6,
  },

  email: {
    type: String,
    unique:true,
    required: true,
    max: 32,
  },
  password: {
    type: String,
    max: 1022,
    min: 5,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});
const User=mongoose.model('user', UserSchema);
module.exports=User