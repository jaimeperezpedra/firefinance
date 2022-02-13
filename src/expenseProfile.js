export function expenseProfile(data, id) {
  return {
    currency: data.currency,
    price: data.price,
    category: data.category,
    description: data.description,
    id: id,
    date: data.date,
  };
}
