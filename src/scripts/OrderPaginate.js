/**
 * Root Pagination function .
 *
 * @param response  this represents the immutable data to render.
 */
function Pagination(response) {
  const POSTPERPAGE = 10;
  let currentPage = 1;
  const DATALENGTH = +Math.ceil(response.length / POSTPERPAGE);
  const pageNumData = document.querySelector(".page_num");
  const btnPrev = document
    .querySelector(".icon-prev")
    .addEventListener("click", (event) => {
      event.preventDefault();
      prev();
    });

  const btnNext = document
    .querySelector(".icon-next")
    .addEventListener("click", (event) => {
      event.preventDefault();
      next();
    });

  /*=== PRIVATE ===*/
  /**
   * A private function which clears the table on each pagination point to avoid extra data renders.
   *
   * @param container  this represents the element which contains the table data.
   */
  const clearTable = (container) => {
    [...container.querySelectorAll(".table__row-item")].forEach((item) => {
      container.removeChild(item);
    });
  };
  /**
   * A private function which dynamically renders colors based on string type
   *
   * @param name this represents the starting point or current page.
   * @param element  this represents the tag elements to set the colors: Destructured to return the style object.
   */
  const rendStatuscolor = (name, { style }) => {
    switch (name) {
      case "delivered":
        style.color = "green";
        return;
      case "processing":
        style.color = "red";
      default:
        return;
    }
  };
  const next = () => {
    if (currentPage >= DATALENGTH) return;
    ++currentPage;
    let data = this.getSlice(currentPage);
    this.addElementsToTable(data);
  };
  const prev = () => {
    if (currentPage <= 1) return;
    --currentPage;
    let data = this.getSlice(currentPage);
    this.addElementsToTable(data);
  };
  /* === PUBLIC ===*/
  /**
   * A public function which creates slices of data from an array for pagination
   *
   * @param newPage this represents the starting point or current page.
   */
  this.getSlice = (newPage) => {
    pageNumData.innerText = `${currentPage > 1 ? currentPage : newPage} of ${DATALENGTH}`;
    const indexOflastPost = newPage * POSTPERPAGE;
    const indexOfFirstPost = indexOflastPost - POSTPERPAGE;
    const activePage = response.slice(indexOfFirstPost, indexOflastPost);
    return activePage;
  };
  /**
   * A public function which renders data to the order table
   *
   * @param data this represents the data to be rendered.
   */
  this.addElementsToTable = (data = []) => {
    let Elementcontainer = document.body.querySelector(".table__data");
    if (Elementcontainer.hasChildNodes()) clearTable(Elementcontainer);
    data.forEach((item) => {
      /* === CREATE ELEMENT */
      let wrapper = document.createElement("div");
      let productName = document.createElement("div");
      let productStatus = document.createElement("div");
      /* === ADD CLASSES */
      wrapper.classList.add("table__row-item");
      productName.classList.add("product__name-item");
      productStatus.classList.add("product__status-item");
      /* === ADD INNERTEXT === */
      productName.innerText = item.product.name;
      productStatus.innerText = item.status;
      /* === RENDER STATUS COLORS === */
      rendStatuscolor(item.status, productStatus);
      /* === APPEND TO CONTAINER === */
      wrapper.append(productName, productStatus);
      Elementcontainer.appendChild(wrapper);
    });
  };
}

export default Pagination;
