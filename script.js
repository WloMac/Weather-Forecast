let apiKey = "ddd9f5250efabb4bed328c6729073eb9";
// city needs to be user input
let city = "London"; 
console.log(city);
let geoQueryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

//event listener button create element
//How to change variable in global scope
document.getElementById("search-button").onclick = search;


function search(event) {
    event.preventDefault();
    city = document.getElementById("search-input").value;
    
    newSearch();
    
}

function newSearch(){
fetch(geoQueryURL)
.then(response => response.json())
.then(function (cityOutput) {
    let foundCity = cityOutput[0]
    console.log(cityOutput[0]);
    console.log(city)
    return fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${foundCity.lat}&lon=${foundCity.lon}&appid=${apiKey}`);
    
})

.then(response => response.json())
.then(function(fiveDaysOutput){
    console.log(fiveDaysOutput)
})

}
