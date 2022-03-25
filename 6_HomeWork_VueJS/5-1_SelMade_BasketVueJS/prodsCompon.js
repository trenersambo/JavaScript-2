//js-файл для генерации Карточек Товара (инф. с Сервера)

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component ('prods',{

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

    }

},

template: 
`  <div>
 <header>
        <div class="logo">VueJS_Component_(v.1)</div>
        <div class="cart">
            <form action="#" class="search-form" >
                <input type="text" class="search-field" >
                <button class="btn-search" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </form>
            <button class="btn-cart" type="button"  >Корзина</button>
        </div>
    </header>

    <main class= "products">
       {{ goodsArrayFromAPI  }} 
         
     
        <div class="product-item"
        v-for = "el of arr" 
        :key = "el.id_product" > 

        тест:{{el}} 
        <p> <img :src="foto" alt="" class= "img"> </p>
        <p>{{el.product_name}}</p>
        <p>{{el.price}}</p>

          <button class="buy-btn">Купи-ка!</button>
        
        </div><!-- class="cardProduct: end -->
 
    </main>

  </div>`


})//Vue.component: end