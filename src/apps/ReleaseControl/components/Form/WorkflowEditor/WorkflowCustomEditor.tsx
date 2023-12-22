import { useFacility } from '@equinor/lighthouse-portal-client';
import { FunctionalRole, adminQueries } from '@equinor/Workflow';
import { useQuery } from 'react-query';
import { ReactSortable } from 'react-sortablejs';
import { DRCFormAtomApi } from '../../../Atoms/formAtomApi';
import { ProCoSysQueries } from '../../../hooks/ProCoSysQueries';
import { DraggableReleaseControlStep } from '../../../types/releaseControl';
import { WorkflowStep } from './WorkflowStep';
import { CircularProgress } from '@equinor/eds-core-react';

const workflowOwner = 'ReleaseControl';

export const DraggableHandleSelector = 'globalDraggableHandle';
type WorkflowCustomEditorProps = {
    isEditMode?: boolean;
};
export const WorkflowCustomEditor = ({
    isEditMode = false,
}: WorkflowCustomEditorProps): JSX.Element => {
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

    const { workflowStepsQuery } = adminQueries;

    const { data: availableSteps, isLoading, error } = useQuery(workflowStepsQuery(workflowOwner));

    const dragableSteps = workflowSteps.filter(
        (x) => !x.item.isCompleted && x.item.name !== 'Initiate' && !x.item.isCurrent
    );
    const undragableSteps = workflowSteps.filter(
        (x) => x.item.isCompleted || x.item.name === 'Initiate' || x.item.isCurrent
    );

    if (isLoading) {
        return <CircularProgress size={32} />;
    }

    if (error) {
        return <p>ohh ohh failed to fetch workflowsteps</p>;
    }

    return (
        <>
            {undragableSteps.map((workflowStep) => (
                <WorkflowStep
                    availableSteps={availableSteps ?? []}
                    key={workflowStep.item.order}
                    step={workflowStep.item}
                    steps={workflowSteps.map(({ item }) => item)}
                    functionalRoles={functionalRoles}
                    isEditMode={isEditMode}
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
                        availableSteps={availableSteps ?? []}
                        //TODO - find unique ID that is not Math.random() for temporary steps?
                        key={dragItem.item.id}
                        step={dragItem.item}
                        steps={workflowSteps.map(({ item }) => item)}
                        functionalRoles={functionalRoles}
                    />
                ))}
            </ReactSortable>
        </>
    );
};
