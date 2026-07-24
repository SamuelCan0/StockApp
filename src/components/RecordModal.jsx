import { useState } from 'react'
import { Icon } from './Icon'

const modalConfig = {
  supplies: {
    title: 'Nuevo insumo',
    eyebrow: 'INVENTARIO DE MATERIALES',
    description: 'Registra las características y existencias del material.',
    icon: 'supplies',
    saveLabel: 'Registrar insumo',
  },
  machines: {
    title: 'Nueva máquina',
    eyebrow: 'EQUIPOS DEL TALLER',
    description: 'Añade un equipo y configura su estado inicial.',
    icon: 'machines',
    saveLabel: 'Registrar máquina',
  },
  parts: {
    title: 'Nuevo artículo de inventario',
    eyebrow: 'INVENTARIO DE REPUESTOS',
    description: 'Registra una pieza, compatibilidad y existencias.',
    icon: 'parts',
    saveLabel: 'Registrar repuesto',
  },
}

const initialForm = {
  name: '',
  category: '',
  quantity: '',
  unit: 'pzas.',
  minimum: '',
  manufacturer: '',
  model: '',
  status: 'Operativa',
  hours: '0',
  nextMaintenance: '',
  notes: '',
  supplyType: 'Filamento',
  material: 'PLA',
  color: '',
  brand: '',
  presentation: '',
  condition: 'Disponible',
  partNumber: '',
  compatibility: '',
}

function SupplyFields({ form, updateField }) {
  return (
    <>
      <div className="form-section-title">Características del material</div>
      <div className="form-row">
        <label>Tipo
          <select value={form.supplyType} onChange={(event) => updateField('supplyType', event.target.value)}>
            <option>Filamento</option><option>Resina</option><option>Consumible</option>
          </select>
        </label>
        <label>Material
          <select value={form.material} onChange={(event) => updateField('material', event.target.value)}>
            <option>PLA</option><option>PETG</option><option>ABS</option><option>TPU</option><option>ASA</option><option>Otro</option>
          </select>
        </label>
      </div>
      <div className="form-row">
        <label>Color<input autoFocus value={form.color} onChange={(event) => updateField('color', event.target.value)} placeholder="Ej. Negro" required /></label>
        <label>Marca<input value={form.brand} onChange={(event) => updateField('brand', event.target.value)} placeholder="Ej. Elegoo" required /></label>
      </div>
      <div className="form-row form-row-three">
        <label>Presentación<input value={form.presentation} onChange={(event) => updateField('presentation', event.target.value)} placeholder="Ej. 400 g" required /></label>
        <label>Estado
          <select value={form.condition} onChange={(event) => updateField('condition', event.target.value)}>
            <option>Disponible</option><option>En uso</option><option>Agotado</option>
          </select>
        </label>
        <label>Existencias<input type="number" min="0" value={form.quantity} onChange={(event) => updateField('quantity', event.target.value)} required /></label>
      </div>
    </>
  )
}

