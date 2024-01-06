import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller.js'

const authRouter = Router()
const authController = new AuthController()

authRouter.post('/register', authController.register)

export { authRouter }