const apiKey = '20d7064e2930efd33f33748d9394d164';

document.addEventListener('DOMContentLoaded', () => {
  loadLocations();
});

async function addLocation() {
  const locationInput = document.getElementById('locationInput');
  const locationName = locationInput.value.trim();

  if (locationName !== '') {
    try {
      const weatherData = await getWeatherData(locationName);
      displayWeather(locationName, weatherData);

      // Pobierz aktualną listę miejsc
      const locations = JSON.parse(localStorage.getItem('locations')) || [];

      // Dodaj nowe miejsce do listy
      locations.push(locationName);

      // Ogranicz listę miejsc do 10
      if (locations.length > 10) {
        locations.shift(); // Usuń pierwszy element z listy
      }

 
      localStorage.setItem('locations', JSON.stringify(locations));
    } catch (error) {
      console.error('There was an error fetching weather data:', error);
    }

    locationInput.value = '';
  }
}

function loadLocations() {
  const locations = JSON.parse(localStorage.getItem('locations')) || [];
  locations.forEach(location => {
    getWeather(location);
  });
}

function removeLocation(locationName) {
  const locations = JSON.parse(localStorage.getItem('locations')) || [];
  const updatedLocations = locations.filter(loc => loc !== locationName);
  localStorage.setItem('locations', JSON.stringify(updatedLocations));


  const locationElement = document.getElementById(locationName);
  locationElement.remove();
}

async function getWeatherData(locationName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    return {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      condition: data.weather[0].main.toLowerCase()
    };
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
}

function displayWeather(locationName, data) {
  const locationsContainer = document.getElementById('locations');
  const locationElement = document.createElement('div');
  locationElement.id = locationName;
  locationElement.className = 'location';

  const weatherIconUrl = getWeatherIconUrl(data.condition);
  const content = `
    <div>
      <strong>${locationName}</strong><br>
      Temperature: ${data.temperature}°C<br>
      Humidity: ${data.humidity}%
    </div>
    <div>
      <img class="weather-icon" src="${weatherIconUrl}" alt="${data.condition}">
      <button onclick="removeLocation('${locationName}')">Usuń</button>
    </div>
  `;

  locationElement.innerHTML = content;
  locationsContainer.appendChild(locationElement);
}

function getWeatherIconUrl(condition) {

  const iconMap = {
    'clear': '01d.png',
    'clouds': '03d.png',
    'rainy': '10d.png',
    'snowy': '13d.png'
  };

  return iconMap[condition];
}

async function getWeather(locationName) {
  try {
    const weatherData = await getWeatherData(locationName);
    displayWeather(locationName, weatherData);
  } catch (error) {
    console.error('There was an error fetching weather data:', error);
  }
}