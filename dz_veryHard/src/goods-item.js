const API_URL = "http://localhost:3000"

Vue.component('goods-item', {
    props: ['good', 'rendercart'],
      template: `
        <div class="goods-item">
          <h3>{{good.title}}</h3>
          <h4>{{good.price}}</h4>
          <button @click='addToCart'>Добавить в корзину</button>
        </div>
      `,
      methods: {
        async addToCart() {
          const responce = await fetch(`${API_URL}/addToCart`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
              title: this.good.title, 
              price: this.good.price,
              id: this.good.id,
              quantity: 1
            }),
          })
          this.rendercart();
        },
      }
    })

export default {
    goodsitem: 'goods-item'
};