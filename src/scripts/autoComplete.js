export function autocomplete(data, orders) {
  let filter = orders.filter((item) =>
    item.product.name.trim().toLowerCase().includes(data.trim().toLowerCase())
  );
  return filter;
}
