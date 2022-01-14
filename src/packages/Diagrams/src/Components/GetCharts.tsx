import { BarChartVisual, LineChartVisual, TableVisual, TimeChart } from '@equinor/Diagrams';
import { ConstructionVisual } from '..';
import { Options } from '../Types';
import { HorizontalBarVisual } from '../Visuals/HorizontalBarVisual/HorizontalBarVisual';
import { ChartsWrapper, Circular, Loading } from './GetChartsStyles';

export function getChart<T>(
    data: T[],
    config: Options<T> = { type: 'default' },
    isLoading?: boolean
): JSX.Element {
    let Component: React.FC<{ data: T[] }> = () => <></>;
    if (config.type === 'customVisual') {
        Component = config.options.component;
    }
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
                    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'scroll' }}>
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
        case 'constructionChart':
            return (
                <ChartsWrapper>
                    {!isLoading ? (
                        <ConstructionVisual data={data} options={config.options} />
                    ) : (
                        <Loading>
                            <Circular />
                            Loading...
                        </Loading>
                    )}
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
            return (
                <ChartsWrapper>
                    {!isLoading ? (
                        <Component data={data} />
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
