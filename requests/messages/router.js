const express = require("express");
const router = express.Router();

const addController = require("./addController");
const getController = require("./getController");


router.post('/add', addController.add);
router.post('/get', getController.get);

module.exports = router;