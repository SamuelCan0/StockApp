import bambuA1ComboImage from '../assets/machines/bambu-a1-combo-optimized.webp'
import crealityK1cImage from '../assets/machines/creality-k1c-optimized.webp'
import ender3ProImage from '../assets/machines/ender-3-pro.webp'

export const navItems = [
  ['dashboard', 'Panel general'],
  ['supplies', 'Insumos'],
  ['machines', 'Máquinas'],
  ['parts', 'Repuestos'],
]

export const inventory = []

export const machines = [
  {
    name: 'Ender 3 Pro',
    model: 'Creality · FDM',
    status: 'Operativa',
    hours: '0 h',
    next: 'Sin programar',
    progress: 0,
    image: ender3ProImage,
  },
  {
    name: 'Creality K1C',
    model: 'Creality · CoreXY',
    status: 'Operativa',
    hours: '0 h',
    next: 'Sin programar',
    progress: 0,
    image: crealityK1cImage,
  },
  {
    name: 'Bambu Lab A1 Combo',
    model: 'Bambu Lab · AMS Lite',
    status: 'Operativa',
    hours: '0 h',
    next: 'Sin programar',
    progress: 0,
    image: bambuA1ComboImage,
  },
]

export const parts = []
export const inventorySummary = []
