function attachEvents() {

    const inputField = document.getElementById('location');
    const forecast = document.getElementById('forecast');
    const getWeatherBtn = document.getElementById('submit');

    const currentDiv = document.getElementById('current');
    const upcomingDiv = document.getElementById('upcoming');

    const weatherCodes = {
        Sunny: '☀',
        Partlysunny: '⛅',
        Overcast: '☁',
        Rain: '☂',
        Degrees: '°'
    };

    getWeatherBtn.addEventListener('click', getWeather);

    async function getWeather() {

        document.getElementById('current').innerHTML = `<div class="label">Current conditions</div>`;
        document.getElementById('upcoming').innerHTML = `<div class="label">Three-day forecast</div>`;

        forecast.style.display = 'block';

        try {
            const name = inputField.value;
            const location = await getForecast(name);
            const deg = weatherCodes.Degrees;

            const condition = location.current.forecast.condition;
            const currentWeather = e('div', { className: 'forecasts' },
                e('span', { className: 'condition symbol' }, `${weatherCodes[condition]}`),
                e('span', { className: 'condition' },
                    e('span', { className: 'forecast - data' }, `${location.current.name}`),
                    e('span', { className: 'forecast-data' }, `${location.current.forecast.low}${deg}/${location.current.forecast.high}${deg}`),
                    e('span', { className: 'forecast-data' }, `${condition}`)));

            currentDiv.appendChild(currentWeather);

            //console.log(location.upcoming.forecast);


            const upcomingWeather = document.createElement('div');
            upcomingWeather.className = 'forecast-info';
            location.upcoming.forecast.forEach(f => {
                const span = e('span', { className: 'upcomig' },
                    e('span', { className: 'symbol' }, `${weatherCodes[f.condition.replace(' ', '')]}`),
                    e('span', { className: 'forecast-data' }, `${f.low}${deg}/${f.high}${deg}`),
                    e('span', { className: 'forecast-data' }, `${f.condition}`)
                );
                upcomingWeather.appendChild(span);
            });
            upcomingDiv.appendChild(upcomingWeather);

        } catch (error) {
            currentDiv.appendChild(document.createTextNode('Error'));
            upcomingDiv.appendChild(document.createTextNode('Error'));
        }
    }

}

attachEvents();

async function getForecast(name) {
    if (name == undefined) {
        throw new Error('Error');
    }
    const code = await getLocationCode(name);

    const [current, upcoming] = await Promise.all([
        getCurrent(code),
        getUpComing(code)
    ]);

    return { current, upcoming }
}

async function getLocationCode(name) {

    const url = 'http://localhost:3030/jsonstore/forecaster/locations';

    try {
        const res = await fetch(url);
        const data = await res.json();

        const location = data.find(l => l.name == name);

        return location.code;

    } catch (error) {
        console.log(error);
    }

}

async function getCurrent(code) {
    const url = `http://localhost:3030/jsonstore/forecaster/today/` + code;

    const res = await fetch(url);
    const data = await res.json();

    return data;

}

async function getUpComing(code) {
    const url = `http://localhost:3030/jsonstore/forecaster/upcoming/` + code;

    const res = await fetch(url);
    const data = await res.json();

    return data;

}

function e(type, attr, ...content) {
    const element = document.createElement(type);

    for (let prop in attr) {
        element[prop] = attr[prop];
    }

    for (let item of content) {
        if (typeof item == 'string' || typeof item == 'number') {
            item = document.createTextNode(item);
        }
        element.appendChild(item);
    }

    return element;
}