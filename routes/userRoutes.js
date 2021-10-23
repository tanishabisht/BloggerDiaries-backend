const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();

router.get('/', userController.get_users);
router.get('/:id', userController.get_user_by_id);
router.patch('/update/:id', userController.update_user);
router.delete('/delete/:id', userController.delete_user);

module.exports = router;