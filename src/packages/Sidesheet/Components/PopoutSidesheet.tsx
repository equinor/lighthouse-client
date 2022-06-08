import { useAtom } from '@dbeining/react-atom';
import { tokens } from '@equinor/eds-tokens';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';
import { getSidesheetContext } from '../context/sidesheetContext';
import { ResizableSidesheet } from './ResizableSidesheet';

export const PopoutSidesheet = (): JSX.Element | null => {
    const { SidesheetComponent, props } = useAtom(getSidesheetContext());
    const navigate = useNavigate();
    const location = useLocation();

    /**
     * Removes hash from url when closed
     */
    useEffect(() => {
        if (window.location.hash.length > 0) return;
        if (!props) {
            navigate(location.pathname, { replace: true });
        }
    }, [props, location.pathname, location.hash.length, navigate]);

    // if sidesheet
    if (!SidesheetComponent) {
        return <div></div>;
    }

    return (
        <Wrapper>
            <ResizableSidesheet />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: auto;
    height: 100%;
    background: white;
    border-left: 2px solid ${tokens.colors.ui.background__medium.rgba};
`;
