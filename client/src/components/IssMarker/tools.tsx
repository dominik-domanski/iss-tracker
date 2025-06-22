import { renderToString } from 'react-dom/server'
import { IssIcon } from './IssIcon'

import './IssMarker.css'

const HEADING_DELTA = 270

const generateStyle = (iconSize: number, color: string, heading: number, isConnected: boolean) => `
  width: ${iconSize}px;
  height: ${iconSize}px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${color};
  border: 1px solid ${color};
  border-radius: 50%;
  background: ${isConnected ? 'hsla(0, 0%, 100%, 1)' : 'hsla(0, 100%, 40%, 1)'};
  transform: rotate(${heading + HEADING_DELTA}deg);
  transform-origin: center;
`

export const generateMarkerHtml = (heading: number, isConnected: boolean) => {
  const style = generateStyle(32, 'hsla(214, 54%, 45%, 1)', heading, isConnected)

  return `
      <div style="${style}">
        ${renderToString(<IssIcon />)}
      </div>
    `
}
