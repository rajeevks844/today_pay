import React, { useState } from 'react';
import { create, all } from 'mathjs';
import ConfettiExplosion from 'react-confetti-explosion';
import './App.css';

const math = create(all);

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [memory, setMemory] = useState(null);
  const [secondFunction, setSecondFunction] = useState(false);
  const [angleMode, setAngleMode] = useState('deg'); 
  const [theme, setTheme] = useState('light'); 

  const handleButtonClick = (value) => {
    setExpression(prev => prev + value);
  };

  const handleClear = () => {
    setExpression('');
    setResult(null);
  };

  const handleEquals = () => {
    try {
      const evalResult = math.evaluate(expression);
      setResult(evalResult);
      setExpression(evalResult.toString());

      if (expression.includes('5') && expression.includes('6')) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    } catch (error) {
      setResult('Error');
    }
  };

  const handleAdvancedFunction = (func) => {
    let newExpression;
    try {
      if (['sin', 'cos', 'tan', 'sinh', 'cosh', 'tanh'].includes(func)) {
        newExpression = `${func}(math.unit(${expression}, '${angleMode}'))`;
      } else if (func === 'sqrt2') {
        newExpression = `sqrt(${expression})`;
      } else if (func === 'sqrt3') {
        newExpression = `cbrt(${expression})`;
      } else if (func === 'reciprocal') {
        newExpression = `1/(${expression})`;
      } else if (func === 'power10') {
        newExpression = `10^(${expression})`;
      } else if (func === 'powerE') {
        newExpression = `exp(${expression})`;
      } else if (func === 'power2') {
        newExpression = `${expression}^2`;
      } else if (func === 'power3') {
        newExpression = `${expression}^3`;
      } else if (func === 'factorial') {
        newExpression = `factorial(${expression})`;
      } else {
        newExpression = `${func}(${expression})`;
      }
      const evalResult = math.evaluate(newExpression);
      setResult(evalResult);
      setExpression(evalResult.toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const handlePower = () => {
    setExpression(prev => prev + '^');
  };

  const handleRoot = () => {
    setExpression(prev => prev + '^(1/');
  };

  const handleSignChange = () => {
    setExpression(prev => (-1 * parseFloat(prev)).toString());
  };

  const handlePercentage = () => {
    setExpression(prev => (parseFloat(prev) / 100).toString());
  };

  const handleMemoryStore = () => {
    setMemory(result);
  };

  const handleMemoryRecall = () => {
    if (memory !== null) {
      setExpression(memory.toString());
    }
  };

  const handleMemoryClear = () => {
    setMemory(null);
  };

  const toggleSecondFunction = () => {
    setSecondFunction(!secondFunction);
  };

  const toggleAngleMode = () => {
    setAngleMode(prev => (prev === 'deg' ? 'rad' : 'deg'));
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`theme-${theme}`}>
      <label className="theme-switch">
        <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
        <span className="slider"></span>
      </label>
      <div className={`calculator ${theme}`}>
      <div className="calculator-header">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        
        {showConfetti && <ConfettiExplosion />}
        <div className="display">
          <div className="expression">{expression || '0'}</div>
          <div className="result">{result !== null ? result : ''}</div>
        </div>
        
        <div className="buttons">
          <button onClick={() => handleButtonClick('(')}>(</button>
          
           <button onClick={() => handleButtonClick(')')}>)</button>
            <button onClick={handleMemoryClear}>mc</button> 
            <button onClick={handleMemoryStore}>m+</button>
            <button onClick={handleMemoryStore}>m-</button>
             <button onClick={handleMemoryRecall}>mr</button>
              <button onClick={handleClear}>C</button>
               <button onClick={handleSignChange}>+/-</button> 
               <button onClick={handlePercentage}>%</button>
                <button className="operation" onClick={() => handleButtonClick('/')}>÷</button>
                 <button onClick={toggleSecondFunction}>2nd</button> 
                 <button onClick={() => handleAdvancedFunction('power2')}>x²</button> 
                 <button onClick={() => handleAdvancedFunction('power3')}>x³</button>
                  <button onClick={handlePower}>xʸ</button> 
                  <button onClick={() => handleAdvancedFunction('powerE')}>eˣ</button> 
                  <button onClick={() => handleAdvancedFunction('power10')}>10ˣ</button>
                   <button className="number" onClick={() => handleButtonClick('7')}>7</button>
                    <button className="number" onClick={() => handleButtonClick('8')}>8</button>
                     <button className="number" onClick={() => handleButtonClick('9')}>9</button>
                      <button className="operation" onClick={() => handleButtonClick('*')}>x</button>
                       <button onClick={() => handleAdvancedFunction('reciprocal')}>1/x</button> 
                       <button onClick={() => handleAdvancedFunction('sqrt2')}>²√x</button> 
                       <button onClick={() => handleAdvancedFunction('sqrt3')}>³√x</button> 
                       <button onClick={handleRoot}>ʸ√x</button>
                        <button onClick={() => handleAdvancedFunction('log')}>ln</button> 
                        <button onClick={() => handleAdvancedFunction('log10')}>log₁₀</button> 
                        <button className="number" onClick={() => handleButtonClick('4')}>4</button> 
                        <button className="number" onClick={() => handleButtonClick('5')}>5</button> 
                        <button className="number" onClick={() => handleButtonClick('6')}>6</button> 
                        <button className="operation" onClick={() => handleButtonClick('-')}>-</button>
                         <button onClick={() => handleAdvancedFunction('factorial')}>x!</button> 
                         <button onClick={() => handleAdvancedFunction('sin')}>sin</button>
                          <button onClick={() => handleAdvancedFunction('cos')}>cos</button>
                           <button onClick={() => handleAdvancedFunction('tan')}>tan</button>
                            <button onClick={() => handleAdvancedFunction('exp')}>e</button> 
                            <button onClick={() => handleButtonClick('EE')}>EE</button>
                             <button className="number" onClick={() => handleButtonClick('1')}>1</button>
                              <button className="number" onClick={() => handleButtonClick('2')}>2</button>
                               <button className="number" onClick={() => handleButtonClick('3')}>3</button>
                                <button className="operation" onClick={() => handleButtonClick('+')}>+</button>
                                 <button onClick={toggleAngleMode}>{angleMode === 'deg' ? 'Rad' : 'Deg'}</button>
                                  <button onClick={() => handleAdvancedFunction('sinh')}>sinh</button>
                                   <button onClick={() => handleAdvancedFunction('cosh')}>cosh</button>
                                    <button onClick={() => handleAdvancedFunction('tanh')}>tanh</button>
                                     <button onClick={() => handleButtonClick(`${math.pi}`)}>π</button> 
                                
                                     <button onClick={() => setExpression(prev => prev + `rand()`)}>rand</button>
                                <button className="number zero" onClick={() => handleButtonClick('0')}>0</button>
                                 <button onClick={() => handleButtonClick('.')}>.</button> 
                                 <button onClick={handleEquals}>=</button>
                                  {secondFunction && 
                                  ( <> 
                <button onClick={() => handleAdvancedFunction('sqrt')}>√</button>
           <button onClick={() => handleAdvancedFunction('log')}>log</button> 
                   </>
             )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
