const APIKEY = '5213214701f11227af975fa2f61e069a';
const URLBASE = 'https://api.openweathermap.org/data/2.5/weather?';

async function request(url) {
    return fetch(url).then(result => result.json());
}

function updateDOM(city, temperatureKelvin) {
    const ciudadElement = document.querySelector('.container h2 span');
    const temperaturaElement = document.querySelector('.container h3 span');

    const temperatureCelsius = (temperatureKelvin - 273.15).toFixed(2); //toFixed redondea a 2 valores

    ciudadElement.textContent = city;
    temperaturaElement.textContent = `${temperatureCelsius}`;

    const fondo = getBackgroundColor(temperatureCelsius);
    document.body.style.backgroundColor = fondo; //Reduerda faty utiliza el document para mandar a llamar al html desde el updateDom
}

function getBackgroundColor(temperature) {
    if (temperature >= 30) {
        return 'red';
    } else if (temperature >= 20) {
        return 'yellow';
    } else if (temperature >= 10) {
        return 'blue';
    } else {
        return 'pink';
    }
}

async function getClima(lat, lon) {
    const url = `${URLBASE}lat=${lat}&lon=${lon}&appid=${APIKEY}`;

    try {
        const data = await request(url);
        console.log("Temperatura: ", data.main.temp);
        console.log("Ciudad: ", data.name);
        updateDOM(data.name, data.main.temp);
    } catch (error) {
        console.error('Error al obtener los datos del clima:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    navigator.geolocation.getCurrentPosition(positions => {
        const lat = positions.coords.latitude;
        const lon = positions.coords.longitude;
        getClima(lat, lon);
    });
});
