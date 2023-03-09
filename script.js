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
    geoCode(city)
    createBtn(city)
    
}


function createBtn(city) {
    let newBtn = document.createElement("button");
    let listEl = document.querySelector("#history");
    newBtn.addEventListener("click", function () {
        console.log("click")
        geoCode(city);
    });

    console.log()
    listEl.append(newBtn);
    newBtn.type = "button"
    newBtn.class = "btn-primary"
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
