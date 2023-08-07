const express=require('express');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const Note = require("../models/Notes");
const fetchuser=require('../middleware/fetchuser');



//ROUTE 1:fetching all notes of a user using : GET "/api/notes/fetchallnotes, login require " 
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try {
    //get all notes of the user id from middleware response object
    const notes=await Note.find({user:req.user.id})
    res.json(notes)
}  catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error occured");
}

})

//ROUTE 2:Adding a new note of a user using  : POST "/api/notes/addnote, login require " 
router.post('/addnote',fetchuser, [
    body('title', 'Title is too short ').isLength({ min: 3 }),
    body('description', 'Description is too short must be atleast 5 characters').isLength({ min: 5 }),],async(req,res)=>{
        try {
        const errors = validationResult(req);

        // if there are errors from validation,return bad request and array of errors which dosent match the validation
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        //taking the title decription and tag by destructuring from response body
        const {title,description,tag}=req.body
        //save the note with the user id od the user
        let note =new Note({title,description,tag,user:req.user.id})
        const savedNote=await note.save();
        res.json(savedNote)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error occured");
    }
})

//ROUTE 3:Updating  a existing note of a user using  : PUT "/api/notes/updatenote/:id, login require " 
router.put('/updatenote/:id',fetchuser,async(req,res)=>{

    //taking the title decription and tag by destructuring from response body
    const {title,description,tag}=req.body
        try {
    //creating a new note object
    let newNote={}
    if(title){newNote.title=title}
    if(description){newNote.description=description} 
    if(tag){newNote.tag=tag}
    
    //finding the note of id  from req.params.id which is sent 
    let note =await Note.findById(req.params.id)
    // if note dosent exist then send not found
    if(!note){
        return res.status(404).send("Not Found")
    }
    //check wether the user of the note is same of the user of the request 
    if(note.user.toString()!== req.user.id){
        return res.status(401).send("Not Allowed")
    }
    //if not the find and update the note with the newNote
    note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note})


    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error occured");
    }
})


//ROUTE 4:Deleting a note of a user using  : DELETE "/api/notes/deletenote/:id, login require " 

router.delete('/deletenote/:id',fetchuser,async(req,res)=>{

        try {
    
    //finding the note of id  from req.params.id which is sent 
    let note =await Note.findById(req.params.id)
    // if note dosent exist then send not found
    if(!note){
        return res.status(404).send("Not Found")
    }
    if(note.user.toString()!== req.user.id){
        return res.status(401).send("Not Allowed")
    }
    note=await Note.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted",note:note})


    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error occured");
    }
})


module.exports=router