const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')

router.post('/postArticle', postController.postArticle)

router.post('/editArticle', postController.editArticle)

router.put('/updateArticle', postController.updateArticle)

router.get('/showArticles', postController.showArticles)

router.delete('/removeArticle', postController.removeArticle)

module.exports = router
