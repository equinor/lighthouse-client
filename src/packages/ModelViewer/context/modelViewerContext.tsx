import {
    ApiServiceConfiguration,
    RendererConfiguration,
    setupEcho3dWeb
} from '@equinor/echo3dweb-viewer';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { EchoSetupObject } from '../../../../packages/echo3dViewer/src/types/echoSetupObject';
import { Message } from '../types/message';
import { ModelViewerState } from '../types/plants';
import { createMessage, getModels, selectPlantByContext } from '../utils/getCurrentContextModel';

interface SelectTagOptions {
    padding?: number;
    clearSelection?: boolean;
    skipLoadingUi?: boolean;
}

interface ModelViewerContext extends ModelViewerState {
    setup(
        echoPlantId: string,
        canvas: HTMLCanvasElement,
        modelDistributionConfig: ApiServiceConfiguration,
        hierarchyConfig: ApiServiceConfiguration,
        renderConfig?: RendererConfiguration
    ): Promise<void>;
    setEcho3DClient(echo3DClient: EchoSetupObject): void;
    setModelWithSelection(plantState: Partial<ModelViewerState>): void;
    selectTags(tags?: string[] | undefined, options?: SelectTagOptions): Promise<void>;
    setMessage(message?: Message): void;
    toggleClipping(): void;
    toggleHide(): void;
    toggleDefaultColor(): void;
}

export const Context = createContext({} as ModelViewerContext);
interface ModelViewerContextProviderProps {
    children: React.ReactNode;
}

export function useModelViewerContext(): ModelViewerContext {
    return useContext(Context);
}

export const ModelViewerContextProvider = ({
    children,
}: ModelViewerContextProviderProps): JSX.Element => {
    const [plantState, setState] = useState<ModelViewerState>({
        plants: [],
        isLoading: true,
        message: undefined,
        currentPlant: undefined,
        echo3DClient: undefined,
        cognite3DModel: undefined,
        selection: undefined,
        isCropped: false,
        hasDefaultColor: false,
        modelIsVisible: false,
        tagsIsVisible: false,
        viewerSelection: [],
    });

    const selectTags = useCallback(
        async (tags?: string[], options?: SelectTagOptions) => {
            try {
                if (!tags) {
                    setState((s) => ({
                        ...s,
                        viewerSelection: [],
                        message: undefined,
                        isLoading: false,
                    }));
                    return;
                }

                if (plantState.selection) {
                    const selection = plantState.selection;
                    if (options?.clearSelection === true) {
                        selection?.clearSelection();
                    }

                    await selection.setSelectionBasedOnE3dTagNos(tags);

                    selection.clipSelection(true, plantState.padding);
                    selection.fitCameraToCurrentBoundingBox();
                    selection.setWhiteAppearance();
                    selection.setSelectedColor();

                    setState((s) => ({
                        ...s,
                        viewerSelection: selection.viewerSelection,
                        isLoading: false,
                        isCropped: true,
                        hasDefaultColor: false,
                        modelIsVisible: false,
                        message: undefined,
                        padding: options?.padding || s.padding,
                        tags,
                    }));
                }
            } catch (error: any) {
                setState((s) => ({
                    ...s,
                    viewerSelection: [],
                    isLoading: false,
                    message: createMessage(error.message, 'NoTags'),
                }));
            }
        },
        [plantState]
    );

    async function setup(
        echoPlantId: string,
        canvas: HTMLCanvasElement,
        modelDistributionConfig: ApiServiceConfiguration,
        hierarchyConfig: ApiServiceConfiguration,
        renderConfig?: RendererConfiguration
    ) {
        const echo3DClient = await setupEcho3dWeb(
            canvas,
            modelDistributionConfig,
            hierarchyConfig,
            renderConfig
        );
        echo3DClient.viewer.cameraControlsEnabled = true;
        const plants = await getModels(echo3DClient.modelApiClient);
        const selectedPlant = selectPlantByContext(plants, echoPlantId);

        setState((s) => ({ ...s, ...selectedPlant, echo3DClient }));
    }

    function setEcho3DClient(echo3DClient: EchoSetupObject) {
        setState((s) => ({ ...s, echo3DClient }));
    }

    function setModelWithSelection(plantState: Partial<ModelViewerState>) {
        setState((s) => ({ ...s, ...plantState }));
    }

    function setMessage(message?: Message) {
        setState((s) => ({ ...s, message, isLoading: false }));
    }

    function toggleClipping() {
        setState((s) => {
            const isCropped = !s.isCropped;
            isCropped && s.selection?.fitCameraToCurrentBoundingBox();
            s.selection?.clipSelection(isCropped, s.padding);
            return { ...s, isCropped };
        });
    }
    function toggleDefaultColor() {
        setState((s) => {
            const hasDefaultColor = !s.hasDefaultColor;
            s.selection?.setHideMode(hasDefaultColor ? 'Default' : 'White');
            return { ...s, hasDefaultColor };
        });
    }
    function toggleHide() {
        setState((s) => {
            const modelIsVisible = !s.modelIsVisible;

            if (modelIsVisible) {
                s.selection?.setHideMode('Hidden');
            } else {
                s.selection?.setHideMode(s.hasDefaultColor ? 'Default' : 'White');
            }
            return { ...s, modelIsVisible };
        });
    }

    useEffect(() => {
        return () => {
            plantState.cognite3DModel?.dispose();
            plantState.selection?.clearSelection();
            plantState.echo3DClient?.viewer.disposeAll();
        };
    }, []);

    return (
        <Context.Provider
            value={{
                ...plantState,
                setEcho3DClient,
                setModelWithSelection,
                selectTags,
                setMessage,
                toggleClipping,
                toggleHide,
                toggleDefaultColor,
                setup,
            }}
        >
            {children}
        </Context.Provider>
    );
};
