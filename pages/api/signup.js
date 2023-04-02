import User from '../../models/User';
import connectDb from '../../middleware/mongoose';
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    //    return console.log(req.body);
    if (req.method == "POST") {
        try {
            const { email, name } = req.body;
            const user = new User({ name, email, password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString() })
            await user.save();
            const token = jwt.sign({ email: email, name: name }, process.env.JWT_SECRET, { expiresIn: "2d" });
            return res.status(200).json({ success: "Successfully create account!", token });
        } catch (error) {
            res.status(400).json({ error: "your account data is invalid!" });
        }

    } else {
        res.status(400).json({ error: "This method is not allowed!" });
    };
};

export default connectDb(handler);