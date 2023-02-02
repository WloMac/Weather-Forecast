let apiKey = "ddd9f5250efabb4bed328c6729073eb9";



//event listener button create element
//How to change variable in global scope
document.getElementById("search-button").onclick = search;


function search(event) {
    event.preventDefault();

    let city = document.getElementById("search-input").value;
    geoCode(city)

}

// add local storage to keep buttons on screen
// add data class to button
// recall data class from local storage
function createBtn() {
    let newBtn = document.createElement("button");
    let listEl = document.querySelector("#history");
    listEl.append(newBtn);
    newBtn.type = "button"
    newBtn.class = "btn-primary"
    newBtn.textContent = city;
    localStorage.setItem(city, `data-${city}`);

}
//Console log to check how to get weather output // 

function geoCode(city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
        .then(response => response.json())
        .then(function (cityOutput) {
            let foundCity = cityOutput[0]
            forecast(foundCity)
            current(foundCity)
        })

}

function forecast(data) {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&appid=${apiKey}`).then(response => response.json()).then(function (fiveDaysOutput) {
        let fiveDayDisplayEl = document.querySelector("#forecast")
        fiveDayDisplayEl.textContent = fiveDaysOutput.list[5].dt_txt;
        console.log(fiveDaysOutput.list[5].main)
        console.log(fiveDaysOutput.list[5].dt_txt)
        console.log(fiveDaysOutput.list[5].weather[0].description)
        console.log(fiveDaysOutput.list[5].weather[0].icon)
    })

}

function current(data){
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${apiKey}`).then(response => response.json()).then(function (currentWeather) {
        console.log(currentWeather)

    })
}

// 