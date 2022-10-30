const express = require('express');
const router = express.Router();
const { getConfirmationByErrand, setConfirmation, updateConfirmation, deleteConfirmation, getConfirmationByErrandAndSolver } = require("../controllers/confirmationController");

const {protect} = require("../middleware/authMiddleware")

router.route('/:id').get(protect, getConfirmationByErrand).put(protect, updateConfirmation).delete(protect, deleteConfirmation)
router.route('/').post(protect, setConfirmation)
router.route('/forSolver/:id').get(protect, getConfirmationByErrandAndSolver)

module.exports = router