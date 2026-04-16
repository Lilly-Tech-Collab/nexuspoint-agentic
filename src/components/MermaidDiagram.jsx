import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

let initialized = false
function initMermaid() {
  if (initialized) return
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: 'base',
    fontFamily: 'JetBrains Mono, monospace',
    themeVariables: {
      darkMode: true,
      background: '#0B0D12',
      primaryColor: '#12141B',
      primaryTextColor: '#F6F1E4',
      primaryBorderColor: '#E5A24A',
      lineColor: '#B6AA8B',
      secondaryColor: '#1A1D26',
      tertiaryColor: '#252934',
      clusterBkg: '#0B0D12',
      clusterBorder: 'rgba(229,162,74,0.35)',
      titleColor: '#F6F1E4',
      edgeLabelBackground: '#0B0D12',
      nodeBorder: '#E5A24A',
      mainBkg: '#12141B',
      textColor: '#F6F1E4',
      fontSize: '14px',
    },
    flowchart: { curve: 'basis', padding: 18, htmlLabels: true },
    sequence: { actorMargin: 48, boxMargin: 10 },
    er:       { fontSize: 13 },
  })
  initialized = true
}

export default function MermaidDiagram({ chart, id }) {
  const ref = useRef(null)
  const [svg, setSvg] = useState('')
  const uid = useRef(id || `m-${Math.random().toString(36).slice(2, 10)}`)

  useEffect(() => {
    initMermaid()
    let cancelled = false
    mermaid.render(uid.current, chart).then(({ svg }) => {
      if (!cancelled) setSvg(svg)
    }).catch((err) => {
      console.error('Mermaid render error:', err)
      if (!cancelled) setSvg(`<pre style="color:#E5A24A">${String(err?.message || err)}</pre>`)
    })
    return () => { cancelled = true }
  }, [chart])

  return (
    <div className="mermaid-wrap" ref={ref} dangerouslySetInnerHTML={{ __html: svg }} />
  )
}
