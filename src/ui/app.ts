import { eventBus } from '../core/eventBus';
import { createChart } from './chart';

const mountApp = (root: HTMLElement) => {
  root.innerHTML = `
    <div>
        <div class='header'>
            <div class="header_name">Trading Lab — Starter</div>
            <button id="load">Load sample data</button>
        </div>
        <div class="container">
            <div class="canvasWrap"><canvas id="chart" width="1200" height="600"></canvas></div>
        </div>
    </div>
`;

  const canvas = document.getElementById('chart') as HTMLCanvasElement;
  const chart = createChart(canvas);

  document.getElementById('load')!.addEventListener('click', async () => {
    const resp = await fetch('/src/data/sample-data.json');

    const data = await resp.json();
    eventBus.emit('data:loaded', data);
  });

  // subscribe
  eventBus.on('data:loaded', (data) => chart.setData(data));
};

export { mountApp };
