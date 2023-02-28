console.log("I am working")
const fruitForm = document.querySelector("#inputSection form")
console.log(fruitForm)

var savedFruit = []
var cal = 0
const processResponse = resp => {
    if(resp.ok) {
        console.log()
        return resp.json()
    }
    else {
        throw "Error: " + resp.status
    }
}

// function fetchFruitData(fruit) {
//     fetch(`https://fruity-api.onrender.com/api/fruits/${fruit}`)
//         .then(processResponse)
//         .then(addFruit)
//         .catch(err => console.log(err))
// }
async function fetchFruitData(fruit) {
    try {
        const resp = await fetch(`https://fruity-api.onrender.com/api/fruits/${fruit}`)
        if(resp.ok) {
            const data = await resp.json()
            addFruit(data)
        }
        else {

        }
    }catch {

    }
}
async function fetchFruitPictureData(fruit) {
    try {
        const resp = await fetch(`https://pixabay.com/api/?key=33976624-e6ad83daf146a59ad6ae9fd4c&q=${fruit}+fruits`)
        if(resp.ok) {
            const pictureData = await resp.json()
            console.log(pictureData, pictureData.hits[0].largeImageURL)
            addPicture(pictureData.hits[0].largeImageURL)
        }
        else {
            throw "Error: http status =" +resp.status
        }
    }catch {

    }
}
const extractFruit = (e) => {
    e.preventDefault()
    fetchFruitData(e.target.fruitInput.value)
    fetchFruitPictureData(e.target.fruitInput.value)
    e.target.fruitInput.value = ""
}
fruitForm.addEventListener("submit", extractFruit)

const fruitList = document.querySelector("#fruitSection ul")
const FruitNutrition = document.querySelector("#nutritionSection p")
const FruitImage = document.querySelector("#imageSection")

const addFruit = (fruit) => {
    if (fruit != "") {
        const li = document.createElement("li")
        li.textContent = fruit.name
        fruitList.addEventListener("click", removeFruit, {once: true})
        fruitList.appendChild(li)
        cal += fruit.nutritions.calories
        console.log(cal)
        savedFruit.push({'name': fruit.name,
        'calories': fruit.nutritions.calories})
        FruitNutrition.textContent = cal
        //console.log(savedFruit)
    }
    
}
const addPicture = picture => {
    const image = document.createComment("img")
    console.log(picture)
    image.attributes("src", picture)
    console.log(`${picture.hits[0].largeImageURL}  - - - - >>> ahahahahahahah`)
    FruitImage.appendChild(image)
}
const removeFruit = (fruit) => {
    fruit.target.remove()   
}

