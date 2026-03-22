import { geaPlugin } from '../index'

const source = `
import { Component } from '@geajs/core'
export default class RadioLike extends Component {
  created(props) {
    this._onValueChange = (newVal) => {
      this.value = newVal
      props.onValueChange?.({ value: newVal })
    }
  }

  template(props) {
    const items = props.items || []
    return (
      <div class="radio-root">
        {items.map((item) => (
          <label class="radio-item" data-value={item.value} key={item.value}>
            <span class="radio-label">{item.label}</span>
          </label>
        ))}
      </div>
    )
  }
}
`

const plugin = geaPlugin()
const transform = typeof plugin.transform === 'function' ? plugin.transform : plugin.transform?.handler
const result = transform?.call({} as never, source, '/virtual/RadioLike.jsx') as any
const output = typeof result === 'string' ? result : result?.code
console.log(output)
