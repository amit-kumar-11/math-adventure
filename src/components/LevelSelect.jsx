function LevelSelect({ levels, onLevelSelect, onBack }) {
  return (
    <div className="screen level-select-screen">
      <div className="container">
        <h2 className="screen-title">Choose Your Level</h2>
        
        <div className="levels-grid">
          {Object.entries(levels).map(([key, level]) => (
            <div 
              key={key} 
              className="level-card"
              onClick={() => onLevelSelect(key)}
              style={{ '--level-color': level.color }}
            >
              <div className="level-icon">
                {key === 'easy' && '🌱'}
                {key === 'medium' && '🔥'}
                {key === 'hard' && '⚡'}
              </div>
              <h3 className="level-name">{level.name}</h3>
              <div className="level-info">
                <div className="level-detail">
                  <span className="detail-label">Numbers:</span>
                  <span className="detail-value">
                    {level.range[0]} - {level.range[1]}
                  </span>
                </div>
                <div className="level-detail">
                  <span className="detail-label">Time:</span>
                  <span className="detail-value">{level.time}s per question</span>
                </div>
                <div className="level-detail">
                  <span className="detail-label">Questions:</span>
                  <span className="detail-value">{level.questions}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="back-btn" onClick={onBack}>
          <span>← Back to Home</span>
        </button>
      </div>
    </div>
  )
}

export default LevelSelect