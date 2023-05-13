const { Router } = require("express");
const uploadRoutes = require('./uploads')
const newsRoutes = require('./news')

const router = Router({ mergeParams: true });

router.use('/uploads', uploadRoutes);
router.use('/todos', newsRoutes);

module.exports = router;