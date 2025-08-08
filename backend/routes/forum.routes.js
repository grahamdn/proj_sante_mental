const router = require('express').Router();
const forumController = require('../controllers/forumController.js');
const verifyAdmin = require('../middlewares/verifyAdmin.js')

router.post('/create', verifyAdmin, forumController.createPost);
router.get('/', forumController.getAllPosts);
router.get('/:id', forumController.getPostById);
router.put('/:id', verifyAdmin,forumController.updatePost);
router.delete('/:id',verifyAdmin , forumController.deletePost);

module.exports = router;