import User from '../../models/User';
import connectDb from '../../middleware/mongoose';
const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
    const token = req.query?.token;
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err) {
            const user = await User.findOne({ email: decoded.email });
            if (user) {
                return res.status(200).json({success: true, user})
            } else {
                return res.status(200).json({ error: 'Invalid email address' })
            }
        } else {
            return res.status(200).json({ err })
        }
    });
};

export default connectDb(handler);