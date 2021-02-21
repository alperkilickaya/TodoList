const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items ; // LS için kullanacağım


//load items
loadItems(); // sayfa yenilendiğinde itemları LS'den getirir.

//call event listeners
eventListeners();

function eventListeners() {
    //submit event
    form.addEventListener('submit', addNewItem);
    taskList.addEventListener('click', deleteItem);
    btnDeleteAll.addEventListener('click', deleteAllItems);

}


function loadItems(){ //ilk açılma veya yenilemede items'ın elemanlarını li'ye bas.

    items = getItemsFromLS(); //LS'de olanları getiriyoruz.

    items.forEach(function(item){
        createItem(item);
    })
}

//local storage'dan veri alma
function getItemsFromLS(){ 
    if(localStorage.getItem('items')===null){ //LS'de items nesnesi yoksa
        items = [] //boş olarak ata
    }else{ //LS'de items nesnesi varsa bana array olarak döndür
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

//LS'a veri gönderme
function setItemToLS(text){
    items = getItemsFromLS();//önce LS'deki halini al
    items.push(text);// LS'den gelenin üzerine bunu ekle
    localStorage.setItem('items', JSON.stringify(items));//üzerine eklenmiş halini LS'e köşeli parantez olarak tekrar gönder
}

//LS'den veri silme

function deleteItemFromLS(text){
     items = getItemsFromLS(); //LS'den verileri al
     items.forEach(function(item,index){ //LS'deki herbir item'ın index'İne göre
        if(item === text){ //eğer gelen item ile parametre olarak verilen text eşit ise
            items.splice(index,1); // gelen verilerin (items) index'inden başla 1 tane sil. yani kendisini sil.
        }
     });
     localStorage.setItem('items',JSON.stringify(items));
}

function createItem(text){ // items içindeki itemları li'nin içine yerleştir.
        //create li
        const li = document.createElement('li');
        li.className ='list-group-item list-group-item-secondary';
        li.appendChild(document.createTextNode(text));

        //create a
        const a = document.createElement('a');
        a.className = 'delete-item float-right ml-2';
        a.setAttribute('href','#');
        a.innerHTML='<i class="fas fa-times"></i>';

        //create button
        const button = document.createElement('button');
        button.className = 'btn btn-primary float-right';
        button.textContent="OK";

        button.addEventListener('click', function(){
            li.style.background = "lightblue";
        })

        //add a to li
        li.appendChild(a);

        li.appendChild(button);

        //add li to ul
        taskList.appendChild(li); 
}

// add new ıtem
function addNewItem(e){

    if(input.value === ''){
        alert('Lütfen Görev Giriniz');
    }

    createItem(input.value); // input'a giriş yapıldığında li'ye bu değeri bas
    
    //LS'e ekleme
    setItemToLS(input.value); // input'a yazılanı bu method ile LS'e gönderdim

    //clear input
    input.value='';
    
    e.preventDefault(); 
}
 
//delete one item
function deleteItem(e){
   
    if(e.target.className === 'fas fa-times'){
        if(confirm('Görev Silinsin mi?')){ // tüm class'ı bu isimli ise
        e.target.parentElement.parentElement.remove();
            //LS'den de sil
            deleteItemFromLS(e.target.parentElement.parentElement.textContent)      
            }
        }
        e.preventDefault();
    }

//delete all list
function deleteAllItems(e){
    if(confirm('Tüm Görevler Silinsin mi?')){
        while(taskList.firstChild){ // ul'nin ilk child'ı olduğu sürece

            taskList.removeChild(taskList.firstChild); // ul'nin ilk cchild'ını kaldır
        
        }
        localStorage.clear(); //LS'i de komple sil
    
    }
    e.preventDefault();
}




