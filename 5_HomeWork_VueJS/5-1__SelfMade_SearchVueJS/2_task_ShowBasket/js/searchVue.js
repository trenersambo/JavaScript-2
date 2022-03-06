const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    //catalogUrl: '/catalogData.json',
    basketFromAPI:'/getBasket.json' ,//Вся корзина из Github
    products: [],
    imgCatalog: 'noFoto.jpg' ,// фото для КарточкиТовара
    img: 'noFoto.jpg',//Фото для КорзиныТовара

    //для строки ПОИСК
    searchLine:'',

    //для скрытия/показ Корзины
    showCart: false,


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

    //ф-ция запрос на github-Сервер в (.../*.json)
    getJson(url){
    return fetch(url)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      })
    },

    addProduct(product){
      console.log(`(клик "Купить")id товара: ${product.id_product}`);
    }

  },//methods: end

  
  beforeCreate() {},

  created() {
    this.getJson(`${API + this.basketFromAPI}`)
      .then(data => {
        for(let el of data.contents){
        // Каждый 'el' из data - складываю в МАССИВ 'this.products[{Св-ваТовара},{Св-ваТовара}]'
        //Из этого [ ] надо все отрисовать в КОРЗИНУ. Как?:
        this.products.push(el); // [{…}, {…}]

        //проверка отдельного значения в 'el' полученного из data
        console.log (`ИмяТовара (data c Сервера): ${el.product_name}`)          
        }
      });
  },

//жизн.циклы (не знаю пока - для чего)
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},


});   
