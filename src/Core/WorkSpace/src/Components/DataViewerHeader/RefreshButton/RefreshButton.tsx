import { Button, CircularProgress } from '@equinor/eds-core-react';
import { Case, Switch } from '@equinor/JSX-Switch';
import { ClickableIcon } from '../../../../../../packages/Components/Icon';
import { useDataContext } from '../../../Context/DataProvider';

export const RefreshButton = (): JSX.Element => {
    const { dataApi } = useDataContext();

    return (
        <Button variant="ghost_icon" onClick={() => dataApi.refetch()}>
            <Switch>
                <Case when={dataApi.isFetching}>
                    <CircularProgress size={24} />
                </Case>
                <Case when={!dataApi.isFetching}>
                    <ClickableIcon size={24} name="refresh" />
                </Case>
            </Switch>
        </Button>
    );
};
