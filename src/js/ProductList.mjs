import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const {
    Brand: { Name },
    NameWithoutBrand,
    Images: { PrimaryMedium },
    FinalPrice,
    Id,
  } = product;
  return `<li class="product-card">
            <a href="/product-pages/?product=${Id}">
                <img src="${PrimaryMedium}"
                alt="${NameWithoutBrand}" />
                <h3 class="card__brand">${Name}</h3>
                <h2 class="card__name">${NameWithoutBrand}</h2>
                <p class="product-card__price">$${FinalPrice}</p>
            </a>
            </li>
    `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.dataSource = dataSource;
    this.category = category;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    document.querySelector(".title").innerHTML = this.category;
  }

  filterList(list) {
    const tentsID = ["880RR", "985RF", "985PR", "344YJ"];
    return list.filter((product) => tentsID.includes(product.Id));
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
