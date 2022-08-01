// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   document.getElementById("missionTarget").innerHTML = 
                `<h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name} </li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src= ${imageUrl}>`
}

function validateInput(string) {
    if (string === ""){
        return "Empty"
    } else if (isNaN(string) === true){
        return "Not a Number"
    } else if (isNaN(string) === false) {
        return "Is a Number"
    }
}


function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let form = document.querySelector("form");
    form.addEventListener('submit', function(event){
        let pilotNameInput = document.querySelector("input[name=pilotName]");
        let copilotNameInput = document.querySelector("input[name=copilotName]");
        let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
        let cargoMassInput = document.querySelector("input[name=cargoMass]");
        if(validateInput(pilotNameInput.value) === "Empty" || validateInput(copilotNameInput.value) === "Empty" || validateInput(fuelLevelInput.value) === "Empty" || validateInput(cargoMassInput.value) === "Empty" ) {
            document.getElementById("faultyItems").style.visibility = "hidden";
            alert(`All fields are required.`);
            event.preventDefault();
        }
        
        if (validateInput(pilotNameInput.value) === "Is a Number"  || validateInput(copilotNameInput.value) === "Is a Number" || validateInput(fuelLevelInput.value) === "Not a Number" || validateInput(cargoMassInput.value) === "Not a Number") {
            document.getElementById("faultyItems").style.visibility = "hidden";
            alert(`Make sure to enter valid information for each field!`);
            event.preventDefault();
        }  
        
        document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotNameInput.value} is ready for launch`;
        document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilotNameInput.value} is ready for launch`;

        if(Number(cargoMassInput.value) < 10000 && Number(fuelLevelInput.value) > 10000) {
            document.getElementById("cargoStatus").innerHTML = "Cargo mass too heavy for launch";
            document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
            document.getElementById("faultyItems").style.visibility = "visible";
            document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready For Launch";
            document.getElementById("launchStatus").style.color = "red";
            event.preventDefault();
        }

        if(Number(fuelLevelInput.value) < 10000) {
            document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
            document.getElementById("faultyItems").style.visibility = "visible";
            document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready For Launch";
            document.getElementById("launchStatus").style.color = "red";
            event.preventDefault();
        }

        if(Number(cargoMassInput.value) > 10000) {
            document.getElementById("cargoStatus").innerHTML = "Cargo mass too heavy for launch";
            document.getElementById("faultyItems").style.visibility = "visible";
            document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready For Launch";
            document.getElementById("launchStatus").style.color = "red";
            event.preventDefault();
        }

        if (Number(cargoMassInput.value) < 10000 && Number(fuelLevelInput.value) > 10000){
            document.getElementById("faultyItems").style.visibility = "hidden";
            document.getElementById("launchStatus").innerHTML = "Shuttle is Ready for launch";
            document.getElementById("launchStatus").style.color = "green";
            event.preventDefault();
        }
    })
}

async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
        return response.json();
    });
    return planetsReturned 
    
}



function pickPlanet(planets) {
    let choice = planets[Math.floor(Math.random() * planets.length)];
    return choice
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
