export const extractTokenFromHeader = (req) => {
    const { authorization } = req.headers
    if (!authorization) return undefined
    const [type, token] = authorization.split(' ')
    
    return type === 'Bearer' ? token : undefined
}
