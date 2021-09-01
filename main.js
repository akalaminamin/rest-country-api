
// load data using api
const loadData = async () =>{

    // search input box and search button
    const searchInput = document.getElementById('searchInput');
    const searchValue = searchInput.value;

    if(searchInput.value == ''){
        errorMessage(`Please Search your country name`)
    }else{
        toggleSpinner('block')
        const errorNoties = document.getElementById("errorNoties").textContent = '';
        const wrapperDiv = document.getElementById("wrapperDiv").textContent = '';
        const detailsWrap = document.getElementById('detailsWrap').textContent = '';
        const url = `https://restcountries.eu/rest/v2/name/${searchValue}`;
        try{
            const resp = await fetch(url);
            const data =  await resp.json();
            displayData(data[0])

        }catch(err){
            errorMessage()
            toggleSpinner('none')
        }
    }  

    // clear search value
    searchInput.value = '';
}

// handle error message
const errorMessage = (error = "Something went wrong. Try again later.") =>{
    const errorNoties = document.getElementById("errorNoties");
    errorNoties.innerHTML = `
        <h5 class="text-warning text-center">${error}</h5>
    `;
}

// display data in UI
const displayData = (countires) =>{
    const wrapperDiv = document.getElementById("wrapperDiv")
    const createDiv = document.createElement("div")
    wrapperDiv.textContent ="";
    document.title = `${countires.name}`
    createDiv.innerHTML =`
    <!-- Image -->
        <div class="rounded overflow-hidden border p-2">
            <img src=${countires.flag} class="w-100" alt=""/>
        </div>
        <!-- Body -->
        <div class="py-2 d-flex justify-content-between align-items-center d-md-block text-md-center">
            <h1>${countires.name}</h1>
            <button class="btn btn-dark" onclick="countryDetils('${countires.name}')">Learn More</button>
        </div>
    `;
    wrapperDiv.appendChild(createDiv);
    toggleSpinner('none')
}

// spinner 
const toggleSpinner = (displayCss) =>{
    const spinner = document.getElementById("spinner");
    spinner.style.display = displayCss;
}

// load country details
const countryDetils = (country) =>{
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
        .then(resp => resp.json())
        .then(data => displayDetails(data[0]))
}

// display country details UI
const displayDetails = (respData) =>{
    const detailsWrap = document.getElementById('detailsWrap');
    detailsWrap.innerHTML = '';
    const createDiv = document.createElement('div');
    createDiv.classList.add("row")
    createDiv.innerHTML =`
        <div class="col-md-7">
        <div class="rounded overflow-hidden border p-2">
        <img src="${respData.flag}" class="w-100" alt=""/>
        </div>
    </div>
    <div class="col-md-5">
        <h1>${respData.name}</h1>
        <p>Capital: ${respData.capital}</p>
        <p>Area: ${respData.area}</p>
        <p>Currencies: ${respData.currencies[0].symbol}</p>
    </div>
    `;
    detailsWrap.appendChild(createDiv);
}