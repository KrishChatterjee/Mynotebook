const mongoose=require("mongoose")

mongoURI='mongodb://127.0.0.1:27017/myNotebook'

const connectToMongo=()=>{
mongoose.connect(mongoURI,{ useNewUrlParser: true, 
    useUnifiedTopology: true}).then(()=>console.log("connected successfully"))
}

module.exports=connectToMongo

