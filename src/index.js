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
  //AutoComplete
  let inputdata = document.getElementById("autocomplete");
  inputdata.addEventListener("change", (event) => {
    let data = event.target.value;
    let newdata = autocomplete(data, customersData);
    if (newdata.length > 10) {
      manipulateDom(getSlice(1));
    } else {
      manipulateDom(newdata);
    }
  });
}

document.addEventListener("DOMContentLoaded", initialise);
