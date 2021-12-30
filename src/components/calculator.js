import React, { Component } from 'react';
import './calculator.css';


export class Calculator extends React.Component{
  
    constructor(props){
        super(props);

        this.state={
            result:'0',
            number:'0',
            operator:'',
        };
    }
    

      handleClearInput = () => {
      this.setState({ result: '0', number: '0', operator: '' });
      }


      // function to handle inputs from number buttons
        handleNumberInput =(e) => {
        e.preventDefault();
        // Getting the value from the pressed button
       const value = e.target.innerHTML;

      console.log(value);
     // appending the value from the button to the current number
     this.setState((prevState) => {
        return {
          number:
            prevState.number === '0' && value === '0' // prevents number from having multiple 0's at the beginning
              ? '0'
              : prevState.number % 1 === 0 && value !== '0' // if it's a whole number
              ? Number(prevState.number + value) // it returns a Number() to get rid of 0's in the front when a number is typed, also includes
              : prevState.number + value, // value !== "0" so you can type a 0 right after the comma
            result: prevState.operator ? prevState.result : '0', // this line resets the result if a new number was typed with no operator stored
        };
      });
    }

     // function to handle operator inputs
  handleOperatorInput=(e) =>{
    const operation = e.target.innerHTML;

    this.setState((prevState) => {
      return {
        operator: operation,
        result: prevState.number ? prevState.number : prevState.result,
        number: operation === '-' && prevState.number === '0' ? '-' : '',
      };
    });
  }

  // function to handle equal input
  handleEqualInput=()=> {
    let newResult = 0;
    switch (this.state.operator) {
      case '+':
        newResult = Number(this.state.result) + Number(this.state.number);
        break;
      case '-':
        newResult = this.state.result - this.state.number;
        break;
      case '*':
        newResult = this.state.result * this.state.number;
        break;
      case '/':
        newResult = this.state.result / this.state.number;
        break;

      case '%':
        newResult = this.state.result % this.state.number;
        break;

      default:
        newResult = this.state.number ? this.state.number : this.state.result;
    }

    this.setState({ number: '', operator: '', result: Number(newResult) });
  }

  handleNegateInput=()=> {
    if (!this.state.number && this.state.result) {
      // special case: number is empty and result isn't (e.g. after equal operation) it inverts the result
      this.setState({ result: -this.state.result });
    } else {
      // default case: negates current number
      this.setState({ number: -this.state.number });
    }
  }

   

  render() {
    const { number, result, operator } = this.state;
    return (
      <div className="calculator">
        <CalculatorDisplay output={number ? number : result + operator} />
        <div className="calculator-buttons">
          <CalculatorButton value="CLEAR" className="calculator-clear-button  span-three"  onClick={this.handleClearInput} />
          <CalculatorButton value="+-" className="calculator-operation-button" onClick={this.handleNegateInput} />
          <CalculatorButton value="%" className="calculator-operation-button" onClick={this.percentClickHandler} />
          <CalculatorButton value="7" className="calculator-number-button" onClick={this.handleNumberInput} />
          <CalculatorButton value="8" className="calculator-number-button" onClick={this.handleNumberInput} />
          <CalculatorButton value="9" className="calculator-number-button" onClick={this.handleNumberInput} />
          <CalculatorButton value="*" className="calculator-operation-button" onClick={this.handleOperatorInput} />
          <CalculatorButton value="4" className="calculator-number-button" onClick={this.handleNumberInput} />
          <CalculatorButton value="5" className="calculator-number-button" onClick={this.handleNumberInput} />
          <CalculatorButton value="6" className="calculator-number-button" onClick={this.handleNumberInput} />
          <CalculatorButton value="-" className="calculator-operation-button" onClick={this.handleOperatorInput} />
          <CalculatorButton value="1" className="calculator-number-button" onClick={this.handleNumberInput} />
          <CalculatorButton value="2" className="calculator-number-button" onClick={this.handleNumberInput} />
          <CalculatorButton value="3" className="calculator-number-button" onClick={this.handleNumberInput} />
          <CalculatorButton value="+" className="calculator-operation-button" onClick={this.handleOperatorInput} />
          <CalculatorButton value="0" className="calculator-number-button" onClick={this.handleNumberInput} />
          <CalculatorButton value="/" className="calculator-operation-button" onClick={this.handleOperatorInput} />
          <CalculatorButton value="=" className="calculator-equal-button span-two" onClick={this.handleEqualInput} />
        </div>
      </div>
    );
  }
  
}

function CalculatorDisplay(props){
 return <div className="calculator-display">{props.output}</div>;
}
function CalculatorButton(props){
  return <button value={props.value} className={'calculator-button ' + props.className} onClick={props.onClick} disabled={props.disabled}>
  {props.value}
</button>;
 }

  



