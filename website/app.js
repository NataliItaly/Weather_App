const BODY = document.body;
const city = document.getElementById("city-name");
const cityInput = document.getElementById("city-input");
const zipInput = document.getElementById("zip-input");
const dateBlock = document.getElementById("current-date");
const timeBlock = document.getElementById("time");
const weekDayBlock = document.getElementById("week-day");
const cityForm = document.querySelector("#city-form");
const zipForm = document.querySelector("#zip-form");
const celcius = document.getElementById("celcius");
const farenheit = document.getElementById("farenheit");
const currentTemperature = document.getElementById("current-temp");
const currentFeelTemperature = document.querySelector(".weather__feel-temp");
const currentWeatherDescription = document.getElementById(
  "current-weather-description"
);
const forecastData = document.querySelector(".forecast__data");
const videoContainer = document.querySelector(".container_video");
const weatherConditionsArr = [
  "clear",
  "clouds",
  "mist",
  "rain",
  "thunderstorm",
  "snow",
];
let hours = "";
let month = "";
const languages = {
  af: "Afrikaans",
  al: "Albanian",
  ar: "Arabic",
  az: "Azerbaijani",
  bg: "Bulgarian",
  ca: "Catalan",
  cz: "Czech",
  da: "Danish",
  de: "German",
  el: "Greek",
  en: "English",
  eu: "Basque",
  fa: "Persian (Farsi)",
  fi: "Finnish",
  fr: "French",
  gl: "Galician",
  he: "Hebrew",
  hi: "Hindi",
  hr: "Croatian",
  hu: "Hungarian",
  id: "Indonesian",
  it: "Italian",
  ja: "Japanese",
  kr: "Korean",
  la: "Latvian",
  lt: "Lithuanian",
  mk: "Macedonian",
  no: "Norwegian",
  nl: "Dutch",
  pl: "Polish",
  pt: "Portuguese",
  pt_br: "Português Brasil",
  ro: "Romanian",
  ru: "Russian",
  sv: "Swedish",
  sk: "Slovak",
  sl: "Slovenian",
  es: "Spanish",
  sr: "Serbian",
  th: "Thai",
  tr: "Turkish",
  ua: "Ukrainian",
  vi: "Vietnamese",
  zh_cn: "Chinese Simplified",
  zh_tw: "Chinese Traditional",
  zu: "Zulu",
};

/*------------------ Fill select language options ------------------ */
const langSelect = document.getElementById("lang-select");
for (let language in languages) {
  const option = document.createElement("option");
  option.classList.add("form__option_language");
  option.textContent = languages[language];
  option.value = language;
  option.setAttribute("data-language", language);
  langSelect.append(option);
}

/*------------------- Event on language change--------------- */

let lang = langSelect.value;
console.log(langSelect.value);

function getLanguage(elem) {
  return elem.value;
}

langSelect.addEventListener("change", function () {
  lang = langSelect.value;
  //getLanguage(this);
  console.log(lang);
});

/*-------------------- Celcius-Farenheit -------------------- */

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
  let cityName = cityInput.value;
  setCity(cityName);
  zipInput.value = "";
  forecastData.innerHTML = "";
  isCelcius = true;
  celcius.classList.add("weather__units_active");
  farenheit.classList.remove("weather__units_active");
});

zipForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let cityZip = zipInput.value;
  setZipCode(cityZip);
  cityInput.value = "";
  forecastData.innerHTML = "";
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
  fetch(
    `${url}weather?q=${cityName}&appid=${apiKey}&units=${units}&lang=${lang}`
  )
    .then((weather) => {
      return weather.json();
    })
    .then(showWeather);
}

function setZipCode(zipCode) {
  fetch(`${url}weather?zip=${zipCode}&appid=${apiKey}&units=${units}`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeather);
}

setCity("Kyiv");

function showWeather(data) {
  console.log(data);
  if (data.message === "city not found") {
    city.classList.add("weather__city_error");
    city.textContent = "Please enter correct location";
    cityInput.value = "";
    zipInput.value = "";
  } else {
    city.classList.remove("weather__city_error");
    let temperature = Math.round(data.main.temp);
    let weatherDescription = data.weather[0].description;
    let feelTemperature = Math.round(data.main.feels_like);
    let humidity = data.main.humidity;
    let wind = data.wind.speed;
    let sunrise = data.sys.sunrise;
    let sunset = data.sys.sunset;
    let currentImage = document.querySelector(".weather__image");
    city.innerHTML = data.name;
    city.style.fontSize = "";
    currentTemperature.textContent = temperature;
    currentWeatherDescription.textContent = weatherDescription;
    currentFeelTemperature.textContent = feelTemperature;
    currentHumidity.textContent = humidity + " %";
    currentWind.textContent = wind + " m/s";
    currentSunrise.textContent = formatTime(sunrise);
    currentSunset.textContent = formatTime(sunset);
    currentImage.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">`;
    cityInput.value = "";
    getForecast(data.coord);
    setBackground(weatherDescription);
  }
}

/*--------------------- set user's geolocation---------------------*/

function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  fetch(
    `${url}weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`
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
  city.textContent = "Searching for your location...";
  city.style.fontSize = "14px";
  navigator.geolocation.getCurrentPosition(setPosition);
}

currentGeolocation.addEventListener("click", function (event) {
  event.preventDefault();
  getCurrentLocation();
});

/*----------------------display 6 days forecast---------------------- */

function getForecast(coordinates) {
  fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`
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
      dayForecast.classList.add("forecast__day", "block");
      let minTempreture = Math.round(day.temp.min);
      let maxTempreture = Math.round(day.temp.max);

      dayForecast.innerHTML = `<div class="forecast__title">${formatDay(
        day.dt
      )}</div>
            <div class="forecast__icon"><img src="http://openweathermap.org/img/wn/${
              day.weather[0].icon
            }@2x.png" alt="${
        day.weather[0].description
      }" class="forecast__img"></div>
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
  month = now.getMonth();
  let year = now.getFullYear();
  hours = now.getHours();
  let minutes = now.getMinutes();
  let dateString = `${months[month]} ${day}, ${year}`;
  dateBlock.innerHTML = dateString;
  let timeString = `${setZero(hours)}:${setZero(minutes)}`;
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

/*-------------------------- Set video background ------------------------ */

function setBackground(description) {
  let dayPart = (hours >= 0 && hours <= 5) || hours >= 20 ? "night" : "day";
  console.log(hours >= 0);
  let keyDescription = "";
  console.log(dayPart);
  weatherConditionsArr.forEach((condition) => {
    if (description.includes(condition)) {
      keyDescription = condition;
      console.log(keyDescription);
    }
  });

  videoContainer.innerHTML = `<video autoplay muted loop id="myVideo">
        <source src="video/${dayPart}/${keyDescription}.mp4" type="video/mp4">
      </video>`;
}
