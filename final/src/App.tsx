import React, { useState, useEffect } from 'react'
import IndexPage from './IndexPage'
import AGR475 from './AGR475'
import ALI498 from './ALI498'
import ART155 from './ART155'
import BIO1133 from './BIO1133'
import BIO250 from './BIO250'
import DER1021 from './DER1021'
import ECM610 from './ECM610'
import EIE326 from './EIE326'
import GEO1052 from './GEO1052'
import ICI3244 from './ICI3244'
import ING9001 from './ING9001'
import KIN480 from './KIN480'
import LCL213 from './LCL213'
import MAT1004 from './MAT1004'
import MUS2438 from './MUS2438'
import PER1125 from './PER1125'
import QUI1526 from './QUI1526'
import QUI234 from './QUI234'
import TRA491 from './TRA491'
import TSL271 from './TSL271'

const ROUTES: Record<string, React.ComponentType> = {
  'agr475': AGR475,
  'ali498': ALI498,
  'art155': ART155,
  'bio1133': BIO1133,
  'bio250': BIO250,
  'der1021': DER1021,
  'ecm610': ECM610,
  'eie326': EIE326,
  'geo1052': GEO1052,
  'ici3244': ICI3244,
  'ing9001': ING9001,
  'kin480': KIN480,
  'lcl213': LCL213,
  'mat1004': MAT1004,
  'mus2438': MUS2438,
  'per1125': PER1125,
  'qui1526': QUI1526,
  'qui234': QUI234,
  'tra491': TRA491,
  'tsl271': TSL271,
}

export default function App() {
  const [route, setRoute] = useState(() => window.location.hash.replace('#/', '') || '')

  useEffect(() => {
    const handler = () => setRoute(window.location.hash.replace('#/', '') || '')
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  if (route && ROUTES[route]) {
    const GuiaComponent = ROUTES[route]
    return (
      <div>
        <div style={{position:'fixed',top:12,left:12,zIndex:9999}}>
          <a href="#/"
            style={{
              display:'inline-flex',alignItems:'center',gap:6,
              padding:'6px 14px',borderRadius:8,
              backgroundColor:'#002D56',color:'white',
              fontSize:12,fontWeight:700,fontFamily:'Montserrat,sans-serif',
              textDecoration:'none',boxShadow:'0 2px 8px rgba(0,0,0,0.15)'
            }}>
            ← Volver al índice
          </a>
        </div>
        <GuiaComponent />
      </div>
    )
  }

  return <IndexPage />
}
