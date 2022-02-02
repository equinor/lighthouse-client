import { Chart } from 'chart.js';
import ReactDOM from 'react-dom';
import { Legend } from '../Components';

type HtmlLegendOptions = {
    containerID: string;
};

const afterUpdate = (chart: Chart, _args: unknown, _options: HtmlLegendOptions) => {
    chart && ReactDOM.render(<Legend chart={chart} />, document.getElementById('legend-container'));
};

export const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate: afterUpdate,
};
