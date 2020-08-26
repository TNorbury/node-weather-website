console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";
    fetch("http://localhost:3000/weather?address=" + location).then(
        (response) => {
            response.json().then((data) => {
                if (data.error) {
                    console.log(data.error);
                    messageOne.textContent = data.error;
                } else {
                    console.log(data.locationName);
                    console.log(data.forecastMsg);
                    messageOne.textContent = data.locationName;
                    messageTwo.textContent = data.forecastMsg;
                }
            });
        }
    );
});