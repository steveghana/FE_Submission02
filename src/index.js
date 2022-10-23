import axios from "axios";
import Paginate from "./scripts/OrderPaginate";
import { AutoComplete } from "./scripts/autoComplete";
import { getInputData, formSubmit } from "./scripts/loginAuth";
import { RevenueStats, RevenueChart } from "./scripts/DashboardChart";
import "./Designs/styles/main.scss";

/* ==================*/
/**
 * A function to serve as a gateway for authentication
 */
function Auth() {
  let initialValues = {
    username: "",
    password: "",
  };
  let Form = document.querySelector("form");
  let userDetails = getInputData(initialValues, Form);
  Form &&
    Form.addEventListener("submit", (event) =>
      submitAndRouteToHome(event, userDetails)
    );
  let { pathname } = window.location;
  if (pathname === "/Login.html" || pathname === "/") return;
  initialiseApp();
}

/**
 * A function to fetch data for dashboard and order
 * @param token tokenized string for api authentication
 */
async function Requests(token) {
  let Bearer = `Bearer ${token}`;
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: Bearer,
    },
  };
  let errorHandler = document.querySelector(".error__handler");
  try {
    const dashboard = await axios.get(
      `https://freddy.codesubmit.io/dashboard`,
      options
    );
    const Order = await axios.get(
      `https://freddy.codesubmit.io/orders`,
      options
    );
    if (!dashboard && !Order) return false;
    /* TO DO: save data to local storage or cookies. Route to homepage  */
    localStorage.clear();
    localStorage.setItem("dashboard", JSON.stringify(dashboard));
    localStorage.setItem("order", JSON.stringify(Order));
    return true;
  } catch (error) {
    errorHandler.innerHTML = `${error.message}`;
  }
}

/**
 * A function to route to home homepage after authentication has been completed
 * @param event events on HTML element
 * @param userDetails this represent the user credentials.
 */
async function submitAndRouteToHome(event, userDetails) {
  event.preventDefault();
  let { access_token, refresh_token } = await formSubmit(userDetails);
  if (!access_token && !refresh_token) return;
  let success = await Requests(access_token || refresh_token);
  console.log(success);
  if (!success) return;
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", "home.html");
  window.location.reload();
}

/* SINGLE SOURCE OF DATA */
const Store = () => {
  let {
    data: { orders },
    //@ts-ignore
  } = JSON.parse(localStorage.getItem("order"));
  let {
    data: { dashboard },
    //@ts-ignore
  } = JSON.parse(localStorage.getItem("dashboard"));
  return { dashboard, orders };
};

/* ROOT INITIALIZER  */
/**
 * A function to initialise main pages
 */
async function initialiseApp() {
  const { dashboard, orders } = Store();
  let OrderContainer = document.querySelector(".Order__container");
  // If ORDER DOM hasn't loaded, it means dashboard dom and route is currently active and in vice versa.
  if (OrderContainer !== null) {
    /* ==== ORDER LIST AND PAGINATION ====*/
    let { getSlice, addElementsToTable } = new Paginate(orders);
    let newSlice = getSlice(1);
    addElementsToTable(newSlice);
    /* === AutoComplete === */
    AutoComplete(addElementsToTable, orders, getSlice);
  } else {
    /* === DASHBOARD, CHARTS AND BESTSELLER */
    RevenueStats(dashboard);
    let { sales_over_time_year: year, sales_over_time_week: week } = dashboard;
    let toggleTime = false;
    let modal = document.querySelector(".toggle");
    // Should view in weeks by default
    RevenueChart(week, "day");
    /* ====== */
    modal.addEventListener("click", () => {
      toggleTime = !toggleTime;
      let modalToggle = modal.querySelector(".toggle__inner");
      modalToggle.classList.toggle("move__right", !toggleTime);
      if (toggleTime) {
        // true
        modal.style.background = "blue";
        RevenueChart(year, "month");
      } else {
        //false
        modal.style.background = "none";
        RevenueChart(week, "day");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", Auth);
