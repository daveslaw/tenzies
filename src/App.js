import {useState, useEffect} from 'react';
import './App.css';
import Die from './components/Die';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti';
import StopWatch from './components/StopWatch';

function App() {
  
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [counter, setCounter] = useState(0);
  
  function allNewDice() {
    
    const newDice = []
    for (let i = 0; i < 10; i++) {
        newDice.push({
          value: Math.ceil(Math.random() * 6), 
          isHeld: false,
          id: nanoid(),
        })
    }
    return newDice
  }

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }

  function rollDice() {
    setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
            die :
            generateNewDie()
    }))
    setCounter(prevState => prevState + 1);    
  }

  useEffect(() => {
    console.log(counter);
  },[counter])

  function newGame() {
    setDice(allNewDice());
    setTenzies(false);
    setCounter(0);
  }

  

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
        return die.id === id ? 
            {...die, isHeld: !die.isHeld} :
            die
    }))
  }

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      
    }
  }, [dice])

  const diceElements = dice.map(die => (
    <Die 
        value={die.value} 
        key={die.id} 
        isHeld={die.isHeld} 
        holdDice={() => holdDice(die.id)}/> 
  ))



  return (
    <main>
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
       <div className="dice-container">
         {diceElements}        
        </div>
        <button onClick={tenzies ? newGame : rollDice} className="roll-dice">{tenzies ? "New Game" : "Roll"}</button>
      
      {tenzies && <p>Counter: {counter}</p>}
    </main>
  );
}

export default App;
