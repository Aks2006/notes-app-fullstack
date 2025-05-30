const express = require('express');
const router = express.Router();
const Note = require('../models/Note'); // Assuming Note model exists

// 🟢 Create Note
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ error: 'Note create failed', details: err });
  }
});

// 🟢 Get All Notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  } 
});

router.put('/:id',async(req, res) =>{
    const {title, content} = req.body;

    try{
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {title, content},
            {new: true} //return the updated document
        );
        if (!updatedNote) {
            return res.status(404).json({message: "Note not found"});
        }

        res.json(updatedNote);}
            catch (error){
                res.status(500).json({message: "Server error"});
            }
        });

        // Delete a note:
        router.delete('/:id', async (req,res)=>{
            try{
                const deletedNote = await Note.findByIdAndDelete(req.params.id);
                if (!deletedNote){
                    return res.status(404).json({message:"Note not found"});
                }
                res.json({message: "Note deleted successfully"});
            }
            catch (error){
                res.status(500).json({message:'Server Error'});
            }
        })
module.exports = router;
