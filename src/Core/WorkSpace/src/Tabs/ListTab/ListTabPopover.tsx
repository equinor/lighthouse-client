import { Popover } from '@equinor/eds-core-react';
import { ColumnMenuPicker } from '../../../../../packages/Table/Components/ColumnPicker/ColumnPicker';
import { tabApis } from '../../Context/LocationProvider';

export const ListTabPopover = (): JSX.Element | null => {
    const getApi = tabApis.useAtomState()?.table?.getApi;
    if (!getApi) return null;

    return (
        <>
            <Popover.Title>Table settings</Popover.Title>
            <Popover.Content
                style={{ maxHeight: '70vh', paddingBottom: '10px', overflowY: 'scroll' }}
            >
                <ColumnMenuPicker getApi={getApi} />
            </Popover.Content>
        </>
    );
};
