export type Order = {
  sellerId: string,
  orderId: string,
  dateCreated: string,
  address: {
    line1: string,
    line2: string,
    city: string,
    state: string,
    postcode: string,
    country: string
  },
  items: Item[]
}

type Item = {
  product: string,
  description: string,
  name: string,
  unitPrice: number,
  qty: number,
  totalPrice: number
}