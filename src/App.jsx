import { useState, useEffect } from 'react'
import HomePage from './components/HomePage'
import LevelSelect from './components/LevelSelect'
import GamePage from './components/GamePage'
import ResultPage from './components/ResultPage'
import './styles/Game.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('home')
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [gameData, setGameData] = useState({
    score: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    earnedStickers: []
  })

  const levels = {
    easy: {
      name: 'Easy',
      range: [1, 9],
      time: 30,
      questions: 10,
      color: '#4CAF50'
    },
    medium: {
      name: 'Medium', 
      range: [10, 99],
      time: 25,
      questions: 10,
      color: '#FF9800'
    },
    hard: {
      name: 'Hard',
      range: [100, 999],
      time: 20,
      questions: 10,
      color: '#F44336'
    }
  }

  const stickers = ['🏆', '⭐', '🎁', '🌟', '🎉', '🎊', '🏅', '💫']

  useEffect(() => {
    // Load high scores from localStorage
    const savedScores = localStorage.getItem('mathGameHighScores')
    if (savedScores) {
      setGameData(prev => ({
        ...prev,
        highScores: JSON.parse(savedScores)
      }))
    }
  }, [])

  const handleLevelSelect = (level) => {
    setSelectedLevel(level)
    setCurrentScreen('game')
  }

  const handleGameComplete = (results) => {
    setGameData(results)
    
    // Save high score
    const highScores = JSON.parse(localStorage.getItem('mathGameHighScores') || '{}')
    const levelKey = selectedLevel
    if (!highScores[levelKey] || results.score > highScores[levelKey]) {
      highScores[levelKey] = results.score
      localStorage.setItem('mathGameHighScores', JSON.stringify(highScores))
    }
    
    setCurrentScreen('result')
  }

  const resetGame = () => {
    setCurrentScreen('home')
    setSelectedLevel(null)
    setGameData({
      score: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      earnedStickers: []
    })
  }

  const goToLevelSelect = () => {
    setCurrentScreen('levelSelect')
  }

  return (
    <div className="app">
      {currentScreen === 'home' && (
        <HomePage onStart={goToLevelSelect} />
      )}
      
      {currentScreen === 'levelSelect' && (
        <LevelSelect 
          levels={levels}
          onLevelSelect={handleLevelSelect}
          onBack={resetGame}
        />
      )}
      
      {currentScreen === 'game' && (
        <GamePage
          level={levels[selectedLevel]}
          levelKey={selectedLevel}
          stickers={stickers}
          onGameComplete={handleGameComplete}
          onBack={goToLevelSelect}
        />
      )}
      
      {currentScreen === 'result' && (
        <ResultPage
          gameData={gameData}
          level={levels[selectedLevel]}
          onPlayAgain={goToLevelSelect}
          onHome={resetGame}
        />
      )}
    </div>
  )
}

export default App