const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getMe, getUserById, updateUser} = require("../controllers/userController")

const { protect } = require('../middleware/authMiddleware')

router.route('/').post(registerUser).put(protect, updateUser)
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/:id', protect, getUserById)


module.exports = router;