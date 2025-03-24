// Note: API key initializations removed 
// Get your own API keys for free:
// - OpenWeatherMap: https://openweathermap.org/api
// - Pexels: https://www.pexels.com/api/

const apiKey = "";
const pexelsKey = "";


function calculateWeather() {
  const city = document.getElementById('city-input').value;
  let cityIssue = false;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(res => {
      if (!res.ok) {
        cityIssue = true;
        throw new Error('City not found');
      }
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
      return "continue";
    })
    .then(result => {
      // New forecast implementation
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
        .then(res => res.json())
        .then(forecastData => {
          const forecastBox = document.getElementById("hourly-forecast");
          forecastBox.innerHTML = '';

          for (let i = 0; i < 8; i++) {
            const hourData = forecastData.list[i];
            const hour = new Date(hourData.dt * 1000).getHours();
            const temp = Math.round(hourData.main.temp - 273.15);

            forecastBox.innerHTML += `
              <div class="hourly-container">
                <span>${hour}:00</span>
                <img src="https://openweathermap.org/img/wn/${hourData.weather[0].icon}.png">
                <span>${temp}°C</span>
              </div>`;
          }
        });
      fetch(`https://api.pexels.com/v1/search?query=${city}&per_page=1`, {
        headers: { Authorization: pexelsKey }
      })
        .then(res => res.json())
        .then(photoData => {
          if (photoData.photos?.length > 0) {
            document.body.style.backgroundImage = `url('${photoData.photos[0].src.large2x}')`;
          }
        })
        .catch(() => console.log('Background fetch failed'));
    })
    .catch(err => {
      if (cityIssue) {
        alert("Please enter a valid city")
      }
      else {
        alert('Error fetching weather data')
      }
    });


}