import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'


const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        minlength: [3, 'Name must be at least 3 characters long']
    },
    description: {
        type: String,
        required: [true, 'Product description is required']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price must be a positive value']
    },
    stock: {
        type: Number,
        required: [true, 'Product stock is required'],
        min: [0, 'Stock must be a positive value']
    },
    category: {
        type: String,
        required: [true, 'Product category is required']
    },
    item_code:{
        type: String,
        unique: true,
    }
});

//plugin de paginación
productSchema.plugin(mongoosePaginate);

export const prodModel = model('product', productSchema);


