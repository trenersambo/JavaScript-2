// Скрипт для строки поиска

class SearchBtn{
  constructor( ){
  this.listenLupa()
    this.myFunc 

  }

  // слушаю клик по кнопке ЛУПА -> вызываю ф-цию getValue, кот.увидит, что ввели в поисковую строку
   listenLupa(){
   document.querySelector('.search-form').addEventListener('submit',this.getValue)  
  }

  //ф-ия getValue: видит, какое слово ввели в поисковую строку
   getValue(e)  {
     e.preventDefault() ;
     //еще вызов ф-ии  valueSearch(params: ПОИСКОВОЕ СЛОВО)
     valueSearch(document.querySelector('.search-field').value  ) ;//мышка

    function valueSearch(value){
   console.log (value)  // мышка
   const regexp = new RegExp (value, 'i'); //(мышка / 'любойРегистр')
   
   let descDiv = document.querySelectorAll('.desc') ;

    // СхемаПоиска: /value/i.test(слово )
    // Перебор тегов 'desc' в которых написаны ИмяТовара
    let arr = []
    for (let i = 0; i < descDiv.length; i++){
     arr.push(descDiv[i].children[0].innerText)
     console.log (arr)
    }
    
   }//function valueSearch(value): end

    } //getValue(e):end
 
 

}

//экз-р класса для вызова внутренностей класса SearchBtn
let searchBtn = new SearchBtn ()
 