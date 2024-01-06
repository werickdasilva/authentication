export const extractTokenFromHeader = (req) => {
    const { authorization } = req.headers
    const [type, token] = authorization.split(' ')
    
    return type === 'Bearer' ? token : undefined
}
