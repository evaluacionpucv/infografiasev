import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  Info,
  RotateCcw,
  BookOpen,
  X,
  Target,
  CheckCircle2,
  Search,
  BookMarked,
  ClipboardCheck,
  MousePointerClick,
  ChevronLeft,
  Mail,
  ExternalLink,
  Eye,
  ChevronUp,
  Lightbulb
} from 'lucide-react';

/* ============================================================
 *  TIPOS E INTERFACES
 * ============================================================ */
interface ModalItem { label: string; content: string; }
interface ModalContent { title: string; subtitle: string; items: ModalItem[]; }
interface RubricaCriterio { criterio: string; niveles: string[]; }
interface Rubrica { title: string; subtitle: string; niveles: string[]; criterios: RubricaCriterio[]; }
interface Instrument { name: string; source: string; desc: string; modalContent?: ModalContent; rubrica?: Rubrica; }
interface PerfilCompetencia { codigo: string; texto: string; }
interface CourseDimension {
  id: number;
  proposito: string;
  contexto?: string | null;
  aplicacionTitle: string;
  aplicacionDesc: string;
  ejemplo?: string | null;
  competencias?: PerfilCompetencia[] | null;
  examples?: Instrument[] | null;
}
interface CourseReference { category: string; cite: string; }
interface Course {
  code: string;
  section?: string;
  name: string;
  unit: string;
  intro: string;
  dimensions: CourseDimension[];
  references: CourseReference[];
}
interface Ring {
  id: number;
  title: string;
  short: string;
  inner: number;
  outer: number;
  color: string;
  textColor: string;
  fontSize: number;
  icon: React.ReactNode;
}

/* ============================================================
 *  DATOS DE LA ASIGNATURA
 *  (ÚNICA sección que cambia entre guías. La estructura,
 *   geometría, colores e interfaz son idénticas en todas.)
 * ============================================================ */
