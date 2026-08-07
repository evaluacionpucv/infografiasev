import React from 'react'

export function LogoMark({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M 50,50 L 50,0 A 50,50 0 0,0 0,50 Z" fill="#3DAEE8" />
      <path d="M 50,50 L 100,50 A 50,50 0 0,0 50,0 Z" fill="#FF5A2E" />
      <path d="M 50,50 L 0,50 A 50,50 0 0,0 50,100 Z" fill="#1C6FA0" />
      <path d="M 50,50 L 50,100 A 50,50 0 0,0 100,50 Z" fill="#D1134C" />
    </svg>
  )
}

export function LogoWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <LogoMark size={compact ? 36 : 44} />
      <div className="leading-[1.05]">
        <p className="font-black text-slate-900" style={{ fontSize: compact ? 16 : 19 }}>Desarrollo</p>
        <p className="font-black text-slate-900" style={{ fontSize: compact ? 16 : 19 }}>
          Docente <span className="font-bold text-slate-500" style={{ fontSize: compact ? 9 : 11 }}>PUCV</span>
        </p>
      </div>
    </div>
  )
}
