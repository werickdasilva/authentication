import db from "../db/index.js"

const requiredProprety = (array, proprety,name) => {
    if (!proprety) {
        array.push({
            field: name,
            message: `Required ${name}`
        })
    }
}

const validateFieldRegister = (req, res, next) => {
    const { username, email, password } = req.body
    const errorsFields = []

    requiredProprety(errorsFields, username, 'username')
    requiredProprety(errorsFields, email, 'email')
    requiredProprety(errorsFields, password, 'password')

    if (!username || !email || !password) {
        return res.status(401).json({
            status: false,
            erros: errorsFields
        })
    }

    next()
}

const minLenghtPassword = (req, res, next) => {
    const { password } = req.body
    
    if (password.length < 8) {
        return res.status(401).json({
            status: false,
            errors: [{
                field: 'password',
                message: 'Password requined minimun size 8 caractere'
            }]
        })
    }

    next()
}

const isEmailInvalid = (req, res, next) => {
    const { email } = req.body 
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    if (!emailRegex.test(email)) {
        return res.status(401).json({
            status: false,
            errors: [{
                filed: 'email',
                message: 'Emial invalid not match example@gmail.com'
            }]
        })
    }

    next()
}

const emailNotExist = async (req, res, next) => {
    const { email } = req.body
    const user = await db.user.findUnique({where: { email: email}})

    if (!!user) {
        return res.status(401).json({
            status: false,
            error: {
                field: 'email',
                message: 'Email exist on database'
            }
        })
    }

    next()
}

const usernameNotExist = async (req, res, next) => {
    const { username } = req.body
    const user = await db.user.findUnique({where: { username: username }})

    if (!!user) {
        return res.status(401).json({
            status: false,
            error: {
                field: 'username',
                message: 'username exist on database'
            }
        })
    }

    next()
}


const  emailExist = async (req, res, next) => {
    const { email } = req.body
    const user = await db.user.findUnique({
        where: {
            email
        },
    })

    if (!user) {
        return res.status(401).json({
            status: false,
            errors: [{
                field: 'email',
                message: 'Invalid email or password'
            }]
        })
    }

    req.user = user
    next()
}

export { 
    validateFieldRegister, 
    isEmailInvalid, 
    emailNotExist, 
    minLenghtPassword, 
    usernameNotExist,
    emailExist
}