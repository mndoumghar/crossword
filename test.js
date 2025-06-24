const { crosswordSolver } = require('./crosswordSolver.js') 



function runTest(name, puzzle, words, expected) {
    const result = crosswordSolver(puzzle, words)
    const status = result.trim() === expected.trim() ? '✅ PASSED' : '❌ FAILED'
    
    console.log(`${status} - ${name}`)
}

// ✅ VALID CASE
runTest("Valid Puzzle",
`...1
..1000
...0
.1..`,
['sun', 'tan'],
`...s
..sun
...n
.t..`)


// ❌ INVALID TESTS

// Format error (wrong type)
runTest("Wrong Format Type", 123, ['a'], "Error")

// Words not array
runTest("Wrong Words Format", '', 123, "Error")

// Empty puzzle
runTest("Empty Puzzle", '', ['casa', 'alan'], "Error")

// Repeated words
runTest("Repeated Words", 
`2001
0..0
1000
0..0`, 
['casa', 'casa', 'ciao', 'anta'], 
"Error")

// Slots < words letters
runTest("Mismatch slot count", 
`2001
0..0
2000
0..0`, 
['casa', 'alan', 'ciao', 'anta'], 
"Error")

// Multiple solutions (bonus to test deterministic behavior)
runTest("Multiple solutions",
`2000
0...
0...
0...`,
['abba', 'assa'],
"Error")

// No solution possible
runTest("No solution possible",
`2001
0..0
1000
0..0`,
['aaab', 'aaac', 'aaad', 'aaae'],
"Error")