const course: Course = {
  "code": "KIN 480",
  "section": "01",
  "name": "Agentes Físicos y Regeneración Tisular en Rehabilitación Músculo-Esquelética",
  "unit": "Escuela de Kinesiología · Facultad de Ciencias",
  "intro": "Asignatura optativa de 7.º–8.º semestre que profundiza en el uso de agentes físicos —láser, ondas cortas, ultrasonido, electroterapia y termoterapia— aplicados a la rehabilitación de lesiones músculo-esqueléticas. Integra los mecanismos de reparación y regeneración tisular con la selección clínica fundamentada de cada modalidad, avanzando hasta la planificación de intervenciones en las tres fases de la rehabilitación. Cupo máximo de 16 estudiantes, con clases teóricas, laboratorio de fisioterapia y práctica clínica en centros de la Escuela.",
  "dimensions": [
    {
      "id": 1,
      "proposito": "El Perfil de Egreso del Kinesiólogo exige un profesional capaz de identificar problemas de salud músculo-esquelética, diagnosticar disfunciones de la motricidad desde una perspectiva biopsicosocial y aplicar metodologías de tratamiento y seguimiento a distintos grupos etarios. KIN 480 profundiza en la herramienta fisioterapéutica: sin comprender los mecanismos tisulares que subyacen a cada agente físico, el kinesiólogo aplica protocolos de forma mecánica sin poder adaptarlos al caso clínico real.",
      "contexto": "Al ser optativa y de ciclo avanzado, quienes la cursan ya dominan la fisioterapia básica (prerequisito KIN 432). El desafío evaluativo no es verificar si conocen los agentes físicos, sino si pueden seleccionarlos y ajustarlos con criterio clínico ante cuadros complejos.",
      "aplicacionTitle": "¿Cómo lo aplico en mi asignatura?",
      "aplicacionDesc": "Diseñe las evaluaciones con casos clínicos que no tengan una sola respuesta correcta: una lesión tendinosa en fase subaguda puede abordarse con más de un agente físico. El estudiante debe justificar su elección desde la fisiopatología, no solo desde el protocolo estándar. Eso es lo que distingue al profesional del técnico.",
      "ejemplo": null,
      "examples": null,
      "competencias": [
        {
          "codigo": "C-ID",
          "texto": "Identifica problemas de salud músculo-esquelética y diagnostica disfunciones de la motricidad desde una perspectiva biopsicosocial."
        },
        {
          "codigo": "C-TR",
          "texto": "Aplica metodologías de tratamiento y seguimiento a distintos grupos etarios."
        },
        {
          "codigo": "C-AF",
          "texto": "Fundamenta la selección de agentes físicos en los mecanismos de reparación y regeneración tisular."
        }
      ]
    },
    {
      "id": 2,
      "proposito": "Las competencias de la asignatura se orientan a seleccionar, aplicar e integrar agentes físicos electromagnéticos y de electroterapia en la rehabilitación músculo-esquelética, fundamentando cada decisión clínica en los mecanismos tisulares y las fases del proceso rehabilitador. Se demuestran en tres planos (conceptual, técnico y clínico integrador) y tributan simultáneamente a varias competencias del perfil del kinesiólogo.",
      "contexto": "La asignatura abarca tres unidades que escalan en complejidad: de la fisiopatología tisular (Unidad 1) a los agentes físicos específicos (Unidad 2) y a su integración en un plan de rehabilitación completo por fases (Unidad 3). La competencia solo se evidencia completa en la Unidad 3.",
      "aplicacionTitle": "¿Cómo lo aplico en mi asignatura?",
      "aplicacionDesc": "Conecte explícitamente cada unidad con su evaluación correspondiente desde el inicio del semestre. La Unidad 3 es la de mayor complejidad clínica y la que más peso tiene en el perfil de egreso; el trabajo grupal y la prueba práctica deben reflejar esa complejidad, no limitarse a demostrar técnica de aplicación.",
      "ejemplo": null,
      "examples": null
    },
    {
      "id": 3,
      "proposito": "Los Resultados de Aprendizaje son declaraciones de lo que se espera que el estudiante conozca, comprenda y sea capaz de hacer al finalizar un periodo de aprendizaje. Dan cuenta del saber conceptual, procedimental y actitudinal, y expresan el desempeño de una competencia o de una porción de ella. Operan como el puente entre las competencias del perfil y las evaluaciones concretas de la asignatura.",
      "contexto": "RA2 y RA5 son los de mayor complejidad clínica y los que mejor discriminan el logro real de la competencia. RA6 incorpora la dimensión ética y de respeto al usuario, que el programa de la carrera subraya explícitamente en sus competencias genéricas.",
      "aplicacionTitle": "¿Cómo lo aplico en mi asignatura?",
      "aplicacionDesc": "La prueba práctica es la instancia natural para evidenciar RA3 y RA6 simultáneamente: el estudiante no solo aplica el agente físico con técnica correcta, sino que también explica al 'usuario' (par que hace de paciente) el procedimiento, verifica contraindicaciones y obtiene consentimiento. Diseñe el protocolo de la prueba para que eso quede registrado.",
      "ejemplo": null,
      "examples": null
    },
    {
      "id": 4,
      "proposito": "KIN 480 usa cuatro procedimientos sumativos: Prueba escrita Unidad 1 (25%) para evaluar comprensión de los mecanismos fisiopatológicos y tisulares; Prueba escrita Unidad 2 (30%) para evaluar conocimiento de los agentes físicos específicos y sus indicaciones; Prueba práctica Unidad 3 (25%) para evaluar la aplicación técnica e integración clínica; y Trabajo grupal (20%) para evaluar la capacidad de analizar literatura científica y proponer un abordaje clínico fundamentado. Además, una interrogación oral formativa sin ponderación en nota.",
      "contexto": "La nota final pondera 60% las evaluaciones parciales y 40% el examen final. Con cupo de 16 estudiantes, el docente puede hacer un seguimiento más cercano del proceso, lo que hace especialmente valiosa la interrogación formativa como instrumento de retroalimentación personalizada.",
      "aplicacionTitle": "¿Cómo lo aplico en mi asignatura?",
      "aplicacionDesc": "Aproveche el cupo reducido para usar la interrogación oral formativa como espacio de retroalimentación individual antes del examen final. No asignarle nota no significa que no sea estratégica: es el momento para identificar qué estudiantes tienen vacíos en la integración clínica y orientarlos antes de que ese vacío se refleje en el examen.",
      "ejemplo": null,
      "examples": null
    },
    {
      "id": 5,
      "proposito": "Los criterios de evaluación de KIN 480 deben capturar tanto la solidez del fundamento teórico como la pertinencia clínica de las decisiones. Para las pruebas escritas: exactitud en la descripción fisiopatológica, coherencia entre el agente físico seleccionado y la fase del tejido, y justificación de indicaciones y contraindicaciones. Para la prueba práctica: corrección técnica de la aplicación, parámetros adecuados al cuadro clínico, comunicación con el usuario y gestión de seguridad. Para el trabajo grupal: calidad del análisis de la evidencia científica, pertinencia del plan de intervención propuesto y claridad de la exposición oral.",
      "contexto": "El criterio de 'selección apropiada' (RA2) es el más difícil de evaluar porque admite más de una respuesta correcta. La rúbrica debe evaluar la calidad de la justificación, no si el agente elegido coincide con el del docente.",
      "aplicacionTitle": "¿Cómo lo aplico en mi asignatura?",
      "aplicacionDesc": "Para las pruebas escritas con casos clínicos, incluya en la pauta un rango de respuestas aceptables con su justificación, no una única respuesta correcta. Para la prueba práctica, calibre a los evaluadores con un video de referencia antes de la evaluación para asegurar consistencia en la observación de la técnica.",
      "ejemplo": null,
      "examples": null
    },
    {
      "id": 6,
      "proposito": "Los instrumentos de KIN 480 deben operar en los tres planos de la competencia: teórico, técnico y clínico integrador. El diseño de cada instrumento debe reflejar el nivel de complejidad creciente de las tres unidades y la naturaleza clínica de la disciplina.",
      "contexto": null,
      "aplicacionTitle": "Herramientas Sugeridas para el Docente",
      "aplicacionDesc": "Instrumentos diseñados para las cuatro evaluaciones sumativas de KIN 480, adaptados a la naturaleza clínica de la kinesiología y al cupo reducido de la asignatura:",
      "ejemplo": null,
      "examples": [
        {
          "name": "Pauta de Caso Clínico: Pruebas Escritas Unidades 1 y 2",
          "source": "(Sugerencia para Evaluaciones 1 y 2 — 25% y 30%)",
          "desc": "Estructura la evaluación en torno a un caso clínico con preguntas que escalan desde la comprensión tisular hasta la selección fundamentada del agente físico. Admite múltiples respuestas correctas valorando la calidad de la justificación.",
          "modalContent": {
            "title": "Pauta de Caso Clínico: Agentes Físicos y Tejido",
            "subtitle": "Evalúa razonamiento clínico, no solo memorización de protocolos.",
            "items": [
              {
                "label": "Análisis tisular y fisiopatológico (30%)",
                "content": "Logrado: Identifica correctamente la fase del proceso inflamatorio o regenerativo del tejido afectado, describe sus características fisiopatológicas y las relaciona con las manifestaciones clínicas del caso.\nParcial: Identifica la fase pero no relaciona las características tisulares con el cuadro clínico presentado o confunde fases del proceso regenerativo."
              },
              {
                "label": "Selección y justificación del agente físico (45%)",
                "content": "Logrado: Selecciona uno o más agentes físicos pertinentes para la fase tisular del caso, justifica la elección desde los mecanismos de acción propuestos y señala al menos una contraindicación relevante.\nParcial: Selecciona un agente apropiado pero la justificación es superficial o basada solo en el diagnóstico sin relacionarlo con la fisiopatología tisular específica."
              },
              {
                "label": "Parámetros de aplicación y consideraciones de seguridad (25%)",
                "content": "Logrado: Propone parámetros de aplicación coherentes con el cuadro clínico (dosimetría, tiempo, frecuencia), identifica precauciones y contraindicaciones absolutas y relativas para el caso.\nParcial: Los parámetros propuestos son genéricos o no están ajustados a la fase tisular y condición del usuario del caso clínico."
              }
            ]
          }
        },
        {
          "name": "Rúbrica de Prueba Práctica: Aplicación de Agente Físico",
          "source": "(Sugerencia para Evaluación 3 — 25%)",
          "desc": "Evalúa la aplicación técnica de un agente físico ante un caso clínico asignado en el momento de la evaluación. Cubre la preparación del usuario, la técnica de aplicación, el ajuste de parámetros y la comunicación clínica. Aplicable a cualquier agente de la Unidad 2.",
          "rubrica": {
            "title": "Rúbrica: Prueba Práctica de Agente Físico",
            "subtitle": "Tres dimensiones para evaluar técnica, juicio clínico y comunicación.",
            "niveles": [
              "Destacado",
              "Competente",
              "En desarrollo",
              "Incipiente"
            ],
            "criterios": [
              {
                "criterio": "Preparación, verificación y posicionamiento del usuario (25%)",
                "niveles": [
                  "Verifica contraindicaciones, posiciona correctamente al usuario, prepara la zona y explica el procedimiento con lenguaje comprensible.",
                  "Verifica contraindicaciones y posiciona adecuadamente, con explicación algo incompleta.",
                  "Realiza la preparación con omisiones; el posicionamiento requiere corrección.",
                  "Inicia la aplicación sin verificar contraindicaciones ni explicar el procedimiento."
                ]
              },
              {
                "criterio": "Técnica de aplicación y ajuste de parámetros (50%)",
                "niveles": [
                  "Aplica el agente con técnica correcta y ajusta los parámetros de forma coherente con la fase tisular del caso.",
                  "Aplica el agente correctamente con ajuste de parámetros mayormente pertinente.",
                  "La técnica es reconocible pero con errores en parámetros o manejo del equipo que afectan la efectividad.",
                  "La técnica o los parámetros comprometen la efectividad o la seguridad del tratamiento."
                ]
              },
              {
                "criterio": "Monitoreo, respuesta del usuario y registro (25%)",
                "niveles": [
                  "Monitorea al usuario, pregunta por sensaciones, ajusta el protocolo si corresponde y registra parámetros y respuesta.",
                  "Monitorea al usuario y registra los parámetros, con seguimiento algo incompleto.",
                  "Monitorea de forma intermitente o registra parcialmente los parámetros.",
                  "Aplica el agente sin monitorear al usuario ni registrar los parámetros."
                ]
              }
            ]
          }
        },
        {
          "name": "Rúbrica de Trabajo Grupal: Abordaje Clínico con Evidencia Científica",
          "source": "(Sugerencia para Evaluación 4 — 20%)",
          "desc": "Los grupos seleccionan un artículo científico sobre un agente físico en rehabilitación músculo-esquelética, analizan la evidencia y proponen un plan de intervención para un caso clínico relacionado. Evalúa análisis crítico de literatura, pertinencia clínica y calidad de la exposición oral.",
          "rubrica": {
            "title": "Rúbrica: Trabajo Grupal con Presentación Oral",
            "subtitle": "Evidencia científica, juicio clínico y comunicación académica.",
            "niveles": [
              "Destacado",
              "Competente",
              "En desarrollo",
              "Incipiente"
            ],
            "criterios": [
              {
                "criterio": "Análisis crítico del artículo científico (35%)",
                "niveles": [
                  "Identifica objetivo, diseño, muestra y limitaciones; evalúa la calidad de la evidencia y su aplicabilidad al contexto clínico chileno.",
                  "Analiza el artículo e identifica sus limitaciones principales, con discusión parcial de aplicabilidad.",
                  "Describe el artículo con análisis crítico débil; menciona limitaciones sin profundizar.",
                  "Describe el artículo sin analizarlo críticamente ni cuestionar su diseño."
                ]
              },
              {
                "criterio": "Pertinencia y fundamentación del plan de intervención (40%)",
                "niveles": [
                  "El plan es coherente con la evidencia y las fases de rehabilitación; selecciona el agente con parámetros justificados desde la fisiopatología.",
                  "El plan es pertinente y fundamentado, con justificación parcial de los parámetros.",
                  "El plan se conecta débilmente con la evidencia; parámetros con poca justificación clínica.",
                  "El plan es genérico o no se relaciona con los hallazgos del artículo."
                ]
              },
              {
                "criterio": "Calidad de la exposición oral y manejo de preguntas (25%)",
                "niveles": [
                  "Exposición clara y estructurada; responde con argumentos basados en evidencia y reconoce los límites de la propuesta.",
                  "Exposición clara y responde adecuadamente la mayoría de las preguntas.",
                  "Exposición irregular; responde solo preguntas previstas en el guion.",
                  "Exposición desorganizada; respuestas evasivas ante los cuestionamientos."
                ]
              }
            ]
          }
        }
      ]
    }
  ],
  "references": [
    {
      "category": "Programa Oficial Asignatura",
      "cite": "PUCV (2022). Programa de Asignatura KIN 480-01: Agentes Físicos y Regeneración Tisular en Rehabilitación Músculo-Esquelética. Escuela de Kinesiología, Facultad de Ciencias."
    },
    {
      "category": "Marco Pedagógico e Identidad",
      "cite": "Pontificia Universidad Católica de Valparaíso. Modelo Educativo Institucional. PUCV."
    },
    {
      "category": "Medición y Evaluación",
      "cite": "Secolsky, C. y Denison, D. B. (2012). Handbook on Measurement, Assessment, and Evaluation in Higher Education. Routledge."
    },
    {
      "category": "Evaluación Universitaria",
      "cite": "Sánchez Mendiola, M. y Martínez González, A. (2022). Evaluación y aprendizaje en educación superior: enfoques, métodos e instrumentos. UNAM."
    },
    {
      "category": "Apoyo Docente",
      "cite": "Dirección de Desarrollo Docente PUCV. Guías para la evaluación de aprendizajes complejos y diseño de instrumentos evaluativos. PUCV."
    },
    {
      "category": "Bibliografía obligatoria",
      "cite": "Cameron, M. (2009). Physical Agents in Rehabilitation. Saunders-Elsevier."
    },
    {
      "category": "Bibliografía obligatoria",
      "cite": "Denegar, C., Saliba, E. y Saliba, S. (2010). Therapeutic Modalities for Musculoskeletal Injuries. Human Kinetics."
    },
    {
      "category": "Bibliografía obligatoria",
      "cite": "Albornoz, M., Maya, J. y Toledo, J. (2016). Electroterapia Práctica: Avances en Investigación Clínica. Elsevier."
    },
    {
      "category": "Bibliografía obligatoria",
      "cite": "Watson, T. y Nussbaum, E. (2021). Modalidades en electroterapia: Práctica basada en la evidencia. Elsevier."
    }
  ]
};

