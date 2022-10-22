const express = require('express');
const router = express.Router();
const {getErrands, getErrandById, setErrands, updateErrands, deleteErrands, getErrandsByLocation} = require("../controllers/errandsController");


const {protect} = require("../middleware/authMiddleware")

router.route('/').get(protect, getErrands).post(protect, setErrands);
router.route('/:id').get(protect, getErrandById).put(protect, updateErrands).delete(protect, deleteErrands);
router.route('/location/:loc').get(protect, getErrandsByLocation);

module.exports = router;