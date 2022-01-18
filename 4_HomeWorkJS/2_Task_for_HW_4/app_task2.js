//Решение ДЗ№4 задача№1 - см. строка 15
//сорян за 'много-воды-в-коде-но-хотел-украсить'


function replacement(){
 
const btnReplace = document.querySelector ('.btn-replace') ;
 
btnReplace.addEventListener ('click' , replaceFunc); 

function replaceFunc( ){
     
    //Найти все ' и заменить их на  " за исключением апосторофа - don't 
  

    //const bigWordDiv = (document.querySelector ('.bigWord').textContent).replace(/[\b'\b] | '/g, `"`);
    const bigWordDiv = (document.querySelector ('.bigWord').textContent).replace(/[\B'|'\B] | '/g, `"`);
 
    const bigWordIns = document.querySelector ('.bigWord_ins') ;
    bigWordIns.innerText = `${bigWordDiv}` ;
 
    hidden( )

    }
} 

function hidden( ){
     
    const btnReplace = document.querySelector ('.btn-replace') ;   

     btnReplace.innerText = "Очистить поле" ;

    btnReplace.addEventListener ('click' , clear);   
     function clear(){
     const bigWordIns = document.querySelector ('.bigWord_ins') ;
     bigWordIns.innerText = `Тут будет замененный текст` ; 

     btnReplace.innerText = "Замена" ;
     replacement()   
    }

}
 
replacement()

//17.01.2022г