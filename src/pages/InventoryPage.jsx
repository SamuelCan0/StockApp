import { useState } from 'react'
import { Icon } from '../components/Icon'
import { PageHeader } from '../components/PageHeader'
import { Toolbar } from '../components/Toolbar'

const pageConfig = {
  supplies: {
    title: 'Insumos',
    subtitle: 'Administra filamentos, materiales y existencias',
    placeholder: 'Buscar por material, color o marca...',
  },
  parts: {
    title: 'Repuestos',
    subtitle: 'Controla piezas, compatibilidad y existencias',
    placeholder: 'Buscar repuestos...',
  },
}

function SuppliesTable({ rows, onDelete }) {
  const colorMap = {
    negro: '#171b1a',
    blanco: '#f4f5f2',
    rojo: '#e04f45',
    azul: '#3478d4',
    verde: '#48b832',
    amarillo: '#edc84b',
    gris: '#89918e',
    naranja: '#ed8b3e',
    morado: '#8a5bc2',
  }

  return (
    <table className="supplies-table">
      <thead>
        <tr><th>Tipo</th><th>Material</th><th>Color</th><th>Marca</th><th>Presentación</th><th>Estado</th><th>Existencias</th><th /></tr>
      </thead>
      <tbody>
        {rows.map((item) => (
          <tr key={item.id}>
            <td><span className="tag">{item.type}</span></td>
            <td><strong>{item.material}</strong></td>
            <td><span className="color-value"><i className="color-swatch" style={{ background: colorMap[String(item.color).toLowerCase()] ?? '#b8c0bd' }} />{item.color}</span></td>
            <td>{item.brand}</td>
            <td><strong>{item.presentation}</strong></td>
            <td><span className={`status ${item.condition === 'Disponible' ? 'ok' : item.condition === 'En uso' ? 'pending' : 'danger'}`}><i />{item.condition}</span></td>
            <td><strong>{item.quantity}</strong></td>
            <td><button className="delete-btn" onClick={() => onDelete(item.id, `${item.material} ${item.color}`)} aria-label={`Eliminar ${item.material} ${item.color}`}><Icon name="trash" size={17} /></button></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function PartsTable({ rows, onDelete }) {
  return (
    <table>
      <thead><tr><th>Artículo</th><th>Categoría</th><th>Existencia</th><th>Nivel</th><th>Estado</th><th /></tr></thead>
      <tbody>
        {rows.map((item) => (
          <tr key={item.id}>
            <td><div className={`item-avatar ${item.tone}`}><Icon name="parts" /></div><div><strong>{item.name}</strong><small>{item.detail}</small></div></td>
            <td><span className="tag">{item.type}</span></td>
            <td><strong>{item.stock}</strong></td>
            <td><div className="level"><div className="bar"><i className={item.level < 20 ? 'low' : ''} style={{ width: `${item.level}%` }} /></div><span>{item.level}%</span></div></td>
            <td><span className={`status ${item.status === 'Disponible' ? 'ok' : 'warn'}`}><i />{item.status}</span></td>
            <td><button className="delete-btn" onClick={() => onDelete(item.id, item.name)} aria-label={`Eliminar ${item.name}`}><Icon name="trash" size={17} /></button></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function InventoryPage({ kind, items, onAdd, onDelete, theme, onToggleTheme }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('Todos')
  const config = pageConfig[kind]

  const rows = items.filter((item) => {
    const searchableText = kind === 'supplies'
      ? `${item.type ?? ''} ${item.material ?? ''} ${item.color ?? ''} ${item.brand ?? ''} ${item.presentation ?? ''}`
      : `${item.name} ${item.detail} ${item.type}`
    const matchesQuery = searchableText.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = filter === 'Todos' || item.status === filter
    return matchesQuery && matchesFilter
  })

  const totalUnits = items.reduce((total, item) => total + Number(item.quantity), 0)
  const lowStock = items.filter((item) => item.status === 'Stock bajo').length

  function toggleFilter() {
    setFilter((current) => current === 'Todos' ? 'Stock bajo' : 'Todos')
  }

  function confirmDelete(id, name) {
    if (window.confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) {
      onDelete(id)
    }
  }

  return (
    <>
      <PageHeader title={config.title} subtitle={config.subtitle} actionLabel={kind === 'supplies' ? 'Nuevo insumo' : 'Nuevo repuesto'} onAdd={onAdd} theme={theme} onToggleTheme={onToggleTheme} />
      <section className="mini-stats">
        <div><span>Total de referencias</span><strong>{items.length}</strong></div>
        <div><span>Existencias totales</span><strong>{totalUnits}</strong></div>
        <div className="warning"><span>Sin existencias</span><strong>{lowStock}</strong></div>
      </section>
      <section className="panel table-panel">
        <Toolbar query={query} onQueryChange={setQuery} placeholder={config.placeholder} filter={filter} onFilterChange={toggleFilter} />
        {kind === 'supplies'
          ? <SuppliesTable rows={rows} onDelete={confirmDelete} />
          : <PartsTable rows={rows} onDelete={confirmDelete} />}
        {!rows.length && <div className="empty">Todavía no hay registros en esta sección.</div>}
      </section>
    </>
  )
}
