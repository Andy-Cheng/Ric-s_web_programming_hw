import React ,{Component} from 'react';

import CalcButton from './CalcButton';

class CalcApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayNumbers : 0,
      tempAns: 0,
      tempDigits: 0,
      wholeNum: 0,
      operationQueue : ''
    };
    this.resetState = this.resetState.bind(this);
    this.add = this.add.bind(this);
    this.minus = this.minus.bind(this);
    this.multiply = this.multiply.bind(this);
    this.divide = this.divide.bind(this);
    this.finish = this.finish.bind(this);
    this.showUpCurrentDigit = this.showUpCurrentDigit.bind(this);
  }

  resetState() {
    this.setState({
      displayNumbers : 0,
      tempAns: 0,
      wholeNum: 0,
      operationQueue : ''
    });
  }
  add(){
    this.setState(prevState => {
      let ans = 0
      if(prevState.operationQueue == 'plus'){
         ans = parseInt(prevState.tempAns) + parseInt(prevState.wholeNum)

      }
      else if(prevState.operationQueue == 'minus'){
        ans = parseInt(prevState.tempAns) - parseInt(prevState.wholeNum)

      }
      else if(prevState.operationQueue == 'multiply'){
        ans = parseInt(prevState.tempAns) * parseInt(prevState.wholeNum)

      }
      else if(prevState.operationQueue == 'divide'){
        ans = parseInt(prevState.tempAns) / parseInt(prevState.wholeNum)

      }
      else if(prevState.operationQueue == ''){
         ans = prevState.wholeNum
      }
      return{operationQueue:'plus', wholeNum: 0, tempAns: ans, displayNumbers: '0'}
    });
  }
  minus(){
    this.setState(prevState => {
      let ans = 0
      if(prevState.operationQueue == 'plus'){
         ans = parseInt(prevState.tempAns) + parseInt(prevState.wholeNum)
         console.log(ans)
         console.log(prevState.displayNumbers)
      }
      else if(prevState.operationQueue == 'minus'){
        ans = parseInt(prevState.tempAns) - parseInt(prevState.wholeNum)
        console.log(ans)
        console.log(prevState.displayNumbers)
      }
      else if(prevState.operationQueue == 'multiply'){
        ans = parseInt(prevState.tempAns) * parseInt(prevState.wholeNum)
        console.log(ans)
        console.log(prevState.displayNumbers)
      }
      else if(prevState.operationQueue == 'divide'){
        ans = parseInt(prevState.tempAns) / parseInt(prevState.wholeNum)
        console.log(ans)
        console.log(prevState.displayNumbers)
      }
      else if(prevState.operationQueue == ''){
         ans = prevState.wholeNum
      }
      return{operationQueue:'minus', wholeNum: 0, tempAns: ans, displayNumbers: '0'}
    });

  }
  multiply(){
    this.setState(prevState => {
      let ans = 0
      if(prevState.operationQueue == 'plus'){
         ans = parseInt(prevState.tempAns) + parseInt(prevState.wholeNum)
         console.log(ans)
         console.log(prevState.displayNumbers)
      }
      else if(prevState.operationQueue == 'minus'){
        ans = parseInt(prevState.tempAns) - parseInt(prevState.wholeNum)
        console.log(ans)
        console.log(prevState.displayNumbers)
      }
      else if(prevState.operationQueue == 'multiply'){
        ans = parseInt(prevState.tempAns) * parseInt(prevState.wholeNum)
        console.log(ans)
        console.log(prevState.displayNumbers)
      }
      else if(prevState.operationQueue == 'divide'){
        ans = parseInt(prevState.tempAns) / parseInt(prevState.wholeNum)
        console.log(ans)
        console.log(prevState.displayNumbers)
      }
      else if(prevState.operationQueue == ''){
         ans = prevState.wholeNum
      }
      return{operationQueue:'multiply', wholeNum: 0, tempAns: ans, displayNumbers: '0'}
    });
  }
  divide(){
    this.setState(prevState => {
      let ans = 0
      if(prevState.operationQueue == 'plus'){
         ans = parseInt(prevState.tempAns) + parseInt(prevState.wholeNum)
         console.log(ans)
         console.log(prevState.displayNumbers)
      }
      else if(prevState.operationQueue == 'minus'){
        ans = parseInt(prevState.tempAns) - parseInt(prevState.wholeNum)
        console.log(ans)
        console.log(prevState.displayNumbers)
      }
      else if(prevState.operationQueue == 'multiply'){
        ans = parseInt(prevState.tempAns) * parseInt(prevState.wholeNum)
        console.log(ans)
        console.log(prevState.displayNumbers)
      }
      else if(prevState.operationQueue == 'divide'){
        ans = parseInt(prevState.tempAns) / parseInt(prevState.wholeNum)
        console.log(ans)
        console.log(prevState.displayNumbers)
      }
      else if(prevState.operationQueue == ''){
         ans = prevState.wholeNum
      }
      return{operationQueue:'divide', wholeNum: 0, tempAns: ans, displayNumbers: '0'}
    });
  }
  finish(){
    this.setState(prevState => {

      if(prevState.operationQueue == 'plus'){
        return {displayNumbers: parseInt(prevState.tempAns)+parseInt(prevState.wholeNum)}
      }
      else if(prevState.operationQueue == 'minus'){
        return {displayNumbers: parseInt(prevState.tempAns)-parseInt(prevState.wholeNum)}
      }
      else if(prevState.operationQueue == 'multiply'){
        return {displayNumbers: parseInt(prevState.tempAns)*parseInt(prevState.wholeNum)}
      }
      else if(prevState.operationQueue == 'divide'){
        return {displayNumbers: parseInt(prevState.tempAns)/parseInt(prevState.wholeNum)}
      }
      else if(prevState.operationQueue == ''){

      }

      
    
    
    });

  }
  showUpCurrentDigit(digit){
    this.setState(prevState => {return (prevState.displayNumbers=='0')? {displayNumbers: digit, wholeNum: (digit)}:{displayNumbers: (prevState.wholeNum+digit), wholeNum: (prevState.wholeNum+digit)}})
    console.log(this.state.wholeNum)
  }
  render() {
    const {resetState, add, minus, multiply, divide, finish, showUpCurrentDigit} = this
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.displayNumbers}</div>
          </div>
          <div className="calc-row">
            <CalcButton mytag='AC' onButtonClick={resetState}>AC</CalcButton>
            <CalcButton  >+-</CalcButton>
            <CalcButton className="calc-number">%</CalcButton>
            
            <CalcButton onButtonClick={divide} mytag='÷'className="calc-operator">÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onButtonClick={showUpCurrentDigit} mytag='7' className="calc-number">7</CalcButton>
            <CalcButton onButtonClick={showUpCurrentDigit} mytag='8' className="calc-number">8</CalcButton>
            <CalcButton onButtonClick={showUpCurrentDigit} mytag='9' className="calc-number">9</CalcButton>
            <CalcButton  onButtonClick={multiply} mytag='x' className="calc-operator">x</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onButtonClick={showUpCurrentDigit} mytag='4' className="calc-number">4</CalcButton>
            <CalcButton onButtonClick={showUpCurrentDigit} mytag='5' className="calc-number">5</CalcButton>
            <CalcButton onButtonClick={showUpCurrentDigit} mytag='6' className="calc-number">6</CalcButton>
            <CalcButton onButtonClick={minus} className="calc-operator">-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onButtonClick={showUpCurrentDigit} mytag='1' className="calc-number">1</CalcButton>
            <CalcButton onButtonClick={showUpCurrentDigit} mytag='2' className="calc-number">2</CalcButton>
            <CalcButton onButtonClick={showUpCurrentDigit} mytag='3' className="calc-number">3</CalcButton>
            <CalcButton onButtonClick={add} className="calc-operator">+</CalcButton>
            
          </div>
          <div className="calc-row">
            <CalcButton onButtonClick={showUpCurrentDigit} mytag='0' className="calc-number">0</CalcButton>
            <CalcButton onButtonClick={showUpCurrentDigit} mytag='0' className="calc-number">00</CalcButton>
            <CalcButton className="calc-number">.</CalcButton>
            <CalcButton mytag='=' onButtonClick={finish} className="calc-operator">=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
