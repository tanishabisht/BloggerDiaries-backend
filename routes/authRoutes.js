const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.patch('/changepass/:id', authController.changePassword);

module.exports = router;