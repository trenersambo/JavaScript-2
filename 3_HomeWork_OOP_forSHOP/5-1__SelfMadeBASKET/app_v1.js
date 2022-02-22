/* version 6, 12/02/2022 */
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
    this.fotoEl = ev.target.parentElement.parentElement.children[0].src // фото
    //this.dataAnswer = [];// для чего?

     this.insertInBasket //функ-я Вставки в Корзину данных о Товаре; или +/- Кол-ваТовара

    //запрос на СЕРВЕР (надо получить ответ =1)
    this.getAnswerResult () 

    //this.renderNewHTMLstring() // тут не указывать эту функцию, иначе автоматом вызов идет

    };




    //ф-ция запроса на Сервер
    getAnswerResult(){
    // От return зависит корректн.срабатывание .then№2 ?
    return fetch (`${API}/addToBasket.json`)
    
    .then (response => response.json( ) )    
    //.then ( (data) => {console.log (data.result)} ) // 1 (выловил result)
    .then ( (data) => {console.log (data.result); 
        if(data.result == 1){
        //вызов функции Вставки в Корзину данных о Товаре; или +/- Кол-ваТовара
        this.insertInBasket()
        }
    } )

    .catch (err => console.log (err) );//сообщение об ошибке

    }//getAnswerResult():end

    //функ-я Вставки в Корзину данных о Товаре; или +/- Кол-ваТовара
    insertInBasket () {
    // тест вставки в Корзину:this.ins_basket.innerHTML ='...'    
    // this.ins_basket.innerHTML = this.nameEl;

    // инициализация тегов
    let insertIB = document.querySelector ('.insertInBasket');//нашел Тег

    //insertIB = insertIB.children[0].children[1].dataset.id;// нашел id у Товара в <div class="bfg_name" data-id="..">

    //для определения внутри тега "bfg_name" наличия цифры в id (ч/з dataset.id)
    let bfgName = document.querySelectorAll ('.bfg_name');

    //Искать по id в bfgName: надо ли отрисовать Добавленный Товар в Корзине или нет
    //(выбранный Товар д.б. отображен в Корзине только 1раз)
    //а его  кол-во регулируется кнопками + или - или повторн. клик "Купить"
 
    //searchId нужна для вставки в оператор IF (...){..}
    //searhID (this.idEl) - обязат-но с парамсом (this.idEl), иначе id в цикле не видит
    let searchId = searhID (this.idEl) 

    //Цикл сверка/поиск по id внутри let bfgName
    //searhID(id) - обязат-но с (id): это прокинутый парамс из searhID (this.idEl) 
    function searhID (id){
    for (let i = 0; i < bfgName.length; i++) {
        if (bfgName[i].dataset.id === id){
            return  bfgName[i].dataset.id
        }    
        }
    } //function searhID(id) : end

        //включ-е функции РЕНДЕР новой строки добавленного товара в Корзину:
        //Если вообще нет div class="insertInBasket" ( length  == 0 )
        // или такого id нет ( !searchId : смотрю let searchId )
      if (insertIB.children.length  == 0 || !searchId){
        console.log ('Активирую рендер "с нуля" всей строки Нового товара ')
        //вызывать ф-цию РЕНДЕРИНГА html-строки впервые кликнутого товара
       this.renderNewHTMLstring()  
 
        //Но если такой id уже есть - тогда просто увеличь кол-во +1
     } else {
        console.log (' в html-коде Корзины есть такой id: увеличь кол-во на +1')
        //ToDo: вызвать ф-цию простого увеличения кол-ва товара 
 
    } 
   
    }//insertInBasket (): end
 

    //  ф-ция РЕНДЕРИНГА html-строки впервые кликнутого товара
    renderNewHTMLstring(){
     this.ins_basket.insertAdjacentHTML('afterbegin',`
     <div class="basket_goods">
            <img class="bfg_foto" src="${this.fotoEl}" alt="тутФото">
            <div class="bfg_name" data-id="${this.idEl}">${this.nameEl}</div>
            <div class="bfg_price">${this.priceEl}</div>
            <div class="bfg_amount" data-quantity="">0</div>
        </div>

        <div class="amount_change">
            <div class="ac_plus" data-plus="1">+</div>
            <div class="ac_minus" data-minus="1">-</div>

        </div>
        <hr>
     `)
    }


}// class Basket{..}: end
