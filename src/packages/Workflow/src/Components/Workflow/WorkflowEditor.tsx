import { useFacility } from '@equinor/lighthouse-portal-client';
import { adminQueries, DraggableStep, FunctionalRole, ProCoSysQueries } from '@equinor/Workflow';
import { useQuery } from 'react-query';
import { ReactSortable } from 'react-sortablejs';
import { WorkflowStep } from './WorkflowStep';

export const DraggableHandleSelector = 'globalDraggableHandle';

interface WorkflowEditorProps {
    atomApi: any;
    app: string;
    workflowOwner: string;
}

export const WorkflowEditor = ({
    atomApi,
    app,
    workflowOwner,
}: WorkflowEditorProps): JSX.Element => {
    const { useAtomState, updateAtom } = atomApi;

    const { workflowSteps = [] } = useAtomState(({ workflowStepTemplates }) => ({
        workflowSteps: workflowStepTemplates?.map(
            (v, i): DraggableStep => ({ id: `${i}`, item: { ...v, order: i + 1 } })
        ),
    }));
    const { procosysPlantId } = useFacility();

    const setList = (workflowSteps: DraggableStep[]) => {
        undragableSteps
            .slice()
            .reverse()
            .forEach((x) => workflowSteps.unshift(x));
        updateAtom({ workflowStepTemplates: workflowSteps.map(({ item }) => item) });
    };

    const { getFunctionalRolesQuery } = ProCoSysQueries;
    const { data: functionalRoles } = useQuery<unknown, unknown, FunctionalRole[]>(
        getFunctionalRolesQuery(procosysPlantId, app.toLocaleUpperCase())
    );
    const { workflowStepsQuery } = adminQueries;

    const { data: availableSteps } = useQuery(workflowStepsQuery(workflowOwner));

    const dragableSteps = workflowSteps.filter((x) => x.item.name !== 'Initiate');
    const undragableSteps = workflowSteps.filter((x) => x.item.name === 'Initiate');

    return (
        <div>
            {undragableSteps.map((workflowStep) => (
                <WorkflowStep
                    key={workflowStep.item.order}
                    step={workflowStep.item}
                    steps={workflowSteps.map(({ item }) => item)}
                    availableSteps={availableSteps ?? []}
                    functionalRoles={functionalRoles}
                    atomApi={atomApi}
                    app={app}
                />
            ))}
            <ReactSortable<DraggableStep>
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
                        //TODO - find unique ID that is not Math.random() for temporary steps?
                        key={dragItem.item.id}
                        step={dragItem.item}
                        steps={workflowSteps.map(({ item }) => item)}
                        availableSteps={availableSteps ?? []}
                        functionalRoles={functionalRoles}
                        atomApi={atomApi}
                        app={app}
                    />
                ))}
            </ReactSortable>
        </div>
    );
};
