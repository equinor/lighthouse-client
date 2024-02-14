import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { SingleSelect } from '@equinor/eds-core-react-old';
import { Workflow, WorkflowTemplate } from '../../Types/WorkflowTypes';
import { useState } from 'react';

type SelectWorkflowTemplateProps = {
    workflowOwner: string;
    workflowsQuery: (workflowOwner: string) => QueryFunction<Workflow[]>;
    workflowTemplatesQuery: (workflowId: string) => QueryFunction<WorkflowTemplate[]>;
    updateAtom: (data: any) => void;
};

type QueryFunction<Return> = UseQueryOptions<unknown, unknown, Return, QueryKey>;

export const SelectWorkflowTemplate = ({
    workflowOwner,
    workflowsQuery,
    workflowTemplatesQuery,
    updateAtom,
}: SelectWorkflowTemplateProps): JSX.Element | null => {
    const [value, setValue] = useState<string>('');

    const { data: workflows } = useQuery(workflowsQuery(workflowOwner));
    useQuery([value], {
        queryFn: workflowTemplatesQuery(value).queryFn,
        onSuccess: (data) => {
            if (!data) {
                return;
            }
            updateAtom(data);
        },
    });
    return (
        <>
            <SingleSelect
                items={workflows?.map((x) => x.name) ?? []}
                label=""
                placeholder="Select workflow template"
                size={35}
                handleSelectedItemChange={(change) => {
                    const id = workflows?.find((x) => x.name === change.selectedItem)?.id;
                    setValue(id ?? '');
                }}
            />
        </>
    );
};
