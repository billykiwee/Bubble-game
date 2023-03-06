// Import
import { audios } from "./module/audio.js"
import { levelArray , opacityLevel } from "./module/level.js"


const wrapper = document.querySelector('.wrapper')

// Show
const showResult  = document.querySelector('.show_result')
const showLoose   = document.querySelector('#showLoose')
const showLevelUp = document.querySelector('#showLevelUp')
const showTimer   = document.querySelector('#showTimer')

// Play
const play   = document.querySelector('#play')
const rePlay = document.querySelector('#rePlay')

// Score
const scoreNumber        = document.querySelector('#scoreNumber')
const scoreNumberFinal   = document.querySelector('#scoreNumberFinal')
const scoreNumberLevelUp = document.querySelector('#scoreNumber-when-levelUp')
const recordScore        = document.querySelector('.score-in-levelUp-record')

// Play
const heart     = document.querySelector('.lifes-icon')
const levelInfo = document.querySelector('#level-info')

/////// RÉGLAGE DU JEU
const record = 1
const scoreCount = 0
const LIFES = 4
const BLOCK = 9


// Niveaux
const LEVEL_INFO =  Object.values(levelArray)
const startLEVEL = () => { return opacityLevel } 
const LEVEL = startLEVEL()
///////


// Set les infos du niveau 0
levelInfo.children[0].innerHTML = LEVEL_INFO[0].n
levelInfo.children[1].innerHTML = LEVEL_INFO[0].icon


//// Création des blocks
function CREATE_BLOCK() {
    for (let i = 0; i < BLOCK; i++) {
        let blockBtn    = ` <button class="block"></button> `
        let newDivBlock = document.createElement('div') ; 
        newDivBlock.setAttribute('class', 'div-block')
        let newBlock    = wrapper.appendChild(newDivBlock)
        let loadBlock   = newBlock.innerHTML = blockBtn
    }
} 
CREATE_BLOCK()

// Ajout block à chaque niveau 
function add_block() {
    for (let i = 0; i < 1; i++) {
        let blockBtn    = ` <button class="block"></button> `
        let newDivBlock = document.createElement('div') ; newDivBlock.setAttribute('class', 'div-block-level-up')
        let newBlock    = wrapper.appendChild(newDivBlock)
        let loadBlock   = newBlock.innerHTML = blockBtn
    }
}
//// 


// Vies
function createLives() {
    for (let i = 0; i < LIFES; i++) {
        let lifes      = document.querySelector('.lifes-icon')
        let lifeIcon   = ` <img src="./img/heart.svg"></img> `
        let newDivLife = document.createElement('div') ; newDivLife.setAttribute('class', 'lifes')
        let newLife    = lifes.appendChild(newDivLife)
        let loadLifes  = newLife.innerHTML = lifeIcon
    }
} createLives()

// Redémarer le compteur de vie
let lifeX = () => { return LIFES } ; let LIVESX = lifeX()


/// Réglage couleur
function generateColor() {
    // Coloriser toutes les bulles
    function color(rgb) { 
        return rgb
    }

    function getRandom() {
        return Math.floor(Math.random()* (255 - 100 + 1) + 100)
    }

    const getRGB = []
    
    for (let i = 0; i < 3; i++) {
        getRGB.push( getRandom() )
    }

    const alea =  color(getRGB.toString()) 
    return alea
} generateColor() 


// Essaie total du joueur
let clickCount = 0
function clickBlock() { return  clickCount++ }
let CLICK_COUNT = clickBlock()

localStorage.click = CLICK_COUNT

