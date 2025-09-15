document.addEventListener('DOMContentLoaded', () => {

    // Get references to all interactive elements
    const bulbGrid = document.getElementById('light-bulb-grid');
    const rowsInput = document.getElementById('rows-input');
    const colsInput = document.getElementById('cols-input');
    const updateBtn = document.getElementById('update-grid-btn');
    const allOnBtn = document.getElementById('all-on-btn');
    const allOffBtn = document.getElementById('all-off-btn');
    // --- NEW elements for ASCII translation ---
    const translateBtn = document.getElementById('translate-btn');
    const asciiResultEl = document.getElementById('ascii-result');
    const remainingBitsEl = document.getElementById('remaining-bits');

    function generateGrid(rows, cols) {
        bulbGrid.innerHTML = '';
        bulbGrid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        const totalBulbs = rows * cols;
        if (totalBulbs > 500) {
             alert("基於效能考量，無法建立超過 500 個燈泡。");
             return;
        }
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

    // --- NEW: Function to translate binary to ASCII ---
    function translateToAscii() {
        const allBulbs = document.querySelectorAll('.bulb');
        let binaryString = '';
        allBulbs.forEach(bulb => {
            binaryString += bulb.classList.contains('on') ? '1' : '0';
        });

        let asciiResult = '';
        let remainingBits = '';

        for (let i = 0; i < binaryString.length; i += 8) {
            if (i + 8 <= binaryString.length) {
                const byte = binaryString.substring(i, i + 8);
                const decimalValue = parseInt(byte, 2);
                asciiResult += String.fromCharCode(decimalValue);
            } else {
                remainingBits = binaryString.substring(i);
            }
        }
        
        asciiResultEl.textContent = asciiResult || '（無有效輸出）';
        remainingBitsEl.textContent = remainingBits || '無';
    }

    // --- EVENT LISTENERS ---
    updateBtn.addEventListener('click', () => {
        const rows = parseInt(rowsInput.value, 10);
        const cols = parseInt(colsInput.value, 10);
        if (rows > 0 && cols > 0) {
            generateGrid(rows, cols);
        } else {
            alert("請輸入有效的行數和列數（必須大於 0）。");
        }
    });

    bulbGrid.addEventListener('click', (event) => {
        const clickedElement = event.target.closest('.bulb');
        if (clickedElement) {
            clickedElement.classList.toggle('on');
        }
    });

    allOnBtn.addEventListener('click', () => {
        document.querySelectorAll('.bulb').forEach(bulb => bulb.classList.add('on'));
    });

    allOffBtn.addEventListener('click', () => {
        document.querySelectorAll('.bulb').forEach(bulb => bulb.classList.remove('on'));
    });
    
    // --- NEW: Event listener for the translate button ---
    translateBtn.addEventListener('click', translateToAscii);
    
    // --- INITIALIZATION ---
    generateGrid(parseInt(rowsInput.value, 10), parseInt(colsInput.value, 10));
});