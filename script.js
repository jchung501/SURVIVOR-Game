// Alert Player
alert(`Welcome to Survivor. This is a story game. You have just survived a plane crash and you must survive day and night until you have gathered enough wood to start a signal fire to be saved. Use your wood accordingly.`)

//////////////////////////////////////////
/////////////// OBJECTS //////////////////
//////////////////////////////////////////

const survivor = {
    name: 'Kato',
    health: 60,
    hunger: 50,
    hasHatchet: true,
    hasZippo: true,
    woodCount: 0,
    energyLevel: 5,
    rabbitMeat: 0,
    cookedMeat: 0,
    // escapeChance: Math.floor(Math.random() * (6 - 3) + 3 )
}
const rabbit = {
    health: 10,
    elusiveness: 5,
    found: false,
}
const bear = {
    // catchChance: Math.floor(Math.random() * (5 - 1) + 1)
}
let days = 0;

//////////////////////////////////////////
///////// ALL FUNCTIONS //////////////////
//////////////////////////////////////////

const gameLoaded = () => {
    days += 1;
    updateInfo();
    createDiv(`
    **ENGINE FAILURE**
    
    The pilot comes over the intercom, "Our turbines are suffering a failure and we will do our best to land this as safely as possible. Please brace yourselves for impact and may God help us all.
    
    The last thing Kato sees before he tucks his head down is that the plane is headed towards a deserted island. He tucks his head, closes his eyes and prays. 
    
    The plane impacts the deserted island. Everything is black.
    
    Kato wakes up disoriented and looks around horrified... he is the only survivor.
    
    Will he be able to survive? His life is in YOUR hands.
    
    Please select an option below.`)
}
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
    } else if (evt.currentTarget.id === 'sleep' ) {
        sleep();
    } else if (evt.currentTarget.id === 'reset') {
        reset();
    } else if (evt.currentTarget.id === 'chop-tree') {
        chopTree();
    } else if (evt.currentTarget.id === 'attack') {
        attack();
    }
}
// Creates a new div, add class game-text to the div, create p element, appends to game-text-container
const gameTextDOM = document.querySelector('#game-text')
const createDiv = (gameText) => {
    let newDiv = document.createElement('div')
    // newDiv.classList.add('game-text')
    let newP = document.createElement('p')
    newP.innerText = `${gameText}`
    newDiv.append(newP)
    gameTextDOM.append(newDiv)
}
// create campfire
const campFire = () => {
    document.getElementById('game-text').innerHTML = '';
    survivor.hasZippo === true && survivor.woodCount >= 1 
    ? (survivor.woodCount -= 1, survivor.health >= 100 
        ? (survivor.health = 100) 
        : (survivor.health += 10),
        updateInfo(),
    createDiv(`You built a campfire. Gaining 10 health and using one piece of wood.`))
    : (createDiv('You don\'t have enough wood!'))
}
// create signal fire
const signalFire = () => {
    document.getElementById('game-text').innerHTML = ''
    survivor.hasZippo === true && survivor.woodCount >= 10 
    ? (survivor.woodCount -= 10, updateInfo(), createDiv(`You have built a signal fire. A helicopter was able to see your signal. You are saved! You have survived and won!!!`), alert(`You've won!! Kato was able to be saved by a helicopter!`)) 
    : (createDiv(`You don't have enough wood!`))
}
// cook
const cook = () => {
    document.getElementById('game-text').innerHTML = '';
    survivor.hasZippo === true && survivor.woodCount >= 1 && survivor.rabbitMeat >= 1 
    ? (survivor.woodCount -= 1, survivor.rabbitMeat -= 1, survivor.cookedMeat += 1, trigCkMeatAni(), updateInfo(), createDiv(`You have cooked some rabbit meat. It has been added to your inventory. Each cooked rabbit meat adds 50 to your hunger level and 30 healthpoints.`)) 
    : createDiv(`You don't have enough wood or rabbit meat to cook!`)
}
// eat
const eat = () => {
    document.getElementById('game-text').innerHTML = '';
    if (survivor.cookedMeat >= 1) {
        survivor.health += 30;
        survivor.cookedMeat -= 1;
        survivor.hunger += 50;
        survivor.energyLevel += 5;
        trigEnergyAni();
        trigHungerAni();
        trigHealthAni();
        updateInfo();
        createDiv(`You have eaten cooked rabbit meat. Your hunger level is now at ${survivor.hunger}, your health at ${survivor.health}, and you gained some energy!`)
    } else {
        createDiv(`You don't have any cooked rabbit meat!`)
    }
}
// updates info within DOM
const updateInfo = () => {
    if (survivor.health >= 100) {
        survivor.health = 100;
    }
    if (survivor.hunger >= 100) {
        survivor.hunger = 100;
    }
    if (survivor.hunger <= 0) {
        survivor.health = 0;
    }
    document.getElementById('health-points').innerText = `${survivor.health}`;
    document.getElementById('hunger-level').innerText = `${survivor.hunger}`;
    document.getElementById('wood-count').innerText = `${survivor.woodCount}`;
    document.getElementById('days-passed').innerText = `${days}`;
    document.getElementById('energy-level').innerText = `${survivor.energyLevel}`;
    document.getElementById('raw-meat').innerText = `${survivor.rabbitMeat}`;
    document.getElementById('cooked-meat').innerText = `${survivor.cookedMeat}`
    if (days >= 5) {
        return alert(`You have missed your chance to be saved. All hope is lost. Please restart the game.`)
    }
    if (survivor.hunger <= 0) {
        survivor.health = 0;
        return alert(`You have died from hunger. Please reset the game.`);
    }
}

