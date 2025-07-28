document.addEventListener('DOMContentLoaded', () => {
    const sudokuGridElement = document.getElementById('sudoku-grid');
    const showSolutionBtn = document.getElementById('show-solution-btn');
    const nextPuzzleBtn = document.getElementById('next-puzzle-btn');

    // ALL YOUR SUDOKU GRIDS AND THEIR ALWAYS VISIBLE/HIDDEN CELLS
    const allSudokuPuzzles = [
        {
            grid: [
                [4, 2, 7, 3, 6, 1, 5, 9, 8],
                [1, 3, 5, 2, 8, 9, 4, 7, 6],
                [6, 8, 9, 4, 5, 7, 2, 1, 3],
                [3, 5, 6, 7, 9, 8, 1, 4, 2],
                [2, 9, 1, 6, 3, 4, 8, 5, 7],
                [7, 4, 8, 1, 2, 5, 3, 6, 9],
                [5, 1, 2, 8, 7, 6, 9, 3, 4],
                [8, 6, 4, 9, 1, 3, 7, 2, 5],
                [9, 7, 3, 5, 4, 2, 6, 8, 1]
            ],
            alwaysVisibleCells: [
                { row: 0, col: 2 }, // Top-left
                { row: 5, col: 3 }  // Example: Bottom-right
            ],
            alwaysHiddenCells: [
                { row: 5, col: 4 } // Example: Always hide cell at (1,1) (value 7 in this grid)
            ]
        },
        {
            grid: [
                [9, 8, 5, 7, 2, 3, 6, 1, 4],
                [7, 6, 1, 4, 9, 5, 8, 3, 2],
                [3, 4, 2, 8, 1, 6, 9, 5, 7],
                [5, 9, 8, 1, 6, 7, 4, 2, 3],
                [4, 1, 7, 2, 3, 9, 5, 8, 6],
                [2, 3, 6, 5, 4, 8, 7, 9, 1],
                [6, 7, 9, 3, 8, 1, 2, 4, 5],
                [8, 2, 3, 6, 5, 4, 1, 7, 9],
                [1, 5, 4, 9, 7, 2, 3, 6, 8]
            ],
            alwaysVisibleCells: [
                { row: 2, col: 8 }, // Top-middle
                { row: 3, col: 3 }  // Example: Left-middle
            ],
            alwaysHiddenCells: [
                { row: 4, col: 3 } // Example: Always hide cell at (7,7) (value 1 in this grid)
            ]
        },
        {
            grid: [
                [1, 8, 6, 2, 4, 5, 3, 7, 9],
                [5, 2, 7, 3, 1, 9, 4, 6, 8],
                [4, 3, 9, 6, 7, 8, 2, 1, 5],
                [9, 6, 3, 5, 2, 1, 8, 4, 7],
                [7, 5, 8, 4, 3, 6, 1, 9, 2],
                [2, 4, 1, 8, 9, 7, 6, 5, 3],
                [3, 1, 2, 7, 5, 4, 9, 8, 6],
                [6, 7, 4, 9, 8, 2, 5, 3, 1],
                [8, 9, 5, 1, 6, 3, 7, 2, 4]
            ],
            alwaysVisibleCells: [
                { row: 8, col: 6 }, // Center of top-left 3x3
                { row: 3, col: 5 }  // Center of bottom-right 3x3
            ],
            alwaysHiddenCells: [
                { row: 3, col: 4 } // Always hide the center cell
            ]
        },
        {
            grid: [
                [8, 6, 3, 2, 7, 9, 4, 5, 1],
                [9, 7, 1, 4, 5, 6, 3, 2, 8],
                [5, 4, 2, 1, 8, 3, 9, 7, 6],
                [1, 9, 7, 8, 4, 5, 6, 3, 2],
                [6, 8, 5, 9, 3, 2, 7, 1, 4],
                [3, 2, 4, 7, 6, 1, 8, 9, 5],
                [7, 5, 9, 6, 1, 8, 2, 4, 3],
                [2, 3, 8, 5, 9, 4, 1, 6, 7],
                [4, 1, 6, 3, 2, 7, 5, 8, 9] 
            ],
            alwaysVisibleCells: [
                { row: 6, col: 0 }, // Top-right
                { row: 5, col: 5 }  // Bottom-left
            ],
            alwaysHiddenCells: [
                { row: 4, col: 5 }
            ]
        },
        {
            grid: [
                [8, 9, 5, 1, 6, 3, 7, 2, 4],
                [6, 7, 4, 9, 8, 2, 5, 3, 1],
                [3, 1, 2, 7, 5, 4, 9, 8, 6],
                [2, 4, 1, 8, 9, 7, 6, 5, 3],
                [7, 5, 8, 4, 3, 6, 1, 9, 2],
                [9, 6, 3, 5, 2, 1, 8, 4, 7],
                [4, 3, 9, 6, 7, 8, 2, 1, 5], // Note: 5 duplicated in 6th row, 7th column. Please verify your actual grids.
                [5, 2, 7, 3, 1, 9, 4, 6, 8],
                [1, 8, 6, 2, 4, 5, 3, 7, 9]
            ],
            alwaysVisibleCells: [
                { row: 0, col: 6 }, // Middle of top-left 3x3 (shifted)
                { row: 5, col: 4 }  // Middle of bottom-right 3x3 (shifted)
            ],
            alwaysHiddenCells: [
                { row: 5, col: 5 }
            ]
        },
        {
            grid: [
                [1, 5, 4, 9, 7, 2, 3, 6, 8],
                [8, 2, 3, 6, 5, 4, 1, 7, 9],
                [6, 7, 9, 3, 8, 1, 2, 4, 5],
                [2, 3, 6, 5, 4, 8, 7, 9, 1],
                [4, 1, 7, 2, 3, 9, 5, 8, 6],
                [5, 9, 8, 1, 6, 7, 4, 2, 3],
                [3, 4, 2, 8, 1, 6, 9, 5, 7],
                [7, 6, 1, 4, 9, 5, 8, 3, 2],
                [9, 8, 5, 7, 2, 3, 6, 1, 4]
            ],
            alwaysVisibleCells: [
                { row: 6, col: 8 },
                { row: 4, col: 3 }
            ],
            alwaysHiddenCells: [
                { row: 5, col: 3 }
            ]
        },
        {
            grid: [
                [9, 7, 3, 5, 4, 2, 6, 8, 1],
                [8, 6, 4, 9, 1, 3, 7, 2, 5],
                [5, 1, 2, 8, 7, 6, 9, 3, 4],
                [7, 4, 8, 1, 2, 5, 3, 6, 9],
                [2, 9, 1, 6, 3, 4, 8, 5, 7],
                [3, 5, 6, 7, 9, 8, 1, 4, 2], 
                [6, 8, 9, 4, 5, 7, 2, 1, 3], 
                [1, 3, 5, 2, 8, 9, 4, 7, 6], 
                [4, 2, 7, 3, 6, 1, 5, 9, 8] 
            ],
            alwaysVisibleCells: [
                { row: 8, col: 2 },
                { row: 3, col: 4 }
            ],
            alwaysHiddenCells: [
                { row: 3, col: 3 }
            ]
        },
        {
            grid: [
                [4, 1, 6, 3, 2, 7, 5, 8, 9],
                [2, 3, 8, 5, 9, 4, 1, 6, 7],
                [7, 5, 9, 6, 1, 8, 2, 4, 3],
                [3, 2, 4, 7, 6, 1, 8, 9, 5],
                [6, 8, 5, 9, 3, 2, 7, 1, 4],
                [1, 9, 7, 8, 4, 5, 6, 3, 2],
                [5, 4, 2, 1, 8, 3, 9, 7, 6],
                [9, 7, 1, 4, 5, 6, 3, 2, 8], 
                [8, 6, 3, 2, 7, 9, 4, 5, 1]
            ],
            alwaysVisibleCells: [
                { row: 2, col: 0 }, // Center
                { row: 4, col: 5 }
            ],
            alwaysHiddenCells: [
                { row: 3, col: 5 }
            ]
        }
        // Add more puzzles here following the same structure
    ];

    let currentPuzzleIndex = -1;
    let currentFullSudokuGrid = null;
    let currentAlwaysVisibleCells = [];
    let currentAlwaysHiddenCells = [];

    const totalCells = 81;
    // Set a minimum for targetVisibleCount that is *greater* than the number of alwaysVisibleCells
    // and ideally also enough to make the puzzle solvable. Sudoku typically needs 17+ clues.
    // Ensure this value accounts for alwaysVisibleCells.
    const targetVisibleClues = 20; // Aim for approximately 20 clues total

    // Function to select and display a new random puzzle
    function loadNewPuzzle() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * allSudokuPuzzles.length);
        } while (newIndex === currentPuzzleIndex && allSudokuPuzzles.length > 1);

        currentPuzzleIndex = newIndex;
        const selectedPuzzle = allSudokuPuzzles[currentPuzzleIndex];
        currentFullSudokuGrid = selectedPuzzle.grid;
        currentAlwaysVisibleCells = selectedPuzzle.alwaysVisibleCells;
        currentAlwaysHiddenCells = selectedPuzzle.alwaysHiddenCells;

        initializeGrid(currentFullSudokuGrid, true);
        showSolutionBtn.disabled = false;
    }

    // Function to initialize the grid
    function initializeGrid(grid, hideNumbers = true) {
        sudokuGridElement.innerHTML = '';
        const cellElements = [];

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const cell = document.createElement('div');
                cell.classList.add('sudoku-cell');
                cell.dataset.row = r;
                cell.dataset.col = c;
                cell.textContent = grid[r][c];
                cellElements.push(cell);
                sudokuGridElement.appendChild(cell);
            }
        }

        if (hideNumbers) {
            hideRandomNumbers(cellElements);
        }
    }

    // Function to hide random numbers
    function hideRandomNumbers(cellElements) {
        // 1. Reset all cells to default (visible, no highlight)
        cellElements.forEach(cell => {
            cell.classList.remove('hidden');
            cell.classList.remove('always-visible');
        });

        const mustHideIndices = new Set();
        currentAlwaysHiddenCells.forEach(coords => {
            const index = coords.row * 9 + coords.col;
            if (index >= 0 && index < totalCells) {
                mustHideIndices.add(index);
            }
        });

        const mustBeVisibleIndices = new Set();
        currentAlwaysVisibleCells.forEach(coords => {
            const index = coords.row * 9 + coords.col;
            if (index >= 0 && index < totalCells) {
                // IMPORTANT: Ensure an 'alwaysVisible' cell isn't also marked as 'alwaysHidden'
                if (!mustHideIndices.has(index)) {
                    mustBeVisibleIndices.add(index);
                } else {
                    console.warn(`Cell at (${coords.row}, ${coords.col}) is marked as both 'alwaysVisible' and 'alwaysHidden'. 'alwaysHidden' takes precedence.`);
                }
            }
        });

        // 2. Determine potential cells for random hiding/revealing
        const potentialRandomIndices = [];
        for (let i = 0; i < totalCells; i++) {
            if (!mustHideIndices.has(i) && !mustBeVisibleIndices.has(i)) {
                potentialRandomIndices.push(i);
            }
        }

        // 3. Shuffle the potential random indices
        for (let i = potentialRandomIndices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [potentialRandomIndices[i], potentialRandomIndices[j]] = [potentialRandomIndices[j], potentialRandomIndices[i]];
        }

        // 4. Decide which of the potential random cells to make visible
        const randomlyVisibleIndices = new Set();
        let currentVisibleCount = mustBeVisibleIndices.size; // Start count with always visible cells

        // Iterate through shuffled potential cells to reach targetVisibleClues
        for (const index of potentialRandomIndices) {
            if (currentVisibleCount < targetVisibleClues) {
                randomlyVisibleIndices.add(index);
                currentVisibleCount++;
            } else {
                // If we've reached the target, the rest of these potential cells should be hidden
                break; // Exit loop early as we've hit our target for random visibility
            }
        }

        // 5. Apply visibility/hidden classes to all cells
        cellElements.forEach((cell, index) => {
            if (mustBeVisibleIndices.has(index)) {
                cell.classList.remove('hidden'); // Ensure it's not hidden
                cell.classList.add('always-visible'); // Add highlight
            } else if (mustHideIndices.has(index)) {
                cell.classList.add('hidden'); // Ensure it's hidden
            } else if (randomlyVisibleIndices.has(index)) {
                cell.classList.remove('hidden'); // Make it visible if randomly chosen
            } else {
                // All other cells (not always visible, not always hidden, not randomly chosen to be visible)
                cell.classList.add('hidden');
            }
        });
    }

    // Function to show the solution
    function showSolution() {
        const cells = document.querySelectorAll('.sudoku-cell');
        cells.forEach((cell, index) => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            cell.textContent = currentFullSudokuGrid[row][col];
            cell.classList.remove('hidden');
            cell.classList.remove('always-visible'); // Remove highlight when showing solution
        });
        showSolutionBtn.disabled = true;
    }

    // Event listeners
    showSolutionBtn.addEventListener('click', showSolution);
    nextPuzzleBtn.addEventListener('click', loadNewPuzzle);

    // Load the first puzzle when the page loads
    loadNewPuzzle();
});
