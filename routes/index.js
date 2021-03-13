const router = require('express').Router();
const user = require('./userRouter');
const task = require('./taskRouter');
const { authenticate } = require('../middlewares/auth');

router.get('/', (req, res) => {
    res.send('Welcome!')
})

router.use(user);

router.use(authenticate);

router.use('/tasks', task);

module.exports = router; 