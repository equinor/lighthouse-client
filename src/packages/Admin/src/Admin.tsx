import { Case, Switch } from '@equinor/JSX-Switch';
import { useState } from 'react';
import { AdminMenuWrapper, AdminWorkspaceWrapper, Wrapper } from '../styles/styles';
import { updateContext } from './Atoms/updateContext';
import { AdminMenu } from './Components/Menu/AdminMenu';
import { WorkflowStatuses } from './Components/Workspace/WorkflowStatuses';
import { WorkflowSteps } from './Components/Workspace/WorkflowSteps';
import { Workflows } from './Components/Workspace/Workflows';

interface AdminProps {
    app: string;
    workflowOwner: string;
}

export function Admin({ app, workflowOwner }: AdminProps): JSX.Element {
    const [activeMenuItem, setActiveMenuItem] = useState<number>(3);
    updateContext(app, workflowOwner, undefined);

    const handleChange = (index: number) => {
        setActiveMenuItem(index);
    };
    return (
        <Wrapper>
            <AdminMenuWrapper>
                <AdminMenu activeMenuItem={activeMenuItem} handleChange={handleChange} />
            </AdminMenuWrapper>
            <AdminWorkspaceWrapper>
                <Switch>
                    <Case when={activeMenuItem === 1}>
                        <WorkflowStatuses />
                    </Case>
                    <Case when={activeMenuItem === 2}>
                        <WorkflowSteps />
                    </Case>
                    <Case when={activeMenuItem === 3}>
                        <Workflows />
                    </Case>
                </Switch>
            </AdminWorkspaceWrapper>
        </Wrapper>
    );
}
