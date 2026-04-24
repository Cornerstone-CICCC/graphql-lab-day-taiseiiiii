import Order from '../models/order.model'

export const getOrders = async () => {
  return await Order.find()
}

export const createOrder = async (productId: string, customerId: string) => {
  return await Order.create({ productId, customerId })
}

export const updateOrder = async (
  id: string,
  data: { productId?: string; customerId?: string }
) => {
  return await Order.findByIdAndUpdate(id, data, { new: true })
}

export const deleteOrder = async (id: string): Promise<boolean> => {
  const result = await Order.findByIdAndDelete(id)
  return result !== null
}
