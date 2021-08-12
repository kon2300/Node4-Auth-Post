const express = require('express')
const router = express.Router()
const articlesController = require('../controllers/articlesController')

router.post('/postArticle', articlesController.postArticle)

router.post('/editArticle/:articleId', articlesController.editArticle)

router.put('/updateArticle/:articleId', articlesController.updateArticle)

router.get('/showArticles', articlesController.showArticles)

router.delete('/removeArticle/:articleId', articlesController.removeArticle)

module.exports = router
