document.querySelector('.search-box button').addEventListener('click', getWeather);

async function getWeather() {
  const apiKey = 'nter your API key heree'; 
  const city = document.getElementById('cityInput').value.trim() || 'Berlin';

  const tempEl = document.getElementById('temperature');
  const cityEl = document.getElementById('cityName');
  const humidityEl = document.getElementById('humidity');
  const windEl = document.getElementById('windSpeed');
  const errorEl = document.getElementById('errorMessage');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      errorEl.textContent = "City not found!";
      tempEl.textContent = '--°C';
      cityEl.textContent = 'City';
      humidityEl.textContent = '--%';
      windEl.textContent = '-- km/h';
      return;
    }

    errorEl.textContent = '';
    tempEl.textContent = `${Math.round(data.main.temp)}°C`;
    cityEl.textContent = data.name;
    humidityEl.textContent = `${data.main.humidity}%`;
    windEl.textContent = `${data.wind.speed} km/h`;
  } catch (error) {
    console.error(error);
    errorEl.textContent = "Error fetching weather data.";
  }
}