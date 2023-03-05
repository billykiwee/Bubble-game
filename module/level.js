let opacityLevel = 70
let levelArray = {
    l0 : 
    { 
        n      : 0,
        icon   : '👶',
        step   : 0,
        opacity: opacityLevel + 0
    } ,
    l1: 
    { 
        n      : 1,
        icon   : '🐨',
        step   : 5,
        opacity: opacityLevel + 10
    } ,
    l2: 
    { 
        n      : 2,
        icon   : '🚀',
        step   : 10,
        opacity: opacityLevel + 15,
        lives : 1
    } ,
    l3: 
    { 
        n      : 3,
        icon   : '💪🏻',
        step   : 15,
        opacity: opacityLevel + 20
    } ,
    l4: 
    { 
        n      : 4,
        icon   : '🦾',
        step   : 20,
        opacity: opacityLevel + 22
    } ,
    l5: 
    { 
        n      : 5,
        icon   : '🤖',
        step   : 30,
        opacity: opacityLevel + 24
    } ,
    l6: 
    { 
        n      : 6,
        icon   : '👽',
        step   : 40,
        opacity: opacityLevel + 26
    } ,

}
    

export { levelArray , opacityLevel }