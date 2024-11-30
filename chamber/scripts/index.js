const weatherCard = document.querySelector('.weather-card');
const weatherForecast = document.querySelector('.weather-forecast-card');

// Fetch data from the OpenWeather API
async function fetchWeatherData(lat, lon, isCurrentWeather = true) {
    const API_KEY = '7fcc85b72c8797be6d3dacecd03ef862';
    const endpoint = isCurrentWeather
        ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        : `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

    try {
        const response = await fetch(endpoint);
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error; // Stop execution if there's an error
    }
}

// Display the current weather
function displayCurrentWeather(data) {
    const iconElement = document.createElement('img');
    iconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    iconElement.alt = "Weather Icon PNG";
    iconElement.width = "50";
    iconElement.height = "50";
    weatherCard.appendChild(iconElement);

    const tempSource = data.main.temp;
    const temp = Math.round(tempSource);
    const condition = data.weather[0].description;
    const maxTempSource = data.main.temp_max;
    const maxTemp = Math.round(maxTempSource);
    const minTempSource = data.main.temp_min;
    const minTemp = Math.round(minTempSource);
    const humidity = data.main.humidity;

    const tempElement = document.createElement('p');
    const conditionElement = document.createElement('p');
    const maxTempElement = document.createElement('p');
    const minTempElement = document.createElement('p');
    const humidityElement = document.createElement('p');

    tempElement.textContent = `${temp}ºC`;
    conditionElement.textContent = `${condition}`;
    maxTempElement.textContent = `High: ${maxTemp}ºC`;
    minTempElement.textContent = `Low: ${minTemp}ºC`;
    humidityElement.textContent = `Humidity: ${humidity}%`;

    const weatherData = document.createElement('div');
    weatherData.append(tempElement, conditionElement, maxTempElement, minTempElement, humidityElement);
    weatherCard.appendChild(weatherData);
}

// Display the weekly forecast
function displayForecast(data) {
    let forecastList = {};

    data.list.forEach(entry => {
        const date = new Date(entry.dt * 1000);
        const dayNumber = date.getUTCDate();
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

        // Add or update forecast data for the day
        if (!forecastList[dayNumber]) {
            forecastList[dayNumber] = {
                dayName,
                tempMax: entry.main.temp_max,
                icon: `https://openweathermap.org/img/wn/${entry.weather[0].icon}.png`
            };
        } else if (entry.main.temp_max > forecastList[dayNumber].tempMax) {
            forecastList[dayNumber] = {
                dayName,
                tempMax: entry.main.temp_max,
                icon: `https://openweathermap.org/img/wn/${entry.weather[0].icon}.png`
            };
        }
    });

    const result = Object.values(forecastList);

    result.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';

        const dayNameElement = document.createElement('p');
        const dayTempElement = document.createElement('p');
        const dayIconElement = document.createElement('img');

        dayNameElement.textContent = day.dayName;
        dayTempElement.textContent = `${Math.round(day.tempMax)}ºC`;
        dayIconElement.src = day.icon;
        dayIconElement.alt = 'Weather Icon';
        dayIconElement.className = 'icon';

        dayElement.append(dayNameElement, dayTempElement, dayIconElement);
        weatherForecast.appendChild(dayElement);
    });
}

// Integrate API fetching with display functions
async function initializeWeather(lat, lon) {
    try {
        const currentWeatherData = await fetchWeatherData(lat, lon, true);
        displayCurrentWeather(currentWeatherData);

        const weeklyWeatherData = await fetchWeatherData(lat, lon, false);
        displayForecast(weeklyWeatherData);
    } catch (error) {
        console.error('Error initializing weather:', error);
    }
}




// Load Member Data into the business cards
async function displayMembers() {
    // Get the membersGrid element (ensure it's in your HTML)
    const membersGrid = document.querySelector('.business-spotlight-div');
    if (!membersGrid) {
        console.error("Error: membersGrid element not found!");
        return;
    }

    try {
        const response = await fetch('../chamber/data/members.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const members = await response.json();

        // Filter members to only include those with level 2 or higher
        const filteredMembers = members.filter(member => member.level >= 2);

        // If there are fewer than two eligible members, log a message and exit
        if (filteredMembers.length < 2) {
            console.warn('Not enough members with level 2 or higher to display.');
            return;
        }

        // Randomly select two members from the filtered list
        const randomMembers = getRandomMembers(filteredMembers);

        // Loop over the two randomly selected members
        randomMembers.forEach(member => {
            const { name, tagline, email, phone, website, image } = member;

            // Create the business spotlight card
            const memberCard = document.createElement('div');
            memberCard.className = 'business-spotlight-card';

            // Set the inner HTML of the card
            memberCard.innerHTML = `
                <div class="spotlight-tag">
                    <h2>${name}</h2>
                    <p>${tagline}</p>
                </div>
                <img src="${image || 'https://via.placeholder.com/100x100'}" width="100" alt="member logo">
                <div class="spotlight-info">
                    <p><b>Email: </b><span>${email}</span></p>
                    <p><b>Phone: </b><span>${phone}</span></p>
                    <p><b>URL: </b><span><a href="${website}" target="_blank">${website}</a></span></p>
                </div>
            `;

            // Append the member card to the grid
            membersGrid.appendChild(memberCard);
        });
        
    } catch (err) {
        console.error('Error loading or parsing the JSON file:', err);
    }
}

// Function to get two random members from the list
function getRandomMembers(arr) {
    // Ensure we get unique random items
    const randomIndex1 = Math.floor(Math.random() * arr.length);
    let randomIndex2 = Math.floor(Math.random() * arr.length);

    // Ensure the two indices are different
    while (randomIndex2 === randomIndex1) {
        randomIndex2 = Math.floor(Math.random() * arr.length);
    }

    // Return the two random members
    return [arr[randomIndex1], arr[randomIndex2]];
}


initializeWeather(-23.6827, -46.5728);
displayMembers();