//// JOUER 
function playGame() {

    let setColor = generateColor() 
    let block   = document.querySelectorAll('.block')

    block.forEach(block => { block.style.background = `rgb(${ setColor } )` })
    //wrapper.style.background = `rgb(${ setColor } , 55% )`

    // Block founded
    var position = Math.floor(Math.random() * block.length)
    let findBlock = block[position]

    // Coloriser le block à touvé
    findBlock.style = ` background : rgb(${ setColor } , ${ LEVEL }% ) `

    findBlock.id = "active"
    if ( findBlock.id == 'active' ) {

        // Quand clique sur les blocks
        block.forEach(block => {
            block.onmousedown = () => {
                // Compteur de click incrementation
                CLICK_COUNT = clickBlock()
                //audio loose
                new Audio(allAudio.loose).play() ; new Audio(allAudio.error).play()

                // Retrait des vies une à une
                let decrementLife = LIVESX-- -1
                if ( LIVESX > 0 ) heart.children[ decrementLife ].classList.add('active')
                else { ///// Si le jouer n'a plus de vie
                    
                    // Afficher Perdu : résultat + info  
                    showLoose.classList.add('active')
                    scoreNumberFinal.innerHTML = scoreCount   // Avoir le résultat du joueur
                    heart.children[0].classList.add('active') // Retirer la dernière vie

                    // Jouer le son perdu
                    new Audio(allAudio.looseGame).play()

                    // Monter le block raté 
                    findBlock.style = ` background : #ee5253 `

                    // Rejouer après avoir perdu la partie
                    rePlay.onmousedown = () => { 

                        showLoose.classList.remove('active')    
                        let reStartGame = playGame()
                        
                        // Redémarer de zéro
                        LIVESX = lifeX()       //// Remettre toute les vies 
                        LEVEL  = startLEVEL()  // Relancer l'opacité du début du jeu
                        levelInfo.children[0].textContent = LEVEL_INFO.length - LEVEL_INFO.length 
                        levelInfo.children[1].textContent = LEVEL_INFO[0].icon
                        record     = scoreCount
                        scoreCount = 0
                        clickCount = 1
                        
                        // Retrait des block ajouté quand le jouer perd
                        let removeBlockAdded = document.querySelectorAll('.div-block-level-up')
                        removeBlockAdded.forEach(removeBlockAdded => removeBlockAdded.remove() )
                        
                        // Regénéer toute les vies
                        let reloadHeart = document.querySelectorAll('.lifes')
                        reloadHeart.forEach(reloadHeart => reloadHeart.classList.remove('active') )
                    }

                } 
            }
        })

        // Quand le joeur click sur le bon block
        findBlock.onmousedown = () => {

            CLICK_COUNT = clickBlock()
            showResult.classList.add('active')

            // Monter le block trouvé
            findBlock.style = ` background : #1dd1a1 `
            new Audio(allAudio.notification).play()
            new Audio(allAudio.win).play()
            
            // Ajout des point au score quand block trouvé
            let resultScore = scoreNumber.innerHTML = scoreCount++ + 1
    
            // Réglage du record
            function getNewRecord() {
                let newRecord = document.querySelector('.new-record')
                if ( scoreCount > record ) {
                    record++
                    recordScore.children[0].innerHTML = scoreCount
                    newRecord.classList.add('active')
                } 
                else { record ; newRecord.classList.remove('active') }

            }  getNewRecord() 

            //// Quand le jouer passe un niveau
            function LevelSTEP() {
                
                function LEVELUP( number, icon, countClick, score, vision ) {
            
                    showLevelUp.classList.add('active')
                    showResult.classList.remove('active')
            
                    document.querySelector('#levelUp').children[1].textContent = number 
                    document.querySelector('#levelUp').children[2].textContent = icon 
                    levelInfo.children[0].innerHTML = number
                    levelInfo.children[1].innerHTML = icon
            
                    scoreNumberLevelUp.innerHTML  = score
                    document.querySelector('.score-in-levelUp-loosed').children[0].innerHTML = countClick
                    document.querySelector('#score-vision').innerHTML = vision + '%'
            
                    document.querySelector('.check-logo').classList.add('active')
                    new Audio(allAudio.sucess).play()      
                           
                }
            
                ///// Incrémenter tous les niveaux = niveau, icon, score, total click, vision
                for (let i = 0; i < LEVEL_INFO.length ; i++) {
                    if ( scoreCount == LEVEL_INFO[i].step ) { 
            
                        LEVEL = LEVEL_INFO[i].opacity

                        LEVELUP ( 
                            i, 
                            LEVEL_INFO[i].icon , 
                            CLICK_COUNT ,
                            scoreCount ,
                            Math.round(scoreCount / CLICK_COUNT * 100)
                        ) 
                    } 
                } 
            
            } LevelSTEP() 
        }      
    }

} playGame()    


//// REDEMARER LE JEU
function reStratGame() {
    const btnPlay = document.querySelectorAll('.btn-play')
    btnPlay.forEach(btnPlay => {
        btnPlay.onmousedown = () => {

            let allShow = document.querySelectorAll('.show_result')
            allShow.forEach(allShow => allShow.classList.remove('active') )

            let reStartGame = playGame()
            let reFreshColor = generateColor() 

        }
    })
} reStratGame() 
    

///// SONS /////
let allAudio = audios  // importé
function AUDIO() {
    const sound = document.querySelector('#sound')
    window.onmousedown = () => new Audio(allAudio.click).play() // Son quand on clique n'importe où
    sound.onmousedown = () => { // Pour muter tous les sons
        sound.children[0].classList.toggle('muted')
        sound.classList.toggle('muted')

        if ( sound.classList == 'muted' ) allAudio = ''
        else allAudio = audios
    }
} AUDIO() 



///// Mettre le nombre de vie restant dans le show result
//// Le joeur garde ses points même en perdant 
//// Il perd perd la partie mais pas le niveau où il est


//// Rempli les vies après un niveaux compliqué 



/////// Timer
/* let timeOut = 10
let timerCount = document.querySelector('#timeOutNumber').children[0]
timerCount.innerHTML = timeOut
function TIMER() {

    timeOut--
    if ( timeOut < 0 ) timeOut = 10
    timerCount.innerHTML = timeOut
    
    let circle = () => { 
        let progressSvg = document.getElementById('progress_svg')
        let lol = 30 * timeOut
        progressSvg.style = `
        stroke-dasharray: 307.919, 307.919;
        stroke-dashoffset: ${ -308 + lol-- } ;
        `
    } 
    circle ()
} 
let timerInterval = setInterval(TIMER , 1000) */


