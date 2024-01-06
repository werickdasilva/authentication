import 'dotenv/config'

const PORT = process.env.PORT
const JWT = {
    SECRET: process.env.JWT_SECRET,
    EXPIRES_IN: process.env.JWT_EXPIRES_IN
}
export {
    PORT,
    JWT
}