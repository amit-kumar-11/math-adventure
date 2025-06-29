function HomePage({ onStart }) {
  return (
    <div className="screen home-screen">
      <div className="container">
        <div className="title-section">
          <h1 className="game-title">
            <span className="title-emoji">🧮</span>
            Math Adventure
            <span className="title-emoji">✨</span>
          </h1>
          <p className="game-subtitle">
            Practice addition and subtraction with fun rewards!
          </p>
        </div>

        <div className="instructions">
          <h3>How to Play:</h3>
          <div className="instruction-list">
            <div className="instruction-item">
              <span className="instruction-emoji">🎯</span>
              <span>Choose your difficulty level</span>
            </div>
            <div className="instruction-item">
              <span className="instruction-emoji">⏰</span>
              <span>Solve math problems before time runs out</span>
            </div>
            <div className="instruction-item">
              <span className="instruction-emoji">🏆</span>
              <span>Get stickers for correct answers</span>
            </div>
            <div className="instruction-item">
              <span className="instruction-emoji">🌟</span>
              <span>Try to beat your high score</span>
            </div>
          </div>
        </div>

        <button className="start-btn" onClick={onStart}>
          <span className="btn-text">Start Playing</span>
          <span className="btn-emoji">🚀</span>
        </button>
      </div>
    </div>
  )
}

export default HomePage