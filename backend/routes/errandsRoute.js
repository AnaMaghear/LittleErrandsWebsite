const express = require('express');
const router = express.Router();
const {getErrands, setErrands, updateErrands, deleteErrands} = require("../controllers/errandsController");

router.route('/').get(getErrands).post(setErrands);
router.route('/:id').put(updateErrands).delete(deleteErrands);


module.exports = router;