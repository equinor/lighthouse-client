import { RendererConfiguration } from '@equinor/echo3dweb-viewer';
import { Button, CircularProgress } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { Case, Switch } from '@equinor/JSX-Switch';
import { Icon } from '@equinor/lighthouse-components';
import { useAppConfig, useAuthProvider, useFacility } from '@equinor/lighthouse-portal-client';
import { useEffect, useRef } from 'react';
import { SelectionAction, SelectionMenu } from './components/selectionMenu';
import { ModelViewerContextProvider, useModelViewerContext } from './context/modelViewerContext';
import { useModel } from './hooks/useLoadModel';
import { Message, MessageWrapper, Wrapper } from './ModelViewerStyles';

export interface ModelViewerProps {
    tags?: string[];
    loadFullModel?: boolean;
    padding?: number;
    selectionActions?: SelectionAction[];
    platformSectionId?: string;
}
export interface ViewerProps extends ModelViewerProps {
    echoPlantId: string;
    children?: React.ReactNode;
}

export const ModelViewer: React.FC<ModelViewerProps> = (props: ModelViewerProps): JSX.Element => {
    const { echoPlantId } = useFacility();

    return (
        <ModelViewerContextProvider>
            <Viewer {...props} echoPlantId={echoPlantId} />
        </ModelViewerContextProvider>
    );
};

export const Viewer: React.FC<ViewerProps> = ({
    tags,
    loadFullModel,
    padding = 1,
    echoPlantId,
    selectionActions,
    children,
    platformSectionId,
}: ViewerProps): JSX.Element => {
    const viewerRef = useRef<HTMLCanvasElement>(null);
    const authProvider = useAuthProvider();
    const { urls, scope } = useAppConfig();
    const { isLoading, message, setMessage, setup, selection, echo3DClient } =
        useModelViewerContext();
    useModel(loadFullModel, tags, padding);

    /**
     * Setup the Echo3DClient
     */
    useEffect(() => {
        if (!authProvider) return;
        const getModelDistributionToken = () => authProvider.getAccessToken([scope.echoModelDist]);
        const getHierarchyToken = () => authProvider.getAccessToken([scope.echoHierarchy]);

        const modelDistributionConfig = {
            baseUrl: urls.echoModelDist,
            getAccessToken: getModelDistributionToken,
        };
        const hierarchyConfig = {
            baseUrl: urls.echoHierarchy,
            getAccessToken: getHierarchyToken,
        };
        const renderConfig: RendererConfiguration = {
            clearColor: tokens.colors.ui.background__info.hex,
        };

        (async () => {
            if (!viewerRef.current) return;
            try {
                setup(
                    echoPlantId,
                    viewerRef.current,
                    modelDistributionConfig,
                    hierarchyConfig,
                    renderConfig,
                    platformSectionId
                );
            } catch (ex) {
                console.log(ex);
                setMessage({ message: 'Failed to setup Echo 3D web client', type: 'NoPlant' });
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authProvider]);

    useEffect(() => {
        return () => {
            echo3DClient?.viewer.disposeAll();
        };
    }, []);

    return (
        <>
            <Wrapper>
                <canvas ref={viewerRef} />
                {children && children}

                {isLoading && !selection && (
                    <MessageWrapper>
                        <Message>
                            <CircularProgress />
                        </Message>
                    </MessageWrapper>
                )}
                {message && (
                    <MessageWrapper>
                        <Switch defaultCase={<h2>{message.message}</h2>}>
                            <Case when={message.type === 'NoPlant'}>
                                <Message
                                    onClick={() => {
                                        setMessage();
                                    }}
                                >
                                    <h2>{message.message}</h2>

                                    <Button
                                        onClick={() => {
                                            window.open(
                                                `https://accessit.equinor.com/Search/Search?term=echo+${echoPlantId}`
                                            );
                                        }}
                                    >
                                        Apply for access
                                    </Button>
                                </Message>
                            </Case>
                            <Case when={message.type === 'NoTags'}>
                                <Message
                                    onClick={() => {
                                        setMessage();
                                    }}
                                >
                                    <Icon
                                        name={'warning_outlined'}
                                        color={tokens.colors.interactive.warning__resting.rgba}
                                        size={48}
                                    />
                                    <h2>{message.message}</h2>
                                </Message>
                            </Case>
                        </Switch>
                    </MessageWrapper>
                )}
            </Wrapper>
            <SelectionMenu selectionActions={selectionActions} />
        </>
    );
};
