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
  Lightbulb,
  Printer
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
  "code": "TRA 491",
  "section": "01",
  "name": "Modelos de Transporte",
  "unit": "Escuela de Ingeniería de Transporte · Facultad de Ingeniería",
  "intro": "Asignatura obligatoria del 8.º semestre de Ingeniería de Transporte que entrega los fundamentos cuantitativos del análisis de la demanda: valor subjetivo del tiempo, modelo de las cuatro etapas y modelos de elección discreta. Combina clases teóricas con resolución de problemas, lectura de casos y talleres de calibración de modelos con software especializado. Los estudiantes construyen, estiman y analizan modelos reales a partir de encuestas de preferencias reveladas y declaradas.",
  "dimensions": [
    {
      "id": 1,
      "proposito": "El Perfil de Egreso del Ingeniero de Transporte exige formación sólida en ciencias de la Ingeniería de Transporte que sustente el quehacer profesional, pensamiento sistémico para analizar problemas de sistemas de transporte y proponer soluciones sostenibles, y gestión eficiente del cambio tecnológico para mejorar servicios de movilidad de personas y bienes. TRA 491 entrega el instrumental cuantitativo que hace posible esas competencias: sin modelos de demanda, el ingeniero de transporte no puede evaluar políticas, diseñar sistemas ni justificar inversiones.",
      "contexto": "Al ser del 8.º semestre, los estudiantes ya tienen formación en investigación de operaciones (TRA 454), transporte aéreo (TRA 330), transporte marítimo (TRA 345) y puertos (TRA 446). TRA 491 integra ese bagaje disciplinar con el enfoque cuantitativo de la modelación de la demanda.",
      "aplicacionTitle": "¿Cómo lo aplico en mi asignatura?",
      "aplicacionDesc": "Diseñe los talleres y tareas con problemas de transporte reales de la región o del país: datos de SECTRA, encuestas origen-destino de ciudades chilenas, o casos de elección modal en contextos conocidos por los estudiantes. Un modelo calibrado con datos reales tiene una validez educativa que los ejercicios de datos ficticios no pueden igualar.",
      "ejemplo": null,
      "examples": null,
      "competencias": [
        {
          "codigo": "C-CT",
          "texto": "Posee formación sólida en ciencias de la Ingeniería de Transporte que sustenta su quehacer profesional."
        },
        {
          "codigo": "C-PS",
          "texto": "Aplica pensamiento sistémico para analizar problemas de transporte y proponer soluciones sostenibles."
        },
        {
          "codigo": "C-TE",
          "texto": "Gestiona el cambio tecnológico para mejorar los servicios de movilidad de personas y bienes."
        }
      ]
    },
    {
      "id": 2,
      "proposito": "Las competencias de la asignatura se orientan a aplicar modelos cuantitativos de demanda de transporte (elección discreta, valor subjetivo del tiempo, modelo de cuatro etapas) para analizar el comportamiento de los usuarios, evaluar decisiones de viaje y construir modelos empíricos. Integran teoría microeconómica, estadística aplicada y software de modelación, y tributan simultáneamente a varias competencias del perfil del ingeniero de transporte.",
      "contexto": "La competencia tiene tres planos que deben alinearse: el teórico (comprender el fundamento de los modelos), el procedimental (saber construir y calibrar el modelo con datos reales) y el interpretativo (saber qué significan los parámetros y cómo usarlos para tomar decisiones). Los talleres con software son el espacio donde los tres planos convergen.",
      "aplicacionTitle": "¿Cómo lo aplico en mi asignatura?",
      "aplicacionDesc": "No permita que el software se convierta en una caja negra. En cada taller, exija que el estudiante explique qué representa cada parámetro estimado, qué signo debería tener y por qué el modelo resultante tiene o no tiene sentido económico. Un modelo estadísticamente ajustado pero con parámetros con signo incorrecto no sirve para tomar decisiones.",
      "ejemplo": null,
      "examples": null
    },
    {
      "id": 3,
      "proposito": "Los Resultados de Aprendizaje son declaraciones de lo que se espera que el estudiante conozca, comprenda y sea capaz de hacer al finalizar un periodo de aprendizaje. Dan cuenta del saber conceptual, procedimental y actitudinal, y expresan el desempeño de una competencia o de una porción de ella. Operan como el puente entre las competencias del perfil y las evaluaciones concretas de la asignatura.",
      "contexto": "RA3 es el más complejo porque exige que el estudiante domine la cadena completa: diseño de la encuesta, recolección de datos, estimación del modelo y análisis de los resultados. Es también el más auténtico desde el punto de vista del trabajo profesional real del ingeniero de transporte.",
      "aplicacionTitle": "¿Cómo lo aplico en mi asignatura?",
      "aplicacionDesc": "Para RA3, diseñe una tarea de investigación aplicada donde los estudiantes encuesten a un conjunto real de viajeros (incluso dentro del campus) y estimen un modelo de elección con esos datos. El aprendizaje de los errores de diseño de encuesta —preguntas ambiguas, sesgos de selección, datos faltantes— es parte esencial del RA.",
      "ejemplo": null,
      "examples": null
    },
    {
      "id": 4,
      "proposito": "TRA 491 usa cuatro modalidades de aprendizaje-evaluación articuladas: clases teóricas para los fundamentos conceptuales; clases prácticas de resolución de problemas para aplicación analítica; talleres de calibración de modelos con software para la competencia técnica con datos reales; y tareas de investigación aplicada para la integración de todos los RA. El programa no especifica ponderaciones exactas entre estas modalidades, lo que le da flexibilidad al equipo docente.",
      "contexto": "Al ser una asignatura con cupo de 30 estudiantes, hay condiciones para evaluaciones más personalizadas: ejercicios de resolución individual en pizarra, discusión de resultados de modelos por grupos pequeños, revisión de tareas con retroalimentación detallada.",
      "aplicacionTitle": "¿Cómo lo aplico en mi asignatura?",
      "aplicacionDesc": "Proponga al menos una tarea de investigación aplicada durante el semestre donde los estudiantes diseñen una encuesta de preferencias declaradas o reveladas, la apliquen, estimen el modelo y presenten los resultados. La presentación oral de los resultados del modelo —incluyendo los errores y las limitaciones— es tan formativa como la estimación misma.",
      "ejemplo": null,
      "examples": null
    },
    {
      "id": 5,
      "proposito": "Los criterios de evaluación de TRA 491 deben capturar tanto la corrección matemática de los modelos como la interpretación económica de sus resultados. Para los problemas analíticos: planteamiento correcto de la función de utilidad, aplicación correcta del modelo de elección discreta y cálculo del valor del tiempo. Para los talleres con software: especificación correcta del modelo, interpretación de signos y magnitudes de los parámetros, y evaluación de la calidad del ajuste. Para las tareas de investigación: diseño metodológico de la encuesta, coherencia del modelo estimado con la teoría, y análisis crítico de los resultados.",
      "contexto": "El criterio de 'interpretación de parámetros' es el más discriminador: un estudiante que solo sabe que el parámetro del tiempo tiene signo negativo no ha aprendido lo mismo que uno que puede explicar por qué ese signo tiene sentido desde la microeconomía del valor del tiempo.",
      "aplicacionTitle": "¿Cómo lo aplico en mi asignatura?",
      "aplicacionDesc": "Incluya en la evaluación de cada taller una pregunta de interpretación: '¿Qué implica este valor del parámetro de costo para la disposición a pagar de los usuarios?', '¿Tiene sentido económico este signo?', '¿Cambiaría la partición modal si el tiempo de viaje aumenta un 20%?'. Esas preguntas evalúan comprensión real del modelo.",
      "ejemplo": null,
      "examples": null
    },
    {
      "id": 6,
      "proposito": "Los instrumentos de TRA 491 deben operar en los tres planos de la competencia: el teórico-analítico (resolución de problemas), el técnico-computacional (talleres con software) y el aplicado-investigativo (tareas con datos reales). Su diseño debe exigir al estudiante no solo calcular modelos sino interpretarlos y usarlos para tomar decisiones de transporte.",
      "contexto": null,
      "aplicacionTitle": "Herramientas Sugeridas para el Docente",
      "aplicacionDesc": "Instrumentos para las tres modalidades evaluativas de TRA 491, donde la interpretación técnica y la pertinencia del modelo para la toma de decisiones son los criterios centrales:",
      "ejemplo": null,
      "examples": [
        {
          "name": "Pauta de Resolución de Problemas: Modelos de Elección Discreta",
          "source": "(Sugerencia para controles y pruebas escritas)",
          "desc": "Evalúa la resolución de problemas de elección modal o de valor del tiempo en tres etapas: especificación del modelo, cálculo de probabilidades y análisis de sensibilidad o interpretación económica. Exige justificación de cada decisión metodológica.",
          "modalContent": {
            "title": "Pauta: Resolución de Problemas de Modelos de Transporte",
            "subtitle": "Especificación, cálculo e interpretación económica del modelo.",
            "items": [
              {
                "label": "Especificación del modelo y función de utilidad (30%)",
                "content": "Logrado: El estudiante plantea correctamente la función de utilidad para cada alternativa modal, incluye las variables relevantes con sus signos esperados y justifica la forma funcional elegida.\nParcial: La función de utilidad es reconocible pero omite variables relevantes o incluye variables con signo incorrecto sin justificación."
              },
              {
                "label": "Cálculo de probabilidades y partición modal (40%)",
                "content": "Logrado: Aplica correctamente la fórmula del Logit Multinomial o Jerárquico, calcula probabilidades de elección para cada alternativa y verifica que suman 1; maneja correctamente los parámetros de escala y los atributos de cada alternativa.\nParcial: El cálculo tiene errores aritméticos o de formulación que no invalidan el razonamiento de fondo; el proceso es identificable."
              },
              {
                "label": "Interpretación económica y análisis de sensibilidad (30%)",
                "content": "Logrado: El estudiante interpreta el valor del tiempo estimado en términos de disposición a pagar, analiza cómo cambia la partición modal ante variaciones en atributos (costo, tiempo) y discute si los resultados son razonables para el contexto del problema.\nParcial: El estudiante calcula correctamente pero no interpreta el significado económico de los resultados ni evalúa su razonabilidad."
              }
            ]
          }
        },
        {
          "name": "Rúbrica de Taller de Calibración de Modelo Logit con Software",
          "source": "(Sugerencia para talleres con software especializado)",
          "desc": "Evalúa el proceso completo de calibración: especificación del modelo en el software, estimación, interpretación de los parámetros estimados y evaluación de la calidad del ajuste. Aplicable a software tipo ALOGIT, Biogeme o similar.",
          "rubrica": {
            "title": "Rúbrica: Taller de Calibración de Modelo Logit",
            "subtitle": "Del dato al modelo: especificación, estimación e interpretación.",
            "niveles": [
              "Destacado",
              "Competente",
              "En desarrollo",
              "Incipiente"
            ],
            "criterios": [
              {
                "criterio": "Especificación del modelo en el software (25%)",
                "niveles": [
                  "Configura correctamente el modelo (variables, alternativas, función de utilidad), verifica los datos y documenta las decisiones.",
                  "Configura el modelo correctamente y verifica los datos, con documentación parcial de las decisiones.",
                  "El modelo corre pero la especificación tiene errores que afectan la validez de los parámetros.",
                  "La especificación es incorrecta y el modelo no entrega parámetros válidos."
                ]
              },
              {
                "criterio": "Interpretación de parámetros estimados (50%)",
                "niveles": [
                  "Verifica signo, magnitud y significancia de cada parámetro y calcula el valor del tiempo implícito en el modelo.",
                  "Interpreta los parámetros principales y calcula el valor del tiempo, con revisión parcial de la significancia.",
                  "Reporta los parámetros con interpretación limitada; no verifica signos ni calcula el valor del tiempo.",
                  "Reporta los parámetros sin interpretarlos."
                ]
              },
              {
                "criterio": "Evaluación de la calidad del ajuste y conclusiones (25%)",
                "niveles": [
                  "Reporta e interpreta las medidas de ajuste y concluye si el modelo es apto o requiere respecificación.",
                  "Reporta e interpreta las medidas de ajuste principales y esboza una conclusión sobre el modelo.",
                  "Reporta las medidas de ajuste sin interpretarlas ni concluir sobre la usabilidad del modelo.",
                  "No reporta ni evalúa la calidad del ajuste del modelo."
                ]
              }
            ]
          }
        },
        {
          "name": "Rúbrica de Investigación Aplicada con Encuestas de Preferencias",
          "source": "(Tarea de investigación — RA3, modelo empírico completo)",
          "desc": "Evalúa la tarea completa: diseño de la encuesta (PR o PD), recolección de datos, estimación del modelo y presentación de resultados. Es el instrumento más auténtico del curso: replica el trabajo real del ingeniero de transporte.",
          "rubrica": {
            "title": "Rúbrica: Investigación con Encuestas de Preferencias",
            "subtitle": "Del diseño de la encuesta al modelo calibrado y sus conclusiones.",
            "niveles": [
              "Destacado",
              "Competente",
              "En desarrollo",
              "Incipiente"
            ],
            "criterios": [
              {
                "criterio": "Diseño metodológico de la encuesta (25%)",
                "niveles": [
                  "Muestra justificada, atributos y niveles coherentes, preguntas no ambiguas y documentación adecuada de la fuente (PR) o del diseño experimental (PD).",
                  "Diseño metodológico correcto con justificación suficiente, con detalles perfectibles.",
                  "La encuesta tiene problemas de diseño (atributos poco realistas, muestra o preguntas discutibles) que afectan la validez.",
                  "El diseño de la encuesta no permite estimar un modelo válido."
                ]
              },
              {
                "criterio": "Estimación y validación del modelo (45%)",
                "niveles": [
                  "Parámetros con signos correctos, significancias razonables y ajuste aceptable; el valor del tiempo es coherente con la literatura chilena.",
                  "Modelo bien estimado con parámetros mayormente correctos y ajuste aceptable.",
                  "El modelo corre pero tiene parámetros con signos incorrectos o insignificantes que no se discuten ni corrigen.",
                  "El modelo estimado no es válido ni interpretable."
                ]
              },
              {
                "criterio": "Análisis crítico y aplicación a una decisión de transporte (30%)",
                "niveles": [
                  "Usa el modelo para responder una pregunta concreta de política o diseño, discute limitaciones y propone mejoras metodológicas.",
                  "Usa el modelo para una aplicación pertinente y menciona algunas limitaciones.",
                  "Presenta el modelo sin usarlo para una decisión; las conclusiones son genéricas.",
                  "No aplica el modelo ni extrae conclusiones útiles del análisis."
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
      "cite": "PUCV. Programa de Asignatura TRA 491-01: Modelos de Transporte. Escuela de Ingeniería de Transporte, Facultad de Ingeniería."
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
      "cite": "Ortúzar Salas, J. de D. y Willumsen, L.G. (1994). Modelling Transport (2.ª ed.). John Wiley."
    },
    {
      "category": "Bibliografía obligatoria",
      "cite": "Ortúzar Salas, J. de D. (1994). Modelos de demanda de transporte. Universidad Católica de Chile."
    },
    {
      "category": "Bibliografía obligatoria",
      "cite": "Ortúzar Salas, J. de D. (2000). Modelos econométricos de elección discreta. Universidad Católica de Chile."
    },
    {
      "category": "Bibliografía obligatoria",
      "cite": "SECTRA. (2000). Metodología para análisis de sistemas de transporte en grandes ciudades y ciudades de tamaño medio."
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

  /* ===== IMPRESIÓN: ficha en papel ===== */
  .print-only { display: none; }
  @media print {
    @page { size: A4; margin: 14mm 12mm; }
    html, body { height: auto !important; overflow: visible !important; background: #ffffff !important; }
    .screen-only { display: none !important; }
    .print-only { display: block !important; }
    .pf-avoid-break { break-inside: avoid; page-break-inside: avoid; }
    .pf-page-break { break-before: page; page-break-before: always; }
    .pf table { border-collapse: collapse; width: 100%; }
    .pf th, .pf td { border: 0.5pt solid #cbd5e1; }
  }
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

      <div className="screen-only h-full w-full flex flex-col">
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
        <div className="flex items-center gap-3 md:gap-5">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 text-[10px] md:text-xs font-black uppercase tracking-widest text-[#002D56] border border-slate-200 hover:border-[#00A6B5] hover:text-[#00A6B5] rounded-lg px-3 py-1.5 transition-colors"
            title="Imprimir o guardar como PDF la ficha de esta guía"
          >
            <Printer size={15} /> <span className="hidden md:inline">Imprimir ficha</span>
          </button>
          <div className="flex items-center gap-4 md:gap-6 bg-white rounded-lg p-1">
            <img src="https://comunicacionestrategica.pucv.cl/LOGO100/9/cuerpo/cuerpo_color.png" alt="PUCV" className="h-6 md:h-8 object-contain" />
            <div className="w-px h-5 md:h-7 bg-slate-200"></div>
            <img src="https://desarrollodocente.pucv.cl/wp-content/uploads/2023/07/logo_DD.svg" alt="DD" className="h-6 md:h-8 object-contain" />
          </div>
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

      {/* ===================== FICHA IMPRIMIBLE ===================== */}
      <PrintableSheet course={course} fullCode={fullCode} />
    </div>
  );
}

/* ============================================================
 *  FICHA IMPRIMIBLE (solo visible al imprimir / guardar PDF)
 * ============================================================ */
const DIM_TITLES: Record<number, string> = {
  1: "Perfil de Egreso",
  2: "Competencias de Asignatura",
  3: "Resultados de Aprendizaje",
  4: "Procedimientos de Evaluación",
  5: "Criterios de Evaluación",
  6: "Instrumentos",
};
const NIVEL_FILL = ["#E7F3EC", "#E0F3F5", "#FEF3E0", "#FCE9DF"];

function PrintableSheet({ course, fullCode }: { course: Course; fullCode: string }) {
  const refGroups: { category: string; items: string[] }[] = [];
  course.references.forEach((r) => {
    let g = refGroups.find((x) => x.category === r.category);
    if (!g) { g = { category: r.category, items: [] }; refGroups.push(g); }
    g.items.push(r.cite);
  });

  return (
    <div className="print-only pf" style={{ fontFamily: 'Montserrat, sans-serif', color: '#1e293b', fontSize: 10.5, lineHeight: 1.5 }}>
      {/* Encabezado de la ficha */}
      <div className="pf-avoid-break" style={{ borderBottom: '2pt solid #002D56', paddingBottom: 8, marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: '#64748b' }}>
              Dirección de Desarrollo Docente · PUCV
            </div>
            <div style={{ fontSize: 16, fontWeight: 900, color: '#002D56', marginTop: 2 }}>
              Guía de Evaluación · {fullCode}
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#00A6B5' }}>{course.name}</div>
            <div style={{ fontSize: 9, color: '#64748b', marginTop: 1 }}>{course.unit}</div>
          </div>
          <div style={{ display: 'flex', gap: 3 }}>
            {['#E8251C','#F4C318','#3DB9E8','#7B4CB8'].map((c) => (
              <span key={c} style={{ width: 9, height: 9, background: c, borderRadius: 2, display: 'inline-block' }} />
            ))}
          </div>
        </div>
        {course.intro && (
          <p style={{ marginTop: 8, fontSize: 9.5, color: '#475569' }}>{course.intro}</p>
        )}
      </div>

      {/* Seis componentes */}
      {course.dimensions.map((dim) => (
        <div key={dim.id} className="pf-avoid-break" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 8, fontWeight: 900, color: '#fff', background: '#002D56', borderRadius: 3, padding: '1px 6px' }}>{dim.id}</span>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#002D56' }}>{DIM_TITLES[dim.id]}</span>
          </div>

          <p style={{ margin: '0 0 5px', color: '#334155' }}>{dim.proposito}</p>

          {/* Competencias del perfil (dim 1) */}
          {dim.competencias && dim.competencias.length > 0 && (
            <div style={{ margin: '5px 0' }}>
              {dim.competencias.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 2 }}>
                  <span style={{ fontSize: 8, fontWeight: 900, color: '#fff', background: '#00A6B5', borderRadius: 3, padding: '1px 5px', whiteSpace: 'nowrap' }}>{c.codigo}</span>
                  <span style={{ color: '#475569' }}>{c.texto}</span>
                </div>
              ))}
            </div>
          )}

          {/* Recomendación al docente */}
          {dim.aplicacionDesc && dim.id !== 6 && (
            <div style={{ background: '#f8fafc', borderLeft: '2pt solid #00A6B5', padding: '4px 8px', margin: '5px 0', fontSize: 9.5 }}>
              <span style={{ fontWeight: 700, color: '#002D56' }}>{dim.aplicacionTitle}: </span>
              <span style={{ color: '#475569' }}>{dim.aplicacionDesc}</span>
            </div>
          )}

          {/* Instrumentos con rúbricas en tabla (dim 6) */}
          {dim.examples && dim.examples.map((ex, ei) => (
            <div key={ei} className="pf-avoid-break" style={{ margin: '8px 0' }}>
              <div style={{ fontSize: 10.5, fontWeight: 800, color: '#002D56' }}>{ex.name}</div>
              {ex.source && <div style={{ fontSize: 8.5, color: '#94a3b8', marginBottom: 3 }}>{ex.source}</div>}
              {ex.desc && <div style={{ fontSize: 9.5, color: '#475569', marginBottom: 4 }}>{ex.desc}</div>}

              {ex.rubrica && (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 8.5, marginTop: 3 }}>
                  <thead>
                    <tr>
                      <th style={{ background: '#002D56', color: '#fff', textAlign: 'left', padding: '3px 5px', fontWeight: 800, width: '20%' }}>Criterio</th>
                      {ex.rubrica.niveles.map((n, ni) => (
                        <th key={ni} style={{ background: '#334155', color: '#fff', textAlign: 'left', padding: '3px 5px', fontWeight: 700 }}>{n}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ex.rubrica.criterios.map((cr, ci) => (
                      <tr key={ci}>
                        <td style={{ fontWeight: 700, color: '#002D56', padding: '3px 5px', verticalAlign: 'top', background: '#f1f5f9' }}>{cr.criterio}</td>
                        {cr.niveles.map((d, di) => (
                          <td key={di} style={{ padding: '3px 5px', verticalAlign: 'top', color: '#334155', background: NIVEL_FILL[di] || '#fff' }}>{d}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Referencias */}
      <div className="pf-avoid-break" style={{ marginTop: 10, borderTop: '1pt solid #cbd5e1', paddingTop: 6 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: '#002D56', marginBottom: 4 }}>Referencias</div>
        {refGroups.map((g, gi) => (
          <div key={gi} style={{ marginBottom: 3 }}>
            <div style={{ fontSize: 8, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, color: '#94a3b8' }}>{g.category}</div>
            {g.items.map((cite, ci) => (
              <div key={ci} style={{ fontSize: 8.5, color: '#475569' }}>{cite}</div>
            ))}
          </div>
        ))}
      </div>

      {/* Pie */}
      <div style={{ marginTop: 10, paddingTop: 5, borderTop: '1pt solid #e2e8f0', fontSize: 8, color: '#94a3b8', textAlign: 'center' }}>
        Dirección de Desarrollo Docente · Pontificia Universidad Católica de Valparaíso · desarrollodocente.pucv.cl
      </div>
    </div>
  );
}

