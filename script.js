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
    woodCount: 0,
}
const rabbit = {
    health: 10,
    elusiveness: 5
}
let days = 0;

//////////////////////////////////////////
///////// ALL FUNCTIONS //////////////////
//////////////////////////////////////////

// Button Click Function

const gameLoaded = () => {
    days += 1;
    updateInfo();
    createDiv(`Will you be able to survive? Please select an action below.`)
}

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
    } else if (evt.currentTarget.id === 'sleep' ) {
        sleep();
    } else if (evt.currentTarget.id === 'reset') {
        reset();
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
    document.getElementById('game-text-container').innerHTML = ''
    survivor.hasZippo === true && survivor.woodCount >= 1 
    ? (survivor.woodCount -= 1, survivor.health += 10, updateInfo(),
    createDiv(`You built a campfire. Gaining 10 health and using one piece of wood.`))
    : (createDiv('You don\'t have enough wood!'))
}
// create signal fire
const signalFire = () => {
    document.getElementById('game-text-container').innerHTML = ''
    survivor.hasZippo === true && survivor.woodCount >= 10 
    ? (survivor.woodCount -= 10, updateInfo(), createDiv(`You have built a signal fire. A helicopter was able to see your signal. You are saved! You have survived and won!!!`)) 
    : (createDiv(`You don't have enough wood!`))
}
// cook
const cook = () => {
    document.getElementById('game-text-container').innerHTML = '';
    survivor.hasZippo === true && survivor.woodCount >= 1 && survivor.rabbitMeat >= 1 ? (survivor.woodCount -= 1, survivor.rabbitMeat -= 1, updateInfo(), createDiv(`You have cooked some rabbit meat. It has been added to your inventory. Each cooked rabbit meat adds 50 to your hunger level and 30 healthpoints.`)) 
    : createDiv(`You don't have enough wood or rabbit meat to cook!`)
}
// eat
const eat = () => {
    document.getElementById('game-text-container').innerHTML = '';
    survivor.cookedRabbitMeat >= 1 
    ? (survivor.hunger += 50, survivor.health = 30, survivor.cookedRabbitMeat -= 1, updateInfo(), createDiv(`You have eaten a cooked rabbit meat. Your hunger level is now at ${survivor.hunger} and your health at ${survivor.health}.`)) 
    : createDiv(`You do not have any cooked rabbit meat to eat!`)
}
// updates info within DOM
const updateInfo = () => {
    document.getElementById('health-points').innerText = `${survivor.health}`;
    document.getElementById('hunger-level').innerText = `${survivor.hunger}`;
    document.getElementById('wood-count').innerText = `${survivor.woodCount}`;
    document.getElementById('days-passed').innerText = `${days}`;
}
// sleep
const sleep = () => {
    document.getElementById('game-text-container').innerHTML = '';
    survivor.health >= 100 ? survivor.health = 100 : survivor.health += 20;
    survivor.hunger -= 20;
    survivor.woodCount -= 1;
    days += 1;
    updateInfo();
    createDiv(`You sleep and rest until next morning. You wake up hungry.`)
}
// reset
const reset = () => {
    location.reload();
}
// chop tree
const chopTree = () => {
    let chance = Math.floor(Math.random() * (5 - 1) + 1)
    chance > Math.floor(Math.random() * (4 - 1) + 1)
    ? (survivor.woodCount += 1, updateInfo(), createDiv(`You were succesful in chopping the tree!`))
    : createDiv(`You failed horribly at chopping down the tree.`)

}

//////////////////////////////////////////
///////// DOM EVENT LISTENERS ////////////
//////////////////////////////////////////

document.getElementById('campfire').addEventListener('click', buttonClick)
document.getElementById('signal-fire').addEventListener('click', buttonClick)
document.getElementById('cook').addEventListener('click', buttonClick)
document.getElementById('eat').addEventListener('click', buttonClick)
document.getElementById('attack').addEventListener('click', buttonClick)
document.getElementById('sleep').addEventListener('click', buttonClick)
document.getElementById('reset').addEventListener('click', buttonClick)