import { CircularProgress } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { Case, Switch } from '@equinor/JSX-Switch';
import { ClickableIcon } from '../../../../../../packages/Components/Icon';
import { useDataContext } from '../../../Context/DataProvider';
import { useIntervalTimestamp } from '../../../Hooks/useIntervalTimestamp';
import { TabButton } from '../../ToggleButton';

export const RefreshButton = (): JSX.Element => {
    const { dataApi } = useDataContext();
    const timestamp = useIntervalTimestamp(dataApi?.dataUpdatedAt);

    return (
        <TabButton
            color={
                dataApi?.isStale ? tokens.colors.infographic.primary__energy_red_100.hex : 'grey'
            }
            aria-selected={false}
            title={
                dataApi?.isStale
                    ? 'This data is over 1 hour old and might be outdated'
                    : `Updated: ${timestamp}`
            }
            onClick={() => dataApi.refetch()}
        >
            <Switch>
                <Case when={dataApi.isFetching}>
                    <CircularProgress size={24} />
                </Case>
                <Case when={!dataApi.isFetching}>
                    <ClickableIcon size={24} name="refresh" />
                </Case>
            </Switch>
        </TabButton>
    );
};
