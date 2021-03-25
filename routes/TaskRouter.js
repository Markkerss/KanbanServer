const TaskController = require('../controllers/TaskController');
const { authorize } = require('../middlewares/auth');
const router = require('express').Router();

router.post('/', TaskController.addTask);
router.get('/', TaskController.getTasks);
router.get('/:id', authorize, TaskController.getOneTask);
router.put('/:id', authorize, TaskController.editTask);
router.patch('/:id', authorize, TaskController.changeCategory);
router.delete('/:id', authorize, TaskController.deleteTask);


module.exports = router; 