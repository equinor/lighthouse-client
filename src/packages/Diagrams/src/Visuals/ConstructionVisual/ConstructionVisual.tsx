import { Graph } from './Components';
import { ConstructionGraphProps } from './Types/constructionVisualOptions';

export function ConstructionVisual<T extends unknown>({
    data,
    options,
}: ConstructionGraphProps<T>): JSX.Element | null {
    if (data.length <= 0) {
        return null;
    }

    return <Graph data={data} options={options} />;
}
