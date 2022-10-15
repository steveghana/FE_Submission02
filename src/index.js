// import { customersData } from "./components/modal/dummy";
import * as customersData from "./data.json";
import * as dashboard from "./dashboard.json";

import { bestSeller, DashboardChart, DChart } from "./scripts/DashboardChart";
import Paginate from "./scripts/OrderPaginate";
import axios from "axios";
import { autocomplete } from "./scripts/autoComplete";
import Store from "./store/store";
import reducer from "./store/reducer";
import "./styles/main.scss";
let Bearer = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjU4MDUzNTAsIm5iZiI6MTY2NTgwNTM1MCwianRpIjoiNjA5ZTEwOWMtNzc0Yy00NDU3LTk2NjAtYTdiMjE3MDc4MWEwIiwiZXhwIjoxNjY1ODA2MjUwLCJpZGVudGl0eSI6ImZyZWRkeSIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.ZiBShupkpwCdC6Uef2pD3ldjxw41DGVNWkaKYzqn7bE`;
let options = {
  mode: "cors",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: Bearer,
  },
};

async function dataFetching() {
  // const res = await axios
  //   .get(`https://freddy.codesubmit.io/dashboard`, options)
  //   .catch((error) => {
  //     console.log(error.message);
  //   });
  // localStorage.setItem("dahsboard", JSON.stringify(res));
  // const order = await axios
  //   .get(`https://freddy.codesubmit.io/orders`, options)
  //   .catch((error) => {
  //     throw new Error(error.message);
  //   });
  // localStorage.setItem("order", JSON.stringify(order));
}
async function initialise() {
  /* ROOT INITIALIZER  */
  let {
    data: { orders },
  } = JSON.parse(localStorage.getItem("order"));
  let {
    data: { dashboard },
  } = JSON.parse(localStorage.getItem("dashboard"));
  dataFetching();
  let DOMelement = document.querySelector(".Order__container");
  // If ORDER DOM hasn't loaded, it means dashboard is currently active.
  if (DOMelement !== null) {
    /* ==== ORDER LIST AND PAGINATION ====*/
    let { getSlice, addElementsToTable } = new Paginate(DOMelement, orders);
    let newSlice = getSlice(1);
    addElementsToTable(newSlice);
    /* === AutoComplete === */
    AutoComplete(addElementsToTable, orders, getSlice);
  } else {
    /* === DASHBOARD CHARTS AND BESTSELLER */
    DashboardChart(dashboard);
  }
}
function AutoComplete(TableElements, orders, getSlice) {
  let inputdata = document.getElementById("autocomplete");
  inputdata.addEventListener("keydown", (event) => {
    let data = event.target.value;
    let newdata = autocomplete(data, orders);
    if (newdata.length > 10) {
      TableElements(getSlice(1));
    } else {
      TableElements(newdata);
    }
  });
}

document.addEventListener("DOMContentLoaded", initialise);
