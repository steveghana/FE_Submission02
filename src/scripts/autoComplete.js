/**
 * A function to track a user search input, get match and render on order table.
 */
export function AutoComplete(TableElements, orders, getSlice) {
  let inputdata = document.getElementById("autocomplete");
  inputdata.addEventListener("keydown", ({ target }) => {
    let data = target.value;
    let newdata = getMatch(data, orders);
    if (newdata.length > 10) {
      TableElements(getSlice(1)); //Slice to 10 items
    } else {
      TableElements(newdata);
    }
  });
}

/**
 * A function to get string equivalent from data
 * @returns array of string equivalent
 * @param data this represent the search match.
 * @param orders this represent the data to filter.
 */
function getMatch(data, orders) {
  let filter = orders.filter((item) =>
    item.product.name.trim().toLowerCase().includes(data.trim().toLowerCase())
  );
  return filter;
}