/* ============================================================
 *  ESTRUCTURA CANÓNICA DEL MODELO DE ALINEACIÓN EVALUATIVA
 *  (idéntica en las 10 guías: 6 anillos concéntricos, del
 *   Perfil de Egreso en el exterior a los Instrumentos en el centro)
 * ============================================================ */
const RINGS: Ring[] = [
  { id: 1, title: "Perfil de Egreso",            short: "Perfil",         inner: 380, outer: 450, color: "#002D56", textColor: "#ffffff", fontSize: 26, icon: <BookMarked size={28} /> },
  { id: 2, title: "Competencia de Asignatura",   short: "Competencia",    inner: 310, outer: 380, color: "#00A6B5", textColor: "#ffffff", fontSize: 22, icon: <Target size={28} /> },
  { id: 3, title: "Resultados de Aprendizaje",   short: "Resultados",     inner: 240, outer: 310, color: "#5BB381", textColor: "#ffffff", fontSize: 18, icon: <CheckCircle2 size={24} /> },
  { id: 4, title: "Procedimientos de Evaluación", short: "Procedimientos", inner: 170, outer: 240, color: "#F9B233", textColor: "#002D56", fontSize: 15, icon: <Search size={22} /> },
  { id: 5, title: "Criterios de Evaluación",     short: "Criterios",      inner: 100, outer: 170, color: "#F37021", textColor: "#ffffff", fontSize: 13, icon: <Info size={20} /> },
  { id: 6, title: "Instrumentos",                short: "Instrumentos",   inner: 30,  outer: 100, color: "#ED1C24", textColor: "#ffffff", fontSize: 11, icon: <ClipboardCheck size={18} /> }
];

