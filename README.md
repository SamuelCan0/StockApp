# StockApp

StockApp es una aplicación para centralizar el control de inventario y mantenimiento de un taller de impresión 3D.

Su propósito es permitir conocer de forma rápida qué materiales, máquinas y repuestos están disponibles, en qué cantidad se encuentran y cuándo es necesario reabastecerlos o realizar mantenimiento.

## Problema que busca resolver

En un taller de impresión 3D, la información suele estar repartida entre hojas de cálculo, notas o registros informales. Esto dificulta responder preguntas como:

- ¿Cuánto filamento queda disponible?
- ¿Qué materiales necesitan reabastecimiento?
- ¿Qué impresoras están operativas, en mantenimiento o fuera de servicio?
- ¿Qué repuestos hay disponibles y con qué máquinas son compatibles?
- ¿Cuándo se realizó el último mantenimiento de una máquina?

StockApp busca reunir esta información en un solo lugar y mantener un historial confiable de los cambios.

## Módulos principales

### Insumos

Control de los materiales utilizados durante la impresión y el funcionamiento del taller.

- Filamentos por tipo, color, marca y diámetro.
- Cantidad disponible y unidad de medida.
- Ubicación física del material.
- Nivel mínimo de stock.
- Entradas, salidas y ajustes de inventario.
- Alertas de bajo inventario.

### Máquinas

Registro y seguimiento de las impresoras 3D y otros equipos.

- Nombre, modelo, fabricante y número de serie.
- Estado: operativa, en mantenimiento o fuera de servicio.
- Ubicación.
- Horas de uso.
- Historial y próxima fecha de mantenimiento.
- Notas o incidencias.

### Repuestos

Inventario de piezas destinadas a reparación o mantenimiento.

- Nombre, categoría y número de parte.
- Cantidad disponible.
- Ubicación física.
- Compatibilidad con una o varias máquinas.
- Nivel mínimo de stock.
- Historial de entradas y salidas.

## MVP propuesto

La primera versión debería enfocarse en:

1. Crear, consultar, editar y eliminar insumos, máquinas y repuestos.
2. Registrar entradas y salidas de materiales y repuestos.
3. Mostrar existencias actuales y alertas de stock bajo.
4. Consultar el estado de cada máquina.
5. Registrar mantenimientos básicos e incidencias.
6. Buscar y filtrar los registros.
7. Mostrar un panel con los indicadores más importantes.

## Ideas para versiones futuras

- Consumo de material por trabajo de impresión.
- Cálculo del costo de cada impresión.
- Lectura de códigos QR o de barras.
- Registro de proveedores y órdenes de compra.
- Notificaciones de mantenimiento y reabastecimiento.
- Roles de usuario y trazabilidad de cambios.
- Importación y exportación mediante CSV.
- Reportes de consumo, costos y fallas frecuentes.

## Estado del proyecto

El proyecto se encuentra en una etapa inicial de definición. Actualmente contiene la base de una aplicación creada con React y Vite; los módulos descritos en este documento forman parte del alcance propuesto y todavía deben implementarse.

## Tecnologías actuales

- React
- Vite
- JavaScript
- Oxlint

## Desarrollo local

Requisitos:

- Node.js
- npm

Instala las dependencias y ejecuta el servidor de desarrollo:

```bash
npm install
npm run dev
```

Otros comandos disponibles:

```bash
npm run build
npm run lint
npm run preview
```

## Visión

Convertir StockApp en la fuente central de información del taller, reduciendo faltantes inesperados, tiempos muertos y pérdidas de material mediante un inventario claro, actualizado y fácil de usar.
