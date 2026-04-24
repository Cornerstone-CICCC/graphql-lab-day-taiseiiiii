import Customer from '../models/customer.model'

export const getCustomers = async () => {
  return await Customer.find()
}

export const createCustomer = async (data: {
  firstName: string
  lastName: string
  email: string
}) => {
  return await Customer.create(data)
}

export const getCustomerById = async (id: string) => {
  return await Customer.findById(id)
}

export const updateCustomer = async (
  id: string,
  data: { firstName?: string; lastName?: string; email?: string }
) => {
  return await Customer.findByIdAndUpdate(id, data, { new: true })
}

export const deleteCustomer = async (id: string): Promise<boolean> => {
  const result = await Customer.findByIdAndDelete(id)
  return result !== null
}
