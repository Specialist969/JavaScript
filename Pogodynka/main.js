// Klucz API
const apiKey = '20d7064e2930efd33f33748d9394d164';

document.addEventListener('DOMContentLoaded', () => {
  loadLocations();
});

// Funkcja odaje nowe miejsce do listy i wyświetla jego pogodę
async function addLocation() {
  // Pobranie nazwy miejsca z pola
  const locationInput = document.getElementById('locationInput');
  const locationName = locationInput.value.trim();

  // Sprawdzenie, czy pole wejściowe nie jest puste
  if (locationName !== '') {
    try {
      // Pobranie danych pogodowych
      const weatherData = await getWeatherData(locationName);
      // Wyświetlenie danych pogodowych
      displayWeather(locationName, weatherData);

      // Pobranie aktualnej listy miejsc
      const locations = JSON.parse(localStorage.getItem('locations')) || [];

      // Dodanie nowego miejsca do listy
      locations.push(locationName);

      // Ograniczenie listy miejsc do 10 - usuwanie najstarszego miejsca
      if (locations.length > 10) {
        locations.shift(); // Usunięcie pierwszego elementu z listy
      }

      // Zapisanie listy miejsc
      localStorage.setItem('locations', JSON.stringify(locations));
    } catch (error) {
      console.error('There was an error fetching weather data:', error);
    }

    locationInput.value = ''; // Wyczyszczenie pola wejściowego formularza po dodaniu miejsca
  }
}

function loadLocations() {
  const locations = JSON.parse(localStorage.getItem('locations')) || [];
  locations.forEach(location => {
    getWeather(location);
  });
}

// Funkcja usuwa miejsce z listy
function removeLocation(locationName) {
  const locations = JSON.parse(localStorage.getItem('locations')) || [];
  const updatedLocations = locations.filter(loc => loc !== locationName);
  localStorage.setItem('locations', JSON.stringify(updatedLocations));

  const locationElement = document.getElementById(locationName);
  locationElement.remove();
}

// Funkcja  pobiera dane pogodowe z API na podstawie nazwy miejsca
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

// Funkcja wyświetla informacje o pogodzie dla danego miejsca
function displayWeather(locationName, data) {
  const locationsContainer = document.getElementById('locations');
  const locationElement = document.createElement('div');
  locationElement.id = locationName;
  locationElement.className = 'location';

  // Utworzenie treści, zawiera informacje o pogodzie oraz przycisk usuwania
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

// Funkcja  zwraca ikone pogody
function getWeatherIconUrl(condition) {
  const iconMap = {
    'clear': '01d.png',
    'clouds': '03d.png',
    'rainy': '10d.png',
    'snowy': '13d.png'
  };

  return iconMap[condition];
}

// Funkcja pobiera dane pogodowe dla danego miejsca i wywołuje funkcję displayWeather() do ich wyświetlenia
async function getWeather(locationName) {
  try {
    const weatherData = await getWeatherData(locationName);
    displayWeather(locationName, weatherData);
  } catch (error) {
    console.error('There was an error fetching weather data:', error);
  }
}
