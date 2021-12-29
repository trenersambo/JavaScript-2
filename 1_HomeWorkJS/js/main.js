'use strict';
//№1. Массив объектов (список товаров)
const products = [
    {id: 1, title: 'Тройка для BJJ №1', price: 1000, img:'img/1_bjj.jpg'},
    {id: 2, title: 'Форма для САМБО №2', price: 100, img:'img/2_sambo.jpg'},
    {id: 3, title: 'Тройка для BJJ №3', price: 250, img:'img/3_bjj.jpg'},
    {id: 4, title: 'Перчатки Twins №4',  price: 150, img:'img/4_twins.jpg'},
    {id: 5, title: 'Пэды для ударов №5',  price: 150, img:'img/5_pad.jpg'}, 
    {id: 6},    
];


//№2. Логика, которая размещает список Товаров внутри тега <div class="products"></div>

//2.1. Генерируем кусок html-разметки для конкретного Товара
//передаю ИмяТовара (title), ЦенаТовара(price)
const renderProduct = (title='No name', price = 'no price', img = 'img/no_foto.jpg') => {
return ` <div class="product-item">
<img  class="item_img" src="${img}" alt="">
<h3 class="item_h3">${title}</h3>
<p class="item_price">${price}</p>
<button class="by-btn">Добавить</button>
</div> `;
};

//2.2. Ф-ия для генерации СпискаТоваров (productList)
//через создание нового массива на основе текущего (map)
function renderCatalog (list) {

   let productsEl = document.querySelector('.products')

   productsEl.innerHTML = list.map( productList ).join('')

};

//2.3. ф-я отрисовки для каждого Товара тега <div class="product-item">
//отрисовка: ФотоТовара, ИмяТовара, ЦенаТовара
   function productList(good) {
   return renderProduct(good.title, good.price, good.img)
   };

//2.0. Старт цепочки вызова ф-ций для отрисовки
renderCatalog(products);
