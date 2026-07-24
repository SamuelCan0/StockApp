import { Icon } from '../components/Icon'
import { PageHeader } from '../components/PageHeader'

function StatCard({ icon, label, value, note, accent }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${accent}`}><Icon name={icon} /></div>
      <div className="stat-top"><span>{label}</span><strong>{value}</strong><small>{note}</small></div>
    </article>
  )
}

function MachineStatus({ machines, onNavigate }) {
  const operative = machines.filter((machine) => machine.status === 'Operativa').length
  const maintenance = machines.filter((machine) => machine.status === 'Mantenimiento').length
  const offline = machines.filter((machine) => machine.status === 'Fuera de servicio').length

  return (
    <article className="panel">
      <div className="panel-title">
        <div><h2>Estado de máquinas</h2><p>Disponibilidad actual</p></div>
        <button onClick={() => onNavigate('machines')}>Ver todas <span>→</span></button>
      </div>
      <div className="donut-wrap">
        <div className="donut"><div><strong>{machines.length}</strong><span>máquinas</span></div></div>
        <div className="legend">
          <p><i className="dot green" /><span>Operativas</span><strong>{operative}</strong></p>
          <p><i className="dot yellow" /><span>Mantenimiento</span><strong>{maintenance}</strong></p>
          <p><i className="dot red" /><span>Fuera de servicio</span><strong>{offline}</strong></p>
        </div>
      </div>
    </article>
  )
}

function InventoryOverview({ supplies, parts, onNavigate }) {
  const supplyUnits = supplies.reduce((total, item) => total + Number(item.quantity), 0)
  const partUnits = parts.reduce((total, item) => total + Number(item.quantity), 0)

  return (
    <article className="panel inventory-overview">
      <div className="panel-title"><div><h2>Resumen de inventario</h2><p>Registros disponibles</p></div></div>
      <button className="overview-row" onClick={() => onNavigate('supplies')}>
        <div className="category c0"><Icon name="supplies" /></div>
        <div><strong>Insumos</strong><span>{supplies.length} referencias</span></div>
        <b>{supplyUnits} existencias</b><span>→</span>
      </button>
      <button className="overview-row" onClick={() => onNavigate('parts')}>
        <div className="category c2"><Icon name="parts" /></div>
        <div><strong>Repuestos</strong><span>{parts.length} referencias</span></div>
        <b>{partUnits} existencias</b><span>→</span>
      </button>
    </article>
  )
}

export function DashboardPage({ machines, supplies, parts, onNavigate, theme, onToggleTheme }) {
  const operative = machines.filter((machine) => machine.status === 'Operativa').length
  const lowStock = [...supplies, ...parts].filter((item) => item.status === 'Stock bajo').length

  return (
    <>
      <PageHeader title="Panel general" subtitle="Resumen actual del taller" theme={theme} onToggleTheme={onToggleTheme} showAction={false} />
      <section className="stats">
        <StatCard icon="machines" label="Máquinas operativas" value={`${operative} de ${machines.length}`} note="Disponibilidad actual" accent="green" />
        <StatCard icon="supplies" label="Insumos registrados" value={supplies.length} note={`${supplies.reduce((sum, item) => sum + Number(item.quantity), 0)} existencias`} accent="violet" />
        <StatCard icon="parts" label="Repuestos registrados" value={parts.length} note={`${parts.reduce((sum, item) => sum + Number(item.quantity), 0)} existencias`} accent="blue" />
        <StatCard icon="alert" label="Alertas de inventario" value={lowStock} note={lowStock ? 'Requieren atención' : 'Sin alertas activas'} accent="orange" />
      </section>
      <section className="dashboard-grid">
        <InventoryOverview supplies={supplies} parts={parts} onNavigate={onNavigate} />
        <MachineStatus machines={machines} onNavigate={onNavigate} />
      </section>
    </>
  )
}
