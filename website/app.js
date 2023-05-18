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
let isCelcius = true;

if (isCelcius === true) {
  celcius.classList.add("weather__units_active");
  farenheit.classList.remove("weather__units_active");
} else {
  celcius.classList.remove("weather__units_active");
  farenheit.classList.add("weather__units_active");
}

/*-----------------Set date and time -------------------- */

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
  if (data < 10) {
    return "0" + data;
  } else {
    return data;
  }
}

/*-------------------Generate weather forecast-------------------- */

cityForm.addEventListener("submit", function (event) {
  event.preventDefault();
  city.innerHTML = cityInput.value;
  isCelcius = true;
  celcius.classList.add("weather__units_active");
  farenheit.classList.remove("weather__units_active");
});

/*------------------celcius-farenheit--------------- */

/*------------------------Display current weather----------------------------- */

let currentWind = document.getElementById("current-wind");
let currentHumidity = document.getElementById("current-humidity");
let currentSunrise = document.getElementById("current-sunrise");
let currentSunset = document.getElementById("current-sunset");
let currentGeolocation = document.getElementById("current-geolocation");
let apiKey = "5c08670149a0b1a4dc7a372a3d5e5333";
let units = "metric";

function setCity(cityName) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showWeather);
}

setCity("Kyiv");

function submitSearch(event) {
  event.preventDefault();
  let cityName = cityInput.value;
  setCity(cityName);
  forecastData.innerHTML = "";
}

cityForm.addEventListener("submit", submitSearch);

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

function getForecast(coordinates) {
  const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let weatherDesc = response.data.weather[0].description;
  let feelTemperature = Math.round(response.data.main.feels_like);
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let sunrise = response.data.sys.sunrise;
  let sunset = response.data.sys.sunset;
  let currentImage = document.querySelector(".weather__image");
  city.innerHTML = response.data.name;
  currentTemperature.textContent = temperature;
  currentWeatherDescription.textContent = weatherDesc;
  currentFeelTemperature.textContent = feelTemperature;
  currentHumidity.textContent = humidity + " %";
  currentWind.textContent = wind + " m/s";
  currentSunrise.textContent = formatTime(sunrise);
  currentSunset.textContent = formatTime(sunset);
  currentImage.innerHTML = `<img src="http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" alt="${response.data.weather[0].description}">`;
  cityInput.value = "";
  getForecast(response.data.coord);
}

function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  isCelcius = true;
  celcius.classList.add("weather__units_active");
  farenheit.classList.remove("weather__units_active");
  forecastData.innerHTML = "";
  cityInput.value = "";
  navigator.geolocation.getCurrentPosition(setPosition);
}

currentGeolocation.addEventListener("click", getCurrentLocation);

/*----------------------display week days forecast---------------------- */

function displayForecast(response) {
  const forecastArr = response.data.daily;
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

  celcius.addEventListener("click", function () {
    console.log("$");
    if (isCelcius === true) {
      return;
    } else {
      currentTemperature.innerHTML = Math.round(
        (Number(currentTemperature.innerHTML) - 32) / 1.8
      );
      currentFeelTemperature.innerHTML = Math.round(
        (Number(currentFeelTemperature.innerHTML) - 32) / 1.8
      );

      let tempMin = document.querySelectorAll(".temp-min");
      tempMin.forEach((item) => {
        item.innerHTML =
          Math.round((parseInt(item.innerHTML) - 32) / 1.8) + "°";
      });

      let tempMax = document.querySelectorAll(".temp-max");
      tempMax.forEach((item) => {
        item.innerHTML =
          Math.round((parseInt(item.innerHTML) - 32) / 1.8) + "°";
      });
      celcius.classList.add("weather__units_active");
      farenheit.classList.remove("weather__units_active");
      isCelcius = true;
    }
  });

  farenheit.addEventListener("click", function () {
    if (isCelcius === true) {
      currentTemperature.innerHTML = Math.round(
        Number(currentTemperature.innerHTML) * 1.8 + 32
      );
      currentFeelTemperature.innerHTML = Math.round(
        Number(currentFeelTemperature.innerHTML) * 1.8 + 32
      );
      let tempMin = document.querySelectorAll(".temp-min");
      tempMin.forEach((item) => {
        item.innerHTML = Math.round(parseInt(item.innerHTML) * 1.8 + 32) + "°";
      });

      let tempMax = document.querySelectorAll(".temp-max");
      tempMax.forEach((item) => {
        item.innerHTML = Math.round(parseInt(item.innerHTML) * 1.8 + 32) + "°";
      });

      celcius.classList.remove("weather__units_active");
      farenheit.classList.add("weather__units_active");
      isCelcius = false;
    } else {
      return;
    }
  });
}
