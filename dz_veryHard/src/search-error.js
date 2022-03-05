Vue.component('search-error', {
    props: ['goods'],
    template:`
      <div v-if="goods.length===0">
        <p>По Вашему запросу ничего не найдено!</p>
      </div>
    `
  })
  export default {
      searcherror: 'search-error'
  }