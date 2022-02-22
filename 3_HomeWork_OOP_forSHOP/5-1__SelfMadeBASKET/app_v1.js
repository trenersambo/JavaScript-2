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
  ev.addEventListener ('click', getClassBasket )
 })
},1500 );

//Отловил клик "Купить" =>
//запрос на Сервер (если result ==1) ==>
//активизирую Ф-цию создания экземпляра класса:let basket = new Basket
 function getClassBasket(ev){

 //Тест, что можно найти Цену, Имя или id КарточкиТовара
 console.log (ev.target.parentElement.parentElement.dataset.id);//123 или 456 
 console.log (ev.target.parentElement.children[0].innerText);// мышка или ноут

 // создается экземпляр класса (нужные! парамсы для передачи в Class) 
 let basket = new Basket('.insertInBasket',ev);
 } 

//№2. Клик Кнопки + 
//КОРЗИНА: добавление / удаление(тут же?? или др.класс?)
class Basket{
    constructor(insBasket,ev ){

    //обозначил тег в Корзине
    this.ins_basket = document.querySelector(insBasket) ;

    //параметр ve,id,nameEl,priceEl  прокинутые из ф-ции getClass
    //Из карточкиТовара (в которой кликнул "Купить")  
    this.idEl = ev.target.parentElement.parentElement.dataset.id ;//123 или 456  
    this.nameEl = ev.target.parentElement.children[0].innerText; // мышка или ноут
    this.priceEl = ev.target.parentElement.children[1].innerText ;// 1000 или 45600
    this.dataAnswer = [];// для чего?

     this.insert //DELETE-1:  тест ф-ция работы кнопки через класс

    //запрос на СЕРВЕР (надо получить ответ =1)
    this.getAnswerResult ()  

    };

    //DELETE-1: тест вставки в Корзину:this.ins_basket.innerHTML ='...'
    insert () {
    this.ins_basket.innerHTML = this.nameEl;
    }

    //ф-ция запроса на Сервер
    getAnswerResult(){
    // От return зависит корректн.срабатывание .then№2 ?
    return fetch (`${API}/addToBasket.json`)
    
    .then (response => response.json( ) )    
    //.then ( (data) => {console.log (data.result)} ) // 1 (выловил result)
    .then ( (data) => {console.log (data.result); 
        if(data.result == 1){
        this.insert()
        }
    } )

    .catch (err => console.log (err) );//сообщение об ошибке
    }


}