// Texto canónico de uso (describe la interfaz, idéntica en todas las guías)
const TIP_TEXT = "Pulse cada anillo del modelo, desde el exterior (Perfil de Egreso) hacia el centro (Instrumentos). En cada nivel encontrará para qué sirve ese componente y recomendaciones concretas para alinear sus evaluaciones en esta asignatura.";

/* Colores de las columnas de niveles de logro de las rúbricas
   (Destacado → Competente → En desarrollo → Incipiente) */
const NIVEL_COLORS = ["#5BB381", "#00A6B5", "#F9B233", "#F37021"];

// Fusiona la estructura canónica con los datos de la asignatura
const dimensions = RINGS.map((r) => {
  const data = course.dimensions.find((d) => d.id === r.id);
  return { ...r, ...data } as Ring & CourseDimension;
});

/* ============================================================
 *  ESTILOS
 * ============================================================ */
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');
  .font-montserrat { font-family: 'Montserrat', sans-serif; }
  .immersion-transition { transition: transform 0.8s cubic-bezier(0.2, 0, 0, 1), opacity 0.5s ease; }
  .ring-path { transition: all 0.5s ease-in-out; vector-effect: non-scaling-stroke; }
  .custom-scrollbar::-webkit-scrollbar { width: 6px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #00A6B5; }
  @keyframes pulse-soft { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.02); } }
  .animate-pulse-soft { animation: pulse-soft 3s infinite ease-in-out; }
