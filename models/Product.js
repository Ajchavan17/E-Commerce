const { Schema, model, models, default: mongoose } = require('mongoose')

const ProdcutSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: { type: [String] },
  category: { type: mongoose.Types.ObjectId, ref: 'Category' },
})

export const Product = models.Product || model('Product', ProdcutSchema)
