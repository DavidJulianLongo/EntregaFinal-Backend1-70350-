import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product', 
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1 
            },
        },
    ],
    
});

export const cartModel = model('cart', cartSchema);