`;

export default function App() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [biblioOpen, setBiblioOpen] = useState<boolean>(false);
  const [selectedInstrumentName, setSelectedInstrumentName] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => { setIsLoaded(true); }, []);

  const getDonutPath = (innerR: number, outerR: number): string => `
    M 0 -${outerR}
    A ${outerR} ${outerR} 0 1 1 0 ${outerR}
    A ${outerR} ${outerR} 0 1 1 0 -${outerR}
    Z
    M 0 -${innerR}
    A ${innerR} ${innerR} 0 1 0 0 ${innerR}
    A ${innerR} ${innerR} 0 1 0 0 -${innerR}
    Z
  `;

  const targetDimension = activeId ? dimensions.find((d) => d.id === activeId) : undefined;
  const scale: number = targetDimension ? Math.min((450 / targetDimension.outer), 3.5) : 1;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedInstrumentName) setSelectedInstrumentName(null);
        else if (biblioOpen) setBiblioOpen(false);
        else setActiveId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedInstrumentName, biblioOpen]);

  const fullCode = course.section ? `${course.code}-${course.section}` : course.code;

  // Agrupa referencias por categoría preservando el orden
  const refGroups: { category: string; items: string[] }[] = [];
  course.references.forEach((r) => {
    let g = refGroups.find((x) => x.category === r.category);
    if (!g) { g = { category: r.category, items: [] }; refGroups.push(g); }
    g.items.push(r.cite);
  });

  return (
    <div className="h-full w-full bg-slate-50 flex flex-col font-montserrat text-slate-800 overflow-hidden select-none">
      <style>{customStyles}</style>

      {/* ENCABEZADO SUPERIOR */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 z-40 shadow-sm shrink-0">
        <div className="flex flex-col items-center md:items-start w-full md:w-auto text-center md:text-left">
          <h1 className="text-[14px] md:text-lg font-black text-[#002D56] flex items-center justify-center md:justify-start gap-2 uppercase tracking-tighter">
            <ClipboardCheck className="text-[#00A6B5]" size={20} />
            ¿Cómo evaluar?: Guía interactiva PUCV
          </h1>
          <span className="text-[10px] md:text-xs font-bold text-slate-500 tracking-[0.1em] md:tracking-[0.2em] uppercase bg-slate-100 px-2 py-0.5 rounded-full mt-1">
            {fullCode} · {course.name}
          </span>
        </div>
        <div className="flex items-center gap-4 md:gap-6 bg-white rounded-lg p-1">
          <img src="https://comunicacionestrategica.pucv.cl/LOGO100/9/cuerpo/cuerpo_color.png" alt="PUCV" className="h-6 md:h-8 object-contain" />
          <div className="w-px h-5 md:h-7 bg-slate-200"></div>
          <img src="https://desarrollodocente.pucv.cl/wp-content/uploads/2023/07/logo_DD.svg" alt="DD" className="h-6 md:h-8 object-contain" />
        </div>
      </header>

      {/* CUERPO PRINCIPAL */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative min-h-0 w-full">

        {/* VISUALIZADOR SVG */}
        <div className="w-full lg:w-7/12 relative flex items-center justify-center p-4 lg:p-8 bg-slate-100/50 h-[40%] min-h-[260px] lg:h-full lg:min-h-full border-b lg:border-b-0 lg:border-r border-slate-200 shrink-0 lg:shrink">
          <svg viewBox="-500 -500 1000 1000" className="w-full h-full drop-shadow-xl overflow-visible">
            <defs>
              {dimensions.map((d) => (
                <path key={`tp-${d.id}`} id={`tp-${d.id}`} d={`M -${(d.inner + d.outer) / 2} 0 A ${(d.inner + d.outer) / 2} ${(d.inner + d.outer) / 2} 0 0 1 ${(d.inner + d.outer) / 2} 0`} />
              ))}
            </defs>

            <g className="immersion-transition" style={{ transform: `scale(${isLoaded ? scale : 0.9})`, transformOrigin: '0px 0px' }}>
              {dimensions.map((d) => {
                const isSelected = activeId === d.id;
                const isDistant = activeId && d.id !== activeId;
                return (
                  <g key={d.id} className="cursor-pointer group" onClick={() => { setActiveId(isSelected ? null : d.id); setSelectedInstrumentName(null); }}>
                    <path d={getDonutPath(d.inner, d.outer)} fill={d.color} className="ring-path transition-all duration-300 hover:brightness-110" stroke={isSelected ? "#ffffff" : "rgba(255,255,255,0.2)"} strokeWidth={isSelected ? 4 : 1} style={{ opacity: isDistant ? 0.3 : 1 }} />
                    <text className="pointer-events-none immersion-transition" fill={d.textColor} fontSize={d.fontSize} fontWeight={isSelected ? "800" : "600"} style={{ opacity: isDistant ? 0.1 : 1, visibility: isSelected || !activeId ? 'visible' : 'hidden' }}>
                      <textPath href={`#tp-${d.id}`} startOffset="50%" textAnchor="middle" dominantBaseline="middle">
                        {d.title.toUpperCase()}
                      </textPath>
                    </text>
                  </g>
                );
              })}
              <circle cx="0" cy="0" r="30" fill="white" />
              <circle cx="0" cy="0" r="20" fill="#002D56" />
            </g>
          </svg>

          {!activeId && (
            <div className="absolute bottom-4 lg:bottom-12 flex flex-col items-center gap-2 animate-pulse-soft pointer-events-none">
              <MousePointerClick className="text-[#00A6B5]" size={28} />
              <span className="text-[10px] lg:text-xs font-black text-slate-500 uppercase tracking-widest bg-white/90 px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm">
                Interactúe con los anillos
              </span>
            </div>
          )}
        </div>

        {/* PANEL LATERAL */}
        <div className="w-full lg:w-5/12 bg-white flex flex-col flex-1 h-full overflow-hidden relative z-10 shadow-[-15px_0_30px_-15px_rgba(0,0,0,0.1)]">
          {activeId && targetDimension ? (
            <div className="flex flex-col h-full animate-in slide-in-from-right-8 duration-500 overflow-hidden">

              {/* Cabecera del panel */}
              <div className="p-5 lg:p-8 border-b border-slate-100 shrink-0 bg-white z-10 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
                <button
                  onClick={() => { setActiveId(null); setSelectedInstrumentName(null); }}
                  className="mb-4 lg:mb-5 flex items-center gap-2 text-[#00A6B5] hover:text-[#002D56] font-extrabold text-[10px] md:text-xs tracking-widest transition-all group uppercase bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-full w-fit"
                >
                  <RotateCcw size={14} className="group-hover:-rotate-180 transition-transform duration-700" />
                  Volver a la vista general
                </button>
                <div className="flex items-center gap-4 lg:gap-5">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center shadow-md text-2xl lg:text-3xl shrink-0" style={{ backgroundColor: targetDimension.color, color: targetDimension.textColor }}>
                    {targetDimension.icon}
                  </div>
                  <div>
                    <h2 className="text-xl lg:text-3xl font-black text-[#002D56] leading-tight mb-1.5 uppercase tracking-tighter line-clamp-2">
                      {targetDimension.title}
                    </h2>
                    <div className="h-1.5 w-12 lg:w-16 rounded-full" style={{ backgroundColor: targetDimension.color }}></div>
                  </div>
                </div>
              </div>

              {/* Contenido desplazable */}
              <div className="flex-1 overflow-y-auto p-5 lg:p-8 custom-scrollbar relative bg-slate-50/30">
                <div className="space-y-6 lg:space-y-8 pb-8">

                  {/* 1. PROPÓSITO */}
                  <section className="relative pl-5 lg:pl-6 border-l-4" style={{ borderLeftColor: targetDimension.color }}>
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">¿Para qué sirve este componente?</h3>
                    <p className="text-slate-700 leading-relaxed font-semibold text-sm lg:text-base whitespace-pre-line">
                      {targetDimension.proposito}
                    </p>
                  </section>

                  {/* COMPETENCIAS DEL PERFIL (solo dimensión 1) */}
                  {targetDimension.competencias && targetDimension.competencias.length > 0 && (
                    <section className="bg-white rounded-2xl p-4 lg:p-5 border border-slate-200 shadow-sm">
                      <h3 className="text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: targetDimension.color }}>
                        <BookMarked size={12} /> Competencias del Perfil de Egreso
                      </h3>
                      <div className="space-y-2.5">
                        {targetDimension.competencias.map((c, idx) => (
                          <div key={idx} className="flex gap-3 items-start">
                            <span className="shrink-0 mt-0.5 px-2 py-0.5 rounded-md text-[10px] font-black text-white tracking-wider" style={{ backgroundColor: targetDimension.color }}>
                              {c.codigo}
                            </span>
                            <p className="text-slate-600 text-xs lg:text-sm leading-relaxed">{c.texto}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* CONTEXTO DEL PROGRAMA (opcional) */}
                  {targetDimension.contexto && (
                    <section className="bg-slate-100/70 rounded-2xl p-4 lg:p-5 border border-slate-200">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                        <BookOpen size={12} /> Contexto en el programa
                      </h3>
                      <p className="text-slate-600 text-xs lg:text-sm leading-relaxed whitespace-pre-line italic">
                        {targetDimension.contexto}
                      </p>
                    </section>
                  )}

                  {/* 2. APLICACIÓN PRÁCTICA */}
                  <section className="bg-white p-5 lg:p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-current opacity-[0.03] rounded-bl-full" style={{ color: targetDimension.color }}></div>
                    <h3 className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: targetDimension.color }}>
                      {targetDimension.aplicacionTitle}
                    </h3>
                    <p className="text-[#002D56] font-bold text-sm lg:text-[15px] leading-relaxed whitespace-pre-line relative z-10">
                      {targetDimension.aplicacionDesc}
                    </p>
                  </section>

                  {/* EJEMPLO DE APLICACIÓN (opcional) */}
                  {targetDimension.ejemplo && (
                    <section className="rounded-2xl p-4 lg:p-5 border" style={{ backgroundColor: `${targetDimension.color}0D`, borderColor: `${targetDimension.color}33` }}>
                      <h3 className="text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2" style={{ color: targetDimension.color }}>
                        <Lightbulb size={12} /> Ejemplo de aplicación
                      </h3>
                      <p className="text-slate-700 text-xs lg:text-sm leading-relaxed whitespace-pre-line">
                        {targetDimension.ejemplo}
                      </p>
                    </section>
                  )}

                  {/* ACORDEÓN DE INSTRUMENTOS */}
                  {targetDimension.examples && (
                    <section className="pt-2">
                      <div className="grid gap-4">
                        {targetDimension.examples.map((ex, i) => {
                          const isExpanded = selectedInstrumentName === ex.name;
                          return (
                            <div key={i} className="flex flex-col shadow-sm rounded-2xl bg-white border border-slate-200 overflow-hidden transition-all duration-300">
                              <button
                                onClick={() => setSelectedInstrumentName(isExpanded ? null : ex.name)}
                                className={`text-left p-4 lg:p-5 transition-all group relative flex items-center justify-between gap-4 hover:bg-slate-50 ${isExpanded ? 'bg-slate-50 border-b border-slate-200' : ''}`}
                              >
                                <div className="flex-1">
                                  <h4 className={`font-bold text-sm mb-1 flex items-center gap-2 transition-colors ${isExpanded ? 'text-[#ED1C24]' : 'text-[#002D56] group-hover:text-[#ED1C24]'}`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${isExpanded ? 'bg-[#ED1C24]' : 'bg-slate-300 group-hover:bg-[#ED1C24]'}`} />
                                    {ex.name}
                                  </h4>
                                  <span className="text-[10px] text-slate-400 font-bold tracking-wider block mb-1.5">{ex.source}</span>
                                  <p className="text-xs text-slate-500 leading-relaxed pr-2">{ex.desc}</p>
                                </div>
                                <div className={`shrink-0 transition-transform duration-300 ${isExpanded ? 'text-[#ED1C24]' : 'text-slate-300 group-hover:text-[#ED1C24]'}`}>
                                  {isExpanded ? <ChevronUp size={24} /> : <Eye size={24} />}
                                </div>
                              </button>

                              {isExpanded && (
                                <div className="p-5 lg:p-6 bg-white animate-in slide-in-from-top-4 fade-in duration-300">
                                  <div className="inline-block px-3 py-1 bg-red-50 text-red-700 text-[10px] font-black uppercase tracking-widest rounded-full mb-3 border border-red-100">
                                    Aplicación en aula
                                  </div>

                                  {/* RÚBRICA EN FORMATO TABLA */}
                                  {ex.rubrica && (
                                    <>
                                      <h3 className="text-lg lg:text-xl font-black text-[#002D56] mb-1 leading-tight">
                                        {ex.rubrica.title}
                                      </h3>
                                      <p className="text-slate-500 text-xs font-medium mb-5">
                                        {ex.rubrica.subtitle}
                                      </p>
                                      <div className="overflow-x-auto -mx-1 custom-scrollbar">
                                        <table className="w-full border-collapse text-left" style={{ minWidth: 640 }}>
                                          <thead>
                                            <tr>
                                              <th className="sticky left-0 z-10 bg-[#002D56] text-white text-[10px] lg:text-xs font-black uppercase tracking-wider p-3 rounded-tl-xl align-bottom" style={{ minWidth: 150 }}>
                                                Criterio
                                              </th>
                                              {ex.rubrica.niveles.map((nivel, ni) => (
                                                <th key={ni}
                                                  className={`text-white text-[10px] lg:text-xs font-black uppercase tracking-wider p-3 align-bottom ${ni === ex.rubrica!.niveles.length - 1 ? 'rounded-tr-xl' : ''}`}
                                                  style={{ backgroundColor: NIVEL_COLORS[ni], minWidth: 140 }}>
                                                  {nivel}
                                                </th>
                                              ))}
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {ex.rubrica.criterios.map((crit, ci) => (
                                              <tr key={ci} className={ci % 2 === 0 ? 'bg-slate-50/60' : 'bg-white'}>
                                                <td className={`sticky left-0 z-10 font-bold text-[#002D56] text-xs p-3 border-r border-slate-200 align-top ${ci % 2 === 0 ? 'bg-slate-100' : 'bg-white'}`} style={{ minWidth: 150 }}>
                                                  {crit.criterio}
                                                </td>
                                                {crit.niveles.map((desc, di) => (
                                                  <td key={di} className="text-slate-600 text-xs leading-relaxed p-3 border-r border-slate-100 align-top whitespace-pre-line">
                                                    {desc}
                                                  </td>
                                                ))}
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    </>
                                  )}

                                  {/* CONTENIDO NO-RÚBRICA (pauta / lista de cotejo) */}
                                  {ex.modalContent && (
                                    <>
                                      <h3 className="text-lg lg:text-xl font-black text-[#002D56] mb-1 leading-tight">
                                        {ex.modalContent.title}
                                      </h3>
                                      <p className="text-slate-500 text-xs font-medium mb-5">
                                        {ex.modalContent.subtitle}
                                      </p>
                                      <div className="space-y-3">
                                        {ex.modalContent.items.map((item, idx) => (
                                          <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/80">
                                            <h4 className="font-bold text-[#002D56] text-xs uppercase tracking-wider mb-2">{item.label}</h4>
                                            <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">{item.content}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  )}

                  {/* NAVEGACIÓN INFERIOR */}
                  <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-200">
                    {activeId > 1 ? (
                      <button onClick={() => { setActiveId(activeId - 1); setSelectedInstrumentName(null); }} className="flex items-center gap-3 p-2 lg:p-3 rounded-2xl hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-sm transition-all text-left flex-1">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 shrink-0"><ChevronLeft size={18} /></div>
                        <div>
                          <div className="text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Anterior</div>
                          <div className="text-[#002D56] text-xs lg:text-sm font-black">{dimensions[activeId - 2].short}</div>
                        </div>
                      </button>
                    ) : <div className="flex-1"></div>}

                    {activeId < dimensions.length ? (
                      <button onClick={() => { setActiveId(activeId + 1); setSelectedInstrumentName(null); }} className="flex items-center justify-end gap-3 p-2 lg:p-3 rounded-2xl hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-sm transition-all text-right flex-1">
                        <div>
                          <div className="text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Siguiente</div>
                          <div className="text-[#002D56] text-xs lg:text-sm font-black">{dimensions[activeId].short}</div>
                        </div>
                        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 shrink-0"><ChevronRight size={18} /></div>
                      </button>
                    ) : <div className="flex-1"></div>}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // PORTADA DOCENTE
            <div className="p-6 lg:p-12 h-full flex flex-col justify-center text-center lg:text-left bg-gradient-to-br from-white to-slate-50 overflow-y-auto custom-scrollbar">
              <div className="max-w-xl mx-auto lg:mx-0">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-[#00A6B5]/10 text-[#00A6B5] rounded-2xl lg:rounded-[2rem] flex items-center justify-center mb-6 lg:mb-8 mx-auto lg:mx-0 shadow-inner shrink-0 transition-transform hover:scale-105 duration-500">
                  <ClipboardCheck size={36} />
                </div>

                <h2 className="text-3xl lg:text-5xl font-black text-[#002D56] mb-4 tracking-tighter leading-tight">
                  ¿Cómo evaluar?<br />Guía Interactiva
                </h2>

                <div className="inline-block bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-full mb-2 tracking-widest uppercase">
                  {fullCode} · {course.name}
                </div>
                <div className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-6">{course.unit}</div>

                <p className="text-slate-600 text-sm lg:text-[15px] mb-8 leading-relaxed font-medium">
                  {course.intro}
                </p>

                <div className="p-5 bg-[#00A6B5]/5 rounded-2xl border border-[#00A6B5]/20 flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <Lightbulb className="text-[#00A6B5] shrink-0 mt-0.5" size={20} />
                  <p className="text-xs text-slate-700 text-left leading-relaxed">
                    <strong className="text-[#002D56] block mb-1">¿Cómo utilizar esta herramienta?</strong>
                    {TIP_TEXT}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#002D56] text-white py-4 px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 z-40 shrink-0 text-xs shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 font-medium">
          <a href="https://desarrollodocente.pucv.cl/evaluacion-aprendizajes-complejos/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#00A6B5] transition-colors">
            <ExternalLink size={14} /> Evaluación Aprendizajes Complejos
          </a>
          <span className="hidden md:inline text-slate-500">|</span>
          <a href="mailto:desarrollo.docente@pucv.cl" className="flex items-center gap-2 hover:text-[#00A6B5] transition-colors">
            <Mail size={14} /> desarrollo.docente@pucv.cl
          </a>
        </div>
        <button
          onClick={() => setBiblioOpen(true)}
          className="bg-white/10 hover:bg-[#00A6B5] px-5 py-2.5 rounded-full transition-colors flex items-center gap-2 font-bold tracking-wider uppercase text-[10px]"
        >
          <BookOpen size={14} /> Referencias Bibliográficas
        </button>
      </footer>

      {/* DRAWER REFERENCIAS */}
      {biblioOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setBiblioOpen(false)}>
          <div className="bg-white w-full max-w-md h-full shadow-2xl overflow-hidden border-l border-slate-200 flex flex-col animate-in slide-in-from-right-full duration-300 ease-out" onClick={(e) => e.stopPropagation()}>

            <div className="bg-slate-50 p-6 flex items-center justify-between border-b border-slate-200 shrink-0">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#002D56] flex items-center gap-3">
                <BookOpen className="text-[#00A6B5]" size={20} /> Referencias
              </h3>
              <button onClick={() => setBiblioOpen(false)} className="text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors p-2 bg-white rounded-full shadow-sm">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1 bg-white">
              {refGroups.map((g, gi) => (
                <div key={gi} className={`p-5 rounded-2xl border ${gi === 0 ? 'bg-[#00A6B5]/5 border-[#00A6B5]/20' : 'bg-slate-50 border-slate-100'}`}>
                  <h4 className={`font-bold text-xs uppercase mb-2 ${gi === 0 ? 'text-[#002D56]' : 'text-slate-500'}`}>{g.category}</h4>
                  <div className="space-y-2">
                    {g.items.map((cite, ci) => (
                      <p key={ci} className={`text-xs leading-relaxed ${gi === 0 ? 'text-[#002D56]/80' : 'text-slate-500'}`}>{cite}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-slate-100 shrink-0 bg-slate-50">
              <button onClick={() => setBiblioOpen(false)} className="w-full bg-[#002D56] hover:bg-[#00A6B5] text-white py-4 rounded-xl font-black transition-all uppercase tracking-widest text-[10px] shadow-md hover:shadow-lg">
                Volver a la Guía
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
