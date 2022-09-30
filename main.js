//thank you to instructors(johnathon and josh), dakota, josh dale, estus for helping me get on the right path
//i have about 5 pages of pseudocode in my notebook, i will upload a markdown version to github this weekend 
//also will refactor bad solutions, and add stretch goals this weekend

//function that will take in parameters. based on parameters defined later on it grabs what the parent element will be
//what the element type it will create, what to set the id too, and what to add to the classes
//EX-if its on the parameter setClass, it will set the attribute (defined class) to the parameter passed into setClass
//same for setId. at the end it takes the parameter in the first position and defines that as the parent to append too
function setStructure(parent, elementType, setId, setClass) {
    let element = document.createElement(elementType)
    if (setClass) {
        element.setAttribute('class', setClass)
    }
    if (setId) { 
        element.setAttribute('id', setId)
    }
    parent.appendChild(element)
}

//set up the initial id/classes on the container
const container = document.getElementById('container')
container.setAttribute("class", "d-grid gap-4 text-center")

//begin calling the function, and passes in the parameters. obviously this isnt the most elegant solution as i call the function 20 times. will refactor this weekend
setStructure(container, 'div', 'row1', 'row mt-3')
setStructure(row1, 'div', 'weather', 'col-12')
setStructure(row1, 'div', 'instructionText', 'col-12')

setStructure(container, 'div', 'row2', 'row')
setStructure(row2, 'div', 'col3', 'col-12')
setStructure(col3, 'form', 'submission', 'm-6')
setStructure(submission, 'input', 'zipCode', '')

setStructure(container, 'div', 'row3', 'row')
setStructure(row3, 'div', 'cityText', 'col-12')
setStructure(row3, 'div', 'fetchTarget1', 'col-12')

setStructure(container, 'div', 'row4', 'row')
setStructure(row4, 'div', 'tempText', 'col-12')
setStructure(row4, 'div', 'fetchTarget2', 'col-sm-4 col-12')
setStructure(row4, 'div', 'fetchTarget3', 'col-sm-4 col-12')
setStructure(row4, 'div', 'fetchTarget4', 'col-sm-4 col-12')

setStructure(container, 'div', 'row5', 'row')
setStructure(row5, 'div', 'conditionText', 'col-12')
setStructure(row5, 'div', 'fetchTarget5', 'col-12')

//sets up a blank global object to catch the info coming out of axios fetch
let stateUpdateData = {
    city: "",
    temp: {
        kelvin: "",
        celcius: "",
        fahrenheit: ""
    },
    condition: "",
    image: ""
}
console.log(stateUpdateData)

