let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector("#total");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let submit = document.querySelector("#submit");
let search = document.querySelector("#search");
let deleteAll = document.querySelector('#delete-all-btn')
let productsCount = document.querySelector('.products-num');
let tmp;
let searchMood = 'title';


let dataArr = JSON.parse(localStorage.getItem('products')) || [];  
showData();
let mood = 'create';

function getTotal(){
    if(price.value != ''){
        total.innerHTML= (+price.value + +taxes.value + +ads.value - +discount.value);
        total.style.background = 'var(--green)';
    }else{
        total.innerHTML='';
        total.style.background='var(--red)';
    }
}


submit.onclick = function (){
    let product = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value.toLowerCase(),
    }
    if(mood==='create'){
        if(count.value>1){
            for(let i =0 ;i< +count.value;i++){
                dataArr.push(product);
            }
        }else{
            dataArr.push(product);
        }
    }else{
        dataArr[tmp]=product;
        count.style.display='block';
        mood='create';
        submit.innerHTML='create';
    }
    

    localStorage.setItem('products',JSON.stringify(dataArr));

    cleanInputs();
    showData();
}

function cleanInputs(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}

function showData(){
    let table = '';
    for(let i =0;i<dataArr.length;i++){
        table +=`
        <tr>
            <td>${i}</td>
            <td>${dataArr[i].title}</td>
            <td>${dataArr[i].price}</td>
            <td>${dataArr[i].taxes}</td>
            <td>${dataArr[i].ads}</td>
            <td>${dataArr[i].discount}</td>
            <td>${dataArr[i].total}</td>
            <td>${dataArr[i].category}</td>
            <td><button onclick='updateData(${i})'>update</button></td>
            <td><button onclick='deleteProduct(${i})'>delete</button></td>
        </tr>
        `    
    }
    document.querySelector('#tbody').innerHTML = table;
    if(dataArr.length == 0){
        deleteAll.style.display = 'none';
    }else{
        deleteAll.style.display = 'block';
    }

    productsCount.innerHTML = dataArr.length;
    getTotal();
}

function deleteProduct(i){
    dataArr.splice(i,1);
    localStorage.setItem('products',JSON.stringify(dataArr));
    showData();
}

deleteAll.onclick = function(){
    dataArr.length = 0;
    localStorage.setItem('products',JSON.stringify(dataArr));
    showData();
}
function updateData(i){
    tmp=i;
    title.value=dataArr[i].title;
    price.value=dataArr[i].price;
    taxes.value=dataArr[i].taxes;
    ads.value=dataArr[i].ads;
    discount.value=dataArr[i].discount;
    category.value=dataArr[i].category;
    getTotal();
    submit.innerHTML='update';
    mood='update';
    count.style.display='none';
    scroll({
        top:0,
        behavior:'smooth'
    });
}
function editSearchMood(id){
    search.innerHTML='';
    if(id=='search-title-btn'){
        searchMood='title';
    }else{
        searchMood='category';
    }
    search.placeholder='Search by '+searchMood;
    search.focus();
    showData();
}

function searchData(value){
    let table;
    for(let i =0;i<dataArr.length;i++){
        if(searchMood=='title'){
                if(dataArr[i].title.includes(value.toLowerCase())){
                    table +=`
                    <tr>
                        <td>${i}</td>
                        <td>${dataArr[i].title}</td>
                        <td>${dataArr[i].price}</td>
                        <td>${dataArr[i].taxes}</td>
                        <td>${dataArr[i].ads}</td>
                        <td>${dataArr[i].discount}</td>
                        <td>${dataArr[i].total}</td>
                        <td>${dataArr[i].category}</td>
                        <td><button onclick='updateData(${i})'>update</button></td>
                        <td><button onclick='deleteProduct(${i})'>delete</button></td>
                    </tr>
                    `
                }
            
        }else{
            if(dataArr[i].category.includes(value.toLowerCase())){
                    table +=`
                    <tr>
                        <td>${i}</td>
                        <td>${dataArr[i].title}</td>
                        <td>${dataArr[i].price}</td>
                        <td>${dataArr[i].taxes}</td>
                        <td>${dataArr[i].ads}</td>
                        <td>${dataArr[i].discount}</td>
                        <td>${dataArr[i].total}</td>
                        <td>${dataArr[i].category}</td>
                        <td><button onclick='updateData(${i})'>update</button></td>
                        <td><button onclick='deleteProduct(${i})'>delete</button></td>
                    </tr>
                    `
                }
            }
    }
    document.querySelector('#tbody').innerHTML = table;
}


