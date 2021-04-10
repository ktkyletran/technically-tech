const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');
const dashRoutes = require('./dashRoutes');

router.use('/users', userRoutes);
router.use('/blog', blogRoutes);
router.use('/dashboard', dashRoutes);

module.exports = router;
