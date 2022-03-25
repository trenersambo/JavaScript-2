//Компонент_№1 для генерации Карточек Товара (инф. с Сервера)

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component ('prods-component',{


 
data: function() {
//в [ ] собираю ч/з push товар с Сервер/catalogData.json
return{
 arr:[],
 
foto: './noFoto.jpg'
}

},

computed:{
// ф-ция, чтоб все из Сервера попадало в массив []
goodsArrayFromAPI(){

fetch ( `${API}/catalogData.json` )
  .then ( (result)=>{
    return result.json();
  })
  .then( (data)=>{
    //data - пришла с сервера
    console.log ( data );

      for (let el of data){
      //добавляю каждую json-строку с сервера в arr[]
        this.arr.push (el)
   
      } 
      //Тест, что в итоге попало в arr []
      console.log ( this.arr  );
      
  })

  .catch (function(erorr){
    console.log (erorr)
  })

    }, 

    

},

methods:{
      plusQuantity(){
      console.log ('тест клика на Купи-ка!')
    return this.quantity = this.quantity+1
    }
},

template: 
` <!-- Шаблон (КарточкиДвухТоваров ) для передачи в index.html -->
<div class= "products">
    {{ goodsArrayFromAPI  }} 
     
    <div class="product-item"
      v-for = "el of arr" 
      :key = "el.id_product" > 

     <!--  тест с сервера:<br>{{el}} -->
      
      <p> <img :src="foto" alt="" class= "img"> </p>
      <p>{{el.product_name}}</p>
      <p>{{el.price}}</p>

      <button class="buy-btn" @click = "plusQuantity">Купи-ка!</button>
  
    </div>

</div> <!-- class="products: end --> `


})//Компонент_№1 (Карточки Товаров для покупки): end

/* =================================== */

//Компонент_№2 для генерации Корзины с 2-мя товарами в ней 
//(эти 2 товара так прописаны в файле ' getBasket.json ' на Сервере)

Vue.component ('basket-component',{
 
data: function() {
//в [ ] собираю ч/з push товар с Сервер/getBasket.json
return{
arrayForBasket:[],
foto: './noFoto.jpg',
showBasket: false, //клик: показ/спрятать Корзину
}

},

computed:{
// ф-ция, чтоб все из Сервера попадало в массив []
basketArrayFromAPI(){

//ES6.ОБращение к json-файлу на серере
fetch ( `${API}/getBasket.json` )
  .then ( (result)=>{
    return result.json();
  })
  .then( (data)=>{
    //data - пришла с сервера
    console.log ( data );
    
      //data.contents - заход вглубь структуры ф-ла с сервера
      for (let el of data.contents){
      //добавляю каждую json-строку с сервера в arr[]
        this.arrayForBasket.push (el)
   
      } 
      //Тест, что в итоге попало в arr []
      console.log ( this.arrayForBasket );

  })

  .catch (function(erorr){
    console.log (erorr)
  })
 }

},

template: 
`  <div> 
<!-- вызов computed с функ-ей basketArrayFromAPI-->
 {{basketArrayFromAPI}}

 <button 
 class="btn-cart" type="button" 
 @click="showBasket = !showBasket" >Корзина</button>

<div class="cart-block" v-show = "showBasket"> 

  <div class="cart-item"
  v-for = "elm of arrayForBasket"
  :key = " elm.id_product" >
  <!--test: {{elm }}-->

      <div class="product-bio">
          <img :src="foto" alt="Some image">

          <div class="product-desc">
              <p class="product-title">{{elm.product_name}}</p>
              <p class="product-quantity">Количество: {{elm.quantity}}</p>
              <p class="product-single-price">{{elm.price}} </p>
          </div>
      </div><!-- class="product-bio":end -->

      <div class="right-block">
          <p class="product-price">{{elm.quantity*elm.price}} </p>
          <button class="del-btn" @click="$emit('remove', elm)">&times;</button>
      </div>

  </div><!-- class="cart-item":end -->

</div> <!-- class="cart-block":end -->

</div>`


})//Компонент_№2 (КОРЗИНА): end

/* =================================== */

//Поиск и фильтровать должен по поиску

Vue.component ('search-component',{

data:function(){
  return{
  searchWord: '',
  }
},
methods:{
clickSearch(el){
console.log (`Ищу слово (ч/з функцию):${el}`); //мыш

const regexp = new RegExp (el, 'i'); //мыш, ‘любойРегистр’
 
 //массив, куда попадут найденные слова в Карточках товаров
let arrayFromProds = [];

  for (let i = 0; i < this.$root.$children[2]._data.arr.length; i++){
     
  //складываю в массив arrayFromProds найденные Имена в Карточках Товаров 
    arrayFromProds.push(this.$root.$children[2]._data.arr[i].product_name)
 
 console.log (`В массив arrayFromProds попали: ${arrayFromProds[i]}`)//Ноутбук //Мышка
 
    // если искомое слово !== слову в КарточкеТовара, то такую карточку скрыть
    if (regexp.test( arrayFromProds[i]) !==true){
    console.log (`Карточку " ${ arrayFromProds[i]} " надо скрыть` )
    this.$root.$children[2].$el.children[i].style.display = 'none'
    }
  }
  

}
},

template: 
`<div>
<form action="#" class="search-form" >

    <input type="text" class="search-field"
    v-model = "searchWord" > 
    <button 
    class="btn-search" 
    type="submit" 
    @click = " clickSearch (searchWord) ">

    <i class="fas fa-search"></i>
    </button>

</form>  
 
</div>`

})//Компонент_№3 (ПОИСК): end


/* =================================== */
let app = new Vue ({
el:'#app' ,
 
// Шаблон отрисовки на экран
template:
`<div >
 <header>
    <div class="logo">VueJS_Component_(v.3)</div>

    <div class="cart">
    <!--<search> это вставка Компонента из файла 'searchCompon.js':
    поисковая строка в шапке-->

    <search-component></search-component> 

    <!--<basket> это вставка Компонента из файла 'basketCompon.js':
    два  Товара  (фото, ИмяТовара, Цена, кол-во)-->
    
    <basket-component></basket-component>

    </div>
 </header>
    

<main > 
    <!--<prods> это вставка Компонента из файла 'prodsCompon.js':
    две карточки Товара  (фото, ИмяТовара, Цена)-->

    <prods-component >  </prods-component>   

</main>

</div>`


 })//let app: end