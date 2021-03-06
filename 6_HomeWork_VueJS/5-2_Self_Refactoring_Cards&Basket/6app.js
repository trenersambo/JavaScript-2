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

 methods:{
//Ф-ия для Удаления 1 Товара из Корзины (клик тащит id Товара)
 delOneGood(id ){
 console.log  `Клик на удаление 1 Товар с id  ${id} `

 //1.Запрос на Сервер в кат-г /deleteFromBasket
  fetch( `${API}/deleteFromBasket.json` )
    .then ( (res)=>{
      return res.json();
  })
    .then( (data)=>{
      // Чтоб этот .then увидел массив из props: arrayForBasket
      let arrayForBasket = this.arrayForBasket

      //что внутри JSONфайла
      console.log  `Ответ /deleteFromBasket: ${data}`;//{result: 1}

      // Если result === 1 (сервер говорит, что есть еще товар)
      if (data.result === 1){
      
      //Ф-ция поиска ИНДЕКСА МАССИВА, где надо " quantity -1 "
      function searchIndex(arrayForBasket){
        
        //задать условие .id массва д.б. === переданному id
        return arrayForBasket.id_product === id
      }

      //метод .findIndex укажет на ИНДЕКС МАССИВА (из return)
     const getIndex =  arrayForBasket.findIndex (searchIndex)

     //в arrayForBasket[индекс] сделаем значение " quantity-1"
      arrayForBasket[getIndex].quantity -=1
     
        if (arrayForBasket[getIndex].quantity <= 0){
        arrayForBasket[getIndex].quantity = 0
      }
      } //if:: end

 })//2й .then ::end

       .catch (function(erorr){
        console.log (erorr)
        })
 
 },//delOneGood::end

 },//methods::end

  template:
  `<div >

  <div 
    :delOneGood = "delOneGood"
   v-for = "oneGood in arrayForBasket"
  :key = "oneGood.id_product"
  >

      <!--<p>id: {{oneGood.id_product}}</p>-->
      <p>Цена: {{oneGood.price}}</p>
      <p>Имя_Товара: {{oneGood.product_name}}</p>
      <p >Количество: {{oneGood.quantity}}</p>

      <p>Общая стоимость: {{oneGood.price*oneGood.quantity}}</p>      

      <button
      @click = "delOneGood(oneGood.id_product )"
      >
      <i class="fa fa-trash-o"> Удалить</i>      
      </button>




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
 
  > Корзина</div>


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