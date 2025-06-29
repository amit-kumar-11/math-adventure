import { useState, useEffect, useCallback } from 'react'

function GamePage({ level, levelKey, stickers, onGameComplete, onBack }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [question, setQuestion] = useState(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [timeLeft, setTimeLeft] = useState(level.time)
  const [score, setScore] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [earnedStickers, setEarnedStickers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)
  const [gameStarted, setGameStarted] = useState(false)

  const generateQuestion = useCallback(() => {
    const [min, max] = level.range
    const num1 = Math.floor(Math.random() * (max - min + 1)) + min
    const num2 = Math.floor(Math.random() * (max - min + 1)) + min
    const operation = Math.random() > 0.5 ? '+' : '-'
    
    let actualNum1 = num1
    let actualNum2 = num2
    
    // Ensure subtraction doesn't result in negative numbers
    if (operation === '-' && num1 < num2) {
      actualNum1 = num2
      actualNum2 = num1
    }
    
    const answer = operation === '+' ? actualNum1 + actualNum2 : actualNum1 - actualNum2
    
    return {
      num1: actualNum1,
      num2: actualNum2,
      operation,
      answer
    }
  }, [level.range])

  const nextQuestion = useCallback(() => {
    if (currentQuestion < level.questions - 1) {
      setCurrentQuestion(prev => prev + 1)
      setQuestion(generateQuestion())
      setUserAnswer('')
      setTimeLeft(level.time)
      setShowResult(false)
      setIsCorrect(null)
    } else {
      // Game complete
      const results = {
        score,
        totalQuestions: level.questions,
        correctAnswers,
        earnedStickers,
        level: levelKey
      }
      onGameComplete(results)
    }
  }, [currentQuestion, level.questions, level.time, generateQuestion, score, correctAnswers, earnedStickers, levelKey, onGameComplete])

  const checkAnswer = () => {
    const userNum = parseInt(userAnswer)
    const correct = userNum === question.answer
    
    if (correct) {
      setScore(prev => prev + 10)
      setCorrectAnswers(prev => prev + 1)
      const randomSticker = stickers[Math.floor(Math.random() * stickers.length)]
      setEarnedStickers(prev => [...prev, randomSticker])
      setIsCorrect(true)
      
      // Play success sound effect (if available)
      try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBjmb4/DMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmETBj')
        audio.play()
      } catch (e) {
        // Ignore audio errors
      }
    } else {
      setIsCorrect(false)
    }
    
    setShowResult(true)
    
    // Auto-advance after showing result
    setTimeout(() => {
      nextQuestion()
    }, 1500)
  }

  // Timer effect
  useEffect(() => {
    if (!gameStarted) return

    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      setIsCorrect(false)
      setShowResult(true)
      setTimeout(() => {
        nextQuestion()
      }, 1500)
    }
  }, [timeLeft, showResult, nextQuestion, gameStarted])

  // Initialize first question
  useEffect(() => {
    if (!gameStarted) {
      const firstQuestion = generateQuestion()
      setQuestion(firstQuestion)
      setGameStarted(true)
    }
  }, [generateQuestion, gameStarted])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (userAnswer.trim() && !showResult) {
      checkAnswer()
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && userAnswer.trim() && !showResult) {
      checkAnswer()
    }
  }

  if (!question) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="screen game-screen">
      <div className="game-header">
        <button className="back-btn small" onClick={onBack}>
          ← Back
        </button>
        <div className="game-stats">
          <div className="stat">
            <span className="stat-label">Score</span>
            <span className="stat-value">{score}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Question</span>
            <span className="stat-value">{currentQuestion + 1}/{level.questions}</span>
          </div>
        </div>
      </div>

      <div className="game-content">
        <div className={`timer ${timeLeft <= 5 ? 'timer-warning' : ''}`}>
          <div className="timer-circle">
            <div 
              className="timer-fill"
              style={{ 
                transform: `rotate(${((level.time - timeLeft) / level.time) * 360}deg)` 
              }}
            ></div>
            <span className="timer-text">{timeLeft}</span>
          </div>
        </div>

        <div className="question-container">
          <div className="question">
            <span className="number">{question.num1}</span>
            <span className="operation">{question.operation}</span>
            <span className="number">{question.num2}</span>
            <span className="equals">=</span>
            <span className="answer-placeholder">?</span>
          </div>
        </div>

        {!showResult && (
          <form onSubmit={handleSubmit} className="answer-form">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Your answer"
              className="answer-input"
              autoFocus
            />
            <button 
              type="submit" 
              className="submit-btn"
              disabled={!userAnswer.trim()}
            >
              Submit Answer
            </button>
          </form>
        )}

        {showResult && (
          <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <div className="correct-result">
                <div className="result-icon">✅</div>
                <div className="result-text">Correct!</div>
                <div className="earned-sticker">
                  {earnedStickers[earnedStickers.length - 1]}
                </div>
                <div className="result-message">+10 points</div>
              </div>
            ) : (
              <div className="incorrect-result">
                <div className="result-icon">❌</div>
                <div className="result-text">
                  {timeLeft === 0 ? 'Time\'s up!' : 'Try again!'}
                </div>
                <div className="result-message">
                  The answer was {question.answer}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default GamePage