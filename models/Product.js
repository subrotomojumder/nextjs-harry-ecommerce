const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    availableQty: { type: Number },
}, { timestamps: true });

mongoose.models = {};
export default mongoose.model("Product", productSchema);

// async function main(){
//     await mongoose.connect('mongodb://127.0.0.1:27017/test');
// };

