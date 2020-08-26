const request = require("request");

const forecast = (lon, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=246a2f97d140945533741109add0358f&query=${lat},${lon}&units=f`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service", undefined);
        } else if (body.error) {
            callback("Unable to find location", undefined);
        } else {
            // const currentTemp = currentData.temperature;
            // const feelsLike = currentData.feelslike;

            const {
                temperature: currentTemp,
                feelslike: feelsLike,
                weather_descriptions: weatherDescriptions,
            } = body.current;

            const weatherMsg =
                weatherDescriptions[0] +
                ". It is currently " +
                currentTemp +
                " degrees out. It feels like " +
                feelsLike +
                " degrees out.";

            callback(undefined, weatherMsg);
        }
    });
};

module.exports = forecast;
