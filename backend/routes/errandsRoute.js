const express = require('express');
const router = express.Router();
const {getErrands, getErrandById, setErrands, updateErrands, deleteErrands, getAllErrands} = require("../controllers/errandsController");


const {protect} = require("../middleware/authMiddleware")

router.route('/me').get(protect, getErrands).post(protect, setErrands);
router.route('/:id').get(protect, getErrandById).put(protect, updateErrands).delete(protect, deleteErrands);
router.route('/').get(protect, getAllErrands);

module.exports = router;