import {useState} from 'react';
import './App.css';
import Die from './components/Die';
import {nanoid} from 'nanoid';



function App() {
  
  const [dice, setDice] = useState(allNewDice());
  // const [isHeld, setIsHeld] = useState(false)

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

  function rollDice() {
    setDice(allNewDice())
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
        return die.id === id ? 
            {...die, isHeld: !die.isHeld} :
            die
    }))
  }

  const diceElements = dice.map(die => (
    <Die 
        value={die.value} 
        key={die.id} 
        isHeld={die.isHeld} 
        holdDice={() => holdDice(die.id)}/> 
  ))

  return (
    <main>
       <div className="dice-container">
         {diceElements}        
        </div>
        <button onClick={rollDice} className="roll-dice">Roll</button>
    </main>
  );
}

export default App;
