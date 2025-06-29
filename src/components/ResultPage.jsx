function ResultPage({ gameData, level, onPlayAgain, onHome }) {
  const { score, totalQuestions, correctAnswers, earnedStickers } = gameData
  const percentage = Math.round((correctAnswers / totalQuestions) * 100)
  
  const getPerformanceMessage = () => {
    if (percentage >= 90) return "🏆 Outstanding! You're a math champion!"
    if (percentage >= 70) return "🌟 Great job! Keep up the good work!"
    if (percentage >= 50) return "👏 Good effort! Practice makes perfect!"
    return "💪 Keep trying! You'll get better with practice!"
  }

  const getPerformanceColor = () => {
    if (percentage >= 90) return '#4CAF50'
    if (percentage >= 70) return '#FF9800'
    if (percentage >= 50) return '#2196F3'
    return '#F44336'
  }

  return (
    <div className="screen result-screen">
      <div className="container">
        <div className="result-header">
          <h2 className="result-title">🎉 Game Complete! 🎉</h2>
          <div className="performance-message" style={{ color: getPerformanceColor() }}>
            {getPerformanceMessage()}
          </div>
        </div>

        <div className="result-stats">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <div className="stat-number">{score}</div>
              <div className="stat-label">Total Score</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <div className="stat-number">{correctAnswers}/{totalQuestions}</div>
              <div className="stat-label">Correct Answers</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <div className="stat-number">{percentage}%</div>
              <div className="stat-label">Accuracy</div>
            </div>
          </div>
        </div>

        <div className="earned-stickers-section">
          <h3>🏆 Earned Stickers</h3>
          <div className="stickers-display">
            {earnedStickers.length > 0 ? (
              earnedStickers.map((sticker, index) => (
                <div key={index} className="sticker-item">
                  {sticker}
                </div>
              ))
            ) : (
              <div className="no-stickers">
                <div className="no-stickers-icon">🎭</div>
                <div className="no-stickers-text">No stickers earned this time</div>
                <div className="no-stickers-message">Try again to earn some!</div>
              </div>
            )}
          </div>
        </div>

        <div className="result-actions">
          <button className="play-again-btn" onClick={onPlayAgain}>
            <span className="btn-text">Play Again</span>
            <span className="btn-emoji">🔄</span>
          </button>
          
          <button className="home-btn" onClick={onHome}>
            <span className="btn-text">Back to Home</span>
            <span className="btn-emoji">🏠</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultPage