/** JS для задания №3, урок 2
* (четверть 2, семестр 2, 01.2022г.)
 */
'use strict';

//№2. КЛАСС, в нем есть КОНСТРУКТОР (шаблон cо свойствами): start
class ProductList {

constructor (samboFormaDiv = '.samboForma',      //сюда залетает КарточкаТовара
myCheck = 'input[type="checkbox"]', //чекбокс
calcPrice =  '.calc_price',   //сюда залетает Цена (+опции)товара 
calcBonus =  '.calc_bonus'  //сюда залетают Бонусы
)
{
      this.samboFormaDiv = samboFormaDiv;//в тег 'samboForma' залетает КарточкаТовара
      this.goods = [] ; //тут храню сырые данные из API(?)
      this.productObjects = [] ;//Важн.раб.св-во: тут храню экземпляры КЛАССОВ(?)

      this.myCheck = myCheck;
      this.calcPrice = calcPrice ;
      this.calcBonus = calcBonus ;



// указал на наличие методов (функции)
this.fetсhGoodsData(); // метод "Получить Массив Данных из API"(?).Пока вручную внесим
this.render(); // отрисовка (?)
this.calcPriceBonus ();// д/з №3 урок2_ расчет 

   }


fetсhGoodsData() {
//2.1. этот массив будто получен из api(?) // фактич.ввел руками тут
  this.goods = [
  {
  title:     'Детская форма Самбо',
  id:        '1',
  img:       'sambo1.jpg',
  topPrice:   1000,
  topBonus:   50,
  clubPrice:  100,
  clubBonus:  25,
  samboPrice: 50,
  samboBonus: 20,
  namePrice:  20,
  nameBonus:  10,
  blackPrice: 10,
  blackBonus: 5,
  hakiPrice:  5,
  hakiBonus:  0
  },

  {
  title:     'Форма Самбо ',
  id:        '2',
  img:       'sambo2.jpg',
  topPrice:   2000,
  topBonus:   50,
  clubPrice:  100,
  clubBonus:  25,
  samboPrice: 50,
  samboBonus: 20,
  namePrice:  20,
  nameBonus:  10,
  blackPrice: 10,
  blackBonus: 5,
  hakiPrice:  5,
  hakiBonus:  0
  },
  ]

}

//2.2. метод: внутрь <samboForma> д.залетать 2 карточки samboForma_cart
render( ) {
// ссылка на тег <div class="samboForma">
const samboFormaDiv = document.querySelector (this.samboFormaDiv);

// FOR ( OF ): перебор данных Сырого массива ("получен" из API) (?)
for (let i of this.goods) {

 // новый экзмепляр (ОднаКарточкаТовара), где родитель class ProductItem
 const oneProductCard = new FormaSambo(i);

// В пустой массив 'productObjects'  - добавляю данные в конец [ ]" !!
 this.productObjects.push(oneProductCard);

  //вставка <div class="samboForma"> __тут КарточкаТовара___ </div>
  //html-код КарточкиТовара тянется из class FormaSambo
  //getHTMLString() - метод из class FormaSambo
  samboFormaDiv.insertAdjacentHTML('beforeend', oneProductCard.getHTMLString());

    }

  }

calcPriceBonus (){
const myCheck = document.querySelectorAll (this.myCheck) ;
const calcPrice = document.querySelector (this.calcPrice);
const calcBonus = document.querySelector (this.calcBonus);
  myCheck.forEach (function (e){

  e.addEventListener ('change' , function(e){
   

let sumPrice = 0; 
let sumBonus = 0;
if (e.target.checked == true){
 sumPrice = e.target.dataset.price;
 sumBonus = e.target.dataset.bonus;
} else {
 sumPrice = -(e.target.dataset.price);
 sumBonus = -(e.target.dataset.bonus);
}

 calcPrice.textContent = +calcPrice.textContent + +sumPrice;
 calcBonus.innerHTML = +calcBonus.innerHTML + +sumBonus;
 
  })

 })
} 


 }
//№2. КЛАСС, в нем есть КОНСТРУКТОР (шаблон cо свойствами): end




// №1. Класс ФормаСАМБО (карточкаТовара?) :start
class FormaSambo {
  constructor ( product   ) {
  //заголовок Карточки
   this.title = product.title || 'no_name'; // Детская , Взрослая
   this.topPrice = product.topPrice || '0'; // 1000 , 2000
   this.topBonus = product.topBonus || '0'; // 50, 100
   this.id = product.id;
   this.img = product?.img || 'no_foto.jpg';

   //вышивка (эмблема клуба)
   this.clubPrice = product.clubPrice  || '0'; // 100
   this.clubBonus = product.clubBonus || '0'; // 25

   //вышивка (эмблема самбо)
   this.samboPrice = product.samboPrice  || '0'; // 50
   this.samboBonus = product.samboBonus || '0'; // 20
       
   //вышивка (имя борца)
   this.namePrice = product.namePrice  || '0'; // 20
   this.nameBonus = product.nameBonus || '0'; // 10

   //цвет формы (черный)
   this.blackPrice = product.blackPrice  || '0'; // 10
   this.blackBonus = product.blackBonus || '0'; // 5

    //цвет формы (хаки)
   this.hakiPrice = product.hakiPrice  || '0'; // 5
   this.hakiBonus = product.hakiBonus || '0'; // 0

   }

