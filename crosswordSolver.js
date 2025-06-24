function validateInput(puzzle, words) {
    if (typeof puzzle !== 'string' || !Array.isArray(words)) {
        return false
    }

    if (puzzle.trim() === '' || words.length === 0) {
        return false
    }

    let lines = puzzle.trim().split('\n')
    let lineLength = lines[0].length

    if (!lines.every(line => line.length === lineLength)) {
        return false
    }

    if (!puzzle.match(/^[01.\n]+$/)) {
        return false
    }

    let set = new Set(words)
    if (set.size !== words.length) {
        return false
    }

    let grid = parseMap(puzzle)
    let slots = findSlots(grid)

    let totalSlotLength = slots.reduce((acc, slot) => acc + slot.len, 0)
    let totalWordsLength = words.reduce((acc, word) => acc + word.length, 0)

    if (totalSlotLength !== totalWordsLength) {
        return false
    }

    return true
}



function parseMap(puzzle) {
    /*
    [
  [ true, true, true, true ],
  [ true, false, false, true ],
  [ true, true, true, true ],
  [ true, false, false, true ]
]
    
    */
   let lines = puzzle.trim().split('\n')
   let map = []

    for (let i = 0; i < lines.length; i++) {
       let row = []
        for (let j = 0; j < lines[i].length; j++) {
            row.push(lines[i][j] === '.' ? false : true)
        }
        map.push(row)
    }

    return map
}
function findSlots(map) {
 let slots = []
 let rows = map.length
 let cols = map[0].length

  for (let i = 0; i < rows; i++) {
    let count = 0
    let start = 0

    for (let j = 0; j <= cols; j++) {
      if (j < cols && map[i][j]) {
        if (count === 0) start = j
        count++
      } else {
        if (count >= 2) {
          slots.push({ x: i, y: start, len: count, dir: 'H' })
        }
        count = 0
      }
    }
  }

  for (let j = 0; j < cols; j++) {
    let count = 0
    let start = 0

    for (let i = 0; i <= rows; i++) {
      if (i < rows && map[i][j]) {
        if (count === 0) start = i
        count++
      } else {
        if (count >= 2) {
          slots.push({ x: start, y: j, len: count, dir: 'V' })
        }
        count = 0
      }
    }
  }

  return slots
}



function canPlace(grid, slot, word) {

    if (word.length !== slot.len)  {
        return false
    }

    for (let i = 0; i < word.length; i++) {

            let x, y

        if(slot.dir === 'H')  {
            x=  slot.x
        } else {
               x = slot.x + i
        }
         if(slot.dir === 'H')  {
            y=  slot.y + i
        } else {
               y= slot.y
        }
       let cell = grid[x][y]



        if (typeof cell === 'string' && cell !== word[i]) {
            return false


        } 
    }
    return true
}

function place(grid, slot, word) {

   let arrold = []
    for (let i = 0; i < word.length; i++) {
        let x,y
        
        if(slot.dir === 'H')  {
            x=  slot.x
        } else {
               x = slot.x + i
        }
         if(slot.dir === 'H')  {
            y=  slot.y + i
        } else {
               y= slot.y
        }

        arrold.push(grid[x][y])
        grid[x][y] = word[i]
    }

    return  arrold
}

function remove(grid, slot, old) {
    for (let i = 0; i < old.length; i++) {

        let x,y
        
        if(slot.dir === 'H')  {
            x=  slot.x
        } else {
               x = slot.x + i
        }
         if(slot.dir === 'H')  {
            y=  slot.y + i
        } else {
               y= slot.y
        }

        grid[x][y] = old[i]
    }
}

function solve(grid, slots, words, i = 0) {
    // len slots  = 4
    if (i === slots.length )  {
           return  true
    }

   let slot = slots[i]
    for (let w = 0; w < words.length; w++) {
       let word = words[w]

        if (word != undefined && canPlace(grid, slot, word)) {

           let old = place(grid, slot, word)


            words[w] = null
            if (solve(grid, slots, words, i + 1)) {
    
                        return true
            } 

            remove(grid, slot, old)
            words[w] = word
        }
    }

    return false
}


function printGrid(grid) {

    let line = ''

  for (let i = 0; i < grid.length; i++) {
    line += ''

    for (let j = 0; j < grid[i].length; j++) {
     let cell = grid[i][j]

      if (cell === true || cell === false) {
        
        line += '.'  
      } else {

        line += cell  
      }
    }

    line+= '\n'

  }
  return line
}


function crosswordSolver(puzzle, words) {

  if (!validateInput(puzzle, words)) {
        return "Error"
    }


   let grid = parseMap(puzzle)


   let slots = findSlots(grid)

    let resFinal 




    if (!solve(grid, slots, words.slice())) {

        resFinal = "Error  Syntax Words ..."

    } else {
       resFinal = printGrid(grid)
    }
    return resFinal
}
const puzzle = '2001\n0..0\n2000\n0..0'
const words = ['casa', 'alan', 'ciao', 'anta']
console.log(crosswordSolver(puzzle, words))

