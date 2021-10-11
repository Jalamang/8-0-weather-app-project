


document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    let city = event.target.temperature.value;
    fetch(`https://wttr.in/${city}?format=j1`)
        .then((response) => response.json())
        .then((weather) => {
            // console.log(weather)
            const getMain = () => {
                document.querySelector('.display p').innerHTML =
                    `<label> <strong> ${weather.nearest_area[0].areaName[0].value}</strong> <label>
                <div class="current-temp grid-three">
                <p><strong> Area:</strong> ${weather.nearest_area[0].areaName[0].value}</p> 
                <p><strong> Region:</strong> ${weather.nearest_area[0].region[0].value} </p>
                <p><strong> Country:</strong> ${weather.nearest_area[0].country[0].value}  </p>
                <p><strong>Currently:</strong> Feels Like ${weather.current_condition[0].FeelsLikeF}°F</p> 
            </div>`

                document.querySelector('.display .three-day-temp').innerHTML =
                    ` <div class="today"> <strong>Today</strong>
                <p><strong>Average Temperature: </strong>${weather.weather[0].avgtempF}°F</p> 
                <p><strong>Max Temperature: </strong>${weather.weather[0].maxtempF}°F</p>
                <p><strong>Min Temperature: </strong>${weather.weather[0].mintempF}</p>
                </div>
                <div class="tomorrow"><strong>Tomorrow</strong> 
                <p><strong>Average Temperature: </strong>${weather.weather[1].avgtempF}°F</p> 
                <p><strong>Max Temperature: </strong> ${weather.weather[1].maxtempF}°F</p>
                <p><strong>Min Temperature: </strong>${weather.weather[1].mintempF}°F</p> 
                </div>
                <div class="day-after"><strong>Day After Tomorrow</strong> 
                <p><strong>Average Temperature: </strong>${weather.weather[2].avgtempF}°F</p> 
                <p><strong>Max Temperature: </strong>${weather.weather[2].mintempF}°F</p>
                <p><strong>Min Temperature: </strong>${weather.weather[2].maxtempF}°F</p> 
                </div>`
                document.body.style.backgroundImage =
                    "url('https://source.unsplash.com/1600x900/?" + city + "')";
            }
            getMain()
            function getCityWeather(loc) {
                if (document.querySelector('.history .previous-search').firstElementChild.textContent === 'No previous search') {
                    document.querySelector('.history .previous-search').firstElementChild.remove()
                }
                const li = document.createElement("li");
                //li.innerHTML += `<a href="https://wttr.in/${loc}" >${loc}</a> - ${weather.current_condition[0].FeelsLikeF} ` ;
                li.innerHTML += loc;
                document.querySelector('.history .previous-search').append(li);
                return li;
            }
            getCityWeather(city)


        })
    event.target.reset();
})



const updateCities = () => {
    const cityLink = document.querySelectorAll('ul li')
    for (let city of cityLink) {
        city.addEventListener('click', (event) => {
            event.preventDefault()
            //document.querySelectorAll('.history .previous-search li')
            getMain()
        })
    }
}







