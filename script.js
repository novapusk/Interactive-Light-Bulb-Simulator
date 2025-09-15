document.addEventListener('DOMContentLoaded', () => {

    // Get references to all interactive elements
    const bulbGrid = document.getElementById('light-bulb-grid');
    const rowsInput = document.getElementById('rows-input');
    const colsInput = document.getElementById('cols-input');
    const updateBtn = document.getElementById('update-grid-btn');
    const allOnBtn = document.getElementById('all-on-btn');
    const allOffBtn = document.getElementById('all-off-btn');

    /**
     * Clears the grid and generates a new set of bulbs based on row and column count.
     * @param {number} rows - The number of rows for the grid.
     * @param {number} cols - The number of columns for the grid.
     */
    function generateGrid(rows, cols) {
        // 1. Clear any existing bulbs from the grid
        bulbGrid.innerHTML = '';
        
        // 2. Update the grid layout dynamically using CSS grid properties
        bulbGrid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

        // 3. Calculate the total number of bulbs
        const totalBulbs = rows * cols;
        if (totalBulbs > 500) { // Safety limit
             alert("基於效能考量，無法建立超過 500 個燈泡。");
             return;
        }
        
        // 4. Create and append each new bulb
        for (let i = 1; i <= totalBulbs; i++) {
            const bulb = document.createElement('div');
            bulb.classList.add('bulb');
            
            const bulbContent = document.createElement('div');
            bulbContent.classList.add('bulb-content');
            bulbContent.textContent = i;
            
            bulb.appendChild(bulbContent);
            bulbGrid.appendChild(bulb);
        }
    }

    // --- EVENT LISTENERS ---

    // Generate the grid when the "Update Grid" button is clicked
    updateBtn.addEventListener('click', () => {
        const rows = parseInt(rowsInput.value, 10);
        const cols = parseInt(colsInput.value, 10);
        
        if (rows > 0 && cols > 0) {
            generateGrid(rows, cols);
        } else {
            alert("請輸入有效的行數和列數（必須大於 0）。");
        }
    });

    // Toggle a single bulb on/off
    bulbGrid.addEventListener('click', (event) => {
        const clickedElement = event.target.closest('.bulb');
        if (clickedElement) {
            clickedElement.classList.toggle('on');
        }
    });

    // Turn all bulbs on
    allOnBtn.addEventListener('click', () => {
        const allBulbs = document.querySelectorAll('.bulb');
        allBulbs.forEach(bulb => bulb.classList.add('on'));
    });

    // Turn all bulbs off
    allOffBtn.addEventListener('click', () => {
        const allBulbs = document.querySelectorAll('.bulb');
        allBulbs.forEach(bulb => bulb.classList.remove('on'));
    });
    
    // --- INITIALIZATION ---
    // Generate the initial grid on page load using the default values in the HTML
    generateGrid(parseInt(rowsInput.value, 10), parseInt(colsInput.value, 10));

});