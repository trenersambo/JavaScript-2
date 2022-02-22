//ссылка на Каталог с json-файлами
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

// №1. Идентифицирую (что?): 
// 1.ДанныеСервера 2.forEach 3.ОтрисовкаКарточки
class Identif{
    constructor (  foto = 'noFoto.jpg'){
    // []-они убрали ошибку при forEach: "Cannot read properties.."
    this.array = [];// для then это как накопительн.массив(?)  
    this.foto = foto; // этот THIS видит внутри renderCard
    this.goodsFromServer();
    this.goodsFSPerebor() ;

    } 


goodsFromServer( ){
//так было: вручную созд-ый массив товаров
//this.array = [{id: 1, title: 'Note', price: 100},{id: 2, title: 'Mouse', price: 200},];

return fetch (`${API}/catalogData.json`)
//1-й then (инф-я о рез-те запроса)
 .then (response => response.json( ) )
 //2-й then (пойманные итоговые данные); Из data извлек-ся данные для дальнейш.обраб-ки!
 .then ((data) => { this.array = data; this.goodsFSPerebor( );  }  )
 .catch(err => console.log(err) );

}


// Перебор массива (значения с сервера)+ каждое значение передать-вставить в РендерКарточки
goodsFSPerebor(){
(this.array).forEach( (perebor)=> {

    console.log(perebor)
    //{id_product: 123, product_name: 'Ноутбук', price: 45600} //{...Мышка}

    console.log(perebor.id_product, perebor.product_name, perebor.price)
    //123 'Ноутбук' 45600 // 456 'Мышка' 1000

    let value = perebor; 

    //пробрасываю полученный let value в фун-ю РендерКарточки
    this.renderCard (value)
    });

    }

    //Проброшенная ф-ция (где получаю в цикле id, price, title)
    //Значения value, кот.поступают по очереди из цикла - 
    //буду отрисовывать в виде Карточки Товара
    renderCard(value){
    console.log ('проброска успешно: '+ value.product_name )

    //селектор, куда вставлю КарточкуТовара
    let divProducts= document.querySelector ('.products'); 
   
     divProducts.insertAdjacentHTML('beforeend' , 
     `
        <div class="product-item" data-id="${value.id_product}">
            <img src="${this.foto}" alt="тутФото">
            <div class="desc">
            <h3>${value.product_name}</h3>
            <p>${value.price}</p>
            <button class="buy-btn">Купить</button>
            </div> 
        </div>
     `)

    }  


} //class Identif{..}: end

//вызов/активация класса Identif{..}
//через ЭкзмеплярКласса
let identif = new Identif ()


/* =========== */

//Для прослушки клика -setTimeout на 2сек
// чтоб успели загрузиться Карточки с Сервера
setTimeout(
function getSelect(){
 let clkBtn = document.querySelectorAll ('.buy-btn')
 clkBtn.forEach(function(ev){
  ev.addEventListener ('click', getClass )
 })

},1500 );

//Отловил клик по кнопке - создается экземпляр класса
 function getClass(ev){
 //отовить id Карточки(для корзины Нужен?)
 console.log (ev.target.parentElement.parentElement.dataset.id);
 //idEl - для прокидки в class Basket{..}
let idEl = ev.target.parentElement.parentElement.dataset.id

//отловить ИМЯ и ЦЕНА:
//ev.target.parentElement.children[0].innerText // мышка или ноут
//ev.target.parentElement.children[1].innerText // 1000 или 45600

 // создается экземпляр класса
 let basket = new Basket('.insertInBasket', idEl);
 } 

//№2. Клик Кнопки + 
//КОРЗИНА: добавление / удаление
class Basket{
    constructor(insBasket,idEl ){
    //обозначил тег в Корзине
    this.ins_basket = document.querySelector(insBasket) ;
    //id, перекинутый из ф-ции getClass
    this.idEl = idEl ; 
    };
    //тест вставки в Корзину
    //this.ins_basket.innerHTML = 'нннdsd' // нннdsd

}






