const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
    let token = req.headers.authorization;
    if(!token){
        res.status(401).json({
            status: "Failed",
            message: "Access denied.Looks like unauthorized access."
        })
        return;
    }
    
    token = token.split(" ")[1];
    
    try {
        const user = jwt.verify(token, SECRET_KEY)
        req.userId = user.id;
        next();
    } catch (e) {
        res.status(401).json({
            status: "Failed",
            message: "Access denied.Looks like unauthorized access."
        })
        return;
    }
};

module.exports = authMiddleware;
