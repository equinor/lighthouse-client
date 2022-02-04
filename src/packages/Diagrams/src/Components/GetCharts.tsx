import { BarChartVisual, LineChartVisual, TableVisual, TimeChart } from '@equinor/Diagrams';
import { Options } from '../Types';
import { HorizontalBarVisual } from '../Visuals/HorizontalBarVisual/HorizontalBarVisual';
import { ChartsWrapper, Circular, Loading } from './GetChartsStyles';

export function getChart<T>(
    data: T[],
    config: Options<T> = { type: 'default' },
    isLoading?: boolean
): JSX.Element {
    switch (config.type) {
        case 'barChart':
            return (
                <ChartsWrapper>
                    {!isLoading ? (
                        <BarChartVisual data={data} options={config.options} />
                    ) : (
                        <Loading>
                            <Circular />
                            Loading...
                        </Loading>
                    )}
                </ChartsWrapper>
            );
        case 'lineChart':
            return (
                <ChartsWrapper>
                    {!isLoading ? (
                        <LineChartVisual data={data} options={config.options} />
                    ) : (
                        <Loading>
                            <Circular />
                            Loading...
                        </Loading>
                    )}
                </ChartsWrapper>
            );
        case 'timeBarChart':
            return (
                <ChartsWrapper>
                    {!isLoading ? (
                        <TimeChart<T> data={data} options={config.options} />
                    ) : (
                        <Loading>
                            <Circular />
                            Loading...
                        </Loading>
                    )}
                </ChartsWrapper>
            );
        case 'table':
            // console.log(config.options);
            return (
                <ChartsWrapper>
                    {/* {!isLoading ? ( */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <TableVisual<any> data={data} options={config.options} />
                    </div>
                    {/* ) : (
                        <Loading>
                            <Circular />
                            Loading...
                        </Loading>
                    )} */}
                </ChartsWrapper>
            );
        case 'horizontalBarChart':
            return (
                <ChartsWrapper>
                    {/* {!isLoading ? ( */}
                    <HorizontalBarVisual data={data} options={config.options} />
                    {/* ) : (
                        <Loading>
                            <Circular />
                            Loading...
                        </Loading>
                    )} */}
                </ChartsWrapper>
            );
        case 'customVisual':
            const Component = config.options.component;
            return (
                <ChartsWrapper>
                    {!isLoading ? (
                        <Component data={data} {...config.options.componentProps} />
                    ) : (
                        <Loading>
                            <Circular />
                            Loading...
                        </Loading>
                    )}
                </ChartsWrapper>
            );

        case 'default':
            return <></>;
        default:
            return <></>;
    }
}
