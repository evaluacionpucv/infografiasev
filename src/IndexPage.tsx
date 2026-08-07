import React, { useState, useMemo } from 'react'
import {
  Microscope, Cpu, Wheat, GraduationCap, Layers,
  ArrowUpRight, Search, LayoutGrid, List, X
} from 'lucide-react'

type Guia = { code: string; key: string; name: string }
type Faculty = { name: string; short: string; icon: React.ComponentType<any>; color: string; guias: Guia[] }

const FACULTIES: Faculty[] = [
  {
    name: "Facultad de Ciencias", short: "Ciencias", icon: Microscope, color: "#3DB9E8",
    guias: [
      { code: 'BIO 1133', key: 'bio1133', name: 'Biología Molecular' },
      { code: 'BIO 250',  key: 'bio250',  name: 'Biología de Microorganismos' },
      { code: 'ECM 610',  key: 'ecm610',  name: 'Reproducción de Peces Marinos' },
      { code: 'KIN 480',  key: 'kin480',  name: 'Agentes Físicos y Regeneración Tisular' },
      { code: 'QUI 234',  key: 'qui234',  name: 'Química Orgánica 2' },
      { code: 'QUI 1526', key: 'qui1526', name: 'Química Aplicada 1' },
    ]
  },
  {
    name: "Facultad de Ingeniería", short: "Ingeniería", icon: Cpu, color: "#E8251C",
    guias: [
      { code: 'EIE 326',  key: 'eie326',  name: 'Teoría de Circuitos 2' },
      { code: 'ICI 3244', key: 'ici3244', name: 'Inteligencia Artificial' },
      { code: 'TRA 491',  key: 'tra491',  name: 'Modelos de Transporte' },
    ]
  },
  {
    name: "Facultad de Ciencias Agronómicas y de los Alimentos", short: "Agronomía", icon: Wheat, color: "#00B2C8",
    guias: [
      { code: 'AGR 475', key: 'agr475', name: 'Dirección de Empresas' },
      { code: 'ALI 498', key: 'ali498', name: 'Compuestos Bioactivos en los Alimentos' },
    ]
  },
  {
    name: "Facultad de Filosofía y Educación", short: "Filosofía y Educación", icon: GraduationCap, color: "#F4C318",
    guias: [
      { code: 'ART 155',  key: 'art155',  name: 'Taller de Poesía' },
      { code: 'ING 9001', key: 'ing9001', name: 'Inglés I (Beginner)' },
      { code: 'LCL 213',  key: 'lcl213',  name: 'Gramática Descriptiva 1' },
    ]
  },
  {
    name: "Otras Unidades Académicas", short: "Otras", icon: Layers, color: "#7B4CB8",
    guias: [
      { code: 'DER 1021', key: 'der1021', name: 'Familia y Patrimonio en el Derecho Romano · Escuela de Derecho' },
      { code: 'GEO 1052', key: 'geo1052', name: 'Geografía Urbana y Metropolitana · Cs. del Mar y Geografía' },
      { code: 'MAT 1004', key: 'mat1004', name: 'Álgebra Lineal · Instituto de Matemáticas' },
      { code: 'MUS 2438', key: 'mus2438', name: 'Acústica y Organología · Instituto de Música' },
      { code: 'PER 1125', key: 'per1125', name: 'Pensamiento Político Contemporáneo · Escuela de Periodismo' },
      { code: 'TSL 271',  key: 'tsl271',  name: 'Teoría Política · Cs. Económicas y Administrativas' },
    ]
  },
]

FACULTIES.forEach(f => f.guias.sort((a, b) => a.code.localeCompare(b.code)))

const TOTAL = FACULTIES.reduce((n, f) => n + f.guias.length, 0)

const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

