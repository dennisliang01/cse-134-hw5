class WeatherWidget extends HTMLElement {

    
    constructor() {
        super();
        this.attachShadow({mode: 'open'});

        let weatherBox = document.createElement("div");
        weatherBox.id = "weather-box";
        this.shadowRoot.appendChild(weatherBox);

        let weatherIconBox = document.createElement("div");
        weatherIconBox.id = "weather-icon-box";
        weatherBox.appendChild(weatherIconBox);

        let forecastBox = document.createElement("div");
        forecastBox.id = "forecast-box";
        weatherBox.appendChild(forecastBox);
        
        let generalForecast = document.createElement("div");
        generalForecast.id = "general-forecast";
        forecastBox.appendChild(generalForecast);

        let otherForecast = document.createElement("span");
        otherForecast.id = "other-forecast";
        forecastBox.appendChild(otherForecast);
        
        

    }

    connectedCallback() {
        console.log("Connected Weather Widget");

        let styleTag = document.createElement("style");
        // Using back tick, not single quote for multi line assignment
        styleTag.innerHTML = `
                #weather-box {
                    display: flex;
                    height: 30vh;
                    width: 50vw;
                    background-color: #00A4E4;
                    color: white;
                    align-items: center;
                    border-radius: 30px;
                    text-align: center;
                    margin: auto;
                }

                #weather-icon-box {
                    width: 50%;
                }

                #weather-icon-box img {
                    width: 10rem;
                    height: auto;
                }

                #forecast-box {
                    display: flex;
                    width: 50%;
                    flex-direction: column;
                    justify-content: center;
                    text-align: center;
                    font-size: 2rem;

                }

                #general-forecast {
                    height: 50%;
                    display: flex;
                    align-items: center;
                    margin-bottom: 1rem;
                    justify-content: center;
                }

                #other-forecast {
                    height: 50%;
                    display: flex;
                    align-items: center;
                    line-height: 2.5rem;
                    justify-content: center;


                }
            `;
        this.shadowRoot.append(styleTag);

        fetch("https://api.weather.gov/gridpoints/SGX/55,22/forecast/hourly")
            .then(response => response.json())
            .then((data) => {
                
                let weather = data.properties.periods[0];
                console.log(weather);
                let temperature = weather.temperature
                let temperatureUnit = weather.temperatureUnit
                let isDaytime = weather.isDaytime;
                let shortForecast = weather.shortForecast;
                let windSpeed = weather.windSpeed;
                let windDirection = weather.windDirection;
                let relativeHumidityValue = weather.relativeHumidity.value;
                let relativeHumidityUnit = weather.relativeHumidity.unitCode;
                
                if (!isDaytime) {
                    let weatherBox = this.shadowRoot.getElementById("weather-box");
                    weatherBox.style.backgroundColor = "#16244b";
                }

                let weatherIcon = document.createElement("img");
                let shortForecastLowerCase = shortForecast.toLowerCase();

                if (shortForecastLowerCase.includes("sunny")){
                    weatherIcon.src = "./assets/icons/sunny.png"
                    weatherIcon.alt = "Sunny Icon";
                } else if (shortForecastLowerCase.includes("cloudy") || 
                    shortForecastLowerCase.includes("overcast")) {
                    weatherIcon.src = "./assets/icons/cloudy.png"
                    weatherIcon.alt = "Cloudy Icon";
                } else if (shortForecastLowerCase.includes("rain")) {
                    weatherIcon.src = "./assets/icons/rain.png"
                    weatherIcon.alt = "Rain";
                } else if (shortForecastLowerCase.includes("thunder")) {
                    weatherIcon.src = "./assets/icons/thunder.png"
                    weatherIcon.alt = "Thunder Icon";
                } else if (shortForecastLowerCase.includes("snow")) {
                    weatherIcon.src = "./assets/icons/snow.png"
                    weatherIcon.alt = "Snow Icon";
                } else if (shortForecastLowerCase.includes("wind")) {
                    weatherIcon.src = "./assets/icons/windy.png"
                    weatherIcon.alt = "Wind Icon";
                } else if (shortForecastLowerCase.includes("clear")) {
                    if (!isDaytime) {
                        weatherIcon.src = "./assets/icons/nightClear.png"
                        weatherIcon.alt = "Mostly Clear Icon";
                    } else {
                        weatherIcon.src = "./assets/icons/sunny.png"
                        weatherIcon.alt = "Sunny Icon";
                    }
                } else {
                    weatherIcon.src = "./assets/icons/unknownWeather.png"
                    weatherIcon.alt = "Unknown Weather";
                }

                let weatherIconBox = this.shadowRoot.getElementById("weather-icon-box");
                weatherIconBox.appendChild(weatherIcon);

                let generalForecast = this.shadowRoot.getElementById("general-forecast");
                generalForecast.innerHTML = shortForecast + " " + temperature  + " &deg" + temperatureUnit;

                let otherForecast = this.shadowRoot.getElementById("other-forecast");
                otherForecast.innerText = "Wind: " + windSpeed + " " + windDirection + "\n"
                    + "Humidity: " + relativeHumidityValue + "%";
            })
            .catch(error => {
                console.log(error);
            });
    }
    
    disconnectedCallback() {
        console.log("Disconnected Weather Widget")
    }
}

customElements.define("weather-widget", WeatherWidget);