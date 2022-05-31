//Global virbiles ;

const input = document.getElementById("zip");

const click = document.getElementById("generate");

const felling = document.getElementById("feelings");

const APIkey = "c6fcd2b80b3cef506306a2c05a1cbe7e";

// Create a new date instance dynamically with JS

let d = new Date();

let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

//here is the event listener check if the user click on botton or not if not it will alert  the user//if yes  it will excute the following functions ..

click.addEventListener("click", function () {
    const date = newDate;

    const fellingValue = felling.value;

    const inputValue = input.value;

    const Url = `https://api.openweathermap.org/data/2.5/weather?zip=${inputValue}&appid=${APIkey}&units=metric`;

    if (inputValue) {
        //here the function wich take the data from API
        // we make ut async because the server doesn't  predictaple
        const takeData = async function () {

            const request = await fetch(Url);

            try { //this is the data after we got and transfeare it into  javascript data  to see it in the browser 
                const response = await request.json();

                return response;
            } catch (error) {
                console.log(error);
            }
        };

        //here a SendData function that send data to server side
        //empty url and projectData to be far from crashes 
        const sendData = async function (url = "", projectData = {}) {
            //here a constant object wicah   has all information about data inside  async fnction..

            const object = await fetch(url, {
                method: "POST",

                credentials: "same-origin",

                headers: {
                    "Content-Type": "application/json", //we want data JSON because it's server 
                },

                //so change data into json data

                body: JSON.stringify(projectData),
            });

            try { //we taransfeare it into java data to see in the browser 
                const data = await object.json();

                return data
            } catch (error) {
                console.log(error);
            }
        };

        //here a function to update user interface 

        const UI = async function () { //same url
            const request = await fetch("/sendData");

            try {
                const Data = await request.json();
                //  here the text content of each element by data got from server  of the server 
                document.getElementById("date").innerHTML = Data.date;

                document.getElementById("temp").innerHTML = Data.temp;

                document.getElementById("content").innerHTML = Data.Userfelling;
                return Data
            } catch (error) {
                console.log(error);
            }
        };
        //here we will call all functions 
        takeData() //we toke data from Api  
            .then(function (data) { //we use then beacause this is async code 
                sendData("/tokenData", { //we will use sendData function to send data into server side by input  of the user 
                    temp: data.main.temp,

                    Userfelling: fellingValue,

                    date: date,
                });
            })
            .then(function () { //and in the last we will update UI by UI function  in the then methode
                UI();
            });
    } else {
        alert("please enter zip code");
    }
}); // i hope you will find it good 