import { JWT } from "../constants.js"
import { extractTokenFromHeader } from "../utils/token.util.js"
import jwt from 'jsonwebtoken'

export const authUser = (req, res, next) => {
    const token = extractTokenFromHeader(req)

    if (!token) {
        return res.status(401).json({
            status: false,
            message: 'Unauthorized'
        })
    }

    try {
        const payload = jwt.verify(token, JWT.SECRET)

        req.user = payload

        next()
    } catch (e) {
        return res.status(401).json({
            status: false,
            message: e.message
        })
    }
}