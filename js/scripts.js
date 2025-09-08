let calculator = {
    num1: "",
    num2: "",
    lastOperator:null,
    operator: null,
    currentExpression:"",
    result: "",
    topScreen: document.querySelector(".top"),
    botScreen: document.querySelector(".bot"),

    inputNumber(num) {
        let currentNum = this.operator ? this.num2 : this.num1;

        if (num === "." && currentNum.includes(".")) return;

        currentNum += num;

    
        currentNum = currentNum.replace(/^0+(?=\d)/, "");

        if (this.operator) this.num2 = currentNum;
        else this.num1 = currentNum;

        this.botScreen.textContent = currentNum;
    },

    setOperation(operator) {
        if (!this.operator) {
            this.operator = operator;
            this.currentExpression = this.num1 + " " + operator;
            this.topScreen.textContent = this.currentExpression;
            this.botScreen.textContent = "";
        } else if (this.num2 !== "") {
            this.calculate();
            this.operator = operator;
            this.currentExpression = this.result + " " + operator;
            this.topScreen.textContent = this.currentExpression;
            this.botScreen.textContent = "";
        } else {
            this.operator = operator;
            this.currentExpression = this.num1 + " " + operator;
            this.topScreen.textContent = this.currentExpression;
        }
    },


    calculate() {
        if (!this.operator || this.num2 === "") return;

        let a = Number(this.num1);
        let b = Number(this.num2);

        switch (this.operator) {
            case "+":
                this.result = (a + b).toString();
                break;
            case "-":
                this.result = (a - b).toString();
                break;
            case "*":
                this.result = (a * b).toString();
                break;
            case "/":
                this.result = b === 0 ? "Error" : (a / b).toString();
                break;
        }
        this.num1 = this.result;
        this.num2 = "";
        this.topScreen.textContent = this.currentExpression + " " + this.num2;
        this.botScreen.textContent = this.result;
        this.lastOperator = this.operator;
        this.operator = null;
    },
 
    clear(){
        this.num1 = "";
        this.num2 = "";
        this.currentExpression = "";
        this.operator = null;
        this.lastOperator = null;
        this.result = "";
        this.botScreen.textContent = "0";
        this.topScreen.textContent = "";
        console.log("clear");
    }
}

const ui = document.querySelector(".interface");

ui.addEventListener('click', e => {
    const btn = e.target.closest("button"); // ensures you get the button even if icon clicked
    if (!btn) return; // clicked outside buttons
    const cls = btn.classList;

    if (cls.contains("number") || cls.contains("dot")) {
        calculator.inputNumber(btn.textContent);
    } else if (cls.contains("clear")) {
        console.log("clear button pressed"); // debug line
        calculator.clear();
    } else if (cls.contains("result")) {
        calculator.calculate();
    } else if (cls.contains("operator")) {
        calculator.setOperation(btn.textContent);
        
    }
});



