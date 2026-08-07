import React from 'react'
import {
  Microscope, Cpu, Wheat, GraduationCap, Layers, ArrowUpRight
} from 'lucide-react'

const FACULTIES = [
  {
    name: "Facultad de Ciencias",
    icon: Microscope,
    color: "#3DB9E8",
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
    name: "Facultad de Ingeniería",
    icon: Cpu,
    color: "#E8251C",
    guias: [
      { code: 'EIE 326',  key: 'eie326',  name: 'Teoría de Circuitos 2' },
      { code: 'ICI 3244', key: 'ici3244', name: 'Inteligencia Artificial' },
      { code: 'TRA 491',  key: 'tra491',  name: 'Modelos de Transporte' },
    ]
  },
  {
    name: "Facultad de Ciencias Agronómicas y de los Alimentos",
    icon: Wheat,
    color: "#00B2C8",
    guias: [
      { code: 'AGR 475', key: 'agr475', name: 'Dirección de Empresas' },
      { code: 'ALI 498', key: 'ali498', name: 'Compuestos Bioactivos en los Alimentos' },
    ]
  },
  {
    name: "Facultad de Filosofía y Educación",
    icon: GraduationCap,
    color: "#F4C318",
    guias: [
      { code: 'ART 155',  key: 'art155',  name: 'Taller de Poesía' },
      { code: 'ING 9001', key: 'ing9001', name: 'Inglés I (Beginner)' },
      { code: 'LCL 213',  key: 'lcl213',  name: 'Gramática Descriptiva 1' },
    ]
  },
  {
    name: "Otras Unidades Académicas",
    icon: Layers,
    color: "#7B4CB8",
    guias: [
      { code: 'DER 1021', key: 'der1021', name: 'Familia y Patrimonio en el Derecho Romano — Escuela de Derecho' },
      { code: 'GEO 1052', key: 'geo1052', name: 'Geografía Urbana y Metropolitana — Fac. Ciencias del Mar y Geografía' },
      { code: 'MAT 1004', key: 'mat1004', name: 'Álgebra Lineal — Instituto de Matemáticas' },
      { code: 'MUS 2438', key: 'mus2438', name: 'Acústica y Organología — Instituto de Música' },
      { code: 'PER 1125', key: 'per1125', name: 'Pensamiento Político Contemporáneo — Escuela de Periodismo' },
      { code: 'TSL 271',  key: 'tsl271',  name: 'Teoría Política — Fac. Ciencias Económicas y Administrativas' },
    ]
  },
]

// Ordena los cursos de cada sección alfabéticamente por código
FACULTIES.forEach(f => f.guias.sort((a, b) => a.code.localeCompare(b.code)))

const TOTAL_GUIAS = FACULTIES.reduce((acc, f) => acc + f.guias.length, 0)

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>

      {/* Franja superior de color institucional */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1" style={{ backgroundColor: '#E8251C' }} />
        <div className="flex-1" style={{ backgroundColor: '#F4C318' }} />
        <div className="flex-1" style={{ backgroundColor: '#3DB9E8' }} />
        <div className="flex-1" style={{ backgroundColor: '#7B4CB8' }} />
        <div className="flex-1" style={{ backgroundColor: '#00B2C8' }} />
      </div>

      {/* HEADER */}
      <header className="px-6 md:px-12 pt-10 pb-8 border-b border-slate-100">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center gap-6">

          {/* Wordmark de texto — sin imagen externa */}
          <div className="shrink-0">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#E8251C' }} />
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#F4C318' }} />
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#3DB9E8' }} />
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#7B4CB8' }} />
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
              Colección de {TOTAL_GUIAS} guías de alineación evaluativa para pregrado: del Perfil de Egreso
              a los instrumentos concretos de evaluación, organizadas por unidad académica.
            </p>
          </div>

          <div className="flex sm:flex-col gap-4 sm:gap-1 sm:text-right shrink-0">
            <div>
              <span className="text-3xl font-black tabular-nums" style={{ color: '#002D56' }}>{TOTAL_GUIAS}</span>
              <span className="text-slate-400 text-xs font-semibold ml-1.5">asignaturas</span>
            </div>
            <div>
              <span className="text-3xl font-black tabular-nums" style={{ color: '#002D56' }}>{FACULTIES.length}</span>
              <span className="text-slate-400 text-xs font-semibold ml-1.5">unidades</span>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="px-6 md:px-12 py-10 max-w-6xl mx-auto">
        <div className="space-y-12">
          {FACULTIES.map((f) => {
            const Icon = f.icon
            return (
              <section key={f.name}>
                <div className="flex items-center gap-2.5 mb-4">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: f.color + '1A' }}
                  >
                    <Icon size={14} style={{ color: f.color }} strokeWidth={2.5} />
                  </div>
                  <h2 className="text-slate-700 text-[13px] font-bold tracking-wide">
                    {f.name}
                  </h2>
                  <div className="h-px flex-1 bg-slate-100" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {f.guias.map((g) => (
                    <a
                      key={g.key}
                      href={`#/${g.key}`}
                      className="group relative flex flex-col justify-between bg-white border border-slate-200 rounded-xl p-4 pr-9 transition-all duration-150 hover:border-slate-300 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
                    >
                      <div>
                        <span
                          className="block text-[10px] font-black tracking-widest mb-1"
                          style={{ color: f.color }}
                        >
                          {g.code}
                        </span>
                        <span className="block text-slate-800 text-sm font-semibold leading-snug">
                          {g.name}
                        </span>
                      </div>
                      <ArrowUpRight
                        size={15}
                        strokeWidth={2.5}
                        className="absolute top-4 right-3.5 text-slate-300 group-hover:text-slate-500 transition-colors"
                      />
                    </a>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-100 px-6 md:px-12 py-8 mt-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-slate-400 text-xs">
            Dirección de Desarrollo Docente · Pontificia Universidad Católica de Valparaíso
          </p>
          <a
            href="https://desarrollodocente.pucv.cl"
            className="text-xs font-semibold hover:underline"
            style={{ color: '#002D56' }}
          >
            desarrollodocente.pucv.cl ↗
          </a>
        </div>
      </footer>
    </div>
  )
}
