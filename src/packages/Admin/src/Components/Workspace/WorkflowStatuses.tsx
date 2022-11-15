import { openSidesheet } from '@equinor/sidesheet';
import { ButtonText, NewButton } from '../../../styles/styles';
import { ReleaseControlStatuses } from '@equinor/Workflow';
import { SidesheetWrapper } from '../Sidesheet/SidesheetWrapper';
import { StatusesTable } from './StatusesTable';

async function openAdminSidesheet(id: string): Promise<void> {
    openSidesheet(SidesheetWrapper, id, undefined);
}

export const WorkflowStatuses = (): JSX.Element | null => {
    // const app = useAdminContext((s) => s.app);
    // const workflowOwner = useAdminContext((s) => s.workflowOwner);

    // const { data, error } = useQuery([app, workflowOwner], () => getStatuses({ app, workflowOwner }));

    // if (error) {
    //     return (
    //         <Loading>
    //             <div>Failed to load statuses</div>
    //         </Loading>
    //     );
    // }

    const statuses = Object.values(ReleaseControlStatuses).map((status) => {
        return { id: undefined, name: status };
    });

    return (
        <>
            <NewButton onClick={() => openAdminSidesheet('newstatus')}>
                <ButtonText>Add status</ButtonText>
            </NewButton>
            <StatusesTable statuses={statuses ?? []} />
        </>
    );
};
