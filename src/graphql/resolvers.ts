import * as productController from '../controllers/product.controller'
import * as customerController from '../controllers/customer.controller'
import * as orderController from '../controllers/order.controller'
import Order from '../models/order.model'
import Product from '../models/product.model'
import Customer from '../models/customer.model'

export const resolvers = {
  Query: {
    products: async () => await productController.getProducts(),
    customers: async () => await customerController.getCustomers(),
    orders: async () => await orderController.getOrders(),
    getProductById: async (_: unknown, { id }: { id: string }) =>
      await productController.getProductById(id),
    getCustomerById: async (_: unknown, { id }: { id: string }) =>
      await customerController.getCustomerById(id)
  },

  Product: {
    customers: async (parent: { id: string }) => {
      const orders = await Order.find({ productId: parent.id }).populate('customerId')
      return orders.map(o => o.customerId)
    }
  },

  Customer: {
    products: async (parent: { id: string }) => {
      const orders = await Order.find({ customerId: parent.id }).populate('productId')
      return orders.map(o => o.productId)
    }
  },

  Order: {
    product: async (parent: { productId: string }) => await Product.findById(parent.productId),
    customer: async (parent: { customerId: string }) => await Customer.findById(parent.customerId)
  },

  Mutation: {
    addProduct: async (
      _: unknown,
      args: { productName: string; productPrice: number }
    ) => await productController.createProduct(args),
    editProduct: async (
      _: unknown,
      { id, ...data }: { id: string; productName?: string; productPrice?: number }
    ) => await productController.updateProduct(id, data),
    removeProduct: async (_: unknown, { id }: { id: string }) =>
      await productController.deleteProduct(id),

    addCustomer: async (
      _: unknown,
      args: { firstName: string; lastName: string; email: string }
    ) => await customerController.createCustomer(args),
    editCustomer: async (
      _: unknown,
      { id, ...data }: { id: string; firstName?: string; lastName?: string; email?: string }
    ) => await customerController.updateCustomer(id, data),
    removeCustomer: async (_: unknown, { id }: { id: string }) =>
      await customerController.deleteCustomer(id),

    addOrder: async (
      _: unknown,
      { productId, customerId }: { productId: string; customerId: string }
    ) => await orderController.createOrder(productId, customerId),
    editOrder: async (
      _: unknown,
      { id, ...data }: { id: string; productId?: string; customerId?: string }
    ) => await orderController.updateOrder(id, data),
    removeOrder: async (_: unknown, { id }: { id: string }) =>
      await orderController.deleteOrder(id)
  }
}
