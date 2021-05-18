import jwt from 'jsonwebtoken'

const verifyAuth = (req,res,next) => {

    const token = req.get('token')

    jwt.verify(token, 'elattrifa', (err, decoded) => {

        if(err) {
            return res.status(401).json({
                message: "Error: user not valid",
                error: err
            })
        }
        
        req.user = decoded.data

        next();
    })
}

const verifyAdmin = (req,res,next) => {
    const rol = req.user.rol

    if(rol === "ADMIN") {
        next()
    } else {
        res.status(401).json({
            message: "Error: User not valid"
        })
    }
}

module.exports = {
    verifyAuth,
    verifyAdmin
}