// Attach event listener to cells
for (let i = 0; i < allCells.length; i++) {
    allCells[i].addEventListener("blur", function (e) {
        let content = allCells[i].textContent.trim();
        let address = addressInput.value;
        let { rId, cId } = getRidCid(address);
        let cellObject = db[rId][cId];

        // If the value hasn't changed, exit
        if (cellObject.value === content) return;

        // Remove formula if manual input is provided
        if (cellObject.formula) {
            removeFormula(address, cellObject.formula);
            cellObject.formula = "";
        }

        // Update UI and database
        SolveUI(content, rId, cId);
    });
}

// Handle formula input (Enter key)
formulaInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && formulaInput.value.trim() !== "") {
        let cFormula = formulaInput.value.trim();
        let address = addressInput.value;
        let { rId, cId } = getRidCid(address);
        let cellObject = db[rId][cId];

        // Remove previous formula dependencies if formula has changed
        if (cellObject.formula && cellObject.formula !== cFormula) {
            removeFormula(address, cellObject.formula);
        }

        // Compute formula result
        let value = evaluateFormula(cFormula);

        if (value !== "ERROR") {
            SolveUI(value, rId, cId);
            db[rId][cId].formula = cFormula;
            setFormula(address, cFormula);
        } else {
            alert("Invalid Formula");
        }
    }
});

// Evaluate a formula and return computed value
function evaluateFormula(formula) {
    let cellReferenceRegex = /[A-Z][0-9]+/g; // Matches A1, B2, etc.
    
    formula = formula.replace(cellReferenceRegex, match => {
        let { rId, cId } = getRidCid(match);
        return db[rId][cId].value || 0; // Use 0 if cell is empty
    });

    try {
        return eval(formula); // Evaluate final formula
    } catch (error) {
        return "ERROR"; // Return error if formula is invalid
    }
}


// Update UI and dependent cells
function SolveUI(value, rId, cId) {
    let cell = document.querySelector(`.grid .cell[rid='${rId}'][cid='${cId}']`);
    if (cell) {
        cell.textContent = value;
    }
    db[rId][cId].value = value;

    // Update all dependent cells
    let children = db[rId][cId].children || [];
    for (let childAddress of children) {
        let { rId: chRId, cId: chCId } = getRidCid(childAddress);
        let childCellObj = db[chRId][chCId];

        if (childCellObj.formula) {
            let newValue = evaluateFormula(childCellObj.formula);
            if (newValue !== "ERROR") {
                SolveUI(newValue, chRId, chCId);
            }
        }
    }
}

// Set a formula and register dependencies
function setFormula(address, formula) {
    let formulaTokens = formula.split(/\s+/);

    for (let token of formulaTokens) {
        if (/^[A-Z]+\d+$/.test(token)) { // If token is a cell reference
            let { rId, cId } = getRidCid(token);
            db[rId][cId].children = db[rId][cId].children || [];
            db[rId][cId].children.push(address); // Add as dependent
        }
    }
}

// Remove a formula and clean dependencies
function removeFormula(address, formula) {
    if (!formula) return;

    let formulaTokens = formula.split(/\s+/);

    for (let token of formulaTokens) {
        if (/^[A-Z]+\d+$/.test(token)) { // If token is a cell reference
            let { rId, cId } = getRidCid(token);
            let children = db[rId][cId].children || [];

            let idx = children.indexOf(address);
            if (idx !== -1) {
                children.splice(idx, 1);
            }
        }
    }
}
