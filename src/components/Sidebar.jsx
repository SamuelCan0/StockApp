import { navItems } from '../data/mockData'
import logo from '../assets/stockapp-logo.png'
import { Icon } from './Icon'

export function Sidebar({ active, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark"><img src={logo} alt="Logo de StockApp" /></div>
        <div><strong>StockApp</strong><span>Taller 3D</span></div>
      </div>

      <nav>
        <p className="nav-label">ESPACIO DE TRABAJO</p>
        {navItems.map(([id, label]) => (
          <button key={id} className={active === id ? 'active' : ''} onClick={() => onNavigate(id)}>
            <Icon name={id} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

    </aside>
  )
}
