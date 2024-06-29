const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//Route1: get all the notes using: get "/api/auth/getuser". Login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({user: req.user.id});
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server  error occured");
  }
});

//Route2: Add a new note using: post "/api/auth/addnote". Login required

router.post('/addnote',fetchuser,[
    body("title", "enter a vaild title").isLength({ min: 3 }),
    body("description", "Description must be aleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const {title, description, tag} = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id
      })
      const savedNote = await note.save();

      res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server  error occured");
    }
  }
);
//Route3: update an existing note using: post "/api/auth/updatenote". Login required
router.put('/updatenote/:id',fetchuser,async (req, res) => {
  const {title,description,tag} = req.body;
  try {
    
  // create a newNote object
  const newNote = {};
  if(title){newNote.title = title};
  if(description){newNote.description = description};
  if(tag){newNote.tag = tag};

  // find the note to be updated and update it
  let note = await Note.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")}
  if(note.user.toString() !== req.user.id){
    return res.status(401).json("Not Allowed");
  }
  note =  await Note.findByIdAndUpdate(req.params.id, {$set: newNote},{new:true})
  res.json({note});
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server  error occured");
}

})
//Route4: delete an existing note using: Delete "/api/note/deletenote". Login required
router.delete('/deletenote/:id',fetchuser,async (req, res) => {
  try {
  // find the note to be updated and update it
  let note = await Note.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")}
  // Allow deletion only if user owns this Note
  if(note.user.toString() !== req.user.id){
    return res.status(401).json("Not Allowed");
  }
  note =  await Note.findByIdAndDelete(req.params.id)
  res.json({"success":"note has been deleted",note:note});
      
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server  error occured");
}

})


module.exports = router;
