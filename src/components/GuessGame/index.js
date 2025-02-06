import {useState} from 'react'
import './index.css'

const words = [
  'APPLE',
  'ABOUT',
  'AFTER',
  'ALARM',
  'BREAD',
  'BRICK',
  'BRAIN',
  'BROWN',
  'DRESS',
  'DREAM',
  'ENJOY',
  'LEAVE',
  'LAUGH',
  'LIGHT',
  'PHONE',
  'PHOTO',
  'SHIRT',
  'SLEEP',
  'SMALL',
  'SMILE',
  'WHITE',
  'WORST',
  'VIRUS',
  'UPPER',
  'WATER',
]

const randomWord = words[Math.floor(Math.random() * words.length)]

const GuessGame = () => {
  console.log(randomWord)
  const [guessedWords, setGuessedWords] = useState([])
  const [enteredWord, setEnteredWord] = useState('')
  const [para, setPara] = useState('')
  const [gameStatus, setGameStatus] = useState(false)
  const [cls, setCls] = useState('')
  const getLetterClass = (letter, index) => {
    if (!letter) return 'empty'
    if (letter === randomWord[index]) return 'correct'
    if (randomWord.includes(letter)) return 'present'
    return 'absent'
  }
  const updateTextBox = e => {
    setEnteredWord(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))
  }
  const addInArray = () => {
    if (enteredWord === randomWord) {
      setGameStatus(true)
      setCls('green')
      setPara('Congratulations! You have won the game')
    }
    setGuessedWords([...guessedWords, enteredWord])
    setEnteredWord('')
    if (guessedWords.length >= 5) {
      setGameStatus(true)
      setCls('red')
      setPara(
        'You have reached Maximum Attempts. Sorry, You have lost the Game! Try Again',
      )
    }
  }
  return (
    <div className="app-con">
      <h1>Wordle Clone Game</h1>
      <h3>You have 6 attempts to guess the 5 letter word</h3>
      <div className="colors">
        <div className="input-color" />
        <p>respresents the letter is present but in different position</p>
      </div>
      <div className="colors">
        <div className="input-color-green" />
        <p>respresents the letter is present in same position</p>
      </div>
      <div>
        {guessedWords.map(each => (
          <div className="rows">
            <h3>Your {guessedWords.indexOf(each) + 1} attempt</h3>
            {each.split('').map((letter, i) => (
              <h3 className={`letter ${getLetterClass(letter, i)}`}>
                {letter.toUpperCase()}
              </h3>
            ))}
          </div>
        ))}
        {!gameStatus && (
          <div>
            <input
              maxLength="5"
              type="textbox"
              onChange={updateTextBox}
              value={enteredWord}
              placeholder="Enter 5 letter Word"
              onKeyDown={e => {
                if (e.key === 'Enter') addInArray()
              }}
            />
            <button className="buttons" type="button" onClick={addInArray}>
              Guess
            </button>
          </div>
        )}
        {gameStatus && <h2 className={`${cls}`}>{para}</h2>}
        <button
          className="buttons"
          type="button"
          onClick={() => window.location.reload()}
        >
          New Game
        </button>
      </div>
    </div>
  )
}

export default GuessGame
