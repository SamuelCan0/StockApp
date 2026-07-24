import { Icon } from './Icon'

export function Toolbar({ query, onQueryChange, placeholder, filter, onFilterChange }) {
  return (
    <div className="toolbar">
      <label className="search">
        <Icon name="search" size={18} />
        <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder={placeholder} />
      </label>
      <button className="filter" onClick={onFilterChange}>{filter}<Icon name="chevron" size={16} /></button>
    </div>
  )
}
