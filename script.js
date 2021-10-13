//calling event listener (type submit) on the form
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  //storing the userInput
  let city = event.target.temperature.value;
  //invoking the function getCityInfo with userInput
  getCityInfo(city);
  event.target.reset();
});

function getCityInfo(city) {
  city = city[0].toUpperCase() + city.slice(1) 
  fetch(`https://wttr.in/${city}?format=j1`)
    .then((response) => response.json())
    .then((weather) => {
      //Reassigning the textNode/child of first child of the main element, p element 
      //Worked with Bryant to get path to access the data from the API
      document.querySelector(
        ".display p"
      ).innerHTML = `<label> <strong> ${weather.nearest_area[0].areaName[0].value}</strong> <label>
                <div class="current-temp grid-three">
                <p><strong> Area:</strong> ${weather.nearest_area[0].areaName[0].value}</p> 
                <p><strong> Region:</strong> ${weather.nearest_area[0].region[0].value} </p>
                <p><strong> Country:</strong> ${weather.nearest_area[0].country[0].value}  </p>
                <p><strong>Currently:</strong> Feels Like ${weather.current_condition[0].FeelsLikeF}°F</p> 
            </div>`;

//Reassigning the textNode/child of second child of the main element, p element 
      document.querySelector(
        ".display .three-day-temp"
      ).innerHTML = ` <div class="today">Today [${weather.weather[0].date}]
                <p><strong>Average Temperature: </strong>${weather.weather[0].avgtempF}°F</p> 
                <p><strong>Max Temperature: </strong>${weather.weather[0].maxtempF}°F</p>
                <p><strong>Min Temperature: </strong>${weather.weather[0].mintempF}</p>
                </div>
                <div class="tomorrow">Tomorrow [${weather.weather[1].date}]
                <p><strong>Average Temperature: </strong>${weather.weather[1].avgtempF}°F</p> 
                <p><strong>Max Temperature: </strong> ${weather.weather[1].maxtempF}°F</p>
                <p><strong>Min Temperature: </strong>${weather.weather[1].mintempF}°F</p> 
                </div>
                <div class="day-after">Day After Tomorrow [${weather.weather[2].date}]
                <p><strong>Average Temperature: </strong>${weather.weather[2].avgtempF}°F</p> 
                <p><strong>Max Temperature: </strong>${weather.weather[2].mintempF}°F</p>
                <p><strong>Min Temperature: </strong>${weather.weather[2].maxtempF}°F</p> 
                </div>`;
      //dynamically changes the body background image according to the city searched 
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + city + "')";

      getCityWeather(city, weather);
    });
}
/**
    getCityWeather: function removes the first  Child Element's textNode 
    then creates an li element and assigns name of city searched plus the 
    current feelsLike temperature in Fahrenheit
*/



function getCityWeather(loc, weather) {

  //Jose M helped in removing the textNode b4 appending an li to the ul
  if (document.querySelector('.history .previous-search').firstElementChild.textContent === 'No previous search') {
    document.querySelector('.history .previous-search').firstElementChild.remove()
  }
  const removeLiDuplicates = document.querySelector('.grid-two')
 if (!removeLiDuplicates.textContent.includes(loc)) {
  const li = document.createElement("li");
  li.innerHTML += `<a href="javascript:getCityInfo('${loc}')">${loc} -${weather.current_condition[0].FeelsLikeF}°F</a>`;
  document.querySelector("ul").append(li);
}
}
document.querySelector('#reload').addEventListener('click', ()=>{
   //const url = 'http://127.0.0.1:5500/index.html'
   location.reload();
 })