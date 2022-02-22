//что деалет этот скрипт (все раздельно):
//1. находит тег class="boxClass"
//2. красит фон в красный цвет

//#2. для тега class="boxClass"
class BoxClass {
  constructor (tag ){
  this.tag = document.querySelector(tag) ;

  }

}


//#1. Экзмепляр class BoxClass. 
//Объяв.аргументы без использ-я объектов {}
let boxClass = new BoxClass (  
  '.boxClass'
 )

//#4. Для перекрашивания фона в цвет
class GetColor {
  constructor (color){
    this.color = color ;
    this.reColor();
}

 //Метод: фон сделать красным
  reColor(){
    boxClass.tag.style.background = this.color
  }
}

//#3. Экзмепляр class GetColor
let getcolor = new GetColor (
  'red'
)