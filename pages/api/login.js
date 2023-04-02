import User from '../../models/User';
import connectDb from '../../middleware/mongoose';
var CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


const handler = async (req, res) => {
    //    return console.log(req.body);
    if (req.method == "POST") {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            // bellow two line for password decrypt
            var bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
            var decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
            if (req.body.email === user.email && req.body.password === decryptedPass) {
                const token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: "2d" });
                return res.status(200).json({ success: true, token });
            } else {
                return res.status(200).json({ error: 'Invalid password' })
            }
        } else {
            return res.status(200).json({ error: 'Invalid email address' })
        }
    } else {
        res.status(400).json({ error: "This method is not allowed!" });
    };
};

export default connectDb(handler);