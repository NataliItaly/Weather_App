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

/*----------------------- Countries ------------------------- */

const countries = {
  Afghanistan: "af",
  "Aland Islands": "ax",
  Albania: "al",
  Algeria: "dz",
  "American Samoa": "as",
  Andorra: "ad",
  Angola: "ao",
  Anguilla: "ai",
  Antarctica: "aq",
  " Antigua and Barbuda": "ag",
  Argentina: "ar",
  Armenia: "am",
  Aruba: "aw",
  Australia: "au",
  Austria: "at",
  Azerbaijan: "az",
  Bahamas: "bs",
  Bahrain: "bh",
  Bangladesh: "bd",
  Barbados: "bb",
  Belarus: "by",
  Belgium: "be",
  Belize: "bz",
  Benin: "bj",
  Bermuda: "bm",
  Bhutan: "bt",
  Bolivia: "bo",
  "Bosnia and Herzegovina": "ba",
  Botswana: "bw",
  "Bouvet Island": "bv",
  Brazil: "br",
  "British Indian Ocean": "io",
  "Brunei Darussalam": "bn",
  Bulgaria: "bg",
  "Burkina Faso": "bf",
  Burundi: "bi",
  "Cabo Verde": "cv",
  Cambodia: "kh",
  Cameroon: "cm",
  Canada: "ca",
  "Cayman Islands": "ky",
  "Central African Republic": "cf",
  Chad: "td",
  Chile: "cl",
  China: "cn",
  "Christmas Island": "cx",
  "Cocos (Keeling) Islands": "cc",
  Colombia: "co",
  Comoros: "km",
  "Democratic Republic of the Congo": "cd",
  Congo: "cg",
  "Cook Islands": "ck",
  "Costa Rica": "cr",
  "Côte d'Ivoire": "ci",
  Croatia: "hr",
  Cuba: "cu",
  Curaçao: "cw",
  Cyprus: "cy",
  Czechia: "cz",
  Denmark: "dk",
  Djibouti: "dj",
  Dominica: "dm",
  "Dominican Republic": "do",
  Ecuador: "ec",
  Egypt: "eg",
  "El Salvador": "sv",
  "Equatorial Guinea": "gq",
  Eritrea: "er",
  Estonia: "ee",
  Eswatini: "sz",
  Ethiopia: "et",
  "Falkland Islands": "fk",
  "Faroe Islands": "fo",
  Fiji: "fj",
  Finland: "fi",
  France: "fr",
  "French Guiana": "gf",
  Guyane: "gf",
  "French Polynesia": "pf",
  Gabon: "ga",
  Gambia: "gm",
  Georgia: "ge",
  Germany: "de",
  Ghana: "gh",
  Gibraltar: "gi",
  Greece: "gr",
  Greenland: "gl",
  Grenada: "gd",
  Guadeloupe: "gp",
  Guam: "gu",
  Guatemala: "gt",
  Guamsey: "gg",
  Guinea: "gn",
  "Guinea-Bissau": "gw",
  Guyana: "gy",
  Haiti: "ht",
  Honduras: "hn",
  "Hong Kong": "hk",
  Hungary: "hu",
  Iceland: "is",
  India: "in",
  Indonesia: "id",
  Iran: "ir",
  Iraq: "iq",
  Ireland: "ie",
  Israel: "il",
  Italy: "it",
  Jamaica: "jm",
  Japan: "jp",
  Jersey: "je",
  Jordan: "jo",
  Kazakistan: "kz",
  Kenya: "ke",
  Kiribati: "ki",
  "Korea Democratic Republic": "kp",
  "Korea Republic": "kr",
  Kuwait: "kw",
  Kyrgyzstan: "kg",
  Laos: "la",
  Latvia: "lv",
  Lebanon: "lb",
  Lesotho: "ls",
  Liberia: "lr",
  Libya: "ly",
  Liechtenstein: "li",
  Lithuania: "lt",
  Luxembourg: "lu",
  Macao: "mo",
  "North Macedonia": "mk",
  Madagascar: "mg",
  Malawi: "mw",
  Malaysia: "my",
  Maldives: "mv",
  Mali: "ml",
  Malta: "mt",
  "Marshall Islands": "mh",
  Martinique: "mq",
  Mauritania: "mr",
  Mauritius: "mu",
  Mayotte: "yt",
  Mexico: "mx",
  Micronesia: "fm",
  Moldova: "md",
  Monaco: "mc",
  Mongolia: "mn",
  Montenegro: "me",
  Montserrat: "ms",
  Morocco: "ma",
  Mozambique: "mz",
  Myanmar: "mm",
  namibia: "na",
  Nauru: "nr",
  Nepal: "np",
  Netherlands: "nl",
  "New Caledonia": "nc",
  "New Zeland": "nz",
  Nicaragua: "ni",
  Niger: "ne",
  Nigeria: "ng",
  Niue: "nu",
  "Norfolk Island": "nf",
  Norway: "no",
  Oman: "om",
  Pakistan: "pk",
  Palau: "pw",
  Palestine: "ps",
  Panama: "pa",
  "Papua New Guinea": "pg",
  Paraguay: "py",
  Peru: "pe",
  Philippines: "ph",
  Poland: "pl",
  Portugal: "pt",
  "Puerto Rico": "pr",
  Qatar: "qa",
  Romania: "ro",
  Russia: "ru",
  Rwanda: "rw",
  Samoa: "ws",
  "San Marino": "sm",
  "Saudi Arabia": "sa",
  Senegal: "sn",
  Serbia: "rs",
  Seychelles: "sc",
  "Sierra Leone": "sl",
  Singapore: "sg",
  Slovakia: "sk",
  Slovenia: "si",
  Somalia: "so",
  "South Afica": "za",
  "South Sudan": "ss",
  Spain: "es",
  "Sri Lanka": "lk",
  Sudan: "sd",
  Suriname: "sr",
  Sweden: "se",
  Switzerland: "ch",
  Taiwan: "tw",
  Tajikistan: "tj",
  Tanzania: "tz",
  Thailand: "th",
  Togo: "tg",
  Tokelau: "tk",
  Tonga: "to",
  "Trinidad and Tobago": "tt",
  Tunisia: "tn",
  Turkey: "tr",
  Turkmenistan: "tm",
  Tuvalu: "tv",
  Uganda: "ug",
  Ukraine: "ua",
  "United Arab Emirates": "ae",
  "United Kingdom": "gb",
  Uruguay: "uy",
  USA: "us",
  Uzbekistan: "uz",
  Vanuatu: "vu",
  Venezuela: "ve",
  "Viet Nam": "vn",
  "Western Sahara": "eh",
  Yemen: "ye",
  Zambia: "zm",
  Zimbabwe: "zm",
};

