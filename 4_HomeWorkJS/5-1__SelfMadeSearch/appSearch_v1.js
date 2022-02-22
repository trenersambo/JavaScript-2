// Скрипт для строки поиска

class SearchBtn{
  constructor( ){
  this.listenLupa()
    this.myFunc 

  }

  // слушаю клик по кнопке ЛУПА -> вызываю ф-цию getValue, 
  //кот.увидит, что ввели в поисковую строку
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
   
   //div 'desc', где найдем имя Товара (для сравнения с Поиском)
   let descDiv = document.querySelectorAll('.desc') ;

    // СхемаПоиска: /value/i.test(слово )

    let arr = []
    // Перебор тегов 'desc' в которых написаны ИмяТовара    
    for (let i = 0; i < descDiv.length; i++){

    //тег с именем Товара помещу в [] при помощи arr.push(...)
     arr.push(descDiv[i].children[0].innerText)
     console.log (`ИмяТовара в Массиве arr: ${arr}`)

    //если нет искомого слова в данноv div'e, то этот div скрыть
     if (regexp.test(arr[i]) !== true){
     console.log (`блок ${arr[i]} скрыть, в нем нет искомого слова`)
     //скрыть div, в кот.нет искомого слова
     descDiv[i].parentElement.style.display = 'none'
      }  
    }
    
   }//function valueSearch(value): end

    } //getValue(e):end

}

//экз-р класса для вызова внутренностей класса SearchBtn
let searchBtn = new SearchBtn ()
 