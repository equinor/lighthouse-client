import { PowerBI } from '@equinor/lighthouse-powerbi';
import styled from 'styled-components';
import { useDataContext } from '../Context/DataProvider';
import { useViewerContext } from '../Context/ViewProvider';

export const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

export const PowerBiTab = (): JSX.Element | null => {
    const { powerBiOptions } = useDataContext();
    const { activePage, isFilterActive } = useViewerContext();

    if (powerBiOptions) {
        return (
            <Wrapper>
                <PowerBI
                    reportUri={powerBiOptions?.reportURI}
                    filterOptions={powerBiOptions.filter}
                    options={{
                        ...powerBiOptions.options,
                        activePage: activePage?.pageId,
                        isFilterActive,
                        defaultPage: activePage?.pageId,
                    }}
                />
            </Wrapper>
        );
    }
    return null;
};
