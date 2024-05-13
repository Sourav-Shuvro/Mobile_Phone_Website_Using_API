const loadPhones = (search, dataLimit) =>{
    fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
    .then(res => res.json())
    .then(data => showPhone(data.data, dataLimit))
}

const showPhone = (phones, dataLimit) =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = ``;

    const warning = document.getElementById('warning');

    if(phones.length === 0){
        warning.classList.remove('d-none');
    }
    else{
        warning.classList.add('d-none');
    }

    const showButton = document.getElementById('showButton');

    if(phones.length > 10 && dataLimit){
        showButton.classList.remove('d-none');
        phones = phones.slice(0,12);
    }
    else{
        showButton.classList.add('d-none');
    }

    phones.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        // div.classList.add('');
        div.innerHTML = `
        <div class="card p-2">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title text-info">${phone.phone_name}</h5>
                <button type="button" onclick="viewDetails('${phone.slug}')" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">View Details</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(div);
    });
    spinnig(false);
}

const processSearch = (dataLimit) =>{
    const searchField = document.getElementById('search-field');
    const search = searchField.value;
    // searchField.value = ``;
    loadPhones(search, dataLimit);
}

const searchPhones = () =>{
    spinnig(true);
    processSearch(10);
}

const showAll = () =>{
    processSearch();
}

const spinnig = (isSpinnig) =>{
    const spinID = document.getElementById('spin');
    if(isSpinnig === true){
        spinID.classList.remove('d-none')
    }
    else{
        spinID.classList.add('d-none');
    }
}

const viewDetails = slug => {
    fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
    .then(res => res.json())
    .then( data => showModal(data.data))
}

const showModal = details =>{
    // console.log(details)
    const modalHeader = document.getElementById('exampleModalLabel');
    modalHeader.innerText = `${details.name}`;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <p>Cheipset: ${details.mainFeatures.chipSet}</p>
    <p>Display Size: ${details.mainFeatures.displaySize}</p>
    <p>Storage: ${details.mainFeatures.storage}</p>
    <p>Sensors: ${details.mainFeatures.sensors}</p>
    <p>Release Date: ${details.releaseDate}</p>
    `
}
loadPhones('apple');