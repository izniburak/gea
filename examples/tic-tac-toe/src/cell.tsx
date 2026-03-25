interface CellProps {
  value: string | null
  isWinning: boolean
  gameOver: boolean
  onMove: () => void
}

export default function Cell({ value, isWinning, gameOver, onMove }: CellProps) {
  return (
    <button
      class={{
        cell: true,
        'cell-x': value === 'X',
        'cell-o': value === 'O',
        'cell-winning': isWinning,
        'cell-playable': !value && !gameOver,
      }}
      click={onMove}
      disabled={!!value || gameOver}
    >
      {value || ''}
    </button>
  )
}
