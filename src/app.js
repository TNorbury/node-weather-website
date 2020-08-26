const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const path = require("path");

const express = require("express");
const hbs = require("hbs");

const app = express();

// Setting up paths for Express
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Tyler Norbury",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "T$",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        message: "Help me :O",
        title: "HELP",
        name: "Tyler",
    });
});

app.get("/weather", (req, res) => {
    // Make sure address is provided
    if (!req.query.address) {
        return res.send({
            error: "Address must be provided",
        });
    }

    const address = req.query.address;

    geocode(address, (error, { latitude, longitude, locationName } = {}) => {
        if (error) {
            return res.send({
                error,
            });
        }

        forecast(longitude, latitude, (error, forecastMsg) => {
            if (error) {
                return res.send({
                    error,
                });
            }

            res.send({
                locationName,
                forecastMsg,
            });
        });
    });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term",
        });
    }

    console.log(req.query.search);
    res.send({
        products: [],
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Help article not found",
        name: "Tyler",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Page not found!",
        name: "Tyler",
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});
