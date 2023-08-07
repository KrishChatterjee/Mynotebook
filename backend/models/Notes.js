const mongoose=require("mongoose")
const { Schema } = mongoose;


const NotesSchema = new Schema({
  //user is just like a forign key storing the id of the user which connect with user model,tells the notes are of which user
  user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
  title: { type: String, required: true },
  description: { type: String, required: true},
  tag: { type: String,default: "general" },
  date: { type: Date, default: Date.now },

});
module.exports=mongoose.model('notes', NotesSchema);