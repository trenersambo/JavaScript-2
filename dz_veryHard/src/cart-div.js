const API_URL = "http://localhost:3000"

import cartitem from './cart-item';

Vue.component('cart-div', {
    props: [],
    data: function() {
      return {
        goods: [],
        isVisibleCart: false,
        totalPrice: 0
      }
    },
    template: `
      <div class="cart" v-if="isVisibleCart">
        <h2>Корзина</h2>
        <ul class="cart__list">
          <cart-item v-for="good in goods" :key="good.id" :good="good" :rendercart="renderCart"></cart-item>
        </ul>
        <p>Полная стомость всех товаров в корзине {{totalPrice}}</p>
      </div>
      `,
    methods: {
      async renderCart() {
        const responce = await fetch(`${API_URL}/cartData`);
        if (responce.ok) {
          const cartGoods = await responce.json();
          this.goods = cartGoods;
          let total = 0;
          cartGoods.forEach(item => {
            total+=item.price*item.quantity;
          });
          this.totalPrice = total;
          if (total !=0) {
            this.isVisibleCart = true;
          }
        }
      }
    },
    async mounted() {
      await this.renderCart();
    }
  })

  export default {
      cartdiv: 'cart-div',
  }