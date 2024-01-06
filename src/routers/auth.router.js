import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller.js'
import { emailExist, emailNotExist, isEmailInvalid, minLenghtPassword, usernameNotExist, validateFieldRegister } from '../middlewares/user.middleware.js'
import { authUser } from '../middlewares/auth.middleware.js'

const authRouter = Router()
const authController = new AuthController()
const validateRegister = [
    validateFieldRegister, 
    isEmailInvalid, 
    emailNotExist,
    minLenghtPassword,
    usernameNotExist
]

authRouter.post('/register', validateRegister, authController.register)
authRouter.post('/login', emailExist, authController.login)
authRouter.get('/profile',authUser, authController.profile)

export { authRouter }