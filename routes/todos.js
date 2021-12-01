const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const { json } = require("express");

// @route GET /todos
// @desc get all todos
// @access Private

router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ date: -1 });
    res.json({ todos });
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
});

// @route GET /todos/:id
// @desc get one task
// @access Private

router.get("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ msg: "todo not found" });
    if (todo.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "not authorized" });
    res.json({ todo });
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
});

// @route POST /todos
// @desc add new task
// @access Private

router.post(
  "/",
  auth,
  check("head", "head is require").not().isEmpty(),
  check("description", "descriprion is required").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).res.json({ errors: errors.array() });
    }
    const { head, description } = req.body;
    try {
      const todo = new Todo({
        user: req.user.id,
        head,
        description,
      });

      await todo.save();
      res.send("task saved");
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "server error" });
    }
  }
);

// @route PUT /todos/:id
// @desc update task
// @access Private

router.put("/:id", auth, async (req, res) => {
  const { head, description } = req.body;
  const todoField = {};
  if (head) todoField.head = head;
  if (description) todoField.description = description;

  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json({ msg: "todo not found" });
    if (todo.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "not autorized" });

    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: todoField },
      { new: true }
    );

    res.json({ todo });
  } catch (error) {
    console.error(error);
    res.status(500) / json({ msg: "server error" });
  }
});

// @route DELETE /todos/:id
// @desc remove contact
// @access Private

router.delete("/:id", auth, async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ msg: "todo not found" });
  if (todo.user.toString() !== req.user.id)
    return res.status(401).json({ msg: "not authorized" });
  await Todo.findByIdAndRemove(req.params.id);
  res.json({ msg: "todo delated" });
});

module.exports = router;
