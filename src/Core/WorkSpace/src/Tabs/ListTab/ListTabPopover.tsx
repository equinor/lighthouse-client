import { Popover } from '@equinor/eds-core-react';
import { ColumnMenuPicker, ExportToExcel } from '@equinor/Table';
import { useWorkSpace } from '../..';
import { tabApis } from '../../Context/LocationProvider';
import { StyledLine, StyledTabWrapper } from './listTab.styles';

export const ListTabPopover = (): JSX.Element | null => {
    const getApi = tabApis.useAtomState()?.table?.getApi;

    const { tableOptions } = useWorkSpace();
    if (!getApi) return null;

    return (
        <>
            <Popover.Title>Table settings</Popover.Title>
            <Popover.Content
                style={{ maxHeight: '70vh', paddingBottom: '10px', overflowY: 'scroll' }}
            >
                <StyledTabWrapper>
                    {tableOptions && tableOptions.excelExport && (
                        <>
                            <ExportToExcel
                                excelExportFn={tableOptions.excelExport}
                                rows={getApi().getRows()}
                            />
                            <StyledLine />
                        </>
                    )}

                    {tableOptions && (
                        <ColumnMenuPicker
                            getApi={getApi}
                            hiddenColumns={tableOptions.hiddenColumns as string[]}
                        />
                    )}
                </StyledTabWrapper>
            </Popover.Content>
        </>
    );
};
