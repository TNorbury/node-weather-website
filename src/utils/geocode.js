const request = require("request");

const geocode = (address, callback) => {
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(address) +
        ".json?access_token=pk.eyJ1IjoidHlsZXJub3JidXJ5IiwiYSI6ImNrY3k1NDZjbDA2aTkzNXFpNXB1dDJpa2YifQ.zZnKx-r-OFUcq98EJY-aRQ&limit=1";

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location service!", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find location. Try another search", undefined);
        } else {
            const data = body.features[0];

            const longitude = data.center[0];
            const latitude = data.center[1];
            const { place_name: locationName } = data;

            const geocodeData = {
                latitude,
                longitude,
                locationName,
            };

            callback(undefined, geocodeData);
        }
    });
};

module.exports = geocode;
