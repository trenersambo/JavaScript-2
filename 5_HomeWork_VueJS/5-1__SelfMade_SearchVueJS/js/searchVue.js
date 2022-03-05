const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    products: [],
    imgCatalog: 'noFoto.jpg',

    //для строки ПОИСК
    searchLine:'',

    //разметка Корзины
insertCart:
  `
  <!-- КОРЗИНА: start-->
<div class="baseBasket">

<!-- общая обертка class="basket">КОРЗИНА: start -->
<div class="basket">КОРЗИНА

<div class="basket_top">
<div class="bf_foto">фото</div>
<div class="bf_name">наименование</div>
<div class="bf_price">цена</div>
<div class="bf_amount">Кол-во</div>
</div>


<div class="insertInBasket">
    <!--в insertInBasket такой блок будет вставляться: start  -->
<!--        <div class="basket_goods">
            <div class="bfg_foto">фото-1</div>
            <div class="bfg_name" data-id="этоID=89">ИмяТовара-1</div>
            <div class="bfg_price">1000</div>
            <div class="bfg_amount" data-quantity="">0</div>
        </div>

        <div class="amount_change">
            <div class="ac_plus" data-plus="1">+</div>
            <div class="ac_minus" data-minus="1">-</div>

        </div>-->
        
<!--в insertInBasket такой блок будет вставляться: end  -->        
</div>


        <div class="totalSumm">
        <p class="ts_p">Сумма итого:</p>
        </div> 

</div>
 <!-- общая обертка class="basket">КОРЗИНА: end-->

</div>
<!-- КОРЗИНА: end-->
  ` ,


  },

  methods: {
  //ф-ция, вызывавется кнопкой ПОИСК
    filterGoods(searchLine){
    console.log (`искомое слово: ${searchLine}` )//мыш

    //Обыск всех 'desc > h3' на присутствие в них искомого СЛОВА
    let desc_h3 = document.querySelectorAll('.desc > h3')
     desc_h3.forEach(function(event){

    const regexp = new RegExp (searchLine, 'i'); //(мыш / 'любойРегистр')
    console.log (regexp) // (мыш /i)

      event.innerHTML
      console.log (`forEach нашел: ${event.innerHTML}`)//'Ноутбук' //'Мышка'

      if (regexp.test(event.innerHTML) == false){
        console.log (`div со словом ${event.innerHTML} -> скрыть!`)
        
        //скрываю 'product-item' где нет искомого слова
        event.parentElement.parentElement.style.display = 'none'
      }
     })

  },


    getJson(url){
    return fetch(url)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      })
    },
    addProduct(product){
      console.log(product.id_product);
    }
  },
  beforeCreate() {},
  created() {
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for(let el of data){
          this.products.push(el);
        }
      });
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},


});
