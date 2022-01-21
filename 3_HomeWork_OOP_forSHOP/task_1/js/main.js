const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

// Урок№3, задание №1: перевести на Promise (НЕ ИСПОЛЬЗОВАТЬ fetch!): start
function getRequest(url, cb) { 

    return new Promise ( function (res, rej){

      var xhr = new XMLHttpRequest();


      xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {
          if (xhr.status !== 200) {
            res('Error!');
          } else {
            rej(xhr.responseText);
          }
        }

      } ;

        xhr.open('GET', url, true);
        xhr.send( );
        
    })
}
//Урок№3, задание №1: перевести на Promise (НЕ ИСПОЛЬЗОВАТЬ fetch!): end




class ProductList {
    constructor(cart, container = '.products') {
        this.cart = cart;
        this._container = container;
        this._goods = [];
        this._productObjects = [];
        this.getProducts().then((data) => {
          this._goods = data;
          this._render();
          console.log(this.sum());
        });

        // this._fetchGoodsData();
    }

    addToCart(id) {
      // some code get good by id

      // this.cart.add(goodData);
    }

    // _fetchGoodsData() {
    //   getRequest(`${API}/catalogData.json`, (response) => {
    //     console.log(response);
    //     this._goods = JSON.parse(response);
    //     console.log(this._goods);
    //     this._render();
    //   });
    // }

    getProducts() {
      return fetch(`${API}/catalogData.json`)
          .then(response => response.json())
          .catch(err => console.log(err));
    }

    sum() {
      return this._productObjects.reduce((sum, { price }) => sum + price, 0);
    }

    _render() {
        const catalogBlock = document.querySelector(this._container);

        for (let product of this._goods) {
            const productObject = new ProductItem(product);
            console.log(productObject)
            this._productObjects.push(productObject);
            catalogBlock.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        }
    }
}

class ProductItem {
  constructor(product, img='https://via.placeholder.com/200x150') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  getHTMLString() {
    return `<div class="product-item" data-id="${this.id}">
                      <img src="${this.img}" alt="Some img">
                      <div class="desc">
                          <h3>${this.title}</h3>
                          <p>${this.price} \u20bd</p>
                          <button class="buy-btn">Купить</button>
                      </div>
                  </div>`;
  }
}

const cart = new Cart();
const catalog = new ProductList(cart);
