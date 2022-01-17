import { useAtom } from '@dbeining/react-atom';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { ResizableSidesheet } from './ResizableSidesheet';
import { getSidesheetContext } from '../context/sidesheetContext';
import { ErrorBoundary } from '@equinor/ErrorBoundary';
import ErrorFallbackSidesheet from '../../../Core/ErrorBoundary/Components/ErrorFallbackSidesheet';

export const PopoutSidesheet = (): JSX.Element | null => {
    const { SidesheetComponent } = useAtom(getSidesheetContext());

    // if sidesheet
    if (!SidesheetComponent) {
        return null;
    }

    return (
        <ErrorBoundary FallbackComponent={ErrorFallbackSidesheet} routeName={'Sidesheet'}>
            <Wrapper>
                <ResizableSidesheet />
            </Wrapper>
        </ErrorBoundary>
    );
};

const Wrapper = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
    width: auto;
    height: 100%;
    background: white;
    border-left: 2px solid ${tokens.colors.ui.background__medium.rgba};
    overflow: scroll;
`;
