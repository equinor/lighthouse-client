import { NodeAppearance } from '@cognite/reveal';
import { RendererConfiguration, setupEcho3dWeb } from '@equinor/echo3dweb-viewer';
import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useAppConfig, useAuthProvider, useFacility } from '@equinor/portal-client';
import { useEffect, useRef } from 'react';
import Icon from '../../components/Icon/Icon';
import { ModelViewerContextProvider, useModelViewerContext } from './context/modelviewerContext';
import { useModel } from './hooks/useLoadModel';
import { Menu, Message, MessageWrapper, Wrapper, WrapperMenu } from './ModelViewerStyles';
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

const Viewer: React.FC<ViewerProps> = ({
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
        selection,
        message,
        setMessage,
    } = useModelViewerContext();
    useModel(loadFullModel);

    /**
     * Setup the Echo3DClient
     */
    useEffect(() => {
        if (!authProvider) return;
        const getModelDistributionToken = () =>
            authProvider.getAccessToken([
                'd484c551-acf8-45bc-b1e8-3f4373bd0d42/user_impersonation',
            ]);
        const getHierarchyToken = () =>
            authProvider.getAccessToken([
                'ebc04930-bf9c-43e5-98bc-bc90865600b8/user_impersonation',
            ]);

        const modelDistributionConfig = {
            baseUrl: 'https://app-echomodeldist-dev.azurewebsites.net',
            getAccessToken: getModelDistributionToken,
        };
        const hierarchyConfig = {
            baseUrl: 'https://app-echo-hierarchy-dev.azurewebsites.net',
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
                const plants = await getModels(client.modelApiClient);
                setPlantState(selectPlantByContext(plants, echoPlantId));
                setEcho3DClient(client);

                if (tags) {
                    selectTags(tags, padding);
                }
            } catch (ex) {
                console.log(ex);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authProvider]);

    return (
        <>
            <Wrapper>
                <canvas ref={viewerRef} />
            </Wrapper>
            <MessageWrapper>
                {isLoading && <Message>Loading...</Message>}
                {message && (
                    <Message
                        onClick={() => {
                            setMessage();
                        }}
                    >
                        {message.message}
                    </Message>
                )}
            </MessageWrapper>
            <WrapperMenu>
                <Menu>
                    <Button
                        variant="ghost_icon"
                        onClick={() => {
                            selectTags(
                                [
                                    // '82EL068-417',
                                    // '82EL068-417-B01',
                                    '56L00420A',
                                    '56L00420B',
                                    '56L00440A',
                                    '56L00446A',
                                ],
                                padding
                            );
                        }}
                    >
                        T1
                    </Button>
                    <Button
                        variant="ghost_icon"
                        onClick={() => {
                            selectTags(
                                [
                                    // '82EL068-417',
                                    '82EL068-417-B01',
                                ],
                                padding
                            );
                        }}
                    >
                        T2
                    </Button>
                    <Button
                        variant="ghost_icon"
                        onClick={() => {
                            selectTags(['this will fail'], padding);
                        }}
                    >
                        T3
                    </Button>
                    <Button
                        variant="ghost_icon"
                        onClick={() => {
                            const style: NodeAppearance = {
                                color: [255, 0, 0] as [number, number, number],
                                outlineColor: 4,
                                renderGhosted: false,
                                renderInFront: true,
                                visible: true,
                            };
                            selection?.setSelectedColor(style);
                        }}
                    >
                        <Icon name={'invert_colors'} />
                    </Button>
                    <Button
                        title="Hidden"
                        variant="ghost_icon"
                        onClick={() => {
                            selection?.setHideMode('Default');
                        }}
                    >
                        <Icon name={'visibility'} />
                    </Button>
                    <Button
                        title="Hidden"
                        variant="ghost_icon"
                        onClick={() => {
                            selection?.setHideMode('Hidden');
                        }}
                    >
                        <Icon name={'visibility_off'} />
                    </Button>

                    <Button
                        variant="ghost_icon"
                        onClick={() => {
                            selection?.setHideMode('Outlined');
                        }}
                    >
                        <Icon name={'puzzle'} />
                    </Button>
                    <Button
                        variant="ghost_icon"
                        onClick={() => {
                            selection?.setHideMode('InFront');
                        }}
                    >
                        <Icon name={'puzzle_filled'} />
                    </Button>
                </Menu>
            </WrapperMenu>
        </>
    );
};
