const express = require("express");
const router = express.Router();

const addController = require("./addController");

router.post('/add', addController.add);

module.exports = router;