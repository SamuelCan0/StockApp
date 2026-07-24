import { useEffect, useState } from 'react'
import { RecordModal } from './components/RecordModal'
import { Sidebar } from './components/Sidebar'
import { machines as initialMachines } from './data/mockData'
import { DashboardPage } from './pages/DashboardPage'
import { InventoryPage } from './pages/InventoryPage'
import { MachinesPage } from './pages/MachinesPage'
import './App.css'

function useStoredState(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

function normalizeSupply(item) {
  return {
    ...item,
    id: item.id ?? item.name ?? 'insumo-sin-id',
    type: item.type ?? 'Filamento',
    material: item.material ?? item.name ?? 'Sin especificar',
    color: item.color ?? 'Sin especificar',
    brand: item.brand ?? 'Sin especificar',
    presentation: item.presentation ?? item.stock ?? 'Sin especificar',
    condition: item.condition ?? (Number(item.quantity) > 0 ? 'Disponible' : 'Agotado'),
    quantity: Number(item.quantity ?? 0),
    status: item.status ?? (Number(item.quantity) > 0 ? 'Disponible' : 'Stock bajo'),
  }
}

export default function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [supplies, setSupplies] = useStoredState('stockapp-supplies', [])
  const [machines, setMachines] = useStoredState('stockapp-machines', initialMachines)
  const [parts, setParts] = useStoredState('stockapp-parts', [])
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('stockapp-theme')
    if (savedTheme) return savedTheme
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  function toggleTheme() {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light'
      localStorage.setItem('stockapp-theme', nextTheme)
      return nextTheme
    })
  }

  function saveRecord(record) {
    const setters = {
      supplies: setSupplies,
      machines: setMachines,
      parts: setParts,
    }

    setters[activePage]?.((currentRecords) => [record, ...currentRecords])
    setIsModalOpen(false)
  }

  function deleteRecord(type, id) {
    const setters = {
      supplies: setSupplies,
      machines: setMachines,
      parts: setParts,
    }

    setters[type]((currentRecords) => currentRecords.filter((record) => (record.id ?? record.name) !== id))
  }

  const pageProps = {
    onAdd: () => setIsModalOpen(true),
    theme,
    onToggleTheme: toggleTheme,
  }

  const pages = {
    dashboard: <DashboardPage {...pageProps} machines={machines} supplies={supplies} parts={parts} onNavigate={setActivePage} />,
    supplies: <InventoryPage {...pageProps} kind="supplies" items={supplies.map(normalizeSupply)} onDelete={(id) => deleteRecord('supplies', id)} />,
    machines: <MachinesPage {...pageProps} machines={machines} onDelete={(id) => deleteRecord('machines', id)} />,
    parts: <InventoryPage {...pageProps} kind="parts" items={parts} onDelete={(id) => deleteRecord('parts', id)} />,
  }

  return (
    <div className="app-shell" data-theme={theme}>
      <Sidebar active={activePage} onNavigate={setActivePage} />
      <main>{pages[activePage]}</main>
      {isModalOpen && <RecordModal page={activePage} onSave={saveRecord} onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}
