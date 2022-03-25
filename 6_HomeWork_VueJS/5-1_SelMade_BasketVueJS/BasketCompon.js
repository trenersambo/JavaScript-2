//js-файл для генерации Корзины с 2-мя товарами в ней 
//(эти 2 товара так прописаны в файле ' getBasket.json ' на Сервере)

//const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component ('basket',{

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


})//Vue.component: end