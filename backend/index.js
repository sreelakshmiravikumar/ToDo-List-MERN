// server.js or index.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Todo } from "./models/todo.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Load environment variables
dotenv.config();

// MongoDB connection
const URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8080;

mongoose.connect(URL)
.then(() => {
  console.log("✅ MongoDB connected");
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
});

// API to add a to-do item
app.post('/addToDo', async (req, res) => {
  console.log("Request body:", req.body);
  const { todolist } = req.body;

  if (!todolist || todolist.trim() === "") {
    return res.status(400).json({ message: 'To-do cannot be empty' });
  }

  try {
    const newTodo = new Todo({ todo: todolist });
    await newTodo.save();
    console.log("✅ Saved to DB:", newTodo);
    res.status(200).json({ message: 'Successfully Added' });
  } catch (error) {
    console.error("❌ Error saving to DB:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// API to get all to-do items
app.get('/getalltodos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    console.error("❌ Error fetching todos:", error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.delete('/deleteTodo/:id', async (req, res) => {
  const id = req.params.id;
  console.log("Delete request received for ID:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const result = await Todo.findByIdAndDelete(id);
    console.log("Delete result:", result);

    if (result) {
      res.status(200).json({ message: 'Deleted successfully' });
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/updatetodo/:id',async (req,res) => {
  try{

    const {id}=req.params
    const result=await Todo.findById(id)
    if(!result){
        res.status(404).json({ message: 'Data not found' });
    }
    result.completed=true
    await result.save()
    res.status(200).json({message:'Data saved'})
  }
catch(err){
  console.log(err)
  res.status(500).json({ message: 'Server error' })
}
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
