const API =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

//Компонент: 2 карточки Товаров (Ноут , Мышка)
 Vue.component('twoCard-component',{
props:{
  arrayForItem: Array
},

methods:{
  clickPlusOne(id_product ){
  console.log  `НажалКнопку с id: ${id_product}`
 

for (let i = 0; i<this.arrayForItem.length; i++){
//Если id кликнутогоТовара == id перебираемогоТовара, то +1
  if (id_product == this.arrayForItem[i].id_product){
  this.arrayForItem[i].quantity ++
  
  console.log `+1 в Товаре ${this.arrayForItem[i].product_name}`
  }
}
  }
},

template:
`<div>
  <div 
    class="twoGoods_block"
    v-for="oneItem in arrayForItem"
    :key = "oneItem.id_product" > 

      <p>id: {{oneItem.id_product}}</p>
      <p>Цена: {{oneItem.price}}</p>
      <p>_ИМЯ_: {{oneItem.product_name}}</p>

      <!--<p>quantity: {{oneItem.}}</p> -->

 <!--(oneItem.id_product): передаю id Товара в Корзину
от клика в КарточкеТовара -->
      <button
      @click = "clickPlusOne(oneItem.id_product )"
      >В корзину (+1)</button>



  </div>
</div>`

 }) //twoCard-component::end

//Компонент: КОРЗИНА с 2-мя товарами внутри
  Vue.component('basket-component',{

  props:{
  arrayForBasket: Array,
   

  },

 

  template:
  `<div >
{{showBasket}}

  <div 

   :showBasket = "showBasket"
   v-for = "oneGood in arrayForBasket"
  :key = "oneGood.id_product"
  
  >

      <!--<p>id: {{oneGood.id_product}}</p>-->
      <p>Цена: {{oneGood.price}}</p>
      <p>Имя_Товара: {{oneGood.product_name}}</p>
      <p>Количество: {{oneGood.quantity}}</p> 
      <hr>

  </div>

  </div>`
 
  }) //basket-component::end


// Родитель (приложение)
const app = new Vue ({
el:"#app",

data:{
arrayForItem: [],
arrayForBasket:[],
showBasket: false,

},

computed:{
fromApi(){
  fetch( `${API}/getBasket.json` )
    .then ( (ok)=>{
      return ok.json();
  })
    .then( (data)=>{
      //что внутри JSONфайла
      console.log  `Получено из getBasket.json: ${data}`  ;

      //перебор data.contents и полученн.значения
      //складируем в массив arrayForItem
      for (let item of data.contents){
      this.arrayForItem.push(item )

      //Копия собранного массива - для рендера Корзины
      this.arrayForBasket = this.arrayForItem

      }
      
      //Что прилетело в массив(имя,цена, кол-во)
      console.log `Карточки2Товаров с Сервера: ${this.arrayForItem}`  //[0]{Товар},[1]{Товар}
      console.log `Копия - для рендера Корзины: ${this.arrayForBasket}` 
      })
      .catch (function(erorr){
        console.log (erorr)
        })
  

}//fromApi()::end

},//computed::end

 


template:
`<div class="wrapper">

  <!-- Шапка. В ней расположены: Поиск. Корзина -->
  <div class="header">
  <!--  ПОИСК (тег для компонента)  -->
  <div class="searchCompon">Поиск(Vue-компонент)</div>

  <div class="basketCompon"
  @click = "showBasket = !showBasket"
 
  >{{showBasket}} Корзина</div>


  <!--  КОРЗИНА (тег для компонента)  -->
  <basket-component
  class="basket_block"
  :arrayForBasket ="arrayForBasket"
    v-show = "!showBasket"
  > </basket-component>
  
  </div>  <!-- header:: end -->



  <!-- Блок для 2 КарточекТовара "products":: start-->
  <div class= "products">

  {{fromApi}}


  <twoCard-component
  :arrayForItem = "arrayForItem"
  ></twoCard-component>

  </div><!-- "products":: end -->


</div> <!-- "wrapper":: end -->`


}) //const app::end