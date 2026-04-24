import Product from '../models/product.model'

export const getProducts = async () => {
  return await Product.find()
}

export const createProduct = async (data: { productName: string; productPrice: number }) => {
  return await Product.create(data)
}

export const getProductById = async (id: string) => {
  return await Product.findById(id)
}

export const updateProduct = async (
  id: string,
  data: { productName?: string; productPrice?: number }
) => {
  return await Product.findByIdAndUpdate(id, data, { new: true })
}

export const deleteProduct = async (id: string): Promise<boolean> => {
  const result = await Product.findByIdAndDelete(id)
  return result !== null
}
