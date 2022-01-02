'use strict';
//№2. Создаю КЛАСС, в котором есть КОНСТРУКТОР (шаблон cо свойствами)
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

         //вставка <div class="products"> __тут КарточкаТовара___ </div>
         //html-код КарточкиТовара тянется из class ProductItem
         catalogBlock.insertAdjacentHTML('beforeend', productObject.getHTMLString());
      }
}

} //class ProductList: end

// №1. Класс конкретного Товара
class ProductItem {
   constructor ( product   ) {
       this.title = product.title || 'no_Data';
       this.price = product.price || '0';
       this.id = product.id;
       this.img = product?.img || './img/no_foto.jpg';
   }
 
// отрисовка 1 Карточки для текущего Товара
// этот html-код (1 Карточка Товара) будет вставляться в <div class="products"> ... </div>
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