// sleep
const sleep = () => {
    document.getElementById('game-text').innerHTML = '';
    if (survivor.woodCount <=0) {
        updateInfo();
        createDiv(`You don't have enough wood.`)
    } else {
        survivor.woodCount -= 1;
        days += 1;
        survivor.health >= 100 ? survivor.health = 100 : survivor.health += 20;
        survivor.energyLevel += 5;
        if (survivor.hunger <= 0) {
            document.getElementById('game-text').innerHTML = '';
            survivor.health = 0;
            updateInfo();
            return alert(`You have died from hunger. Please reset the game.`);
        } else {
        survivor.hunger -= 10;
        updateInfo();
        createDiv(`You sleep and rest until next morning. You wake up hungry.`)
        }
    }
}
// reset
const reset = () => {
    location.reload();
}
// chop tree
const chopTree = () => {
    let foundRabbit = Math.floor(Math.random() * (3 - 1) + 1);
    if (foundRabbit > Math.floor(Math.random() * (3 - 1) + 1) && survivor.energyLevel > 0) {
        document.getElementById('game-text').innerHTML = '';
        rabbit.found = true;
        createDiv(`You have found a rabbit! Attack it for some meat!`);
    } else {
        document.getElementById('game-text').innerHTML = '';
        let chance = Math.floor(Math.random() * (5 - 1) + 1)
        if (survivor.energyLevel > 0) { // if energy level greater than 0
            survivor.energyLevel -= 1; 
            updateInfo();
        if (chance > Math.floor(Math.random() * 4 - 1) + 1) {
            survivor.woodCount += 1;
            trigWoodAni();
            updateInfo();
            createDiv(`You were succesful in chopping the tree!`)
        } else {
            createDiv(`You failed horribly at chopping down the tree.`)
        }
    } else if (survivor.energyLevel <=0) {
    createDiv(`You don't have enough energy!`) 
    }
    }
}
// attack
const attack = () => { // attacks
    if (rabbit.found === true) {
        let chance = Math.floor(Math.random() * (3 - 1) + 1) // chance = random number 
        if (chance > Math.floor(Math.random() * (3 - 1) + 1)) { // if chance > random number
            document.getElementById('game-text').innerHTML = '';
            survivor.rabbitMeat += 1; // add rabbitMeat to survivor object
            rabbit.found = false; // after killing rabbit, turns value false so player can't attack anymore
            updateInfo(); // update info
            trigRwMeatAni(); // run animation
            createDiv(`You succesfully killed the rabbit and got some meat!`)
        } else {
            document.getElementById('game-text').innerHTML = '';
            rabbit.found = false;
            createDiv(`You were unsuccesful and the rabbit got away.`)
        }
    } else if (rabbit.found === false) {
        document.getElementById('game-text').innerHTML = '';
        createDiv(`There is nothing to attack!`)
    }
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
document.getElementById('chop-tree').addEventListener('click', buttonClick)
document.getElementById('attack').addEventListener('click', buttonClick)

////////////////////////////////////////
//////// RESTART CSS ANIMATION /////////
////////////////////////////////////////

const trigHealthAni = () => {
    let healthEl = document.getElementById('health') // grabbing this element from DOM
    // healthEl.preventDefault;
    healthEl.classList.remove('change'); // when function ran, it removes class 'change'
    void healthEl.offsetWidth; // retriggers a reflow, causing function to run from start
    healthEl.classList.add('change'); // add change class to element
}
const trigHungerAni = () => {
    let hungerEl = document.getElementById('hunger');
    // hungerEl.preventDefault;
    hungerEl.classList.remove('change')
    void hungerEl.offsetWidth;
    hungerEl.classList.add('change')
}
const trigEnergyAni = () => {
    let energyEl = document.getElementById('energy');
    // energyEl.preventDefault;
    energyEl.classList.remove('change')
    void energyEl.offsetWidth;
    energyEl.classList.add('change')
}
const trigCkMeatAni = () => {
    let cookedEl = document.getElementById('cooked');
    // cookedEl.preventDefault;
    cookedEl.classList.remove('change')
    void cookedEl.offsetWidth;
    cookedEl.classList.add('change')
}
const trigWoodAni = () => {
    let woodEl = document.getElementById('wood');
    // woodEl.preventDefault;
    woodEl.classList.remove('change')
    void woodEl.offsetWidth;
    woodEl.classList.add('change')
}
const trigRwMeatAni = () => {
    let rawEl = document.getElementById('raw');
    // rawEl.preventDefault;
    rawEl.classList.remove('change')
    void rawEl.offsetWidth;
    rawEl.classList.add('change')
}
const trigDayAni = () => {
    let daysEl = document.getElementById('days');
    // daysEl.preventDefault;
    daysEl.classList.remove('change')
    void daysEl.offsetWidth;
    daysEl.classList.add('change')
}

// Thanks to this guide here https://css-tricks.com/restart-css-animation/ 
