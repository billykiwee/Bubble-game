// Import
import { audios } from "./module/audio.js"
import {  opacityLevel, startLEVEL, LEVEL, LEVEL_ICON, LEVEL_NUMBER, LEVEL_STEP, LEVEL_VALUES  }  from "./module/level.js"


const allAudio = audios 

const wrapper = document.querySelector('.wrapper')
const block   = document.querySelectorAll('.block')

// Show
const showResult  = document.querySelector('.show_result')
const showLoose   = document.querySelector('#showLoose')
const showLevelUp = document.querySelector('#showLevelUp')
const showTimer   = document.querySelector('#showTimer')

// Play
const play   = document.querySelector('#play')
const rePlay = document.querySelector('#rePlay')

// Score
let scoreNumber        = document.querySelector('#scoreNumber')
let scoreNumberFinal   = document.querySelector('#scoreNumberFinal')
let scoreNumberLevelUp = document.querySelector('#scoreNumber-when-levelUp')

// Play
let heart     = document.querySelector('.lifes-icon')
let levelInfo = document.querySelector('#level-info')

const sound = document.querySelector('#sound')


/////// Réglage du jeu
let totalClick = 0
var scoreCount = 0


// Vies
let LIFES = 5
function Lifes_func() {
    for (let i = 0; i < LIFES; i++) {
        let lifes      = document.querySelector('.lifes-icon')
        let lifeIcon   = ` <svg width="22" height="22" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.9298 1.41452C16.4815 0.966073 15.9493 0.610337 15.3636 0.367629C14.7778 0.124922 14.15 0 13.516 0C12.8819 0 12.2541 0.124922 11.6683 0.367629C11.0826 0.610337 10.5504 0.966073 10.1022 1.41452L9.17191 2.34476L8.24167 1.41452C7.33627 0.509117 6.10828 0.0004693 4.82786 0.000469309C3.54743 0.000469319 2.31945 0.509117 1.41405 1.41452C0.508648 2.31992 9.53993e-09 3.5479 0 4.82833C-9.53993e-09 6.10875 0.508648 7.33674 1.41405 8.24214L2.34429 9.17238L9.17191 16L15.9995 9.17238L16.9298 8.24214C17.3782 7.79391 17.7339 7.26171 17.9767 6.67596C18.2194 6.0902 18.3443 5.46237 18.3443 4.82833C18.3443 4.19428 18.2194 3.56645 17.9767 2.9807C17.7339 2.39494 17.3782 1.86275 16.9298 1.41452V1.41452Z" fill="#EE5253"/></svg>`
        let newDivLife = document.createElement('div') ; newDivLife.setAttribute('class', 'lifes')
        let newLife    = lifes.appendChild(newDivLife)
        let loadLifes  = newLife.innerHTML = lifeIcon
    }
} Lifes_func()

// Redémarer le compteur de vie
let lifeX = () => { return LIFES } ; let LIVESX = lifeX()



/// Réglage couleur
function generateColor() {
    // Coloriser toutes les bulles
    function color(r, g, b) { return ` ${r}, ${g}, ${b} ` }
    var alea =  color( Math.floor(Math.random()* (255 - 100 + 1) + 100), Math.floor(Math.random()* (255 - 100 + 1) + 100), Math.floor(Math.random()* (255 - 100 + 1) + 100)) 
    //wrapper.style.background = `rgb(${alea} , 80% )` 
    return alea
} generateColor() 




let clickCount = 0

function clickBlock() { return  clickCount++ }

let CLICK_COUNT = clickBlock()

