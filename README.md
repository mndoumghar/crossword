
# 🧩 Crossword Solver

This is a simple **Crossword Puzzle Solver** built in **JavaScript**. It takes a grid and a list of words, then uses **backtracking** to fill all valid positions in the crossword.


## 📌 How it works

1. `parseMap(puzzle)`: Parses the input string into a 2D grid (`true` for available cell, `false` for blocked).
2. `findSlots(map)`: Finds horizontal and vertical slots that can hold words (length ≥ 2).
3. `canPlace(grid, slot, word)`: Checks if a word fits into a slot without conflict.
4. `place(grid, slot, word)`: Inserts the word into the grid and keeps the original content for backtracking.
5. `remove(grid, slot, old)`: Undoes placement in case backtracking is needed.
6. `solve(grid, slots, words)`: Recursive backtracking function to solve the crossword.
7. `printGrid(grid)`: Converts the grid to a printable string with `.` for empty cells.

---

## ✅ Example

### Input Puzzle:
```
2001
0..0
1000
0..0
```

### Input Words:
```
['casa', 'alan', 'ciao', 'anta']
```

### Output:
```
casa
i..l
anta
o..n
```

---

## 📐  Diagram (Text-Based)

```
+-------------------+
| CrosswordSolver   |
+-------------------+
| - grid            |
| - slots           |
| - words           |
+-------------------+
| +parseMap()       |
| +findSlots()      |
| +canPlace()       |
| +place()          |
| +remove()         |
| +solve()          |
| +printGrid()      |
| +crosswordSolver()|
+-------------------+

+-------------+       uses        +-----------+
|  Slot       |------------------>|  Grid     |
+-------------+                   +-----------+
| x           |                   | [][mixed] |
| y           |                   +-----------+
| len         |
| dir (H/V)   |
+-------------+
```

---

## 🔁 Algorithm: Backtracking

The solver tries to place each word in each slot recursively. If a word cannot lead to a full solution, it is removed (backtrack) and the next possibility is tested.

---

## 🛠 Technologies Used

- Language: JavaScript

- Concepts: Recursion, Backtracking, 2D Arrays, Conditionals

## Add File Test Java script
- ✅ VALID CASE
- ❌ INVALID TESTS 
