import { useState } from 'react'
import { Icon } from '../components/Icon'
import { PageHeader } from '../components/PageHeader'
import { Toolbar } from '../components/Toolbar'

function getStatusClass(status) {
  if (status === 'Operativa') return 'ok'
  if (status === 'Mantenimiento') return 'pending'
  return 'danger'
}

export function MachinesPage({ machines, onAdd, onDelete, theme, onToggleTheme }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('Todos')

  const rows = machines.filter((machine) => {
    const matchesQuery = machine.name.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = filter === 'Todos' || machine.status === filter
    return matchesQuery && matchesFilter
  })

  function toggleFilter() {
    setFilter((current) => current === 'Todos' ? 'Operativa' : 'Todos')
  }

  function confirmDelete(machine) {
    if (window.confirm(`¿Eliminar "${machine.name}"? Esta acción no se puede deshacer.`)) {
      onDelete(machine.id ?? machine.name)
    }
  }

  return (
    <>
      <PageHeader title="Máquinas" subtitle="Supervisa el estado y mantenimiento de tus equipos" actionLabel="Nueva máquina" onAdd={onAdd} theme={theme} onToggleTheme={onToggleTheme} />
      <section className="machine-cards">
        {rows.map((machine, index) => (
          <article className="machine-card" key={machine.id ?? machine.name}>
            <div className={`machine-visual machine-${index}`}>
              {machine.image ? <img src={machine.image} alt={machine.name} /> : <Icon name="machines" size={48} />}
              <span className={`status ${getStatusClass(machine.status)}`}><i />{machine.status}</span>
            </div>
            <div className="machine-body">
              <div className="machine-heading">
                <div><h3>{machine.name}</h3><p>{machine.model}</p></div>
                <button className="delete-btn" onClick={() => confirmDelete(machine)} aria-label={`Eliminar ${machine.name}`}><Icon name="trash" size={17} /></button>
              </div>
              <div className="machine-data">
                <span>Horas de uso<strong>{machine.hours}</strong></span>
                <span>Próximo mantenimiento<strong>{machine.next}</strong></span>
              </div>
              <div className="service-bar">
                <div><span>Ciclo de servicio</span><b>{machine.progress}%</b></div>
                <div className="bar"><i className={machine.progress > 85 ? 'low' : ''} style={{ width: `${machine.progress}%` }} /></div>
              </div>
            </div>
          </article>
        ))}
      </section>
      {!rows.length && <div className="panel empty">No hay máquinas que coincidan con el filtro.</div>}
      <section className="panel machine-search">
        <Toolbar query={query} onQueryChange={setQuery} placeholder="Buscar máquinas..." filter={filter} onFilterChange={toggleFilter} />
      </section>
    </>
  )
}
