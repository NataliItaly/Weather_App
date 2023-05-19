const city = document.getElementById("city-name");
const cityInput = document.getElementById("city-input");
const dateBlock = document.getElementById("current-date");
const timeBlock = document.getElementById("time");
const weekDayBlock = document.getElementById("week-day");
const cityForm = document.querySelector("#city-form");
const celcius = document.getElementById("celcius");
const farenheit = document.getElementById("farenheit");
const currentTemperature = document.getElementById("current-temp");
const currentFeelTemperature = document.querySelector(".weather__feel-temp");
const currentWeatherDescription = document.getElementById(
  "current-weather-description"
);
const forecastData = document.querySelector(".forecast__data");

/*------------------celcius-farenheit--------------- */

let isCelcius = true;

if (isCelcius === true) {
  celcius.classList.add("weather__units_active");
  farenheit.classList.remove("weather__units_active");
} else {
  celcius.classList.remove("weather__units_active");
  farenheit.classList.add("weather__units_active");
}

/*-------------------Generate weather forecast-------------------- */

cityForm.addEventListener("submit", function (event) {
  event.preventDefault();
  city.innerHTML = cityInput.value;
  isCelcius = true;
  celcius.classList.add("weather__units_active");
  farenheit.classList.remove("weather__units_active");
});

/*------------------------Display current weather----------------------------- */

let currentWind = document.getElementById("current-wind");
let currentHumidity = document.getElementById("current-humidity");
let currentSunrise = document.getElementById("current-sunrise");
let currentSunset = document.getElementById("current-sunset");
let currentGeolocation = document.getElementById("current-geolocation");
const url = "https://api.openweathermap.org/data/2.5/";
let apiKey = "5c08670149a0b1a4dc7a372a3d5e5333";
let units = "metric";

function setCity(cityName) {
  /* let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showWeather); */
  fetch(`${url}weather?q=${cityName}&appid=${apiKey}&units=${units}`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeather);
}

setCity("Kyiv");

function submitSearch(event) {
  event.preventDefault();
  let cityName = cityInput.value;
  setCity(cityName);
  forecastData.innerHTML = "";
}

cityForm.addEventListener("submit", submitSearch);

function showWeather(data) {
  console.log(data);
  let temperature = Math.round(data.main.temp);
  let weatherDesc = data.weather[0].description;
  let feelTemperature = Math.round(data.main.feels_like);
  let humidity = data.main.humidity;
  let wind = data.wind.speed;
  let sunrise = data.sys.sunrise;
  let sunset = data.sys.sunset;
  let currentImage = document.querySelector(".weather__image");
  city.innerHTML = data.name;
  currentTemperature.textContent = temperature;
  currentWeatherDescription.textContent = weatherDesc;
  currentFeelTemperature.textContent = feelTemperature;
  currentHumidity.textContent = humidity + " %";
  currentWind.textContent = wind + " m/s";
  currentSunrise.textContent = formatTime(sunrise);
  currentSunset.textContent = formatTime(sunset);
  currentImage.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">`;
  cityInput.value = "";
  getForecast(data.coord);
}

/*--------------------- set user's geolocation---------------------*/

