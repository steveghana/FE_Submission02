function Modal(DOMelement, response) {
  const POSTPERPAGE = 10;
  let currentPage = 1;
  const DATALENGTH = +Math.ceil(response.length / POSTPERPAGE);
  const pageNumData = document?.querySelector(".page_num");
  const btnPrev = document
    ?.querySelector(".icon-prev")
    .addEventListener("click", (event) => {
      event.preventDefault();
      prev();
    });

  const btnNext = document
    ?.querySelector(".icon-next")
    .addEventListener("click", (event) => {
      event.preventDefault();
      next();
    });

  /*=== PRIVATE ===*/
  const clearTable = (container) => {
    [...container.querySelectorAll(".table__row-item")].forEach((item) => {
      container.removeChild(item);
    });
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
  const renderStatusColor = (name, element) => {
    switch (name) {
      case "processing":
        element.style.color = "red";
        return;
      case "delivered":
        element.style.color = "green";
        return;
    }
  };
  /* === PUBLIC ===*/
  this.getSlice = (startNum) => {
    pageNumData.innerText = `${
      currentPage > 1 ? currentPage : startNum
    } of ${DATALENGTH}`; //pagination toggle item
    const indexOflastPost = startNum * POSTPERPAGE;
    const indexOfFirstPost = indexOflastPost - POSTPERPAGE;
    const newPage = response.slice(indexOfFirstPost, indexOflastPost);
    return newPage;
  };
  this.addElementsToTable = (data = []) => {
    let Elementcontainer = document?.body.querySelector(".table__data");
    if (Elementcontainer.hasChildNodes()) clearTable(Elementcontainer);
    data.forEach((item, i) => {
      /* === CREATE ELEMENT */
      let RowContainer = document?.createElement("div");
      let productName = document?.createElement("div");
      let productStatus = document?.createElement("div");
      /* === ADD CLASSES */
      RowContainer.classList.add("table__row-item");
      productName.classList.add("product__name-item");
      productStatus.classList.add("product__status-item");
      /* === ADD INNERTEXT === */
      productName.innerText = item.product.name;
      productStatus.innerText = item.status;
      /* === RENDER CORRESPONDING COLOR */
      renderStatusColor(item.status, productStatus);
      /* === APPEND TO CONTAINER === */
      RowContainer.append(productName, productStatus);
      Elementcontainer.appendChild(RowContainer);
    });
  };
}

export default Modal;
