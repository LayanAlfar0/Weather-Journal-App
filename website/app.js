const apiKey = '25d7c4fd765809e90142a2bc309c33ea&units=imperial'
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Function to GET weather data from OpenWeatherMap API
const getWeatherData = async (zip) => {
    const res = await fetch(`${baseURL}${zip}&appid=${apiKey}`);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

// Function to POST data to server
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
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

// Function to update UI with fetched data
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('temp').innerHTML = Math.round(allData.temperature) + ' degrees';
        document.getElementById('content').innerHTML = allData.userResponse;
        document.getElementById('date').innerHTML = allData.date;
    } catch (error) {
        console.log("error", error);
    }
};

// Event listener for Generate button
document.getElementById('generate').addEventListener('click', performAction);

function performAction() {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeatherData(zip)
        .then(function (data) {
            postData('/add', {
                temperature: data.main.temp,
                date: new Date().toLocaleDateString(),
                userResponse: feelings
            });
        })
        .then(() => updateUI());
}
