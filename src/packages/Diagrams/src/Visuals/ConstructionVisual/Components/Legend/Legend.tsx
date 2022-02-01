import { Chart, LegendItem } from 'chart.js';
import { AccumulatedBox, Box, List, ListItem, ListText } from './styles';
type LegendProps = {
    chart: Chart;
};
export const Legend = (props: LegendProps): JSX.Element | null => {
    const onClick = (item: LegendItem) => {
        props.chart.setDatasetVisibility(
            item.datasetIndex,
            !props.chart.isDatasetVisible(item.datasetIndex)
        );

        props.chart.update();
    };
    if (props.chart?.options?.plugins?.legend?.labels?.generateLabels) {
        const items = props.chart.options.plugins.legend.labels.generateLabels(props.chart);

        return (
            <List>
                {items.map((item) => {
                    return (
                        <ListItem onClick={() => onClick(item)} key={item.text}>
                            {item.text === 'accumulated' ? (
                                <AccumulatedBox strokeStyle={item.strokeStyle?.toString() || ''} />
                            ) : item.text === 'w04-w08 acc' ? (
                                <Box
                                    fillStyle={item.fillStyle?.toString() || ''}
                                    strokeStyle={item.strokeStyle?.toString() || ''}
                                    lineWidth={item.lineWidth || 0}
                                    height={2}
                                />
                            ) : (
                                <Box
                                    fillStyle={item.fillStyle?.toString() || ''}
                                    strokeStyle={item.strokeStyle?.toString() || ''}
                                    lineWidth={item.lineWidth || 0}
                                    height={15}
                                />
                            )}

                            <ListText
                                color={item.fontColor?.toString() || ''}
                                isHidden={item.hidden}
                            >
                                {item.text}
                            </ListText>
                        </ListItem>
                    );
                })}
            </List>
        );
    } else return null;
};
