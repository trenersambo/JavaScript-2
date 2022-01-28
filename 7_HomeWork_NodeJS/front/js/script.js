const API_URL = "http://localhost:3000"

Vue.component('search-goods', {
  props: ['filtergoods'],
  template: `
    <div>
      <input type="text" class="goods-search" v-model="searchStr" @keyup="applyFilter">
      <button class="search-button header__button" type="button" @click="applyFilter">Искать</button>
    </div>
  `,
  data: function() {
    return {
      searchStr: '',
    }
  },
  methods: {
    applyFilter() {
      this.filtergoods(this.searchStr);
    }
  }
})

Vue.component('goods-list', {
  props: ['goods', 'addtocart', 'servererrorvisible'],
  template: `
    <div class="goods-list">
      <goods-item v-for="good in goods" :key="good.id" :good="good"  :addtocartitem="addToCart"></goods-item>
      <server-error :visible="servererrorvisible"></server-error>
      <search-error v-if="!servererrorvisible" :goods="goods"></search-error>
    </div>
    `,
  methods: {
    addToCart(good) {
      this.addtocart(good);
    },
  }
})

Vue.component('goods-item', {
  props: ['good', 'addtocartitem'],
  template: `
    <div class="goods-item">
      <h3>{{good.title}}</h3>
      <h4>{{good.price}}</h4>
      <button @click='addToCart'>Добавить в корзину</button>
    </div>
  `,
  methods: {
    addToCart() {
      this.addtocartitem(this.good);
    },
  }
})

Vue.component('server-error', {
  props: ['visible'],
  template:`
    <div v-if="visible">
      <p>Не удается получить спиок товаров с сервера! Возможно сервер сейчас недоступен, либо чересчур перегружен, либо возникли проблемы с интернет-подключением!</p>
    </div>
  `
})

Vue.component('search-error', {
  props: ['goods'],
  template:`
    <div v-if="goods.length===0">
      <p>По Вашему запросу ничего не найдено!</p>
    </div>
  `
})

Vue.component('cart-div', {
  props: ['goods', 'visible', 'totalprice', 'addtocart', 'removefromcart'],
  template: `
    <div class="cart" v-if="visible">
      <h2>Корзина</h2>
      <ul class="cart__list">
        <cart-item v-for="good in goods" :key="good.id" :good="good" :addtocartitem="addToCart" :removefromcartitem="removeFromCart"></cart-item>
      </ul>
      <p>Полная стомость всех товаров в корзине {{totalprice}}</p>
    </div>
    `,
  methods: {
    addToCart(good) {
      this.addtocart(good);
    },
    removeFromCart(good) {
      this.removefromcart(good);
    }
  },
})

Vue.component('cart-item', {
  props: ['good', 'addtocartitem', 'removefromcartitem'],
  template: `
    <li class="cart__item">
      <p>{{good.title}}</p>
      <p>{{good.price}}</p>
      <p>Количество: {{good.quantity}}</p>
      <button @click='addToCart'>+</button>
      <button @click='removeFromCart'>-</button>
    </li>
  `,
  methods: {
    addToCart() {
      this.addtocartitem(this.good);
    },
    removeFromCart() {
      this.removefromcartitem(this.good);
    }
  }
})

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    cart: {
      isVisibleCart: false,
      goods: [],
      totalPrice: 0,
    },
    serverErrorVisible : false,
  },
  methods: {
    async getProducts() {
      const responce = await fetch(`${API_URL}/catalogData`).catch((error) => {
        if (error) this.serverErrorVisible = true;
      });
      if (responce.ok) {
        const catalogItems = await responce.json();
        catalogItems.forEach(item => {this.goods.push({title: item.product_name, price: item.price, id:item.id_product})});
        this.filteredGoods = this.goods;
      } else {
        this.serverErrorVisible = true;
      }
    },
    filterGoods(searchStr) {
      const regExp = new RegExp(searchStr, 'i')
      this.filteredGoods = this.goods.filter(good => regExp.test(good.title))
    },
    toggleCart() {
      if(this.cart.isVisibleCart) this.cart.isVisibleCart = false
      else this.cart.isVisibleCart = true;
    },
    async addToCart(good) {
      let currentCartItem = this.getGoodById(this.cart.goods, good.id);
      if (!currentCartItem) {
        currentCartItem = {title: good.title, price: good.price, id: good.id, quantity: 1};
        this.cart.goods.push(currentCartItem);
      } else currentCartItem.quantity++;
      this.cart.isVisibleCart = true;
      this.cart.totalPrice+=good.price;
      const responce = await fetch(`${API_URL}/addToCart`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(currentCartItem)
      })
    },
    async removeFromCart(good) {
      let currentCartItem = this.getGoodById(this.cart.goods, good.id);
      if (currentCartItem.quantity > 1) {
        currentCartItem.quantity--;
      } else if (currentCartItem.quantity === 1) {
        this.cart.goods.splice(this.cart.goods.indexOf(currentCartItem), 1);
      }
      if (this.cart.goods.length === 0) {
        this.cart.isVisibleCart = false;
      }      
      this.cart.totalPrice-=good.price;
      const responce = await fetch(`${API_URL}/removeFromCart`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(currentCartItem)
      })
    },
    getGoodById(searchArr, id) {
      let res;
      searchArr.forEach(item => {
        if (item.id == id) {
          res = item;
        }
      });
      return res;
    },
    async cartInit() {
      const responce = await fetch(`${API_URL}/cartData`);
      if (responce.ok) {
        const cartGoods = await responce.json();
        this.cart.goods = cartGoods;
        let total = 0;
        cartGoods.forEach(item => {total+=item.price*item.quantity});
        this.cart.totalPrice = total;
        if (total !=0) {
          this.cart.isVisibleCart = true;
        }
      }
    }
  },
  async mounted() {
    await this.getProducts();
    await this.cartInit();
  }
});