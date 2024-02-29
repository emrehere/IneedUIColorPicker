import jwt from "jsonwebtoken";
import UserPattern from "../models/userLoginModel.js";


const requireAuth = async (req, res, next) => {
   

    const { authorization } = req.headers;
   

    if (!authorization) {
        return res.status(401).json({ error: "Authorization token required" });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Authorization token required" });
    }

    try {
        const { _id } = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await UserPattern.findById(_id).select("_id");
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Request is not authorized" });
    }
};

export default requireAuth