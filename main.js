//thank you to instructors(johnathon and josh), dakota, josh dale, estus for helping me get on the right path
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
const container = document.getElementById('container')
container.setAttribute("class", "d-grid gap-4 text-center")

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

const grabForm = document.getElementById('submission')
 grabForm.addEventListener('submit', e => {
     e.preventDefault()
    
    const grabText = document.getElementById('zipCode')
    console.log(grabText.value)
    let newZip = grabText.value
    console.log(newZip.length)

    if (newZip.length === 5) {
    async function getData(url) {
        try {
            let response = await axios.get(url)
            console.log(response)
            //call to function, inside parathensis passes data to called function
            passState(response.data)
            
        } 
        catch (error) {
            alert('try again bozo')
        }
    }
    
    
    getData(`https://api.openweathermap.org/data/2.5/weather?zip=${newZip},us&appid=3f7b74a1bdfcaad595048157e8c38426`)
    }
    else {
        alert('try again bozo')
    }
 })

    function passState(data) {
        
        stateUpdateData.city= data.name
        stateUpdateData.temp.kelvin = data.main.temp + ": °K"
        stateUpdateData.temp.fahrenheit = Math.round((data.main.temp - 273.15) * 1.8 + 32) + ": °F"
        stateUpdateData.temp.celcius = Math.round(data.main.temp - 273.15) + ": °C"
        stateUpdateData.condition = data.weather[0].description;
        let setBG = data.weather[0].main
        console.log(setBG)

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
        
        putOnPage()
    }
    function putOnPage (fill) {
        document.getElementById('weather').innerHTML = 'Tranquil Weather'
        document.getElementById('instructionText').innerHTML = 'Type in a zip code and hit enter'
        document.getElementById('cityText').innerHTML = 'CITY'
        document.getElementById('tempText').innerHTML = 'TEMPERATURE'
        document.getElementById('conditionText').innerHTML = 'CURRENT CONDITIONS'
        document.getElementById('fetchTarget1').innerHTML = stateUpdateData.city
        document.getElementById('fetchTarget2').innerHTML = stateUpdateData.temp.kelvin
        document.getElementById('fetchTarget3').innerHTML = stateUpdateData.temp.celcius
        document.getElementById('fetchTarget4').innerHTML = stateUpdateData.temp.fahrenheit
        document.getElementById('fetchTarget5').innerHTML = stateUpdateData.condition
    }

putOnPage();





