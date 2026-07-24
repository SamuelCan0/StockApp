const paths = {
  dashboard: 'M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z',
  supplies: 'M7 3h10v4l2 3v11H5V10l2-3V3Zm0 8h10M9 3v4h6V3',
  machines: 'M4 17h16v4H4v-4Zm2 0V7h12v10M8 3h8v4H8V3Zm2 8h4v2h-4v-2Z',
  parts: 'M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  search: 'M21 21l-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z',
  plus: 'M12 5v14m-7-7h14',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Zm-8 13h4',
  chevron: 'm9 18 6-6-6-6',
  more: 'M5 12h.01M12 12h.01M19 12h.01',
  box: 'm21 8-9 5-9-5m9 5v9M5 6.5 12 3l7 3.5v11L12 21l-7-3.5v-11Z',
  alert: 'M12 9v4m0 4h.01M10.3 3.8 2.5 17.3A2 2 0 0 0 4.2 20h15.6a2 2 0 0 0 1.7-2.7L13.7 3.8a2 2 0 0 0-3.4 0Z',
  wrench: 'M14.7 6.3a4 4 0 0 0-5-5L12 3.6 9.6 6 7.3 3.7a4 4 0 0 0 5 5l-8.7 8.7a2.1 2.1 0 0 0 3 3l8.7-8.7a4 4 0 0 0 5-5L18 9l-2.4-2.4L18 4.3a4 4 0 0 0-3.3 2Z',
  close: 'M18 6 6 18M6 6l12 12',
  sun: 'M12 3V1m0 22v-2m9-9h2M1 12h2m16.36-7.36 1.42-1.42M3.22 20.78l1.42-1.42m14.72 0 1.42 1.42M3.22 3.22l1.42 1.42M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z',
  moon: 'M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z',
  trash: 'M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7m4 4v6m4-6v6',
}

export function Icon({ name, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  )
}
