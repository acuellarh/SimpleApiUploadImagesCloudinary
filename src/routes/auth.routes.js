const router = require('express').Router();

const { loginUser, createUser, showData, updateUser } = require('../controllers/auth.controllers');
const authTokenValidator = require('../middlewares/authTokenValidator');

//login
router.post('/login', loginUser);

// signup
router.post('/signup', createUser);

// Update Profile
router.put('/update/user/:id', updateUser);


// jwt testing validation
router.get('/', authTokenValidator, showData);

module.exports = router;