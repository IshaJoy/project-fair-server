const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')

// route for register
router.post('/register',userController.register)
// login
router.post('/login',userController.login)
// router specific middleware
// add project
router.post('/add-project',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProjects)


module.exports =router