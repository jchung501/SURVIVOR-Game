// Alert Player
alert(`Welcome to Survivor. This is a story game. You have just survived a plane crash and you must survive day and night until you have gathered enough wood to start a signal fire to be saved. Use your wood accordingly.`)

// Survivor and rabbit attributes
const survivor = {
    name: Kato,
    health: 60,
    hunger: 30,
    hasHatchet: true,
    hasZippo: true,
    woodCount = 0
}

const rabbit = {
    health: 10,
    elusiveness: 5
}

// All Functions
const campFire = () => {
    if (survivor.hasZippo === true && survivor.woodCount >= 1) {
        survivor.woodCount -= 1
        survivor.health += 10
    } else {
        alert('You don\'t have enough wood!')
    }
}

// campFire();

