import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { Workflow, WorkflowTemplate } from '../../Types/WorkflowTypes';
import { useState } from 'react';
import { Autocomplete } from '@equinor/eds-core-react';
import { SelectionRow } from '../../../../../apps/ReleaseControl/components/Form/releaseControlProcessForm.styles';

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
        <SelectionRow>
            <Autocomplete
                options={workflows?.map((x) => x.name) ?? []}
                label={''}
                placeholder="Select workflow template"
                onOptionsChange={(change) => {
                    const id = workflows?.find((x) => x.name === change.selectedItems[0])?.id;
                    setValue(id ?? '');
                }}
            />
        </SelectionRow>
    );
};
