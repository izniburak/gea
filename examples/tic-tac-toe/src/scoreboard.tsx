interface ScoreboardProps {
  scores: { X: number; O: number; draws: number }
}

export default function Scoreboard({ scores }: ScoreboardProps) {
  return (
    <div class="scoreboard">
      <div class="score score-x">
        <span class="score-label">X</span>
        <span class="score-value">{scores.X}</span>
      </div>
      <div class="score score-draw">
        <span class="score-label">Draw</span>
        <span class="score-value">{scores.draws}</span>
      </div>
      <div class="score score-o">
        <span class="score-label">O</span>
        <span class="score-value">{scores.O}</span>
      </div>
    </div>
  )
}
