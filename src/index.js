import { customersData } from "./components/modal/dummy";
import Paginate from "./scripts/OrderPaginate";
import { autocomplete } from "./scripts/autoComplete";
import Store from "./store/store";
import reducer from "./store/reducer";
import "./styles/main.scss";

function initialise() {
  const store = new Store(reducer);
  // Modal
  let DOMelement = document.querySelector(".modal");
  let { getSlice, manipulateDom } = new Paginate(DOMelement, customersData);
  let data = getSlice(1);
  manipulateDom(data);
}

document.addEventListener("DOMContentLoaded", initialise);
