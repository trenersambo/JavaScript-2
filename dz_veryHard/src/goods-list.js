import goodsitem from './goods-item'

Vue.component('goods-list', {
    props: ['goods', 'servererrorvisible', 'rendercart'],
    template: `
      <div class="goods-list">
        <goods-item v-for="good in goods" :key="good.id" :good="good" :rendercart="renderCart"></goods-item>
        <server-error :visible="servererrorvisible"></server-error>
        <search-error v-if="!servererrorvisible" :goods="goods"></search-error>
      </div>
      `,
    methods: {
      renderCart() {
        this.rendercart()
      }
    },
  })

  export default {
    goodslist: 'goods-list',
  }