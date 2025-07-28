document.addEventListener('DOMContentLoaded', () => {
    const sudokuGridElement = document.getElementById('sudoku-grid');
    const showSolutionBtn = document.getElementById('show-solution-btn');
    const nextPuzzleBtn = document.getElementById('next-puzzle-btn');

    // ALL YOUR SUDOKU GRIDS AND THEIR ALWAYS VISIBLE CELLS
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
                { row: 5, col: 3 }  // Bottom-right
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
                { row: 3, col: 3 }  // Left-middle
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
            ]
        }
        // Add more puzzles here following the same structure
    ];

    let currentPuzzleIndex = -1; // -1 indicates no puzzle loaded yet
    let currentFullSudokuGrid = null;
    let currentAlwaysVisibleCells = [];

    const totalCells = 81;
    const targetVisibleCount = 20; // Aim for about 20 numbers visible

    // Function to select and display a new random puzzle
    function loadNewPuzzle() {
        // Ensure we don't pick the same puzzle twice in a row if possible (for larger sets)
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * allSudokuPuzzles.length);
        } while (newIndex === currentPuzzleIndex && allSudokuPuzzles.length > 1); // Avoid endless loop if only 1 puzzle

        currentPuzzleIndex = newIndex;
        const selectedPuzzle = allSudokuPuzzles[currentPuzzleIndex];
        currentFullSudokuGrid = selectedPuzzle.grid;
        currentAlwaysVisibleCells = selectedPuzzle.alwaysVisibleCells;

        initializeGrid(currentFullSudokuGrid, true); // Initialize and hide numbers
        showSolutionBtn.disabled = false; // Re-enable solution button
    }

    // Function to initialize the grid
    function initializeGrid(grid, hideNumbers = true) {
        sudokuGridElement.innerHTML = ''; // Clear existing grid
        const cellElements = [];

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const cell = document.createElement('div');
                cell.classList.add('sudoku-cell');
                cell.dataset.row = r;
                cell.dataset.col = c;
                cell.textContent = grid[r][c]; // Always set text content to the solution
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
        // Remove existing hidden and always-visible classes first
        cellElements.forEach(cell => {
            cell.classList.remove('hidden');
            cell.classList.remove('always-visible');
        });

        // Ensure currentAlwaysVisibleCells are indeed visible and marked
        const initiallyVisibleIndices = new Set();
        currentAlwaysVisibleCells.forEach(coords => {
            const index = coords.row * 9 + coords.col;
            if (index >= 0 && index < totalCells) {
                cellElements[index].classList.add('always-visible');
                initiallyVisibleIndices.add(index);
            }
        });

        // Collect all potential indices to hide
        const potentialHideIndices = [];
        for (let i = 0; i < totalCells; i++) {
            if (!initiallyVisibleIndices.has(i)) {
                potentialHideIndices.push(i);
            }
        }

        // Shuffle the potentialHideIndices to pick randomly
        for (let i = potentialHideIndices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [potentialHideIndices[i], potentialHideIndices[j]] = [potentialHideIndices[j], potentialHideIndices[i]];
        }

        let currentlyVisibleCount = initiallyVisibleIndices.size;

        // Hide numbers until we reach the target visible count (or close to it)
        for (let i = 0; i < potentialHideIndices.length; i++) {
            const indexToConsider = potentialHideIndices[i];
            if (currentlyVisibleCount >= targetVisibleCount) {
                cellElements[indexToConsider].classList.add('hidden');
            } else {
                if (Math.random() < 0.6) { // Adjust this probability to fine-tune the visible count
                    cellElements[indexToConsider].classList.add('hidden');
                } else {
                    currentlyVisibleCount++;
                }
            }
        }

        // Double-check: ensure always visible cells are definitely not hidden
        currentAlwaysVisibleCells.forEach(coords => {
            const index = coords.row * 9 + coords.col;
            cellElements[index].classList.remove('hidden');
        });
    }


    // Function to show the solution
    function showSolution() {
        const cells = document.querySelectorAll('.sudoku-cell');
        cells.forEach((cell, index) => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            cell.textContent = currentFullSudokuGrid[row][col]; // Use the current puzzle's solution
            cell.classList.remove('hidden');
            cell.classList.remove('always-visible'); // Remove highlight when showing solution
        });
        showSolutionBtn.disabled = true; // Disable button after showing solution
    }

    // Event listeners
    showSolutionBtn.addEventListener('click', showSolution);
    nextPuzzleBtn.addEventListener('click', loadNewPuzzle);

    // Load the first puzzle when the page loads
    loadNewPuzzle();
});
