const express = require('express')
const { validateBody, validateParam, schemas } =require('../validator/validator')
const router = require('express-promise-router')()
const UserController = require('../controllers/user')
const passport = require('passport')
const passportConfig = require('../middlewares/passport')

router.route('/')
  .get(UserController.getAll)
  .post(validateBody(schemas.userSchema),UserController.createUser)

router.route('/signup').post(validateBody(schemas.authSignUpSchema),UserController.signUp)

router.route('/signin').post(validateBody(schemas.authSignInSchema), passport.authenticate('local', {session: false}), UserController.signIn)

router.route('/secret').get(passport.authenticate('jwt', {session: false}), UserController.secret)

router.route('/:userID')
  .get(validateParam(schemas.idSchema, 'userID'), UserController.getUser)
  .put(UserController.replaceUser)
  .patch(UserController.updatePass)

module.exports = router