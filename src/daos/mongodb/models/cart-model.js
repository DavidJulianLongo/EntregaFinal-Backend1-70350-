import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
    products: [
        {
            _id: false,
            product: {
                type: Schema.Types.ObjectId,
                ref: 'product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
                min: [1, 'Quantity must be at least 1']
            }
        }
    ]
});

export const cartModel = model('cart', cartSchema);