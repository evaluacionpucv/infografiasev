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
  "code": "QUI 1526",
  "section": "01",
  "name": "Química Aplicada 1",
  "unit": "Instituto de Química · Facultad de Ciencias",
  "intro": "Asignatura de 9.º semestre que cierra el ciclo formativo del Químico Industrial: los estudiantes ejecutan, evalúan y defienden un proyecto químico real formulado previamente. La metodología es Aprendizaje Basado en Proyectos, con laboratorio de 6 horas semanales, reuniones de seguimiento técnico y comunicación científica de resultados. No hay examen final.",
  "dimensions": [
    {
      "id": 1,
      "proposito": "El Perfil de Egreso del Químico Industrial exige un profesional que formula explicaciones a fenómenos químicos (C9), diseña experimentos con rigor (C10), evalúa datos experimentales (C11), contribuye con innovación y sustentabilidad (C12), gestiona un laboratorio químico (C13), implementa metodologías analíticas de calidad (C14), planifica soluciones industriales (C15) y participa en investigación aplicada con ética (C16). QUI 1526 es la asignatura donde todas esas competencias convergen por primera vez en un proyecto real de escala laboratorio.",
      "contexto": "Al ser de 9.º semestre, los estudiantes traen el conocimiento de toda la carrera. El reto evaluativo no es verificar si saben química, sino si pueden movilizar ese saber ante un problema concreto, inédito y con restricciones técnicas, económicas y ambientales reales.",
      "aplicacionTitle": "¿Cómo lo aplico en mi asignatura?",
      "aplicacionDesc": "El proyecto debe requerir decisiones que solo pueden tomarse integrando múltiples áreas de la química. Evite problemas con una sola solución 'correcta' conocida de antemano. La pregunta evaluativa central debería ser: '¿Puede este estudiante tomar decisiones técnico-científicas fundamentadas ante un problema industrial que no tiene respuesta en el manual?'.",
      "ejemplo": null,
      "examples": null,
      "competencias": [
        {
          "codigo": "C9",
          "texto": "Formula explicaciones a fenómenos químicos mediante el método científico."
        },
        {
          "codigo": "C10",
          "texto": "Diseña experimentos con rigor metodológico."
        },
        {
          "codigo": "C11",
          "texto": "Evalúa datos experimentales para diseñar e interpretar procesos."
        },
        {
          "codigo": "C16",
          "texto": "Participa en investigación aplicada con criterios éticos y de sustentabilidad."
        }
      ]
    },
    {
      "id": 2,
      "proposito": "Las competencias de la asignatura se orientan a ejecutar, evaluar y comunicar un proyecto de química aplicada a escala laboratorio, integrando saberes de química general, orgánica, inorgánica y analítica con criterios técnicos, económicos, ambientales y éticos. Se evidencian a lo largo del semestre mediante varios procedimientos y tributan simultáneamente a numerosas competencias del perfil del químico industrial.",
      "contexto": "La modalidad de ABP sin examen implica que la nota final emerge de evidencia acumulada durante el proceso, lo que exige que cada instrumento esté bien diseñado y que el cronograma de retroalimentación sea explícito desde el inicio.",
      "aplicacionTitle": "¿Cómo lo aplico en mi asignatura?",
      "aplicacionDesc": "Socialice desde la primera sesión el mapa completo de evaluaciones, sus ponderaciones y sus fechas. Cada reunión de seguimiento es una oportunidad para dar retroalimentación formativa antes de la evaluación sumativa del informe. El docente actúa como supervisor técnico, no como examinador al final del semestre.",
      "ejemplo": null,
      "examples": null
    },
    {
      "id": 3,
      "proposito": "Los Resultados de Aprendizaje son declaraciones de lo que se espera que el estudiante conozca, comprenda y sea capaz de hacer al finalizar un periodo de aprendizaje. Dan cuenta del saber conceptual, procedimental y actitudinal, y expresan el desempeño de una competencia o de una porción de ella. Operan como el puente entre las competencias del perfil y las evaluaciones concretas de la asignatura.",
      "contexto": "Los RA escalan en complejidad: de la integración de conocimientos (RA1) a la reflexión crítica sobre consecuencias (RA5). El informe final es el único instrumento que puede evidenciar todos los RA simultáneamente.",
      "aplicacionTitle": "¿Cómo lo aplico en mi asignatura?",
      "aplicacionDesc": "Mapee explícitamente qué RA evalúa cada instrumento (la tabla del programa ya lo hace). Comunique a los estudiantes que el informe de avance evalúa RA3 y RA4 —razonamiento intermedio—, mientras que el informe final agrega RA5. Así saben en qué etapa se espera qué nivel de profundidad.",
      "ejemplo": null,
      "examples": null
    },
    {
      "id": 4,
      "proposito": "QUI 1526 usa seis procedimientos de evaluación que replican las instancias del trabajo profesional real: Rúbrica de desempeño experimental en laboratorio (15%) para observar habilidades técnicas en acción; Informe técnico de avance (15%) como evidencia de razonamiento intermedio; Informe final del proyecto (30%) como reporte integral; Presentación oral con defensa (20%) para evaluar argumentación y comunicación; Autoevaluación y coevaluación estructurada (10%) para reflexión del proceso; y Participación en reuniones de seguimiento técnico (10%) como evidencia de responsabilidad profesional.",
      "contexto": "La distribución sin examen final pone el peso en el proceso completo. Ningún instrumento concentra más del 30%. Esto obliga a que la retroalimentación sea continua y que los estudiantes no puedan 'apostar todo' a una instancia terminal.",
      "aplicacionTitle": "¿Cómo lo aplico en mi asignatura?",
      "aplicacionDesc": "Defina desde el inicio el formato y los criterios de las actas de reuniones de seguimiento: qué debe quedar registrado, quién lo escribe y cómo se evalúa la participación. Esto convierte un procedimiento que parece informal en evidencia objetiva de responsabilidad profesional.",
      "ejemplo": null,
      "examples": null
    },
    {
      "id": 5,
      "proposito": "Los criterios de evaluación están definidos por RA en el programa y deben traducirse en estándares operacionales para cada instrumento. Para RA1: articula conceptos de distintas ramas químicas e identifica variables e interacciones en sistemas complejos. Para RA2: elabora protocolos con objetivos definidos, considerando viabilidad, control de variables y seguridad. Para RA3: compara con estándares e interpreta datos cuanti y cualitativos. Para RA4: justifica elecciones metodológicas e integra criterios de eficiencia e impacto ambiental. Para RA5: analiza consecuencias del proceso y propone mejoras éticas, sociales y técnicas.",
      "contexto": "El programa exige que los criterios sean 'observables y medibles'. Traducirlos en descriptores de nivel (logrado, en desarrollo, no logrado) antes de cada evaluación es esencial para la consistencia entre docentes y para la autoevaluación.",
      "aplicacionTitle": "¿Cómo lo aplico en mi asignatura?",
      "aplicacionDesc": "Para el informe final, construya la rúbrica junto al equipo docente antes del inicio del semestre y publíquela con el enunciado del proyecto. Los estudiantes que conocen los criterios desde el principio producen informes de mayor calidad y reclaman menos al recibir su nota.",
      "ejemplo": null,
      "examples": null
    },
    {
      "id": 6,
      "proposito": "Los instrumentos de QUI 1526 deben capturar evidencia del proceso completo del proyecto: desde el desempeño en laboratorio hasta la reflexión crítica sobre el impacto. Su diseño debe permitir distinguir niveles de logro con precisión suficiente para orientar mejoras durante el semestre.",
      "contexto": null,
      "aplicacionTitle": "Herramientas Sugeridas para el Docente",
      "aplicacionDesc": "Instrumentos diseñados para las seis instancias evaluativas de QUI 1526, donde el protagonismo del estudiante y la autenticidad del proyecto son el eje:",
      "ejemplo": null,
      "examples": [
        {
          "name": "Rúbrica de Desempeño Experimental en Laboratorio",
          "source": "(Observación directa — 15%)",
          "desc": "Evalúa habilidades técnicas en acción durante las sesiones de laboratorio: manejo de equipos, cumplimiento de protocolos, seguridad, registro de datos y trabajo en equipo. Se aplica de forma observacional, sin interrumpir el trabajo del grupo.",
          "rubrica": {
            "title": "Rúbrica: Desempeño Experimental",
            "subtitle": "Observación directa de competencias laboratoriales en contexto de proyecto.",
            "niveles": [
              "Destacado",
              "Competente",
              "En desarrollo",
              "Incipiente"
            ],
            "criterios": [
              {
                "criterio": "Manejo de equipos y protocolos de seguridad",
                "niveles": [
                  "Opera los equipos según protocolo, usa los EPP sin recordatorio y gestiona los residuos según las normas vigentes.",
                  "Opera los equipos correctamente y cumple la seguridad, con recordatorios ocasionales.",
                  "Requiere orientación para el manejo de equipos o comete omisiones de seguridad menores que corrige al ser advertido.",
                  "Maneja los equipos de forma insegura o incumple los protocolos de seguridad."
                ]
              },
              {
                "criterio": "Registro de datos y bitácora experimental",
                "niveles": [
                  "La bitácora registra condiciones, observaciones y datos con trazabilidad completa; permite reproducir el ensayo.",
                  "La bitácora es completa y ordenada, con omisiones menores que no afectan la reproducibilidad.",
                  "La bitácora tiene vacíos o imprecisiones que dificultan la reproducibilidad o la validación.",
                  "El registro es insuficiente y no permite reproducir ni validar el ensayo."
                ]
              },
              {
                "criterio": "Resolución de contingencias y toma de decisiones",
                "niveles": [
                  "Ante un resultado inesperado, identifica la causa, ajusta el protocolo con fundamento técnico y documenta el cambio.",
                  "Ante contingencias, reacciona adecuadamente con apoyo mínimo y registra los ajustes.",
                  "Ante contingencias, espera instrucción del docente o toma decisiones sin fundamento explícito.",
                  "No reacciona ante las contingencias o toma decisiones que comprometen el ensayo."
                ]
              }
            ]
          }
        },
        {
          "name": "Rúbrica de Informe Final del Proyecto",
          "source": "(Reporte integral — 30%)",
          "desc": "Evalúa el documento completo con metodología, resultados, análisis crítico, evaluación de viabilidad y propuesta de mejora. Es el instrumento de mayor peso y el que cubre todos los RA. Permite corrección consistente en proyectos de distinta naturaleza química.",
          "rubrica": {
            "title": "Rúbrica: Informe Final de Proyecto Químico",
            "subtitle": "Cuatro secciones con peso diferenciado según complejidad cognitiva.",
            "niveles": [
              "Destacado",
              "Competente",
              "En desarrollo",
              "Incipiente"
            ],
            "criterios": [
              {
                "criterio": "Metodología y protocolo experimental (20%)",
                "niveles": [
                  "El protocolo es reproducible, justifica cada decisión con fundamento químico y reporta desviaciones con su explicación técnica.",
                  "El protocolo es reproducible y justifica la mayoría de las decisiones, con reporte parcial de desviaciones.",
                  "El protocolo describe los pasos pero omite justificaciones o no reporta las desviaciones ocurridas.",
                  "El protocolo no es reproducible ni fundamenta las decisiones metodológicas."
                ]
              },
              {
                "criterio": "Análisis e interpretación de resultados (35%)",
                "niveles": [
                  "Compara los datos con estándares o referencias, cuantifica error e incertidumbre e interpreta en función del problema del proyecto.",
                  "Compara e interpreta los datos correctamente, con cuantificación parcial del error.",
                  "Presenta datos organizados pero la interpretación es superficial o poco vinculada al problema.",
                  "Presenta datos sin analizarlos ni relacionarlos con el problema del proyecto."
                ]
              },
              {
                "criterio": "Evaluación de viabilidad, sustentabilidad y propuesta de mejora (30%)",
                "niveles": [
                  "Evalúa rendimiento, estima costos e impacto ambiental y propone mejoras fundamentadas con criterios de innovación o sustentabilidad.",
                  "Evalúa viabilidad y sustentabilidad con datos y propone mejoras pertinentes, con menor profundidad.",
                  "Menciona aspectos de viabilidad o sustentabilidad sin datos cuantitativos ni propuestas concretas.",
                  "No evalúa viabilidad ni sustentabilidad ni propone mejoras."
                ]
              },
              {
                "criterio": "Comunicación técnica y calidad del documento (15%)",
                "niveles": [
                  "Redacción clara, tablas y figuras apropiadas, citas APA 7 y conclusiones coherentes con los resultados.",
                  "Documento claro y bien citado, con errores menores de forma.",
                  "El documento presenta errores de forma o conclusiones no del todo respaldadas por los datos.",
                  "El documento es desordenado y sus conclusiones no se desprenden de los resultados."
                ]
              }
            ]
          }
        },
        {
          "name": "Escala de Apreciación: Autoevaluación y Coevaluación Estructurada",
          "source": "(Reflexión del proceso — 10%)",
          "desc": "Instrumento de doble entrada: cada estudiante evalúa su propio desempeño en el proyecto y el de sus pares. Genera responsabilidad individual dentro del trabajo grupal y entrega al docente información sobre la dinámica interna del equipo.",
          "modalContent": {
            "title": "Escala de Apreciación: Auto y Coevaluación",
            "subtitle": "Reflexión individual sobre el proceso colectivo del proyecto.",
            "items": [
              {
                "label": "Dimensiones evaluadas (escala 1–4)",
                "content": "1. Contribución técnica al diseño y ejecución del experimento.\n2. Cumplimiento del cronograma y acuerdos internos del grupo.\n3. Calidad del aporte a la redacción del informe y la presentación oral.\n4. Integración de criterios éticos y de sustentabilidad en las decisiones del grupo."
              },
              {
                "label": "Factor de ajuste individual",
                "content": "El promedio de autoevaluación y coevaluación de pares genera un factor entre 0.85 y 1.15 que multiplica la nota grupal de los instrumentos colectivos (informe de avance, informe final, presentación). El docente informa el factor resultante, no las evaluaciones individuales."
              },
              {
                "label": "Reflexión narrativa (obligatoria)",
                "content": "Cada estudiante responde en 150–200 palabras: '¿Qué aprendí de este proyecto que no habría aprendido en una prueba escrita? ¿Qué cambiaría en mi manera de abordar un proyecto similar en el mundo profesional?'. Esta reflexión evidencia el RA5 y se evalúa con una lista de cotejo de tres criterios."
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
      "cite": "PUCV (2025). Programa de Asignatura QUI 1526-01: Química Aplicada 1. Instituto de Química, Facultad de Ciencias."
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
      "cite": "Montgomery, D.C. (2017). Design and Analysis of Experiments (9th ed.). Wiley."
    },
    {
      "category": "Bibliografía obligatoria",
      "cite": "Skoog, D.A., West, D.M., Holler, F.J. y Crouch, S.R. (2014). Fundamentos de Química Analítica (9.ª ed.). Cengage Learning."
    },
    {
      "category": "Referencia complementaria",
      "cite": "Pavia, D.L., Lampman, G.M., Kriz, G.S. y Engel, R.G. (2015). Técnicas de laboratorio en química orgánica (5.ª ed.). Cengage Learning."
    },
    {
      "category": "Referencia complementaria",
      "cite": "Fogler, H.S. (2017). Elementos de ingeniería de las reacciones químicas (5.ª ed.). Pearson Educación."
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
    <div className="h-screen w-full bg-slate-50 flex flex-col font-montserrat text-slate-800 overflow-hidden select-none">
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
