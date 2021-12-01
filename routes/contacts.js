const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Contact = require("../models/Contact");

const auth = require("../middleware/auth");

// @route GET /contacts
// @desc get all contacts
// @access Private

router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
});

// @route GET /contacts/:id
// @desc get one contact
// @access Private

router.get("/:id", auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: "contact not found" });
    }
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not authorized" });
    }

    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
});

// @route POST /contacts
// @desc add new contact
// @access Private

router.post(
  "/",
  auth,
  check("name", "name is required").not().isEmpty(),
  check("surname", "surname is required").not().isEmpty(),
  check("email", "enter correct email").isEmail(),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, surname, phone, email, type } = req.body;
    try {
      const contact = new Contact({
        user: req.user.id,
        name,
        surname,
        phone,
        email,
        type,
      });
      await contact.save();
      res.send("contact saved");
    } catch (error) {
      console.error(error);
      res.status(500).send("server error");
    }
  }
);

// @route PUT /contacts/:id
// @desc update contact
// @access Private

router.put("/:id", auth, async (req, res) => {
  const { name, surname, phone, email, type } = req.body;
  const contactFields = {};
  if (name) contactFields.name = name;
  if (surname) contactFields.surname = surname;
  if (phone) contactFields.phone = phone;
  if (email) contactFields.email = email;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: "contact not found" });
    }
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not authorized" });
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.json({ contact });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// @route DELETE /contacts/:id
// @desc remove contact
// @access Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: "contact not found" });
    }
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not authorized" });
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ msg: "contact deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
});

module.exports = router;
