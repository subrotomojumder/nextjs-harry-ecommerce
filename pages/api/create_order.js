import Order from '../../models/Order';
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {
    if (req.method == "POST") {
        try {
            let newOrder = new Order(req.body);
            const data = await newOrder.save();
            return res.status(200).json({ success: true, data});
        } catch (error) {
            res.status(400).json({ error: "your order data is invalid!" });
        }
    } else {
        res.status(400).json({ error: "This method is not allowed!" });
    };
};

export default connectDb(handler);