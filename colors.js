import COLORS from './palettes.json' assert {type: 'json'}

function configColor() {
  for (let i = 0; i < COLORS.length; i++) {
    var allColors = COLORS[i].colors
    return allColors
  }
} 

export { configColor } 