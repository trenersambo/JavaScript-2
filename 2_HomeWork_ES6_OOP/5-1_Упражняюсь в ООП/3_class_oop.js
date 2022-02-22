//что деалет этот скрипт  :
//1. находит тег class="boxClass"
//2. находит кнопку class="btnClass"
//3. слушаем клик кнопки
//4. клик меняет цвет



//#2. для тега class="boxClass"
class Tags {
  constructor (tag ){
  this.tag = document.querySelector(tag) ;
  }
}

//#1. экз-р class Tags: значения 
let tags = new Tags (
  '.boxClass' , //тег (tag) 
)

// №4. проба: Расширияю class Tags. 
// для чего: задать форму (H x W) 100х200рх

class TagsCube extends Tags{
  //убрал из скобок констр-ра и супер: tag, btn
  //чтоб в let tagsCube указать только height, width
  // this: // TagsCube {tag: null, btn: null, height: '100px', width: '200px'}
  constructor (  sizeH, sizeW){
    super (); //  родителям - null
    this.sizeH =  sizeH + 'px';
    this.sizeW = sizeW + 'px'; 

    this.reSize ()
  }

  reSize (){
  tags.tag.style.height = this.sizeH ;
  tags.tag.style.width = this.sizeW  
  }
}

//#3. Экзем-р класса TagsCube: указал размеры фигуры
let tagsCube = new TagsCube (
  100,
  200
)

class BtnClick {
  constructor (btn,colorRed,colorGrey){
      this.btn = document.querySelector(btn) ;
      this.colorRed = colorRed;
      this.colorGrey = colorGrey ;

  //  addEventListener: слушаю кнопку '.btnClass'
  // document.querySelector('.btnClass').addEventListener('click',  this.listenClick )
   this.btn.addEventListener('click',  this.listenClick ) ;
  }

    //метод Смена ЦВЕТА фона
    listenClick( ) {
    console.log (btnClick.colorRed) ;// red
    
    //условие смены цветов по клику на кнопку (х2)
    if ( tags.tag.style.background == btnClick.colorRed){
      tags.tag.style.background =  btnClick.colorGrey ;    
    }else {
      tags.tag.style.background =  btnClick.colorRed;    
    }
  }
}

let btnClick = new BtnClick (
    '.btnClass' ,  //кнопка (btn)
    'red' ,
    'grey'
)



 