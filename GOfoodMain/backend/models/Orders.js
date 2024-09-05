const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    email: { type: String, required: true },
    order_data: [
        {
            order_date: { type: Date, required: true },
            items: [
                {
                    id: { type: String, required: true },
                    name: { type: String, required: true },
                    qty: { type: Number, required: true },
                    size: { type: String, required: true },
                    price: { type: Number, required: true }
                }
            ]
        }
    ]
});

module.exports = mongoose.model('Order', orderSchema);
