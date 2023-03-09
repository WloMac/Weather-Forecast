let apiKey = "ddd9f5250efabb4bed328c6729073eb9";



document.getElementById("search-button").onclick = search;

historySarch = JSON.parse(localStorage.getItem("historySearch"))


if (historySarch){
    for (let index = 0; index < historySarch.length; index++) {
        const element = historySarch[index];

        createBtn(element)        
    }
    localStorage.clear();
}

function search(event) {
    event.preventDefault();    
    let city = document.getElementById("search-input").value; 
    if (city.length > 0){  
    geoCode(city)
    createBtn(city)
    }else{
        alert("Oops! There is no city!")
    }
    
}


function createBtn(city) {
    let newBtn = document.createElement("button");
    let listEl = document.querySelector("#history");
    newBtn.addEventListener("click", function () {
        
        geoCode(city);
    });

    console.log()
    listEl.append(newBtn);
    newBtn.type = "button";
    newBtn.classList.add("btn-custom");
    newBtn.textContent = city;
    const cityList = JSON.parse(localStorage.getItem("historySearch"));
    if (cityList){
        cityList.push(city);
        localStorage.setItem("historySearch", JSON.stringify(cityList));
    }else{   
        let array = []
        array.push(city)
    localStorage.setItem("historySearch", JSON.stringify(array));
    }
   
    
   
}

function geoCode(city) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
        .then(response => response.json())
        .then(function (cityOutput) {
            let foundCity = cityOutput[0]
            console.log(foundCity)
            forecast(foundCity)
            current(foundCity)
        })

}

function forecast(data) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&appid=${apiKey}&units=metric`).then(response => response.json()).then(function (fiveDaysOutput) {
        let fiveDayDisplayEl = document.querySelector("#forecast")                    
        fiveDayDisplayEl.textContent = " ";
        
        for (let i = 1;  i < 40; i++) {  
            var date = moment.unix(fiveDaysOutput.list[i].dt).format("DD/MM/YYYY")
            console.log(i)    
             
            fiveDayDisplayEl.innerHTML += `<div class="card" style="width:200px">
            <img class="card-img-top" src='https://openweathermap.org/img/wn/${fiveDaysOutput.list[i].weather[0].icon}@2x.png' alt="Weather Icon">
            <div class="card-body">
            <h4 class="card-title">${fiveDaysOutput.city.name}</h4>
            <p class="card-text">Date: ${date}</p>           
            <p class="card-text">Temperature: ${fiveDaysOutput.list[i].main.temp} °C</p>
            <p class="card-text">Wind Speed: ${fiveDaysOutput.list[i].wind.speed} km/h</p>
            <p class="card-text">Humidity: ${fiveDaysOutput.list[i].main.humidity} %</p>
            </div>`
                                             
            i+=7
        }
           
    })

}

function current(data){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${apiKey}&units=metric`)
    .then(response => response.json()).then(function (currentWeather) {
        let todayDiesplayEl = document.querySelector('#today')
        let todayDate = moment.unix(currentWeather.dt).format("DD/MM/YYYY")
        console.log(currentWeather)
        todayDiesplayEl.innerHTML = `<div class="card" style="width:200px">
        <img class="card-img-top" src='https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png' alt="Weather Icon">
        <div class="card-body">
        <h4 class="card-title"> ${currentWeather.name}</h4>
        <p class="card-text"> Date: ${todayDate}</p>
        
        <p class="card-text">Temperature: ${currentWeather.main.temp} °C</p>
        <p class="card-text">Humidity: ${currentWeather.main.humidity} %</p>
        <p class="card-text">Wind speed: ${currentWeather.wind.speed} km/h</p>         
        </div>`
             
    })
}
