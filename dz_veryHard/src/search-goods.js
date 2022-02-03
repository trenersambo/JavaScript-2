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

   export default {
       searchgoods: 'search-goods',
   }