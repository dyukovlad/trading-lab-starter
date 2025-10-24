import { eventBus } from '../core/eventBus'
import { createChart } from './chart'


export function mountApp(root: HTMLElement) {
root.innerHTML = `
<div class="header">Trading Lab — Starter</div>
<div class="container">
<div class="canvasWrap"><canvas id="chart" width="900" height="400"></canvas></div>
<div>
<h4>Controls</h4>
<button id="load">Load sample data</button>
</div>
</div>
`


const canvas = document.getElementById('chart') as HTMLCanvasElement
const chart = createChart(canvas)


document.getElementById('load')!.addEventListener('click', async () => {
const resp = await fetch('/src/data/sample-data.json')
const data = await resp.json()
eventBus.emit('data:loaded', data)
})


// subscribe
eventBus.on('data:loaded', (data) => chart.setData(data))
}
