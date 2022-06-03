import { RendererConfiguration, setupEcho3dWeb } from '@equinor/echo3dweb-viewer';
import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useAppConfig, useAuthProvider, useFacility } from '@equinor/lighthouse-portal-client';
import { useEffect, useRef } from 'react';
import { SelectionMenu } from './components/selectionMenu';
import { ModelViewerContextProvider, useModelViewerContext } from './context/modelViewerContext';
import { useModel } from './hooks/useLoadModel';
import { T5602_M02 } from './mocTags/5602-M02';
import { AP300 } from './mocTags/AP300';
import { Menu, Message, MessageWrapper, Selections, Wrapper } from './ModelViewerStyles';
import { getModels, selectPlantByContext } from './utils/getCurrentContextModel';

export interface ModelViewerProps {
    tags?: string[];
    loadFullModel?: boolean;
    padding?: number;
}

export interface ViewerProps extends ModelViewerProps {
    echoPlantId: string;
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
}: ViewerProps): JSX.Element => {
    const viewerRef = useRef<HTMLCanvasElement>(null);
    const authProvider = useAuthProvider();
    const { urls, scope } = useAppConfig();
    const {
        setEcho3DClient,
        setPlantState,
        isLoading,
        selectTags,

        message,
        setMessage,
    } = useModelViewerContext();
    useModel(loadFullModel);

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
            loadingCallback: () => console.log('loading...'),
            clearColor: tokens.colors.ui.background__info.hex,
        };

        (async () => {
            if (!viewerRef.current) return;
            try {
                const client = await setupEcho3dWeb(
                    viewerRef.current,
                    modelDistributionConfig,
                    hierarchyConfig,
                    renderConfig
                );
                client.viewer.cameraControlsEnabled = true;
                const plants = await getModels(client.modelApiClient);
                setPlantState(selectPlantByContext(plants, echoPlantId));
                setEcho3DClient(client);
                if (tags) {
                    selectTags(tags, padding);
                }
            } catch (ex) {
                console.log(ex);
                setMessage({ message: 'Failed to setup Echo 3D web client', type: 'NoPlant' });
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authProvider]);

    return (
        <>
            <Wrapper>
                <canvas ref={viewerRef} />
            </Wrapper>
            {(message || isLoading) && (
                <MessageWrapper>
                    {isLoading && <Message>Loading...</Message>}
                    {message && (
                        <Message
                            onClick={() => {
                                setMessage();
                            }}
                        >
                            <h2>{message.message}</h2>
                            {message.type === 'NoPlant' && (
                                <Button
                                    onClick={() => {
                                        window.open(
                                            `https://accessit.equinor.com/Search/Search?term=echo+${echoPlantId}`
                                        );
                                    }}
                                >
                                    Apply for access
                                </Button>
                            )}
                        </Message>
                    )}
                </MessageWrapper>
            )}
            <Selections>
                <Menu>
                    <Button
                        variant="ghost_icon"
                        onClick={() => {
                            selectTags(AP300, padding);
                        }}
                    >
                        T1
                    </Button>
                    <Button
                        variant="ghost_icon"
                        onClick={() => {
                            selectTags(T5602_M02, padding);
                        }}
                    >
                        T2
                    </Button>
                </Menu>
            </Selections>
            <SelectionMenu />
        </>
    );
};
