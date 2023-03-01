let apiKey = "ddd9f5250efabb4bed328c6729073eb9";



//event listener button create element
//How to change variable in global scope

document.getElementById("search-button").onclick = search;


function search(event) {
    event.preventDefault();
    let city = document.getElementById("search-input").value;
    geoCode(city)
    createBtn(city)

}

// add local storage to keep buttons on screen
// add data class to button
// recall data class from local storage
// add clear button
// prevent from typing random

function createBtn(city) {
    let newBtn = document.createElement("button");
    let listEl = document.querySelector("#history");
    //create ul /li
    listEl.append(newBtn);
    newBtn.type = "button"
    newBtn.class = "btn-primary"
    newBtn.textContent = city;
    localStorage.setItem(city, `data-${city}`);

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
        let fiveDayDisplayEl = document.querySelector("#forecast");   
        ;
        console.log(fiveDaysOutput)
        
        
        
        
        for (let i = 1;  i < 40; i++) {  
            var date = moment.unix(fiveDaysOutput.list[i].dt).format("DD/MM/YYYY")
            console.log(i)         
            fiveDayDisplayEl.innerHTML += `<div id="${fiveDaysOutput.city.name}">
            <p>City: ${fiveDaysOutput.city.name}</p>
            <p>Date: ${date}</p>
            <p><p><img src='https://openweathermap.org/img/wn/${fiveDaysOutput.list[i].weather[0].icon}@2x.png'></p>
            <p>Temperature: ${fiveDaysOutput.list[i].main.temp} °C</p>
            <p>Wind Speed: ${fiveDaysOutput.list[i].wind.speed} km/h</p>
            <p>Humidity: ${fiveDaysOutput.list[i].main.humidity} %</p>
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
        todayDiesplayEl.innerHTML = `<div id="today-${currentWeather.name}">
        <p>City: ${currentWeather.name}</p>
        <p>Date: ${todayDate}</p>
        <p><img src='https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png'></p>
        <p>Temperature: ${currentWeather.main.temp} °C</p>
        <p>Humidity: ${currentWeather.main.humidity} %</p>
        <p>Wind speed: ${currentWeather.wind.speed} km/h</p>         
        </div>`
             
    })
}
