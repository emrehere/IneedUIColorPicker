import UserPattern from "../models/userLoginModel.mjs";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "3d" });  
}


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    const { authorization } = req.headers;
    console.log(authorization)
    const auth = authorization ? authorization.split(" ")[1] : null;

    if (auth) {
        console.log("auth", auth)
    } else {
        console.log("auth", auth)
    }

    try {
        const user = await UserPattern.login(email, password);
        console.log(user)
      

        const token = createToken(user._id);
        console.log(user._id)
        console.log(token)

        res.status(200).json({ email, token, id: user.id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const registerUser = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const user = await UserPattern.register(email, password, name);

        const token = createToken(user._id);
        

        res.status(200).json({ email, name, token, id : user._id });
    }catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export { loginUser, registerUser };