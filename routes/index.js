const router = require('express').Router();
const task = require('./TaskRouter');
const UserController = require('../controllers/UserController');
const { authenticate } = require('../middlewares/auth');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/google-login', UserController.googleLogin)

router.use(authenticate);

router.use('/tasks', task);

module.exports = router; 