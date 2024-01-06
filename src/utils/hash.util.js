import bcrypt from 'bcrypt'

const saltOrRounds = 10

const hashPassword = async (password) => {
    return bcrypt.hash(password, saltOrRounds)
}

const compareHashPassword = async (hash, password) => {
    return await bcrypt.compare(password, hash)
}

export {
    hashPassword,
    compareHashPassword
}