//sets up event listener
const grabForm = document.getElementById('submission')
 grabForm.addEventListener('submit', e => {

    //again not the most elegant solution, entire call happens in the submit eventlistener function
     e.preventDefault()
    
     //next i grab the zipcode then set the value = a new variable
    const grabText = document.getElementById('zipCode')
    console.log(grabText.value)
    let newZip = grabText.value
    console.log(newZip.length)

    //set up a statement to catch if the zipcode is invalid
    if (newZip.length === 5) {
    async function getData(url) {
        try {
            let response = await axios.get(url)
            console.log(response)
            //call to passState function, inside parathensis passes data to called function
            passState(response.data)
            
        } 
        catch (error) {
            alert('try again bozo')
        }
    }
    
    
    getData(`https://api.openweathermap.org/data/2.5/weather?zip=${newZip},us&appid=3f7b74a1bdfcaad595048157e8c38426`)
    }
    else {
        alert('TRY AGAIN BOZO')
    }
 })

    //this function gets the API info from above then fills the global variables 
    //after that i set up conditionals to add css styling that sets the background image based on data coming from the data.weather[0].main
    function passState(data) {
        
        stateUpdateData.city= data.name
        stateUpdateData.temp.kelvin = data.main.temp + ": °K"
        stateUpdateData.temp.fahrenheit = Math.round((data.main.temp - 273.15) * 1.8 + 32) + ": °F"
        stateUpdateData.temp.celcius = Math.round(data.main.temp - 273.15) + ": °C"
        stateUpdateData.condition = data.weather[0].description;
        let setBG = data.weather[0].main
        console.log(setBG)

        //sorry yall, had to do this the cheap way. creates an element style then sets that style to the string that is provided
        //after that i append the style to the HEAD that way it doesnt mess with any of my dynamic page generation
        if (setBG == 'Clear'){
            let style = document.createElement('style');
            style.innerHTML = `
            #bg-set {
                background: url("clearskys.jpg") no-repeat center center fixed;
                background-size: cover;
            }
            `;
            document.head.appendChild(style);
        }
        
        else if (setBG == 'Clouds'){
            let style = document.createElement('style');
            style.innerHTML = `
            #bg-set {
                background: url("broken_clouds.jpg") no-repeat center center fixed;
                background-size: cover;
            }
            `;
            document.head.appendChild(style);
        }
        
        else if (setBG == 'Rain'){
            let style = document.createElement('style');
            style.innerHTML = `
            #bg-set {
                background: url("rain.jpg") no-repeat center center fixed;
                background-size: cover;
            }
            `;
            document.head.appendChild(style);
        }
        else if (setBG == 'Drizzle'){
            let style = document.createElement('style');
            style.innerHTML = `
            #bg-set {
                background: url("rain.jpg") no-repeat center center fixed;
                background-size: cover;
            }
            `;
            document.head.appendChild(style);
        }
        else if (setBG == 'Thunderstorm'){
            let style = document.createElement('style');
            style.innerHTML = `
            #bg-set {
                background: url("thunder_storm.jpg") no-repeat center center fixed;
                background-size: cover;
            }
            `;
            document.head.appendChild(style);
        }
        else if (setBG =='Snow'){
            let style = document.createElement('style');
            style.innerHTML = `
            #bg-set {
                background: url("snow.jpg") no-repeat center center fixed;
                background-size: cover;
            }
            `;
            document.head.appendChild(style);
        }
        else if (setBG =='Mist'){
            let style = document.createElement('style');
            style.innerHTML = `
            #bg-set {
                background: url("mist.jpg") no-repeat center center fixed;
                background-size: cover;
            }
            `;
            document.head.appendChild(style);
        }
        else if (setBG =='Fog'){
            let style = document.createElement('style');
            style.innerHTML = `
            #bg-set {
                background: url("fog.jpg") no-repeat center center fixed;
                background-size: cover;
            }
            `;
            document.head.appendChild(style);
        }
        else if (setBG =='Haze'){
            let style = document.createElement('style');
            style.innerHTML = `
            #bg-set {
                background: url("haze.jpg") no-repeat center center fixed;
                background-size: cover;
            }
            `;
            document.head.appendChild(style);
        }
        putOnPage()
    }
    
    //where the magic happens, fills the page with the proper data that has now been grabbed from the global object.
    function putOnPage (fill) {
        document.getElementById('weather').innerHTML = 'Tranquil Weather'
        document.getElementById('instructionText').innerHTML = 'Type in a zip code and hit enter'
        document.getElementById('cityText').innerHTML = 'CITY:'
        document.getElementById('tempText').innerHTML = 'TEMPERATURE:'
        document.getElementById('conditionText').innerHTML = 'CURRENT CONDITIONS:'
        document.getElementById('fetchTarget1').innerHTML = stateUpdateData.city
        document.getElementById('fetchTarget2').innerHTML = stateUpdateData.temp.kelvin
        document.getElementById('fetchTarget3').innerHTML = stateUpdateData.temp.celcius
        document.getElementById('fetchTarget4').innerHTML = stateUpdateData.temp.fahrenheit
        document.getElementById('fetchTarget5').innerHTML = stateUpdateData.condition
    }

putOnPage();





