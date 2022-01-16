const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
const basketIsEmpty = '<p class="cartEmpity">Корзина пуста!</p>'
const tableTemplate = `<h3>Корзина</h3>
    <table class="basket-table">
    <tbody>
        <tr class="basket-header">
            <th>Товар</th>
            <th>Цена</th>
            <th>Кол-во</th>
        </tr>
    </tbody>
    </table>`


let getRequestPromise = (url) => {
    return new Promise((res, rej) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    rej(`Error! ${xhr.status}: "${xhr.statusText}"`);
                } else {
                    res(xhr.responseText);
                }
            }
        };
        xhr.send();
    });
}

class ProductList {
    constructor(basket, container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this.basket = basket;
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this.render();
                this.buyButtonElems = document.querySelectorAll('.buy-btn');
                this._applyProductsListeners();
            });
    }

    _getProducts() {
        return getRequestPromise(`${API}/catalogData.json`)
            .then(response => JSON.parse(response))
            .catch(error => {
                console.log(error);
            })
    }

    get totalCost() {
        return this.goods.reduce(function(sum, item) {
            if (item.hasOwnProperty('price') && !Number.isNaN(item.price)) {
                sum += item.price;
            }
            return sum;
        }, 0);
    }

    _applyProductsListeners() {
        console.log(this.buyButtonElems);
        for (let buyButton of this.buyButtonElems) {
            buyButton.addEventListener('click', () => {
                this.basket.addItem(buyButton.parentNode);
            });
        }
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObject = new ProductItem(product);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render())
        }
        console.log(`Total product cost is: ${this.totalCost}`);
    }
}

class ProductItem {
    constructor(product, img = 'img/no_foto.jpg') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}" data-title="${this.title}" data-price="${this.price}">
                    <img src="${this.img}" alt="product image">
                    <h3>${this.title}</h3>
                    <p>Цена: ${this.price} \u20bd</p>
                    <button class="buy-btn">Положить в корзину</button>
                </div>`;
    }
}

class Basket {
    constructor(container = '.basket') {
        // this.user = user;
        this.basketElem = document.querySelector(container);
        this.cartButton = document.getElementById('btn-cart');
        this.cartButton.addEventListener('click', () => {
            this._switchBasketDisplay();
        });
        // this.selectedProducts = [];
        this.basketList = [];
        this._fetchBasket()
            .then(data => {
                this._updateBasketView(data);
            });
    }


    _applyBasketListeners() {
        console.log(this.removeButtonElems);
        // console.log(this.buyButtonElems);
        for (let rmButton of this.removeButtonElems) {
            rmButton.addEventListener('click', (event) => {
                this.removeItem(event.target);
            });
        }
    }
    
    _clearBasketView() {
        // очистка .basket
        let el = this.basketElem;
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    }

    _updateBasketView(data) {
        // распаковка данных корзины и отрисовка
        this.basketList = [...data['contents']];
        this.total = data['amount'];
        this.positionCount = data['countGoods'];
        this.render();
    }

    _fetchBasket() {
        // получение содержимого корзины с сервера
        return fetch(`${API}/getBasket.json`)
            .then(response => response.json())
            .catch(error => {
                console.log(error);
            });
    }

    _switchBasketDisplay() {
        // отображение и скрытие корзины
        this.basketElem.classList.toggle('hidden-element')
    }

    _modifyBasket(product) {
        // Выполнение изменений отображения корзины
        let row = document.querySelector(`.basket-row[data-basket-id="${product.id_product}"]`);
        row.querySelector('.product-quantity').textContent = `${product.quantity}`;
        this.basketElem.querySelector('#total-amount-field').textContent = `${this.total}`;
    }

    addItem(elem) {
        // добавление единицы продукта в корзину
        fetch(`${API}/addToBasket.json`)
            .then(response => response.json())
            .then(data => {
                if (data['result'] !== 1) {
                    throw `Error while performing '${action}' on ${product.product_name} (${product.id_product}): ${data['result']}`;
                } else {
                    let productId = +elem.dataset['id'];
                    let found = this.basketList.find(product => product.id_product === productId);
                    this.total += +elem.dataset['price'];
                    if (found) {
                        found.quantity++;
                        this._modifyBasket(found);
                    } else {
                        let product = {
                            id_product: productId,
                            price: +elem.dataset['price'],
                            product_name: elem.dataset['title'],
                            quantity: 1,
                        };
                        this.positionCount += 1;
                        this.basketList.push(product);
                        this.render();
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    removeItem(elem) {
        // удаление товара
        fetch(`${API}/deleteFromBasket.json`)
            .then(response => response.json())
            .then(data => {
                if (data.result === 1) {
                    let productId = +elem.dataset['productId'];
                    let found = this.basketList.find(product => product.id_product === productId);
                    this.total -= found.price;
                    if (found.quantity > 1) { 
                        found.quantity--;
                        this._modifyBasket(found);
                    } else {
                        this.positionCount -= 1;
                        this.basketList.splice(this.basketList.indexOf(found), 1);
                        this.render();

                    }
                } else {
                    alert('Error');
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        // Организация отображения набора из BasketItem 
        this._clearBasketView();
        if (!this.basketList.length) {
            this.basketElem.insertAdjacentHTML('beforeend', basketIsEmpty)
        } else {
            this.basketElem.insertAdjacentHTML('beforeend',
                `${tableTemplate}
                <p>В корзине товаров: <span id="total-cost-field">${this.positionCount}</span></p>
                <p>Общая стоимость: <span id="total-amount-field">${this.total}</span> \u20bd</p>`);
            let tableElem = this.basketElem.querySelector('.basket-table > tbody');
            for (let item of this.basketList) {
                let basketObject = new BasketItem(item);
                tableElem.insertAdjacentHTML('beforeend', basketObject.render())
            }
        }
        this.removeButtonElems = document.querySelectorAll('.remove-btn');
        this._applyBasketListeners();
    }
}

class BasketItem {
    constructor(position) {
        this.id = position.id_product;
        this.title = position.product_name;
        this.price = position.price;
        this.quantity = position.quantity;
        // this.img = img;
    }

    render() {
        // Отображение индивидуальных BasketItem
        return `<tr class="basket-row" data-basket-id="${this.id}">
                    <td class="product-title">${this.title}</td>
                    <td class="product-price">${this.price} \u20bd</td>
                    <td class="product-quantity">${this.quantity}</td>
                    <td><button class="remove-btn" data-product-id="${this.id}">удалить</button></td>
                </tr>`;
    }
}

let basket = new Basket();
let plist = new ProductList(basket);
