interface OptionCardProps {
  name: string
  description: string
  price: number
  selected: boolean
  color?: string
  onPick: () => void
}

export default function OptionCard({ name, description, price, selected, color, onPick }: OptionCardProps) {
  return (
    <div class={`option-card ${selected ? 'option-card--selected' : ''}`} click={onPick}>
      {selected && <span class="option-check">✓</span>}
      {color && (
        <div class="option-swatch-wrap">
          <div
            class={`option-swatch ${selected ? 'option-swatch--selected' : ''}`}
            style={{ backgroundColor: color }}
          ></div>
        </div>
      )}
      <div class="option-body">
        <p class="option-name">{name}</p>
        <p class="option-desc">{description}</p>
      </div>
      <p class={`option-price ${price === 0 ? 'option-price--included' : ''}`}>
        {price === 0 ? 'Included' : `+$${price.toLocaleString()}`}
      </p>
    </div>
  )
}
