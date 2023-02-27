const  loadPhone = async (searchText,dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    // fetch(url)
    // .then(res => res.json())
    // .then(data => console.log(data));
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data,dataLimit);
}

const displayPhone = (phones,dataLimit) => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.innerHTML = '';
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length>10){
        phones = phones.slice(0,12);
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }
    const noPhone = document.getElementById('no-phone-msg');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }
    phones.forEach ( phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card">
        <img src="${phone.image}" class="card-img-top img-fluid p-4" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">${phone.slug}.</p>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    loadeSpiner(false);
}

const processSearch = (dataLimit) => {
    loadeSpiner(true);
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    loadPhone(searchText,dataLimit);
}

document.getElementById('searchButton').addEventListener('click', function(){
    processSearch(10);
})

const loadeSpiner = isLoading =>{
    const loadSection = document.getElementById('loader');
    if(isLoading){
        loadSection.classList.remove('d-none')
    }
    else{
        loadSection.classList.add('d-none');
    }
}
document.getElementById('show-all-button').addEventListener('click', function(){
    processSearch();
})
loadPhone("samsung");