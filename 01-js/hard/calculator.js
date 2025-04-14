class Calculator {
  constructor() {
    this.result = 0;
  }

  add(number) {
    this.result += number;
  }

  subtract(number) {
    this.result -= number;
  }

  multiply(number) {
    this.result *= number;
  }

  divide(number) {
    if (number === 0) {
      throw new Error("Cannot divide by zero");
    }
    this.result /= number;
  }

  clear() {
    this.result = 0;
  }

  getResult() {
    return this.result;
  }

  calculate(expression) {
    try {
      // Remove all spaces from the expression
      const sanitizedExpression = expression.replace(/\s+/g, "");

      // Validate the expression for invalid characters
      if (/[^0-9+\-*/().]/.test(sanitizedExpression)) {
        throw new Error("Invalid characters in expression");
      }

      // Check for division by zero in the expression
      if (/\/0(?!\d)/.test(sanitizedExpression)) {
        throw new Error("Cannot divide by zero");
      }

      // Evaluate the expression
      this.result = eval(sanitizedExpression);
    } catch (error) {
      throw new Error("Invalid expression");
    }
  }
}

// class Calculator {}

module.exports = Calculator;
