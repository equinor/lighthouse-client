import { ReactSortable } from 'react-sortablejs';
import { DRCFormAtomApi } from '../../../Atoms/formAtomApi';
import { WorkflowStep } from './WorkflowStep';

export const DraggableHandleSelector = 'globalDraggableHandle';
export const WorkflowCustomEditor = (): JSX.Element => {
    const { useAtomState, updateAtom } = DRCFormAtomApi;

    const { steps = [] } = useAtomState(({ steps }) => ({
        steps: steps?.map(
            (v, i): DraggableReleaseControlStep => ({ id: `${i}`, item: { ...v, order: i + 1 } })
        ),
    }));

    const setList = (steps: DraggableReleaseControlStep[]) =>
        updateAtom({ steps: steps.map(({ item }) => item) });

    return (
        <ReactSortable<DraggableReleaseControlStep>
            animation={200}
            handle={`.${DraggableHandleSelector}`}
            list={steps}
            setList={setList}
            onEnd={() => {
                setList(steps);
            }}
        >
            {steps.map((dragItem) => (
                <WorkflowStep
                    key={dragItem.item.order}
                    step={dragItem.item}
                    steps={steps.map(({ item }) => item)}
                />
            ))}
        </ReactSortable>
    );
};

export interface DraggableReleaseControlStep {
    id: string;
    item: ReleaseControlStep;
}

export interface ReleaseControlStep {
    order: number;
    step: string;
    responsible: string;
}