export default function IndexPage() {
  const [query, setQuery] = useState('')
  const [activeFac, setActiveFac] = useState<string | null>(null)
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const filtered = useMemo(() => {
    const q = norm(query.trim())
    return FACULTIES
      .filter(f => !activeFac || f.name === activeFac)
      .map(f => ({
        ...f,
        guias: f.guias.filter(g =>
          !q || norm(g.name).includes(q) || norm(g.code).includes(q)
        )
      }))
      .filter(f => f.guias.length > 0)
  }, [query, activeFac])

  const shownCount = filtered.reduce((n, f) => n + f.guias.length, 0)

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <style>{`
        @keyframes cardIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .card-in { animation: cardIn 0.35s cubic-bezier(0.2,0,0,1) both; }
        .fade-swap { animation: cardIn 0.25s ease both; }
      `}</style>

      {/* Franja superior */}
      <div className="h-1.5 w-full flex">
        {['#E8251C','#F4C318','#3DB9E8','#7B4CB8','#00B2C8'].map(c => (
          <div key={c} className="flex-1" style={{ backgroundColor: c }} />
        ))}
      </div>

      {/* HEADER */}
      <header className="px-6 md:px-12 pt-10 pb-6 border-b border-slate-100">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="shrink-0">
            <div className="flex items-center gap-1.5 mb-1.5">
              {['#E8251C','#F4C318','#3DB9E8','#7B4CB8'].map(c => (
                <span key={c} className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: c }} />
              ))}
            </div>
            <p className="font-black text-slate-900 text-base leading-tight">Desarrollo Docente</p>
            <p className="font-bold text-slate-400 text-[11px] tracking-widest">PUCV</p>
          </div>
          <div className="hidden sm:block w-px self-stretch bg-slate-100 shrink-0" />
          <div className="flex-1">
            <p className="text-slate-400 text-[11px] font-bold tracking-[0.15em] uppercase mb-1">
              Dirección de Desarrollo Docente · PUCV
            </p>
            <h1 className="text-slate-900 text-2xl md:text-[28px] font-black leading-tight tracking-tight">
              Guías Interactivas de Evaluación
            </h1>
            <p className="text-slate-500 text-sm mt-2 max-w-2xl leading-relaxed">
              Colección de {TOTAL} guías de alineación evaluativa para pregrado: del Perfil de Egreso
              a los instrumentos concretos de evaluación.
            </p>
          </div>
        </div>
      </header>

      {/* CONTROLES: buscador + vista */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-100 px-6 md:px-12 py-3">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-3">
          {/* Buscador */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar por asignatura o código…"
              className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#00A6B5] focus:ring-2 focus:ring-[#00A6B5]/15 transition"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Limpiar búsqueda"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Selector de vista */}
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 self-start md:self-auto shrink-0">
            <button
              onClick={() => setView('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition ${view === 'grid' ? 'bg-white text-[#002D56] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <LayoutGrid size={14} /> Tarjetas
            </button>
            <button
              onClick={() => setView('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition ${view === 'list' ? 'bg-white text-[#002D56] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <List size={14} /> Lista
            </button>
          </div>
        </div>

        {/* Chips de facultad */}
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-2 mt-3">
          <button
            onClick={() => setActiveFac(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${!activeFac ? 'bg-[#002D56] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            Todas
          </button>
          {FACULTIES.map(f => {
            const on = activeFac === f.name
            return (
              <button
                key={f.name}
                onClick={() => setActiveFac(on ? null : f.name)}
                className="px-3 py-1.5 rounded-full text-xs font-bold transition"
                style={on
                  ? { backgroundColor: f.color, color: '#fff' }
                  : { backgroundColor: f.color + '18', color: '#334155' }}
              >
                {f.short}
              </button>
            )
          })}
          <span className="ml-auto text-xs text-slate-400 font-semibold">
            {shownCount} {shownCount === 1 ? 'guía' : 'guías'}
          </span>
        </div>
      </div>

      {/* CONTENIDO */}
      <main className="px-6 md:px-12 py-8 max-w-6xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-20 fade-swap">
            <p className="text-slate-400 text-sm">No se encontraron guías para “{query}”.</p>
            <button
              onClick={() => { setQuery(''); setActiveFac(null) }}
              className="mt-3 text-xs font-bold text-[#00A6B5] hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="space-y-10" key={view + (activeFac ?? '') + query}>
            {filtered.map(f => {
              const Icon = f.icon
              return (
                <section key={f.name} className="fade-swap">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: f.color + '1A' }}>
                      <Icon size={14} style={{ color: f.color }} strokeWidth={2.5} />
                    </div>
                    <h2 className="text-slate-700 text-[13px] font-bold tracking-wide">{f.name}</h2>
                    <div className="h-px flex-1 bg-slate-100" />
                    <span className="text-[11px] text-slate-400 font-semibold">{f.guias.length}</span>
                  </div>

                  {view === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {f.guias.map((g, i) => (
                        <a
                          key={g.key}
                          href={`#/${g.key}`}
                          className="card-in group relative flex flex-col justify-between bg-white border border-slate-200 rounded-xl p-4 pr-9 transition-all duration-150 hover:border-slate-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-1"
                          style={{ animationDelay: `${i * 40}ms` }}
                        >
                          <div>
                            <span className="block text-[10px] font-black tracking-widest mb-1" style={{ color: f.color }}>{g.code}</span>
                            <span className="block text-slate-800 text-sm font-semibold leading-snug">{g.name}</span>
                          </div>
                          <ArrowUpRight size={15} strokeWidth={2.5} className="absolute top-4 right-3.5 text-slate-300 group-hover:text-[#00A6B5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                      {f.guias.map((g, i) => (
                        <a
                          key={g.key}
                          href={`#/${g.key}`}
                          className="card-in group flex items-center gap-4 px-4 py-3 hover:bg-slate-50 transition-colors"
                          style={{ animationDelay: `${i * 30}ms` }}
                        >
                          <span className="text-[10px] font-black tracking-widest w-20 shrink-0" style={{ color: f.color }}>{g.code}</span>
                          <span className="flex-1 text-slate-800 text-sm font-semibold">{g.name}</span>
                          <ArrowUpRight size={15} strokeWidth={2.5} className="text-slate-300 group-hover:text-[#00A6B5] transition-colors shrink-0" />
                        </a>
                      ))}
                    </div>
                  )}
                </section>
              )
            })}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-100 px-6 md:px-12 py-8 mt-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-slate-400 text-xs">
            Dirección de Desarrollo Docente · Pontificia Universidad Católica de Valparaíso
          </p>
          <a href="https://desarrollodocente.pucv.cl" className="text-xs font-semibold hover:underline" style={{ color: '#002D56' }}>
            desarrollodocente.pucv.cl ↗
          </a>
        </div>
      </footer>
    </div>
  )
}
