/*что деалет  скрипт 1_lass_oop.js: 
1. ищу div class="boxClass 
2. делаю для него красный фон
3. задаю ширину+высоту+рамку*/

 //№2. Class для созд.ссылки на div class="boxClass"
class One{
  constructor(select ){
    this.el = document.querySelector(select.el);
  }
}

 //№3. Class для: ЦВЕТ для div class="boxClass" 
class Two extends One{
  // почему-то параметр option не активен
  constructor(select, option){
    super (select );

    this.option = option; //undefined
    this.el.style.background = select.color;
  }  
}

//№4. Class для: ШИРИНА и ВЫСОТА
class Three extends One {
  constructor (select){
    super(select) ;

    // ширина, высота, границы
    this.el.style.width = select.sizeW + 'px' ;
    this.el.style.height = select.sizeH + 'px' ;
    this.el.style.border = select.rendBorder;
  }
}

//№1. Экзмепляр класса Two
let showBox = new Two( {
  el: '.boxClass' ,
  color: 'red'
  } )

//№5. Экзмепляр класса Three
let modifyBox = new Three ({
  el: '.boxClass' ,
  sizeW: 100,
  sizeH: 100,
  rendBorder: '2px solid black'

})
 