  //отрисовка Карточек samboForma_cart "дет/взросл форма": start
  getHTMLString ( ){ return `
  <div class="samboForma_cart">

    <div class="forma_kid_name">
    <p class="name_text">${this.title}</p>
    <input type="checkbox" name="formaSambo" id="${this.id}" data-price=" ${this.topPrice}" data-bonus=" ${this.topBonus}" >
    </div>
    
    <img class="forma_img" src="./img/${this.img}" alt="" >

    <div class="priceBonus">
    <p class="forma_price"> Цена: ${this.topPrice} руб*</p>
    <p class="forma_bonus"> Бонус: ${this.topBonus} баллов*</p>    
    </div>

    <!-- Блок ВЫШИВКА: start -->
    <div class="embroidery">
    <div class="embr_top optionString">Вышивка на форме</div>

    <div class="embr">
    <p class="embr_top">Эмблема клуба:</p>
    <input type="checkbox" name="formaSambo" id="embr_club" data-price=" ${this.clubPrice}" data-bonus=" ${this.clubBonus}" >
    </div>

    <div class="priceBonus">
    <p class="forma_price"> Цена: ${this.clubPrice} руб*</p>
    <p class="forma_bonus"> Бонус: ${this.clubBonus} баллов*</p>
    </div>

    <div class="embr">
    <p class="embr_top">Эмблема САМБО:</p>
    <input type="checkbox" name="formaSambo" id="embr_sambo" data-price="${this.samboPrice} " data-bonus=" ${this.samboBonus} " >
    </div>

    <div class="priceBonus">
    <p class="forma_price"> Цена: ${this.samboPrice} руб*</p>
    <p class="forma_bonus"> Бонус: ${this.samboBonus} баллов*</p>
    </div>

    <div class="embr">
    <p class="embr_top">Имя Фамилия:</p>
    <input type="checkbox" name="formaSambo" id="embr_fio" data-price="${this.namePrice} " data-bonus=" ${this.nameBonus}" >
    </div>

    <div class="priceBonus">
    <p class="forma_price"> Цена: ${this.namePrice} руб*</p>
    <p class="forma_bonus"> Бонус: ${this.nameBonus} баллов*</p>
    </div>
    
    </div>
    <!-- Блок ВЫШИВКА: end-->


<!-- Блок ЦВЕТ ФОРМЫ: start-->
<div class="forma_color">
 <div class="color_top optionString">Опция: цвет формы</div>

    <div class="clr">
    <p class="color_top">Цвет формы Черный</p>
    <input type="checkbox" name="formaSambo" id="clr_black" data-price=" ${this.blackPrice}" data-bonus="${this.blackBonus} " >
    </div>

    <div class="priceBonus">
    <p class="forma_price"> Цена: ${this.blackPrice} руб*</p>
    <p class="forma_bonus"> Бонус: ${this.blackBonus} баллов*</p>
    </div>

    <div class="clr">
    <p class="color_top">Цвет формы Хаки:</p>
    <input type="checkbox" name="formaSambo" id="clr_haki" data-price=" ${this.hakiPrice}" data-bonus="${this.hakiBonus} " >
    </div>

    <div class="priceBonus">
    <p class="forma_price"> Цена: ${this.hakiPrice} руб*</p>
    <p class="forma_bonus"> Бонус: ${this.hakiBonus} баллов*</p>
    </div> 

</div>
<!-- Блок ЦВЕТ ФОРМЫ: end-->
    
    <!-- Цена за 1 покупку: start -->
    <div class="calc">

    <div class="calc_text">Итого: Стоимость и Бонусы</div>
    <p class="calc_price"></p>
    <div class="calc_bonus"></div>

    </div>
    <!-- Цена за 1 покупку: end -->


    </div>
  `
  
  }
  //отрисовка Карточек samboForma_cart "дет/взросл форма": end


}
// №1. Класс ФормаСАМБО (карточкаТовара?) :end

// скрипт стартует отсюда
const catalog = new ProductList(  );





 /*const myCheck = document.querySelectorAll ('input[type="checkbox"]');
const calcPrice = document.querySelector ('.calc_price');
const calcBonus = document.querySelector ('.calc_bonus');

calcPriceBonus(){
  myCheck.forEach (function (e){

  e.addEventListener ('change' , function(e){
   
      console.log(e.target.checked)
      console.log(e.target.value)
      console.log(e.target.dataset.price)  


let sumPrice = 0; 
let sumBonus = 0;
if (e.target.checked == true){
 sumPrice = e.target.dataset.price;
 sumBonus = e.target.dataset.bonus;
} else {
 sumPrice = -(e.target.dataset.price);
 sumBonus = -(e.target.dataset.bonus);
}

 calcPrice.textContent = +calcPrice.textContent + +sumPrice;
 calcBonus.innerHTML = +calcBonus.innerHTML + +sumBonus;
 
  })

 })
}
*/  

 

 