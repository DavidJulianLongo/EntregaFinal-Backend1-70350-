import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'product', 
            default: [] 
        }
    ]
});

export const cartModel = model('cart', cartSchema);