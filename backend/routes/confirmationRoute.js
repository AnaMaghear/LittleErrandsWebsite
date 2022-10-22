const express = require('express');
const router = express.Router();
const { getConfirmationByErrand, setConfirmation, updateConfirmation, deleteConfirmation } = require("../controllers/confirmationController");

const {protect} = require("../middleware/authMiddleware")

router.route('/:id').get(protect, getConfirmationByErrand).put(protect, updateConfirmation).delete(protect, deleteConfirmation)
router.route('/').post(protect, setConfirmation)

module.exports = router