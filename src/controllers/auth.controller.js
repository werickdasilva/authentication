import { JWT } from '../constants.js'
import db from '../db/index.js'
import { hashPassword, compareHashPassword } from '../utils/hash.util.js'
import jwt from 'jsonwebtoken'
import { extractTokenFromHeader } from '../utils/token.util.js'

export class AuthController {

    async register(req, res) {
        const { username, email, password } = req.body
        const hash  = await hashPassword(password)
    
        await db.user.create({
            data: {
                username,
                email,
                password: hash
            }
        })

        res.status(201).json({
            status: true,
            message: 'User created succefuly'
        })
    }

    async login(req, res) {
        const { body: { password }, user }  = req
        
        if (!await compareHashPassword(user.password, password)) {
            return res.status(401).json({
                status: false,
                errors: [{
                    field: 'email',
                    message: 'Invalid email or password'
                }]
            })
        }
       
        const payload = {
            id: user.id,
            username: user.username
        }
        const options = { expiresIn: JWT.EXPIRES_IN }
        const token = jwt.sign(payload, JWT.SECRET, options)

        res.status(201).json({
            status: true,
            token: token
        })
    }

    async profile(req, res) {
        const { id } = req.user
        const user = await db.user.findMany({
            where: { id: id },
            select: {
                id: true,
                username: true,
                email: true,
                create_at: true
            }
        })
       
        res.status(200).json({
            status: true,
            user
        })
    }
    
}