import { Chart } from 'chart.js';
import { ChartNames } from './config';

export const getOrCreateLegendList = (_chart: Chart, id: string): HTMLUListElement => {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer?.querySelector('ul');

    if (!listContainer) {
        listContainer = document.createElement('ul');
        listContainer.style.display = 'flex';
        listContainer.style.justifyContent = 'center';
        listContainer.style.flexDirection = 'row';
        listContainer.style.margin = '0';
        listContainer.style.padding = '0';

        legendContainer?.appendChild(listContainer);
    }

    return listContainer;
};
type HtmlLegendOptions = {
    containerID: string;
};

const afterUpdate = (chart: Chart, _args: unknown, options: HtmlLegendOptions) => {
    //TODO: Using ReactDOM.render causes the graph to fail and not load when filtering
    // chart && ReactDOM.render(<Legend chart={chart} />, document.getElementById('legend-container'));
    const ul = getOrCreateLegendList(chart, options.containerID);

    // Remove old legend items
    while (ul.firstChild) {
        ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    if (chart?.options?.plugins?.legend?.labels?.generateLabels) {
        const items = chart.options.plugins.legend.labels.generateLabels(chart);
        items.forEach((item) => {
            const li = document.createElement('li');
            li.style.alignItems = 'center';
            li.style.cursor = 'pointer';
            li.style.display = 'flex';
            li.style.flexDirection = 'row';
            li.style.marginLeft = '10px';

            li.onclick = () => {
                chart.setDatasetVisibility(
                    item.datasetIndex,
                    !chart.isDatasetVisible(item.datasetIndex)
                );

                chart.update();
            };

            // Color box
            const boxSpan = document.createElement('span');

            boxSpan.style.marginRight = '10px';
            boxSpan.style.width = '30px';
            boxSpan.style.display = 'inline-block';
            if (item.text === ChartNames.ACC) {
                boxSpan.style.borderBottom = `2px dashed ${item.strokeStyle?.toString()}`;
            } else {
                boxSpan.style.height = item.text === ChartNames.WOACC ? '2px' : '15px';
                boxSpan.style.background = item.fillStyle?.toString() || '';
                boxSpan.style.borderColor = item.strokeStyle?.toString() || '';
                boxSpan.style.borderWidth = item.lineWidth + 'px';
            }

            // Text
            const textContainer = document.createElement('p');
            textContainer.style.color = item.fontColor?.toString() || '';
            textContainer.style.margin = '0';
            textContainer.style.padding = '0';
            textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

            const text = document.createTextNode(item.text);
            textContainer.appendChild(text);

            li.appendChild(boxSpan);
            li.appendChild(textContainer);
            ul.appendChild(li);
        });
    }
};

export const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate: afterUpdate,
};
