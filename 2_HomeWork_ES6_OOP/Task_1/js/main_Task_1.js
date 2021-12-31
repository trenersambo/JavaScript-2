'use strict';

/**
 * Выполнение домашней работы (JS: advansed). Урок №2. Задание №1. 
 */

// старт выполнения упражнения № 1 из д/з урока №2

// А).класс для Корзины Товаров (ES6)
class BasketOfGoods {
    constructor ( ){
        // свойства (properties)        
 
    }

    renderBasket (){
        //отрисовка макета самой корзины
        //метод ... insertAdjacentHTML() ...
    }

    closeBasket (){
        // закрыть Корзину
        // метод ... classList.remove ('active') ...
    }

    calcTotal () {
        // (авто)расчет цены за весь Заказ  
        // for () { }
    }

    checkout () {
        // оформить заказ
        // метод Post
    }


}


// Б). класс для элементов Корзины Товаров (ES6) (shopping cart item)


class ShopCartItem  {
    constructor ( title, price, value, subTotal) {
    //   свойства (properties)  
    this.title =
    this.price = 
    this.value = 
    this. subTotal = 0 ;
    }

    RenderStringItem () {
        // вставка строки товара (имя Товара, цена Товара)
        // ... innerHTML ...
    }
 
    calcSubTotal () {
        // (авто)расчет цена за кол-во Товара (цена * штук)
        // for () { }
    }

    delitStringItem () {
        // удалить Одну позицию товара (delete one item of goods)
        // метод  = (?? если вы читаете мое д/з - то как это реализовать с массивами ??)
        // я использую input type 

    }

}

// конец выполнения упражнения № 1 из д/з урока №2



//№1. Создаю КЛАСС, в котором есть КОНСТРУКТОР (шаблон cо свойствами)
class ProductList {
   constructor (container = '.products'){
      this.container = container ;
      this.goods = [] ; 
      this.productObjects = [] ;

      // указал на наличие методов (функции)
      this.fetсhGoodsData(); // просто содержит Массив Товаров
      this.render(); 
   }

// 1.1.  ф-ция, которая содержит массив ПереченьТоваров
fetсhGoodsData ( ) {
   this.goods = [
    {id: 1, title: 'Тройка для BJJ №1', price: 1000, img:'img/1_bjj.jpg'},
    {id: 2, title: 'Форма для САМБО №2', price: 100, img:'img/2_sambo.jpg'},
    {id: 3, title: 'Тройка для BJJ №3', price: 250, img:'img/3_bjj.jpg'},
    {id: 4, title: 'Перчатки Twins №4',  price: 150, img:'img/4_twins.jpg'},
    {id: 5, title: 'Пэды для ударов №5',  price: 150, img:'img/5_pad.jpg'}, 
    {id: 6},    
   ];

}

// 1.2. ф-ция для вставки в тег <div class="products"> _сюда_ </div>
render() {
   //ссылка на тег <div class="products">
   const catalogBlock = document.querySelector (this.container);

      // перебор данных массива с ПеречнемТоваров
      for (let p of this.goods) {

         // новый экзмепляр (ОднаКарточкаТовара), где родитель class ProductItem
         const productObject = new ProductItem(p);
         
         //Не ясно! в пустой массив [] добавляю в конец массива" !!
         this.productObjects.push(productObject);

         //вставка <div class="products"> __тут___ </div>
         catalogBlock.insertAdjacentHTML('beforeend', productObject.getHTMLString());
      }
}

} //class ProductList: end


class ProductItem {
   constructor ( product   , /*img = "./img/no_foto.jpg"  */ ) {
       this.title = product.title;
       this.price = product.price;
       this.id = product.id;
       this.img = product.img;
   }
 

getHTMLString (  ) {
   return ` <div class="product-item" data-id = "${this.id}">
   <img  class="item_img" src="${this.img}   " alt="">
   <h3 class="item_h3">${this.title}</h3>
   <p class="item_price">${this.price}</p>
   <button class="by-btn">Добавить</button>
   </div> `;
      
   }
 
} 

// скрипт стартует отсюда
const catalog = new ProductList(  );


