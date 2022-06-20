import {
    ApiServiceConfiguration,
    RendererConfiguration,
    setupEcho3dWeb,
    ViewerNodeSelection
} from '@equinor/echo3dweb-viewer';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Message } from '../types/message';
import { ModelViewerState } from '../types/plants';
import { createMessage, getModels, selectPlantByContext } from '../utils/getCurrentContextModel';
import { selectTagsByTagNos } from '../utils/selectTags';

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
        renderConfig?: RendererConfiguration,
        platformSectionId?: string
    ): Promise<void>;

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
        viewerNodeSelection: [],
    });

    const selectTags = useCallback(
        async (tags?: string[], options?: SelectTagOptions) => {
            try {
                if (!tags) {
                    setState((s) => ({
                        ...s,
                        viewerNodeSelection: [],
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

                    await selectTagsByTagNos(selection, tags, options?.padding);

                    updateSelectionState(selection.viewerNodeSelection, tags, options?.padding);
                }
            } catch (error: any) {
                setMessage(createMessage(error.message, 'NoTags'));
            }
        },
        [plantState]
    );

    function updateSelectionState(
        viewerNodeSelection: ViewerNodeSelection[],
        tags: string[] | undefined,
        padding?: number | undefined
    ) {
        setState((s) => ({
            ...s,
            viewerNodeSelection,
            isLoading: false,
            isCropped: true,
            hasDefaultColor: false,
            modelIsVisible: false,
            message: undefined,
            padding: padding || s.padding,
            tags,
        }));
    }

    async function setup(
        echoPlantId: string,
        canvas: HTMLCanvasElement,
        modelDistributionConfig: ApiServiceConfiguration,
        hierarchyConfig: ApiServiceConfiguration,
        renderConfig?: RendererConfiguration,
        platformSectionId?: string
    ) {
        const echo3DClient = await setupEcho3dWeb(
            canvas,
            modelDistributionConfig,
            hierarchyConfig,
            renderConfig
        );

        const plants = await getModels(echo3DClient.modelApiClient);
        const selectedPlant = selectPlantByContext(plants, echoPlantId, platformSectionId);

        setState((s) => ({ ...s, ...selectedPlant, echo3DClient }));
    }

    function setModelWithSelection(plantState: Partial<ModelViewerState>) {
        setState((s) => ({ ...s, ...plantState }));
    }

    function setMessage(message?: Message) {
        setState((s) => ({ ...s, message, isLoading: false, viewerNodeSelection: [] }));
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
