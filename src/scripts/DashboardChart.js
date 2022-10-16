export function DashboardChart(dashboard) {
  const {
    sales_over_time_week: salesWeek,
    sales_over_time_year: salesMonth,
    bestsellers,
  } = dashboard;
  let statsElement = document.querySelectorAll(".stats_data");
  let { format } = Intl.NumberFormat("en", { notation: "compact" });
  let today = salesWeek[1];
  let lastWeek = salesWeek[7];
  let lastMonth = salesMonth[1];
  statsElement[0].innerText = `${format(today.total)} / ${today.orders} orders`;
  statsElement[1].innerHTML = `${format(lastWeek.total)} / ${lastWeek.orders} orders`;
  statsElement[2].innerText = `${format(lastMonth.total)} / ${lastMonth.orders} orders`;
  renderBestSeller(bestsellers);
}

export function DChart(dashboard, weekOryear) {
  const {
    sales_over_time_week: salesWeek,
    sales_over_time_year: salesMonth,
    bestsellers,
  } = dashboard;
  let newlable = ["today", "yesterday"];
  let newRevenueSum = [];
  let daysOfWeek = 7;
  let monthsInYear = 12;
  let keys = Object.keys(salesWeek);
  for (let i = 0; i < keys.length; i++) {
    if (i < 2) continue;
    // salesWeek[keys[i]].total
    newlable.push(`day ${+keys[i]}`);
  }

  let element = document.querySelector(".chart").getContext("2d");
  //   new Chart(element, {
  //     type: "bar",
  //     data: {
  //       labels: [...newlable],
  //       data: [13, 10, 3, 6, 3, 7],
  //       datasets: [
  //         {
  //           label: "* of votes",
  //           backgroundColor: "white",
  //           borderColor: "red",
  //           borderWidth: 2,
  //         },
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         yAxes: {
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   });
  //   renderBestSeller(bestsellers);
}

export const renderBestSeller = (products) => {
  let slice = products.slice(0, 3);
  slice.forEach((item, i) => {
    let parentElement = document.querySelector(".best__seller-data");
    /* === CREATE ELEMENT */
    let RowContainer = document?.createElement("div");
    let productName = document?.createElement("div");
    let productStatus = document?.createElement("div");
    /* === ADD CLASSES */
    RowContainer.classList.add("best__seller-row-item");
    productName.classList.add("best__seller-name-item");
    productStatus.classList.add("best__seller-status-item");
    /* === ADD INNERTEXT === */
    productName.innerText = item.product.name;
    productStatus.innerText = item.revenue;
    /* === APPEND TO CONTAINER === */
    RowContainer.append(productName, productStatus);
    parentElement.appendChild(RowContainer);
  });
};
