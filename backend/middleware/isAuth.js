import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "user does not have token"
            })
        }
        const verifyToken = await jwt.verify(token, process.env.JWT_SECRET)
        if(!verifyToken){
            return res.status(401).json({
                success: false,
                message: "user does not valid token"
            })
        }
        req.userId = verifyToken.userId
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: `isAuth middleware error ${error}`
        })
    }
}

export default isAuth;