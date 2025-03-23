// Note: API key initializations removed 
// Get your own API keys for free:
// - OpenWeatherMap: https://openweathermap.org/api
// - Pexels: https://www.pexels.com/api/

const apiKey = "";
const city = document.getElementById('city-input').value;

function calculateWeather() {
  const city = document.getElementById('city-input').value;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(res => {
      if (!res.ok) throw new Error('City not found');
      return res.json();
    })
    .then(data => {
      const tempElement = document.getElementById("temperature-container");
      const descElement = document.getElementById("weather-description");
      const iconElement = document.getElementById("weather-icon");

      // Convert Kelvin to Celsius
      const temp = Math.round(data.main.temp - 273.15);
      tempElement.textContent = `${temp}°C`;
      descElement.textContent = `${data.name}: ${data.weather[0].description}`;
      iconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
      iconElement.style.display = "block";
    })
    .catch(err => alert('Error fetching weather data'));
}