function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  /* let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather); */
  fetch(
    `${url}weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
  )
    .then((weather) => {
      return weather.json();
    })
    .then(showWeather);
}

function getCurrentLocation() {
  isCelcius = true;
  celcius.classList.add("weather__units_active");
  farenheit.classList.remove("weather__units_active");
  forecastData.innerHTML = "";
  cityInput.value = "";
  navigator.geolocation.getCurrentPosition(setPosition);
}

currentGeolocation.addEventListener("click", function (event) {
  event.preventDefault();
  cityInput.value = "Searching for your location...";
  getCurrentLocation();
});

/*----------------------display 6 days forecast---------------------- */

function getForecast(coordinates) {
  /* const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast); */
  fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
  )
    .then((weather) => {
      return weather.json();
    })
    .then(displayForecast);
}

function displayForecast(data) {
  console.log(data);
  const forecastArr = data.daily;
  forecastArr.forEach((day, index) => {
    if (index > 0 && index < 7) {
      let dayForecast = document.createElement("div");
      dayForecast.classList.add("forecast__day");
      let minTempreture = Math.round(day.temp.min);
      let maxTempreture = Math.round(day.temp.max);

      dayForecast.innerHTML = `<div class="week-day-min">${formatDay(
        day.dt
      )}</div>
            <div class="forecast__icon"><img src="http://openweathermap.org/img/wn/${
              day.weather[0].icon
            }@2x.png" alt="${day.weather[0].description}"></div>
            <div class="forecast__temp">
              <span class="forecast__temp_min">${minTempreture}°</span>
              <span class="forecast__temp_max">${maxTempreture}°</span>
            </div>`;
      forecastData.append(dayForecast);
    }
  });

  /*------------------- Units change from Celcius to Farenheit----------- */

  function countCelsius(string) {
    return Math.round((Number(string) - 32) / 1.8);
  }

  function countFarenheit(string) {
    return Math.round(Number(string) * 1.8 + 32);
  }

  celcius.addEventListener("click", function () {
    if (isCelcius === true) {
      return;
    } else {
      let currentTemp = currentTemperature.innerHTML;
      currentTemperature.innerHTML = countCelsius(currentTemp);
      let currentFeelTemp = currentFeelTemperature.innerHTML;
      currentFeelTemperature.innerHTML = countCelsius(currentFeelTemp);

      let tempMin = document.querySelectorAll(".forecast__temp_min");
      tempMin.forEach((item) => {
        let minTemp = parseInt(item.innerHTML);
        item.innerHTML = countCelsius(minTemp) + "°";
      });

      let tempMax = document.querySelectorAll(".forecast__temp_max");
      tempMax.forEach((item) => {
        let maxTemp = parseInt(item.innerHTML);
        item.innerHTML = countCelsius(maxTemp) + "°";
      });
      celcius.classList.add("weather__units_active");
      farenheit.classList.remove("weather__units_active");
      isCelcius = true;
    }
  });

  farenheit.addEventListener("click", function () {
    if (isCelcius === true) {
      let currentTemp = currentTemperature.innerHTML;
      currentTemperature.innerHTML = countFarenheit(currentTemp);
      let currentFeelTemp = currentFeelTemperature.innerHTML;
      currentFeelTemperature.innerHTML = countFarenheit(currentFeelTemp);

      let tempMin = document.querySelectorAll(".forecast__temp_min");
      console.log(tempMin);
      tempMin.forEach((item) => {
        let minTemp = parseInt(item.innerHTML);
        item.innerHTML = countFarenheit(minTemp) + "°";
      });

      let tempMax = document.querySelectorAll(".forecast__temp_max");
      tempMax.forEach((item) => {
        let maxTemp = parseInt(item.innerHTML);
        item.innerHTML = countFarenheit(maxTemp) + "°";
      });

      celcius.classList.remove("weather__units_active");
      farenheit.classList.add("weather__units_active");
      isCelcius = false;
    } else {
      return;
    }
  });
}

/*-----------------Set date and time -------------------- */

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function showTime() {
  let now = new Date();
  let day = now.getDate();
  let month = now.getMonth();
  let year = now.getFullYear();
  let hours = setZero(now.getHours());
  let minutes = setZero(now.getMinutes());
  let dateString = `${months[month]} ${day}, ${year}`;
  dateBlock.innerHTML = dateString;
  let timeString = `${hours}:${minutes}`;
  timeBlock.innerHTML = timeString;
  let weekDay = now.getDay();
  weekDayBlock.innerHTML = `${weekDays[weekDay]}`;
  setTimeout(showTime, 1000);
}

showTime();

function setZero(data) {
  return data < 10 ? "0" + data : data;
}

function formatTime(timeSpamp) {
  let date = new Date(timeSpamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return `${setZero(hours)}:${setZero(minutes)}`;
}

function formatDay(timeSpamp) {
  let date = new Date(timeSpamp * 1000);
  let day = date.getDay();
  return weekDays[day];
}
