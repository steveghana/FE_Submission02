function Modal(DOMelement, response) {
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
  const clearDom = (container) => {
    [...container.querySelectorAll(".table__row-item")].forEach((item) => {
      container.removeChild(item);
    });
  };

  const next = () => {
    if (currentPage >= DATALENGTH) return;
    ++currentPage;
    let data = this.getSlice(currentPage);
    this.manipulateDom(data);
  };
  const prev = () => {
    if (currentPage <= 1) return;
    --currentPage;
    let data = this.getSlice(currentPage);
    this.manipulateDom(data);
  };

  /* === PUBLIC ===*/
  this.getSlice = (newPage) => {
    pageNumData.innerText = `${newPage} of ${DATALENGTH}`;
    const indexOflastPost = newPage * POSTPERPAGE;
    const indexOfFirstPost = indexOflastPost - POSTPERPAGE;
    const currentPage = response.slice(indexOfFirstPost, indexOflastPost);
    return currentPage;
  };
  this.addElementsToTable = (data = []) => {
    let Elementcontainer = document.body.querySelector(".table__data");
    if (Elementcontainer.hasChildNodes()) clearDom(Elementcontainer);
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
      /* === APPEND TO CONTAINER === */
      wrapper.append(productName, productStatus);
      Elementcontainer.appendChild(wrapper);
    });
  };
}

export default Modal;
