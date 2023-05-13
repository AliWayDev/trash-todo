const { Router } = require("express");
const authMiddleWare = require("../middleware/authMiddleWare.js");
const NewsController = require("../controller/newsController.js");

const router = Router({ mergeParams: true });

router.route('/')
    .post(NewsController.addNews)
    .get(NewsController.getNews)

router.route('/:id')
    .get(NewsController.getOneNews)
    .put( NewsController.updatedNews)
    .delete( NewsController.deleteNews)

module.exports = router