const { Router } = require('express');
const blogController = require('../controllers/blogController');

const router = Router();

router.post('/', blogController.create_blogs);
router.get('/', blogController.get_blogs);
router.get('/:id', blogController.get_blogs_by_id);
router.patch('/:id', blogController.update_blogs_by_id);
router.delete('/:id', blogController.delete_blogs_by_id);

module.exports = router;