function InventoryFields({ form, updateField }) {
  return (
    <>
      <div className="form-section-title">Información del repuesto</div>
      <label>Nombre del repuesto<input autoFocus value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Ej. Boquilla 0.4 mm" required /></label>
      <div className="form-row">
        <label>Categoría
          <select value={form.category} onChange={(event) => updateField('category', event.target.value)} required>
            <option value="">Seleccionar categoría</option>
            {['Hotend', 'Movimiento', 'Electrónica', 'Estructura', 'Otro'].map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label>Número de parte<input value={form.partNumber} onChange={(event) => updateField('partNumber', event.target.value)} placeholder="Ej. MK8-04" /></label>
      </div>
      <label>Compatible con<input value={form.compatibility} onChange={(event) => updateField('compatibility', event.target.value)} placeholder="Ej. Ender 3 Pro, K1C" /></label>
      <div className="form-section-title">Control de existencias</div>
      <div className="form-row form-row-three">
        <label>Cantidad<input type="number" min="0" step="0.01" value={form.quantity} onChange={(event) => updateField('quantity', event.target.value)} required /></label>
        <label>Unidad
          <select value={form.unit} onChange={(event) => updateField('unit', event.target.value)}>
            <option>pzas.</option><option>kg</option><option>g</option><option>L</option><option>m</option>
          </select>
        </label>
        <label>Stock mínimo<input type="number" min="0" step="0.01" value={form.minimum} onChange={(event) => updateField('minimum', event.target.value)} required /></label>
      </div>
    </>
  )
}

function MachineFields({ form, updateField }) {
  return (
    <>
      <div className="form-section-title">Identificación del equipo</div>
      <label>Nombre de la máquina<input autoFocus value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Ej. Ender 3 Pro" required /></label>
      <div className="form-row">
        <label>Fabricante<input value={form.manufacturer} onChange={(event) => updateField('manufacturer', event.target.value)} placeholder="Ej. Creality" required /></label>
        <label>Modelo o tecnología<input value={form.model} onChange={(event) => updateField('model', event.target.value)} placeholder="Ej. FDM" required /></label>
      </div>
      <div className="form-section-title">Operación y mantenimiento</div>
      <div className="form-row">
        <label>Estado
          <select value={form.status} onChange={(event) => updateField('status', event.target.value)}>
            <option>Operativa</option><option>Mantenimiento</option><option>Fuera de servicio</option>
          </select>
        </label>
        <label>Horas de uso<input type="number" min="0" value={form.hours} onChange={(event) => updateField('hours', event.target.value)} /></label>
      </div>
      <label>Próximo mantenimiento<input type="date" value={form.nextMaintenance} onChange={(event) => updateField('nextMaintenance', event.target.value)} /></label>
    </>
  )
}

export function RecordModal({ page, onSave, onClose }) {
  const [form, setForm] = useState(initialForm)
  const config = modalConfig[page]

  function updateField(field, value) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const id = crypto.randomUUID()

    if (page === 'machines') {
      const maintenance = form.nextMaintenance
        ? new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium' }).format(new Date(`${form.nextMaintenance}T12:00:00`))
        : 'Sin programar'
      onSave({
        id,
        name: form.name.trim(),
        model: `${form.manufacturer.trim()} · ${form.model.trim()}`,
        status: form.status,
        hours: `${form.hours || 0} h`,
        next: maintenance,
        progress: 0,
        image: null,
      })
      return
    }

    if (page === 'supplies') {
      const quantity = Number(form.quantity)
      onSave({
        id,
        name: `${form.material} ${form.color}`.trim(),
        type: form.supplyType,
        material: form.material,
        color: form.color.trim(),
        brand: form.brand.trim(),
        presentation: form.presentation.trim(),
        condition: quantity === 0 ? 'Agotado' : form.condition,
        quantity,
        status: quantity === 0 ? 'Stock bajo' : 'Disponible',
        tone: 'green',
      })
      return
    }

    const quantity = Number(form.quantity)
    const minimum = Number(form.minimum)
    const level = minimum > 0 ? Math.min(100, Math.round((quantity / (minimum * 2)) * 100)) : 100
    onSave({
      id,
      name: form.name.trim(),
      detail: [form.partNumber, form.compatibility].filter(Boolean).join(' · ') || 'Sin información adicional',
      type: form.category,
      quantity,
      minimum,
      stock: `${quantity} ${form.unit}`,
      level,
      status: quantity <= minimum ? 'Stock bajo' : 'Disponible',
      tone: page === 'parts' ? 'amber' : 'green',
    })
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className={`modal modal-${page}`} onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-head">
          <div className="modal-heading">
            <div className="modal-type-icon"><Icon name={config.icon} /></div>
            <div><small>{config.eyebrow}</small><h2>{config.title}</h2><p>{config.description}</p></div>
          </div>
          <button className="icon-btn" type="button" onClick={onClose} aria-label="Cerrar formulario"><Icon name="close" /></button>
        </div>
        <form onSubmit={handleSubmit}>
          {page === 'supplies' && <SupplyFields form={form} updateField={updateField} />}
          {page === 'parts' && <InventoryFields form={form} updateField={updateField} />}
          {page === 'machines' && <MachineFields form={form} updateField={updateField} />}
          <label>Notas<textarea value={form.notes} onChange={(event) => updateField('notes', event.target.value)} placeholder="Añade información relevante..." rows="3" /></label>
          <div className="modal-actions">
            <button type="button" className="secondary" onClick={onClose}>Cancelar</button>
            <button className="primary"><Icon name="plus" size={16} />{config.saveLabel}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
