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
                    border: solid red;
                    height: 30vh;
                    background-color: #5d92ff;
                }

                #weather-icon-box {
                    display: flex;
                    width: 30%;
                    float: left;
                    border: solid blue;
                }

                #weather-icon-box img {
                    height: 75%;
                    width: 75%;
                    margin: auto;
                }

                #forecast-box {
                    display: flex;
                    width: 70%;
                    border: solid green;
                    flex-direction: column;
                    justify-content: center;
                    text-align: center;
                    font-size: 2rem;
                }

                #general-forecast {
                    height: 50%;
                    border: solid purple;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                #other-forecast {
                    height: 50%;
                    border: solid yellow;
                    display: flex;
                    justify-content: center;
                    align-items: center;
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
                console.log("Current Temp is " + temperature);
                let weatherIconBox = this.shadowRoot.getElementById("weather-icon-box");
                weatherIconBox.innerHTML = `
                    <img src="./assets/icons/sunny.svg" alt="sunny icon">
                `;
                let generalForecast = this.shadowRoot.getElementById("general-forecast");
                generalForecast.innerHTML = shortForecast + " " + temperature  + " &deg" + temperatureUnit;

                let otherForecast = this.shadowRoot.getElementById("other-forecast");
                otherForecast.innerHTML = windSpeed + " " + windDirection + " "
                    + relativeHumidityValue + relativeHumidityUnit;
                
                

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