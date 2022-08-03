import { useFacility } from '@equinor/lighthouse-portal-client';
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
    const { procosysPlantId } = useFacility();

    const setList = (workflowSteps: DraggableReleaseControlStep[]) => {
        undragableSteps
            .slice()
            .reverse()
            .forEach((x) => workflowSteps.unshift(x));
        updateAtom({ workflowSteps: workflowSteps.map(({ item }) => item) });
    };

    const { getFunctionalRolesQuery } = ProCoSysQueries;
    const { data: functionalRoles } = useQuery<unknown, unknown, FunctionalRole[]>(
        getFunctionalRolesQuery(procosysPlantId, 'RELEASECONTROL')
    );

    const dragableSteps = workflowSteps.filter(
        (x) => !x.item.isCompleted && x.item.name !== 'Initiate'
    );
    const undragableSteps = workflowSteps.filter(
        (x) => x.item.isCompleted || x.item.name === 'Initiate'
    );
    return (
        <>
            {undragableSteps.map((workflowStep) => (
                <WorkflowStep
                    key={workflowStep.item.order}
                    step={workflowStep.item}
                    steps={workflowSteps.map(({ item }) => item)}
                    functionalRoles={functionalRoles}
                />
            ))}
            <ReactSortable<DraggableReleaseControlStep>
                animation={200}
                handle={`.${DraggableHandleSelector}`}
                list={dragableSteps}
                setList={setList}
                onEnd={() => {
                    setList(dragableSteps);
                }}
            >
                {dragableSteps.map((dragItem) => (
                    <WorkflowStep
                        key={dragItem.item.order}
                        step={dragItem.item}
                        steps={workflowSteps.map(({ item }) => item)}
                        functionalRoles={functionalRoles}
                    />
                ))}
            </ReactSortable>
        </>
    );
};