//// JOUER 
function playGame() {

    let setColor = generateColor() 
    block.forEach(block => { block.style.background = `rgb(${ setColor } )` })


    // Block founded
    var position = Math.floor(Math.random() * block.length)
    let findBlock = block[position]

    // Coloriser le block à touvé
    findBlock.style = ` background : rgb(${ setColor } , ${ LEVEL }% ) `

    findBlock.id = "active"
    if ( findBlock.id == 'active' ) {


        // Quand clique sur les block
        block.forEach(block => {
            block.onmousedown = () => {

                CLICK_COUNT = clickBlock()
                
                let decrementLife = LIVESX-- -1
                //console.log( decrementLife );

                //audio loose
                new Audio(allAudio.loose).play()

                ///// Si le jouer n'a plus de vie
                if ( LIVESX == 0 ) {

                    // Afficher Perdu - résultat + info  
                    showLoose.classList.add('active')
                    scoreNumberFinal.innerHTML = scoreCount   // Avoir le résultat du jouer
                    heart.children[0].classList.add('active') // Retirer la dernière vie
                    levelInfo.children[0].textContent = 1     // Remettre le compteur de niveau à 1
                    levelInfo.children[1].textContent = '👶'
                    
                    // Jouer le son perdu
                    new Audio(allAudio.looseGame).play()

                    // Monter le block raté 
                    findBlock.style = ` background : #ee5253 `

                    // Relancer l'opacité du début du jeu
                    LEVEL = startLEVEL

                    // Rejouer après avoir perdu la partie
                    rePlay.onmousedown = () => { 

                        LIVESX = LIFES
                        showLoose.classList.remove('active')    
                        let reStartGame = playGame()
                        
                        // Update des vies du joueur
                        scoreCount = 0
                        

                        // Regénéer toute les vies
                        let reloadHeart = document.querySelectorAll('.lifes')
                        reloadHeart.forEach(reloadHeart => reloadHeart.classList.remove('active') )

                    }

                } 
                else heart.children[ decrementLife ].classList.add('active')
            }
            
        })
        
        // Quand le joeur click sur le bon block
        findBlock.onmousedown = () => {
            CLICK_COUNT = clickBlock()

            showResult.classList.add('active')
            disableClick() // Désactiver jouer

            // Monter le block trouvé
            findBlock.style = ` background : #1dd1a1 `
            new Audio(allAudio.notification).play()
            new Audio(allAudio.win).play()
            
            // Ajout des point au score quand block trouvé
            let resultScore = scoreNumber.innerHTML = scoreCount++ + 1
            


            function LevelSTEP() {
                
                function LEVELUP( number, step, value, icon, countClick, score, vision ) {

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

                    console.log(scoreCount / CLICK_COUNT * 100);
                
                }
                
                ///// Incrémenter tous les niveaux = niveau, icon, score, total click, vision
                for (let i = 0; i < LEVEL_NUMBER ; i++) {
                    if ( scoreCount == Object.values(LEVEL_STEP)[i] ) { 
                        LEVEL = Object.values(LEVEL_VALUES)[i]

                        LEVELUP ( 
                            i, 
                            Object.values(LEVEL_STEP)[i] , 
                            Object.values(LEVEL_VALUES)[i] , 
                            Object.values(LEVEL_ICON)[i] , 
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


//// Restart le jeu à chaque showDiv
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
function AUDIO() {
    window.onmousedown = () => new Audio(allAudio.click).play() // Son quand on clique n'importe où
    sound.onmousedown = () => { // Pour muter tous les sons
        sound.children[0].classList.toggle('muted')
        sound.classList.toggle('muted')

        if ( sound.classList == 'muted' ) allAudio = ''
        else allAudio = audios
    }
} AUDIO() 


// Désactiver la possibilité de jouer quand les résultats sont affichés
let disableClick = () => block.forEach(block => block.onmousedown = () => block.onmousedown == false)





/////// Timer
function TIME() {
    let timeOut = 10
    let timerX = -1
    let limitTimer = 12 // Peut être modifier quand niveau suppérieur 
    block.forEach(block => block.onclick = () => timerX = -2 ) // Le timer ne se déclenche pas tant que le jouer click
    function TIMER() {
        let timeOutNumber = document.querySelector('#timeOutNumber')
        if ( timeOut == 0 ) {
            timeOutNumber.children[0].textContent = 0
            showTimer.classList.remove('active')
            showLoose.classList.add('active')
            
            document.querySelector('.audio-looseGame').play()
            document.querySelector('.audio-clock').pause()
            clearInterval(timerInterval)
        } 
        else timeOutNumber.children[0].textContent = timeOut--
    } 

    function timer() { 
        timerX++
        if ( timerX >= limitTimer ) { 
            showTimer.classList.add('active') 
            document.querySelector('.audio-clock').play()
            TIMER()
        } 
        else showTimer.classList.remove('active') 
        
        //console.log(timerX);
    } 
    let timerInterval = setInterval(timer , 1000)

} 

// difficulté block clignotant
function blinker() {
    let blink = 0.5
    let clignote = () => wrapper.style.opacity = '0.5' 
    setInterval(() => { wrapper.style.opacity = '1' }, blink * 1000)
    let blikerInterval = setInterval( clignote , 2 * blink * 1000 ) 
} //blinker()


/////// FAire un systeme de record
///// Mettre le nombre de vie restant dans le show result
//// Le joeur garde ses points même en perdant 
//// Il perd perd la partie mais pas le niveau où il est


//// Rempli les vies après un niveaux compliqué 

