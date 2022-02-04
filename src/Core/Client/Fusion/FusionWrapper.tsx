import { createFusionContext, FusionContext } from '@equinor/fusion';
import { FusionContent, FusionRoot } from '@equinor/fusion-components';
import { StylesProvider, theme, ThemeProvider } from '@equinor/fusion-react-styles';
import { PropsWithChildren, useRef } from 'react';
import FusionAuthContainer from './core/FusionAuthContainer';
import { serviceResolver } from './services/serviceResolver';

interface FusionWrapperProps {
    children: React.ReactNode;
    authContainer: FusionAuthContainer;
}

export const FusionWrapper = ({
    children,
    authContainer,
}: PropsWithChildren<FusionWrapperProps>): JSX.Element | null => {
    const root = useRef(document.createElement('div'));
    const overlay = useRef(document.createElement('div'));

    const headerContent = useRef<HTMLElement | null>(null);
    const headerAppAside = useRef<HTMLElement | null>(null);

    const fusionContext = createFusionContext(
        authContainer,
        serviceResolver,
        {
            headerAppAside,
            headerContent,
            overlay,
            root,
        },
        {
            // Todo get client evn and det the desired fusion env now showing dev / prod is "FPRD" .
            environment: {
                env: 'FPRD',
            },
            loadBundlesFromDisk: false,
        }
    );

    return (
        <FusionContext.Provider value={fusionContext}>
            <ThemeProvider theme={theme}>
                <StylesProvider seed="portal">
                    <FusionRoot rootRef={root} overlayRef={overlay}>
                        <FusionContent>{children}</FusionContent>
                    </FusionRoot>
                </StylesProvider>
            </ThemeProvider>
        </FusionContext.Provider>
    );
};
