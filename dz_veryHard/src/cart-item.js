const API_URL = "http://localhost:3000"

Vue.component('cart-item', {
    props: ['good', 'rendercart'],
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
      async addToCart() {
        const responce = await fetch(`${API_URL}/addToCart`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(this.good),
        })
        await this.rendercart();
      },
      async removeFromCart() {
        const responce = await fetch(`${API_URL}/removeFromCart`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(this.good)
        })
        await this.rendercart();
      }
    }
  })

  export default {
      cartitem: 'cart-item'
  }