import { Chart, LegendItem } from 'chart.js';
import styled from 'styled-components';

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
    const ul = getOrCreateLegendList(chart, options.containerID);

    // chart &&
    //     chart.canvas &&
    //     ReactDOM.render(<Test chart={chart} />, document.getElementById('legend-container'));
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
            if (item.text === 'accumulated') {
                boxSpan.style.borderBottom = `2px dashed ${item.strokeStyle?.toString()}`;
            } else if (item.text === 'w04-w08 acc') {
                boxSpan.style.height = '2px';
                boxSpan.style.background = item.fillStyle?.toString() || '';
                boxSpan.style.borderColor = item.strokeStyle?.toString() || '';
                boxSpan.style.borderWidth = item.lineWidth + 'px';
            } else {
                boxSpan.style.height = '15px';
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

const ListItem = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    margin-left: 10px;
`;
// type BoxSpanProps = {
//     fillStyle: string;
//     strokeStyle: string;
//     lineWidth: string;
// };
// const BoxSpan = styled.span<BoxSpanProps>`
//     margin-right: 10px;
//     width: 30px;
//     display: inline-block;
// `;
// const BoxSpanAccumulated = styled(BoxSpan)`
//     border-bottom: ${(props) => `2px dashed ${props.strokeStyle}`};
// `;
// const OtherBoxSpans = styled(BoxSpan)`
//     background: ${(props) => props.fillStyle};
//     border-color: ${(props) => props.strokeStyle};
//     border-width: ${(props) => props.lineWidth}px;
// `;
// const BoxSpanWOAccumulated = styled(OtherBoxSpans)`
//     height: 2px;
// `;
// const RectangleBoxSpan = styled(OtherBoxSpans)`
//     height: 15px;
// `;
type LegendProps = {
    chart: Chart;
};
export const Test = (props: LegendProps) => {
    const onClick = (item: LegendItem) => {
        props.chart.setDatasetVisibility(
            item.datasetIndex,
            !props.chart.isDatasetVisible(item.datasetIndex)
        );

        props.chart.update();
    };
    if (!props?.chart) return null;
    if (
        props.chart?.options?.plugins?.legend?.labels?.generateLabels &&
        props.chart?.options?.plugins?.legend?.labels?.generateLabels(props.chart).length > 0
    ) {
        const items = props.chart.options.plugins.legend.labels.generateLabels(props.chart);

        return (
            <ul
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    margin: 0,
                    padding: 0,
                }}
            >
                {items.map((item) => {
                    return (
                        <ListItem onClick={() => onClick(item)} key={item.text}>
                            {item.text === 'accumulated' ? (
                                <>
                                    <span
                                        style={{
                                            width: '30px',
                                            display: 'inline-block',
                                            marginRight: '10px',
                                            borderBottom: `2px dashed ${
                                                item.strokeStyle?.toString() || ''
                                            }`,
                                        }}
                                    ></span>
                                    <p
                                        style={{
                                            color: `${item.fontColor?.toString() || ''}`,
                                            textDecoration: item.hidden ? 'line-through' : '',
                                            padding: 0,
                                            margin: 0,
                                        }}
                                    >
                                        {item.text}
                                    </p>
                                </>
                            ) : item.text === 'wo4-wo8 acc' ? (
                                <>
                                    <span
                                        style={{
                                            width: '30px',
                                            display: 'inline-block',
                                            marginRight: '10px',
                                            background: `${item.fillStyle?.toString() || ''}`,
                                            borderColor: `${item.strokeStyle?.toString() || ''}`,
                                            borderWidth: `${item.lineWidth}px`,
                                            height: '2px',
                                        }}
                                    ></span>
                                    <p
                                        style={{
                                            color: `${item.fontColor?.toString() || ''}`,
                                            textDecoration: item.hidden ? 'line-through' : '',
                                            padding: 0,
                                            margin: 0,
                                        }}
                                    >
                                        {item.text}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <span
                                        style={{
                                            width: '30px',
                                            display: 'inline-block',
                                            marginRight: '10px',
                                            background: `${item.fillStyle?.toString() || ''}`,
                                            borderColor: `${item.strokeStyle?.toString() || ''}`,
                                            borderWidth: `${item.lineWidth}px`,
                                            height: '15px',
                                        }}
                                    ></span>
                                    <p
                                        style={{
                                            color: `${item.fontColor?.toString() || ''}`,
                                            textDecoration: item.hidden ? 'line-through' : '',
                                            padding: 0,
                                            margin: 0,
                                        }}
                                    >
                                        {item.text}
                                    </p>
                                </>
                            )}
                        </ListItem>
                    );
                })}
            </ul>
        );
    } else return null;
};
