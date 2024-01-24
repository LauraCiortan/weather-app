const apiKey = '8a68dc84580d35c355ccc438e25dc53f';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';


const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const lowTemperature = document.getElementById('low');
const highTemperature = document.getElementById('high');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');


searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
        locationInput.value = ''; // Clear the input field
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°`;
            descriptionElement.textContent = data.weather[0].description;
            lowTemperature.textContent = 'L: ' + `${Math.round(data.main.temp_min)}°`;
            highTemperature.textContent = 'H: ' + `${Math.round(data.main.temp_max)}°`;
            feelsLike.textContent = `${Math.round(data.main.feels_like)}°`;
            humidity.textContent = data.main.humidity + '%';
            pressure.textContent = data.main.pressure + ' hPa';

            const sunriseTime = new Date(data.sys.sunrise * 1000); // Convert Unix timestamp to milliseconds
            const formattedSunriseTime = sunriseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            sunrise.textContent = formattedSunriseTime;

            const sunsetTime = new Date(data.sys.sunset * 1000); // Convert Unix timestamp to milliseconds
            const formattedSunsetTime = sunsetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            sunset.textContent = formattedSunsetTime;
            
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}