const countrySelect = document.getElementById("country-select");
for (let country in countries) {
  const option = document.createElement("option");
  option.classList.add("form__option_country");
  option.textContent = country;
  option.value = countries[country];
  countrySelect.append(option);
}

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

// weather for city input:
cityForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let cityName = cityInput.value;
  setCity(cityName); // take weather data from Openweathermap
  zipInput.value = "";
  forecastData.innerHTML = "";
  isCelcius = true;
  celcius.classList.add("weather__units_active");
  farenheit.classList.remove("weather__units_active");
});

// weather for zip code:
zipForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let cityZip = zipInput.value;
  console.log(countrySelect.value);
  let countryZip = `,${countrySelect.value}` || "";
  setZipCode(cityZip, countryZip); // take weather data from Openweathermap
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

// function get weather data from Openweathermap on city input
function setCity(cityName) {
  fetch(`${url}weather?q=${cityName}&appid=${apiKey}&units=${units}`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeather);
}

// function get weather data from Openweathermap on zip code input
function setZipCode(zipCode, country) {
  fetch(`${url}weather?zip=${zipCode}${country}&appid=${apiKey}&units=${units}`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeather);
}

setCity("Kyiv");

function setRound(num) {
  return Math.round(num);
}

function showWeather(data) {
  console.log(data);
  //projectData.result = data;
  if (data.message === "city not found") {
    city.classList.add("weather__city_error");
    city.textContent = "Please enter correct location";
    cityInput.value = "";
    zipInput.value = "";
  } else {
    city.classList.remove("weather__city_error");
    let temperature = setRound(data.main.temp);
    let weatherDescription = data.weather[0].description;
    let feelTemperature = setRound(data.main.feels_like);
    let humidity = setRound(data.main.humidity);
    let wind = setRound(data.wind.speed);
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
    currentImage.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}" width="100" height="100">`;
    cityInput.value = "";
    getForecast(data.coord);
    setBackground(weatherDescription);
  }
}

/*--------------------------- POST request --------------------------- */

const postData = async (path, data) => {
  const response = await fetch(path, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

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
  city.style.lineHeight = "48px";
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
      let minTempreture = setRound(day.temp.min);
      let maxTempreture = setRound(day.temp.max);

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
    return setRound((Number(string) - 32) / 1.8);
  }

  function countFarenheit(string) {
    return setRound(Number(string) * 1.8 + 32);
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
  let date = new Date(timeSpamp * 1000);
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

  videoContainer.innerHTML = `<video autoplay muted loop id="myVideo" class="video">
        <source src="video/${dayPart}/${keyDescription}.mp4" type="video/mp4">
      </video>`;
}
