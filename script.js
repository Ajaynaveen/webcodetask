let searchHistory=document.getElementById('searchhistorydiv')
let wordInput=document.getElementById('cityInput')


let cityInput = document.getElementById("cityInput");
let cityList = document.getElementById("cityList");

cityInput.addEventListener("input", async () => {

cityList.innerHTML = "";
searchHistory.style.display="none"


let searchQuery = cityInput.value.toLowerCase();


if (searchQuery.length > 0) {

let response = await fetch(`https://api.openbrewerydb.org/breweries`);
let breweries = await response.json();


let filteredBreweries = breweries.filter(brewery => {
let city = brewery.city.toLowerCase();
return city.startsWith(searchQuery);
});


let orderList=document.createElement('ul')
orderList.classList.add('list-group')
filteredBreweries.forEach(brewery => {
console.log(brewery)
//   let cityDiv = document.createElement("div");
//   cityDiv.textContent = brewery.city;
//   cityList.appendChild(cityDiv);
let taglist=document.createElement('li')
taglist.classList.add('list-group-item')
taglist.textContent=brewery.city
taglist.addEventListener('click',(e)=>{
getmeaning(e.target.textContent)
let city=e.target.textContent
if(city&&(!history.includes(city))){
 history.push(city)

  console.log(history)
}
localStorage.setItem('searchhistory',JSON.stringify(history))
cityInput.value=e.target.textContent
cityList.style.display="none"
})
taglist.appendChild(orderList)
cityList.appendChild(taglist)
});
}
});



// cityInput.addEventListener('keyup', async () => {


//  searchHistory.style.display="none"
//  if (event.key === "Backspace" || event.key === "Delete") {
//     cityList.innerHTML = "";



//  let searchQuery = cityInput.value.toLowerCase();


//  if (searchQuery.length > 0) {

//    let response = await fetch(`https://api.openbrewerydb.org/breweries`);
//    let breweries = await response.json();


//    let filteredBreweries = breweries.filter(brewery => {
//      let city = brewery.city.toLowerCase();
//      return city.startsWith(searchQuery);
//    });


//    let orderList=document.createElement('ul')
//    orderList.classList.add('list-group')
//    filteredBreweries.forEach(brewery => {
//        console.log(brewery)
//    //   let cityDiv = document.createElement("div");
//    //   cityDiv.textContent = brewery.city;
//    //   cityList.appendChild(cityDiv);
//    let taglist=document.createElement('li')
//    taglist.classList.add('list-group-item')
//    taglist.textContent=brewery.city
//    taglist.addEventListener('click',(e)=>{
//        getmeaning(e.target.textContent)
//        let city=e.target.textContent
//        if(city&&(!history.includes(city))){
//         history.push(city)

//          console.log(history)
//    }
//    localStorage.setItem('searchhistory',JSON.stringify(history))
//        cityInput.value=e.target.textContent
//        cityList.style.display="none"
//    })
//    taglist.appendChild(orderList)
//    cityList.appendChild(taglist)
//    });
//  }
// }
// });


let history=[]
try{
let searchhistoryjson=localStorage.getItem('searchhistory')
// console.log(searchhistoryjson,"searchhistoryjson")
if(searchhistoryjson){
history=JSON.parse(searchhistoryjson)
}
}
catch{
console.log(error)
}
let flag=true;
wordInput.addEventListener('click',()=>{
if(flag===true&&wordInput.value.length===0) {
wordInput.value=''
console.log('clicked')
searchHistory.innerHTML=''
let list=document.createElement('ul')
list.classList.add('list-group')
history.forEach((word)=>{
let listtag=document.createElement('li')
listtag.classList.add('list-group-item')
listtag.textContent=word
listtag.addEventListener('click',event=>{
searchHistory.style.display="none"
wordInput.value=event.target.textContent

getmeaning(event.target.textContent)


})
list.appendChild(listtag)

})
searchHistory.appendChild(list)
searchHistory.style.display="block"
flag=false
}
else{
flag=true

searchHistory.style.display="none"
}

})
const form = document.querySelector('form');
form.addEventListener('submit', e => {
e.preventDefault();

let city = document.getElementById('cityInput').value;

getmeaning(city)
if(city&&(!history.includes(city))){
 history.push(city)

  console.log(history)
}
localStorage.setItem('searchhistory',JSON.stringify(history))

});
async function getmeaning(city){
try{
    searchHistory.style.display="none"
    let response = await fetch(`https://api.openbrewerydb.org/breweries?by_city=${city}`)
let data = await response.json();
console.log(data)
const tableBody = document.getElementById('breweryTableBody');
    tableBody.innerHTML = '';
    data.forEach(brewery => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${brewery.name}</td>
        <td>${brewery.brewery_type}</td>
        <td>${brewery.street}, ${brewery.city}, ${brewery.state} ${brewery.postal_code}</td>
        <td>${brewery.phone}</td>
        <td>${brewery.website_url ? `<a href="${brewery.website_url}">${brewery.website_url}</a>` : ''}</td>
      `;
      tableBody.appendChild(newRow);
    });


}catch (error) {
console.error('error fetching meaning for city');
}
}