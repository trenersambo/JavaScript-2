const API_URL = "http://localhost:3000";

const app = new Vue({
    el: '#app',
    data: {
      goods: [],
      filteredGoods: [],
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
      async renderCart() {
        await this.$refs.cart.renderCart();
      }
    },
    async mounted() {
      await this.getProducts();
    }
  });

  export default app;