var eventBus = new Vue()

Vue.component('product-component',{

    props: {
    premium:{
      // какие входные параметры ожидает получить компонент
      type: Boolean,
      required: true,
    },

    basketCount:{
     type: Number
    }
    
    },

    data: function() {
    return{
       
      product: 'for BJJ',
      brand: 'VueJS',
      img: './bjjRass.jpg' ,
      imgSale: './logo.jpg' ,  
      inStock: true ,
      details: [
        '80% хлопок' , 
        '20% полиэстр' , 
        'гипоалерген'
      ],

    variants: [
    {
      variantId: 2234,
      variantColor: 'Art of BJJ',
      color: 'red',
      varImg:'./bjjRass.jpg' , 
      varQuant: 6, //штук
    },
    {
      variantId: 2235,
      variantColor: 'Spirit of BJJ',
      color:'#FFF666',
      varImg:'./bjjTiger.jpg' ,
      varQuant: 0, //штук
    }
      ],

  sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'] ,

  inventory:5,

  classEl: 'noActive',

  getIndex: 0,

  reviews: [],

  }//return: end

},//data: end

  methods:{

  btnBsktAdd(){
    console.log ('Клик на ADD')  
 
    //Условие передачи клика $emit в Родителя:
    //Как только Товаров в Корзине станет больше 
    //чем есть товаров (varQuant), тогда и передача - stop
    if (this.basketCount < this.variants[this.getIndex].varQuant ){
      this.$emit('btn-bskt-add'); 
    }
 
  },

  btnBsktRem(){
    console.log ('Клик на REMOVE') ;
    //Условие передачи клика в Родителя:
    // Передача $emit возможно пока в Корзине не-НОЛЬ Товаров 
    
if (this.basketCount !==0){
    this.$emit('btn-bskt-rem'); 
}
  },

  /**Смена картинки, при наведении мышки на красн / зелен. поле */
  imgChange( event, index){
  console.log (`Клик покажет картинку ${ event}`)
  this.img = event ;

  this.getIndex = index ;
  console.log (`Клик по кнопке с индексом: ${index} (0=red, 1=green)`)
  },

//   addReview(productReview) {
//   this.reviews.push(productReview)
// }

// eventBus.$on('review‐submitted', productReview => {
//   this.reviews.push(productReview)
// })

  },   //methods: end

  mounted() {
  eventBus.$on('review‐submitted', productReview => {
    this.reviews.push(productReview)
  })
},

  computed:{
  //название товара
    titleBrand (){
      return this.brand + '_' + this.product
    },
    //счет Кол-ва
    calcQuantity (){
    
    console.log (`getIndex в computed: ${this.getIndex}`)
    console.log (`Ск-ко товара на этой кнопке: ${this.variants[this.getIndex].varQuant}`)
    return this.variants[this.getIndex].varQuant; 
    },

    //Доставка бесплатно / 3 руб.

    shipping(){
      if (this.premium){
        return "Бесплатно"
      } else {
        return "3руб"
      }
    }

  },//computed: end

  template:
  `
  <div class="product" >

      <div class="product‐image">
        <img :src="img" />

        <span v-if = 'inventory <= 10 && inventory > 0'>
        <img :src="imgSale" class="imgSale"/>                
        </span>

      </div><!--  блок Фото: end -->

    <div class="product‐info">
 
      <div class="basket">
     
        <button 
        @click = "btnBsktAdd" 
        class = "btnBskt" 
          > Add</button>

        <button 
        @click = "btnBsktRem" 
        class="btnBskt"
        > Remove</button>

      </div>        

        <h1>{{ titleBrand }}</h1>
      
    <!-- видим одну строку при  условии ( < , > , = ) -->
      <div class="inOutStock">

          <p v-show = 'calcQuantity > 10'> В наличии (есть на складе)</p>
          <p v-show = 'calcQuantity <= 10 && calcQuantity > 0'> Скоро все будет продано ({{calcQuantity}})</p>
          <p v-show = 'calcQuantity <=0' >Товар закончился </p>
      </div>

      <div class="composition">
      
          <div v-for='el in details' :key = 'el'> {{el}} </div>
      
      </div>

      <div class="varColor">

        <div class="color_box"
        v-for = '(vart,index) in variants' 
        :key = 'vart.variantId' 
        :style = "{backgroundColor: vart.color} " >

          <p 
          @mouseover = "imgChange (vart.varImg, index), calcQuantity " 
          class = "textName"> 
          {{vart.variantColor}}
          </p>

        </div>

      </div>
        
      <div class="size">
        <p>Размер:</p>
        <select  name="size" class="sizeSelect">
            <option 
            v-for = 'sizeEl in sizes' 
            :key='sizeEl'>
            {{sizeEl}}
            </option>
        </select>
      </div>

      <div class="shipping">
      <p>Покупатель-premium: {{premium}} </p>
      <p>Доставка: {{shipping}} </p>
      </div>
      
<tabs-component :reviews="reviews"></tabs-component>

    </div><!--class="product‐info": end -->



    </div><!-- class="product": end -->
     
  `
}) ; // Vue.component('product',{..}) :: end



  Vue.component ('basket-component',{

  props:{
  basketCount: Number
  },

  template:
  `
  <div class="basketCount">
    В корзине: {{basketCount}}
   </div>
  `
  
  }); // Vue.component('basket',{..}) :: end

