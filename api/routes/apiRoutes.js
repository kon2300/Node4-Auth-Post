const express = require('express')
const router = express.Router()
const apiController = require('../controllers/apiController')
const passport = require('../utils/auth')

router.post('/signUp', apiController.createUser)

router.post(
  '/signIn',
  passport.authenticate('local', {
    passReqToCallback: true,
    failureRedirect: 'error',
  }),
  apiController.isAuthenticated
)

router.post('/postArticle', apiController.postArticle)

router.post('/editArticle', apiController.editArticle)

router.post('/updateArticle', apiController.updateArticle)

router.get('/showArticles', apiController.showArticles)

router.get('/verify', apiController.verifyToken)

router.post('/removeArticle', apiController.removeArticle)

router.post('/logout', apiController.logout)

router.get('/error', apiController.error)

module.exports = router
