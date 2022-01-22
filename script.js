// Alert Player
alert(`Welcome to Survivor. This is a story game. You have just survived a plane crash and you must survive day and night until you have gathered enough wood to start a signal fire to be saved. Use your wood accordingly.`)

// Survivor and rabbit attributes
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
const gameText = document.querySelector('#game-text-container')
const createDiv = (gameText) => {
    let newDiv = document.createElement('div')
    newDiv.classList.add('game-text')
    let newP = document.createElement('p')
    newP.innerHTML = `${gameText}`
    newDiv.append(newP)
    gameText.append(newDiv)
}
// create campfire
const campFire = () => {
    if (survivor.hasZippo === true && survivor.woodCount >= 1) {
        survivor.woodCount -= 1
        survivor.health += 10
        createDiv(`You built a campfire. Gaining 10 health and using one piece of wood.`)
    } else {
        createDiv('You don\'t have enough wood!')
    }
}
// create signal fire
const signalFire = () => {
    if (survivor.hasZippo === true && survivor.woodCount >= 10) {
        survivor.woodCount -= 10
        createDiv(`You have built a signal fire. A helicopter was able to see your signal. You are saved! You have survived and won!!!`)
    } else {
        createDiv(`You don't have enough wood!`)
    }
}

