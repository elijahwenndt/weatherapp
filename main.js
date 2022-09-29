//thank you to instructors, josh dale, dakota, estus for helping me get started 
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
setStructure(row1, 'div', 'col1', 'col-12')
setStructure(row1, 'div', 'col2', 'col-12')

// setStructure(con)

 


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
    async function getData(url) {
        try {
            let response = await axios.get(url)
            console.log(response)
            //call to function, inside parathensis passes data to called function
            passState(response.data)
            
        } 
        catch (error) {
            console.error(error)
        }
    
    }
    getData(`https://api.openweathermap.org/data/2.5/weather?zip=${newZip},us&appid=3f7b74a1bdfcaad595048157e8c38426`)
 })
    function passState(data) {
        
        stateUpdateData.city= data.name
        stateUpdateData.temp.kelvin = data.main.temp + ": °K"
        stateUpdateData.temp.fahrenheit = Math.round((data.main.temp - 273.15) * 1.8 + 32) + ": °F"
        stateUpdateData.temp.celcius = Math.round(data.main.temp - 273.15) + ": °C"
        stateUpdateData.condition = data.weather[0].main
        putOnPage()
    }
    function putOnPage (fill) {
        document.getElementById('col1').innerHTML = 'WEATHER'
        document.getElementById('col2').innerHTML - 'test'
        document.getElementById('fetchTarget1').innerHTML = stateUpdateData.city
        document.getElementById('fetchTarget2').innerHTML = stateUpdateData.temp.kelvin
        document.getElementById('fetchTarget3').innerHTML = stateUpdateData.temp.celcius
        document.getElementById('fetchTarget4').innerHTML = stateUpdateData.temp.fahrenheit
        document.getElementById('fetchTarget5').innerHTML = stateUpdateData.condition
    }








