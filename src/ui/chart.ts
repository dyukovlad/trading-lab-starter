export function createChart(canvas: HTMLCanvasElement) {
const ctx = canvas.getContext('2d')!
let data: Array<any> = []


function clear() {
ctx.clearRect(0,0,canvas.width,canvas.height)
}


function render() {
clear()
ctx.fillStyle = '#fff'
ctx.fillRect(0,0,canvas.width,canvas.height)


if (!data.length) {
ctx.fillStyle = '#444'
ctx.fillText('No data loaded — press "Load sample data"', 20, 20)
return
}


// very simple rendering: draw close price line
ctx.beginPath()
data.forEach((d, i) => {
const x = 10 + i * 6
const y = canvas.height - (d.close / data[0].close) * (canvas.height - 40)
if (i === 0) ctx.moveTo(x, y)
else ctx.lineTo(x, y)
})
ctx.strokeStyle = '#2b6cb0'
ctx.stroke()
}


function setData(d: Array<any>) {
data = d
render()
}


return { setData }
}
