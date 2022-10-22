const express = require('express');
const router = express.Router();
const {getErrands, setErrands, updateErrands, deleteErrands} = require("../controllers/errandsController");


const {protect} = require("../middleware/authMiddleware")

router.route('/').get(protect, getErrands).post(protect, setErrands);
router.route('/:id').put(protect, updateErrands).delete(protect, deleteErrands);


module.exports = router;