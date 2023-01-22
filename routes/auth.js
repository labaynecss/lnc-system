const express = require ('express');
const router = express.Router();
const { registerValidator ,loginValidator ,validatorResult} = require('../middleware/validator');
const { registerController, loginController } = require('../controllers/auth');

router.post('/register', registerValidator, validatorResult, registerController);
router.post('/login', loginValidator, validatorResult, loginController);





module.exports = router;