// Note: API key initializations removed 
// Get your own API keys for free:
// - OpenWeatherMap: https://openweathermap.org/api
// - Pexels: https://www.pexels.com/api/

const apiKey = "YOUR KEY";
const city = document.getElementById('city').value;
function getWeather() {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      console.log(data); // No display implementation
    });
}