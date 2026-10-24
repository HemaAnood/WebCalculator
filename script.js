const display = document.getElementById("display");

// Display numbers and operators
function append(value) {
    if (display.value === "Error" ||
        display.value === "Cannot divide by zero" ||
        display.value === "Invalid input") {
        display.value = "";
    }

    display.value += value;
}

// Addition
function add(a, b) {
    return a + b;
}

// Subtraction
function subtract(a, b) {
    return a - b;
}

// Multiplication
function multiply(a, b) {
    return a * b;
}

// Division
function divide(a, b) {
    if (b === 0) {
        return "Cannot divide by zero";
    }

    return a / b;
}

// Calculate result
function calculate() {
    const expression = display.value.trim();

    const match = expression.match(
        /^(-?(?:\d+\.?\d*|\.\d+))\s*([+*/-])\s*(-?(?:\d+\.?\d*|\.\d+))$/
    );

    if (!match) {
        display.value = "Invalid input";
        return;
    }

    const a = Number(match[1]);
    const operator = match[2];
    const b = Number(match[3]);

    let result;

    if (operator === "+") {
        result = add(a, b);
    } else if (operator === "-") {
        result = subtract(a, b);
    } else if (operator === "*") {
        result = multiply(a, b);
    } else if (operator === "/") {
        result = divide(a, b);
    }

    if (typeof result === "number") {
        display.value = Number.isFinite(result)
            ? String(Number(result.toPrecision(10)))
            : "Error";
    } else {
        display.value = result;
    }
}

// Clear display
function clearDisplay() {
    display.value = "";
}

// Keyboard support
document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (/^[0-9]$/.test(key)) {
        append(key);
    } else if (["+", "-", "*", "/"].includes(key)) {
        append(key);
    } else if (key === ".") {
        append(key);
    } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    } else if (key === "Escape") {
        clearDisplay();
    } else if (key === "Backspace") {
        display.value = display.value.slice(0, -1);
    }
});
