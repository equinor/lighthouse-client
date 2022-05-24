import { useQuery } from 'react-query';
import { ReactSortable } from 'react-sortablejs';
import { DRCFormAtomApi } from '../../../Atoms/formAtomApi';
import { ProCoSysQueries } from '../../../hooks/ProCoSysQueries';
import { FunctionalRole } from '../../../types/functionalRole';
import { DraggableReleaseControlStep } from '../../../types/releaseControl';
import { WorkflowStep } from './WorkflowStep';

export const DraggableHandleSelector = 'globalDraggableHandle';
export const WorkflowCustomEditor = (): JSX.Element => {
    const { useAtomState, updateAtom } = DRCFormAtomApi;

    const { workflowSteps = [] } = useAtomState(({ workflowSteps }) => ({
        workflowSteps: workflowSteps?.map(
            (v, i): DraggableReleaseControlStep => ({ id: `${i}`, item: { ...v, order: i + 1 } })
        ),
    }));

    const setList = (workflowSteps: DraggableReleaseControlStep[]) =>
        updateAtom({ workflowSteps: workflowSteps.map(({ item }) => item) });

    const { getFunctionalRolesQuery } = ProCoSysQueries;

    const { data: functionalRoles } = useQuery<unknown, unknown, FunctionalRole[]>(
        getFunctionalRolesQuery('JCA')
    );

    return (
        <ReactSortable<DraggableReleaseControlStep>
            animation={200}
            handle={`.${DraggableHandleSelector}`}
            list={workflowSteps}
            setList={setList}
            onEnd={() => {
                setList(workflowSteps);
            }}
        >
            {workflowSteps.map((dragItem) => (
                <WorkflowStep
                    key={dragItem.item.order}
                    step={dragItem.item}
                    steps={workflowSteps.map(({ item }) => item)}
                    functionalRoles={functionalRoles}
                />
            ))}
        </ReactSortable>
    );
};
