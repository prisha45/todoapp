const express = require("express");
const router = express.Router();

const Todo = require("../models/Todo");

// Create a new todo
router.post("/", async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
    });

    const savedTodo = await todo.save();

    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();

    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Update a todo
router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        completed: req.body.completed,
      },
      { new: true }
    );

    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Delete a todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Todo deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

module.exports = router;