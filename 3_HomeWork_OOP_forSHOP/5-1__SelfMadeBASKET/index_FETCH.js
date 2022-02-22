//ссылка на Каталог с json-файлами
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

// №1. Идентифицирую (что?): 
// 1.массив и 2.метод ДоступКМассиву
class Identif{
    constructor ( foto = 'noFoto.jpg'){
    // []-они убрали ошибку при forEach: "Cannot read properties.."
    this.array = [];// для then это как накопительн.массив(?)  
    this.foto = foto; // этот THIS видит внутри renderCard
    this.goodsFromServer();
    this.goodsFSPerebor() ;

    } 


goodsFromServer( ){
//так было: вручную созд-ый массив товаров
//this.array = [{id: 1, title: 'Note', price: 100},{id: 2, title: 'Mouse', price: 200},];

return fetch (`${API}/catalogData.json`)
//1-й then (инф-я о рез-те запроса)
 .then (response => response.json( ) )
 //2-й then (пойманные итоговые данные); Из data извлек-ся данные для дальнейш.обраб-ки!
 .then ((data) => { this.array = data; this.goodsFSPerebor( );  }  )
 .catch(err => console.log(err) ); 

}



// Перебор массива (значения с сервера)+ каждое значение передать-вставить в РендерКарточки
goodsFSPerebor(){
(this.array).forEach( (perebor)=> {

    console.log(perebor)
    //{id_product: 123, product_name: 'Ноутбук', price: 45600} //{...Мышка}

    console.log(perebor.id_product, perebor.product_name, perebor.price)
    //123 'Ноутбук' 45600 // 456 'Мышка' 1000

    let value = perebor; 

    //пробрасываю полученный let value в фун-ю РендерКарточки
    this.renderCard (value)
    });

    }

    //Проброшенная ф-ция (где получаю в цикле id, price, title)
    //Значения value, кот.поступают по очереди из цикла - 
    //буду отрисовывать в виде Карточки Товара
    renderCard(value){
    console.log ('проброска успешно: '+ value.product_name )

    //селектор, куда вставлю КарточкуТовара
    let divProducts= document.querySelector ('.products'); 
   
     divProducts.insertAdjacentHTML('beforeend' , 
     `
        <div class="product-item" data-id="${value.id_product}">
            <img src="${this.foto}" alt="тутФото">
            <div class="desc">
            <h3>${value.product_name}</h3>
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
