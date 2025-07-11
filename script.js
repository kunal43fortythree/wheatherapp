const weatherDiv = document.getElementById('wthr');
const loadingDiv = document.getElementById('load');
const errorDiv = document.getElementById('err');
const run = document.getElementById('getBtn');

run.addEventListener('click', getWeather);
async function getWeather() {
  const city = document.getElementById('ctyip').value.trim();
  weatherDiv.innerHTML = '';
  errorDiv.textContent = '';
  loadingDiv.textContent = 'Loading...';

  if (!city) {
    errorDiv.textContent = 'Please enter a city name.';
    loadingDiv.textContent = '';
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=004f7795e1bfd5939b16209b623522a4`
    );

    console.log(response);
    if (!response.ok) {
      throw new Error('City not found or API error');
    }

    const data = await response.json();
    console.log(data);

    const temp = data.main.temp;
    const weather = data.weather[0].main;

    weatherDiv.innerHTML = `
      <h2>${data.name}</h2>
      <p>🌡️ Temp: ${temp}°C</p>
      <p>🌥️ Status: ${weather}</p>
    `;
  } catch (error) {
    errorDiv.textContent = error.message;
  } finally {
    loadingDiv.textContent = '';
  }
}
