import jwt from "jsonwebtoken";

export const auth = (req,res,next) => {
    const token = req.headers["x-acces-token"];

    if(!token){
        return res.status(403).send("Authentication token not sent")
    }
    try{
        const decoded = jwt.verify(token,"KEY");
        req.user=decoded;
    }catch(err){
        return res.status(401).send("Invalid token");
    }
    return next();
}