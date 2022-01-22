// Alert Player
alert(`Welcome to Survivor. This is a story game. You have just survived a plane crash and you must survive day and night until you have gathered enough wood to start a signal fire to be saved. Use your wood accordingly.`)

//////////////////////////////////////////
/////////////// OBJECTS //////////////////
//////////////////////////////////////////

const survivor = {
    name: 'Kato',
    health: 60,
    hunger: 30,
    hasHatchet: true,
    hasZippo: true,
    woodCount: 0
}
const rabbit = {
    health: 10,
    elusiveness: 5
}

//////////////////////////////////////////
///////// ALL FUNCTIONS //////////////////
//////////////////////////////////////////

// Button Click Function
const buttonClick = (evt) => {
    if (evt.currentTarget.id === 'campfire') {
        campFire();
    } else if (evt.currentTarget.id === 'signal-fire') {
        signalFire();
    } else if (evt.currentTarget.id === 'cook') {
        cook();
    } else if (evt.currentTarget.id === 'eat') {
        eat();
    } else if (evt.currentTarget.id === 'attack') {
        attack();
    }
}

// Creates a new div, add class game-text to the div, create p element, appends to game-text-container
const gameTextDOM = document.querySelector('#game-text-container')
const createDiv = (gameText) => {
    let newDiv = document.createElement('div')
    newDiv.classList.add('game-text')
    let newP = document.createElement('p')
    newP.innerHTML = `${gameText}`
    newDiv.append(newP)
    gameTextDOM.append(newDiv)
}
// create campfire
const campFire = () => {
    survivor.hasZippo === true && survivor.woodCount >= 1 ? (
    survivor.woodCount -= 1,
    survivor.health += 10,
    createDiv(`You built a campfire. Gaining 10 health and using one piece of wood.`)) : (createDiv('You don\'t have enough wood!'))
}
// create signal fire
const signalFire = () => {
    survivor.hasZippo === true && survivor.woodCount >= 10 ? (survivor.woodCount -= 10, createDiv(`You have built a signal fire. A helicopter was able to see your signal. You are saved! You have survived and won!!!`)) : (createDiv(`You don't have enough wood!`))
}

// cook
const cook = () => {
    survivor.hasZippo === true && survivor.woodCount >= 1 && survivor.rabbitMeat >= 1 ? (survivor.woodCount -= 1, survivor.rabbitMeat -= 1, createDiv(`You have cooked some rabbit meat. It has been added to your inventory. Each cooked rabbit meats adds 50% to your hunger level and 30 healthpoints.`)) : createDiv(`You don't have enough wood or rabbit meat to cook!`)
}


//////////////////////////////////////////
///////// DOM EVENT LISTENERS ////////////
//////////////////////////////////////////

document.getElementById('campfire').addEventListener('click', buttonClick)
document.getElementById('signal-fire').addEventListener('click', buttonClick)
document.getElementById('cook').addEventListener('click', buttonClick)
document.getElementById('eat').addEventListener('click', buttonClick)
document.getElementById('attack').addEventListener('click', buttonClick)