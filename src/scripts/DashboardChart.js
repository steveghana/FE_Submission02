import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
/**
 * A function to render respective revenue, order stats and best sellers table
 *
 * @param dashboard this represent the data array consisting of orders, revenues and bestsellers.
 */
export function RevenueStats(dashboard) {
  const {
    sales_over_time_week: salesWeek,
    sales_over_time_year: salesMonth,
    bestsellers,
  } = dashboard;
  let statsElement = document.querySelectorAll(".stats_data");
  /* == INTERNATIONALIZATION API == */
  let { format } = Intl.NumberFormat("en", { notation: "compact" });
  let today = salesWeek[1];
  let lastWeek = salesWeek[7];
  let lastMonth = salesMonth[1];
  statsElement[0].innerText = `${format(today.total)} / ${today.orders} orders`;
  statsElement[1].innerHTML = `${format(lastWeek.total)} / ${lastWeek.orders} orders`;
  statsElement[2].innerText = `${format(lastMonth.total)} / ${lastMonth.orders} orders`;
  renderBestSellerData(bestsellers);
}

export function RevenueChart(weekOryear, time) {
  let newCanvas = document.querySelector("#chart").getContext("2d");
  let chartRevenueHeader = document.querySelector(".revenue__header");
  let year = "12 months";
  let week = "7 days";
  chartRevenueHeader.innerText = `Revenue (last ${time === "month" ? year : week})`;
  let newLable;
  if (time === "month") {
    newLable = ["This Month", "Last Month"];
  } else {
    newLable = ["today", "yesterday"];
  }
  let newRevenueSum = [];
  let keys = Object.keys(weekOryear);
  for (let i = 0; i < keys.length; i++) {
    if (i < 2) continue;
    newRevenueSum.push(weekOryear[keys[i]].total);
    newLable.push(`${time} ${+keys[i]}`);
  }
  let config = {
    type: "line",
    data: {
      labels: [...newLable],
      data: [...newRevenueSum],
      datasets: [
        {
          label: `${time}ly revenue`,
          fill: true,
          backgroundColor: [
            "rgb(241, 252, 79)",
            "tomato",
            "orange",
            "brown",
            "green",
            "yellowgreen",
          ],
          borderColor: [
            "rgb(241, 252, 79)",
            "tomato",
            "orange",
            "skyblue",
            "green",
            "yellowgreen",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  /*
   This will destroy and recreate 
   new chart instance when toggled 
   to avoid collision 
   */
  let chartStatus = Chart.getChart("chart");
  if (chartStatus !== undefined) {
    chartStatus.destroy();
  }
  let chartCanvas = document.getElementById("chart");
  newCanvas = new Chart(chartCanvas, config);
}

/**
 * Renders the best seller data table on the ui
 * @param bestSellerInfo info on best seller
 */
export const renderBestSellerData = (bestSellerInfo) => {
  let slice = bestSellerInfo.slice(0, 3); //We need 3 items
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