Vue.component ('review-component',{

data: function () {
  return {
    name: null,
    review: null,
    rating: null
  }
},

methods:{
  onSubmit() {
    let productReview = {
      name: this.name,
      review: this.review,
      rating: this.rating
    }
    eventBus.$emit('review‐submitted', productReview)
    this.name = null
    this.review = null
    this.rating = null
  }
},


template:
`<div>

<form class="review‐form" @submit.prevent="onSubmit">
  <p>
    <label for="name">Name:</label>
    <input id="name" v-model="name" placeholder="name">
  </p>
  <p>
    <label for="review">Review:</label>
    <textarea id="review" v-model="review"></textarea>  </p>
  <p>
    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
  </p>
  <p>
    <input type="submit" value="Submit">  
  </p>
</form>

</div>`

}) // Vue.component('review',{..}) :: end



    //ToDo:    делать TABS //11.04.22

Vue.component ('tabs-component', {

  data (){
    return {
      tabs: ['Отзывы', 'Оставить отзыв'] ,
      selectedTab: 'Отзывы' // устанавливается с помощью @click
    }
  },

  props:{
    reviews: {
      type:Array,
      required: false
    }
  },

  template:
  `<div>
    <ul>
      <span 
      :class="{ activeTab: selectedTab === tab }"
      class="tab" 
      v-for="(tab, index) in tabs" 
      :key="index"
      @click = "selectedTab = tab"
      >{{ tab }}</span>  
    </ul>

    <div v-show="selectedTab === 'Отзывы'">
        <p v-if="!reviews.length">Пока нет отзывов!</p>

        <ul>
          <li v-for="review in reviews">
          <p>{{ review.name }}</p>
          <p>Рейтинг: {{ review.rating }}</p>
          <p>{{ review.review }}</p>
          </li>
        </ul>
    </div>

    <div v-show="selectedTab === 'Оставить отзыв'">

    <review-component></review-component>

    </div>

  </div> `

}) //Vue.component ('tabs-component', {...}) ::end


const app = new Vue ({
    el: '#app', 

    data:{
    //Премиум (доставка)
    premium: false,
    basketCount: 0,
    },

    methods:{
    //Передача события клика на кнопку 'Add' из 'product-component'
    addOneGood(){
    console.log ('Клик "add" словлен в родителе')
    this.basketCount +=1
    }, 

    //Передача события клика на кнопку 'Remove' из 'product-component'
    removeOneGood(){
     console.log ('Клик "remove" словлен в родителе')
     //удалить один товар из Корзины
    this.basketCount -=1   
    }

    },
    
       template:
       `<div class = 'apps'>
       
       <basket-component
       :basketCount = "basketCount"
       ></basket-component>

      <product-component 
      :premium="premium"
      :basketCount = "basketCount"
      @btn-bskt-add = "addOneGood"
      @btn-bskt-rem = "removeOneGood"
      > </product-component>
        </div> ` ,
     
    });








