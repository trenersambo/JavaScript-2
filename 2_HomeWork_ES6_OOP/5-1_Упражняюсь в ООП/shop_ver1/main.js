// №1. Идентифицирую (что?): 
// 1.массив и 2.метод ДоступКМассиву
class Identif{
    constructor (array,foto = 'noFoto.jpg'){
    this.array = array;//этот THIS видит и консоль
    this.foto = foto; // этот THIS видит внутри renderCard
    this.goodsFromServer();
    this.goodsFSPerebor() ;
    //this.renderCard()// нет смысла?
    //this.divProducts =divProducts // нет смысла?
    } 


goodsFromServer( ){
this.array =
 [
 {id: 1, title: 'Note', price: 100},
 {id: 2, title: 'Mouse', price: 200},
 {id: 3, title: 'Key', price: 300},
 {id: 4, title: 'Game', price: 400},
 {id: 5, title: 'Roll', price: 500},
 ];
}

//ToDo_1: 
//Перебор массива + 
// + каждое значение передать-вставить в РендерКарточки

// Перебор массива (значения с сервера)
goodsFSPerebor(){
(this.array).forEach( (perebor)=> {

    console.log(perebor)
    //{id: 1, title: 'Note', price: 100}..{id: 4, title: 'Game', price: 400}

    console.log(perebor.id, perebor.title, perebor.price)
    //1 'Note' 100 ... ... 4 'Game' 400

    let value = perebor; 
    // value.id //1;   value.title // 'Note';   etc...

    //пробрасываю полученный let value в фун-ю РендерКарточки
    this.renderCard (value)
    });

/*     function myfunc(value){
    console.log ('test скачка:' +value.id, value.title)
    } */

    }

    //Проброшенная ф-ция (где получаю в цикле id, price, title)
    //Значения value, кот.поступают по очереди из цикла - 
    //буду отрисовывать в виде Карточки Товара
    renderCard(value){
    console.log ('проброска успешно: '+ value.title )
    console.log ( value.title)

    //селектор, куда вставлю КарточкуТовара
    let divProducts= document.querySelector ('.products'); 
   
     divProducts.insertAdjacentHTML('beforeend' , 
     `
        <div class="product-item" data-id="${value.id}">
            <img src="${this.foto}" alt="тутФото">
            <div class="desc">
            <h3>${value.title}</h3>
            <p>${value.price}</p>
            <button class="buy-btn">Купить</button>
            </div> 
        </div>
     `)

    }   



} //class Identif{..}: end

 


//вызов/активация класса Identif{..}
let identif = new Identif ()

 


// ToDo_2:
// №2. Идентификация: 
//1. HTML-кода КарточкиТовара и 2.метод РендерКарточки
