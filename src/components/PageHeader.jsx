import { useState } from 'react'
import { Icon } from './Icon'

export function PageHeader({ title, subtitle, actionLabel, onAdd, theme, onToggleTheme, showAction = true }) {
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header>
      <div><h1>{title}</h1><p>{subtitle}</p></div>
      <div className="header-actions">
        <button
          className="icon-btn theme-toggle"
          aria-label={theme === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro'}
          title={theme === 'dark' ? 'Tema claro' : 'Tema oscuro'}
          onClick={onToggleTheme}
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
        </button>
        <div className="notifications-wrapper">
          <button
            className="icon-btn"
            aria-label="Notificaciones de insumos"
            aria-expanded={showNotifications}
            onClick={() => setShowNotifications((isOpen) => !isOpen)}
          >
            <Icon name="bell" />
          </button>
          {showNotifications && (
            <section className="notifications-panel">
              <div className="notifications-title"><div><strong>Alertas de insumos</strong><small>Sin notificaciones nuevas</small></div><button onClick={() => setShowNotifications(false)}><Icon name="close" size={17} /></button></div>
              <div className="notifications-empty"><Icon name="bell" /><p>Las alertas de inventario aparecerán aquí.</p></div>
            </section>
          )}
        </div>
        {showAction && <button className="primary" onClick={onAdd}><Icon name="plus" size={18} /><span className="action-label">{actionLabel}</span></button>}
      </div>
    </header>
  )
}
