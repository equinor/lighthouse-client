import styled from 'styled-components';

import { ResizableSidesheet } from './Components/ResizableSidesheet';
import { getSidesheetContext } from './context/sidesheetContext';
import { useAtom } from '@dbeining/react-atom';

export const PopoutSidesheet = (): JSX.Element | null => {
    const { SidesheetComponent } = useAtom(getSidesheetContext());

    // if sidesheet
    if (!SidesheetComponent) {
        return null;
    }

    return (
        <Wrapper>
            <ResizableSidesheet />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
    width: auto;
    height: 100%;
    background: white;
`;

// borderleft: 2px solid ${tokens.colors.ui.background__medium.rgba};

// const Wrapper = styled.div`
//     background: white;
// `;
