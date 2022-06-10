import { Cognite3DModel } from '@cognite/reveal';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Echo3dMultiSelectionActions } from '../../../../packages/echo3dViewer/src/services/echo3dMultiSelectionActions';
import { EchoSetupObject } from '../../../../packages/echo3dViewer/src/types/echoSetupObject';
import { Message } from '../types/message';
import { ModelViewerState } from '../types/plants';
import { createMessage } from '../utils/getCurrentContextModel';

interface SelectTagOptions {
    padding?: number;
    clearSelection?: boolean;
    skipLoadingUi?: boolean;
}
interface ModelViewerContext extends ModelViewerState {
    setPlantState(plantState: Partial<ModelViewerState>): void;
    setEcho3DClient(echo3DClient: EchoSetupObject): void;
    setModel(model: Cognite3DModel): void;
    selectTags(tags?: string[] | undefined, options?: SelectTagOptions): void;
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
        (tags?: string[], options?: SelectTagOptions) => {
            setState((s) => ({
                ...s,
                viewerSelection: [],
                message: undefined,
                selection: options?.clearSelection === true ? undefined : s.selection,
                isLoading: options?.skipLoadingUi || true,
            }));
            (async () => {
                if (
                    !plantState.echo3DClient ||
                    !plantState.cognite3DModel ||
                    !plantState.currentPlant
                ) {
                    return;
                }
                try {
                    const selection = new Echo3dMultiSelectionActions(
                        plantState.echo3DClient.viewer,
                        plantState.cognite3DModel,
                        plantState.currentPlant.hierarchyId
                    );
                    if (!tags) {
                        setState((s) => ({
                            ...s,
                            viewerSelection: [],
                            message: undefined,
                            isLoading: false,
                        }));
                        return;
                    }
                    await selection.setSelectionBasedOnE3dTagNos(tags);

                    selection.clipSelection(true, plantState.padding);
                    selection.fitCameraToCurrentBoundingBox();
                    selection.setWhiteAppearance();
                    selection.setSelectedColor();

                    setState((s) => ({
                        ...s,
                        selection,
                        viewerSelection: selection.viewerSelection,
                        isLoading: false,
                        isCropped: true,
                        hasDefaultColor: false,
                        modelIsVisible: false,
                        message: undefined,
                        padding: options?.padding || s.padding,
                        tags,
                    }));
                    console.log('select tag done');
                } catch (error: any) {
                    setState((s) => ({
                        ...s,
                        viewerSelection: [],
                        selection: undefined,
                        isLoading: false,
                        message: createMessage(error.message, 'NoTags'),
                    }));
                }
            })();
        },
        [
            plantState.cognite3DModel,
            plantState.currentPlant,
            plantState.echo3DClient,
            plantState.padding,
        ]
    );

    function setPlantState(plantState: Partial<ModelViewerState>) {
        setState((s) => ({ ...s, ...plantState }));
    }
    function setEcho3DClient(echo3DClient: EchoSetupObject) {
        setState((s) => ({ ...s, echo3DClient }));
    }

    function setModel(model: Cognite3DModel) {
        setState((s) => ({ ...s, cognite3DModel: model }));
    }

    function setMessage(message?: Message) {
        setState((s) => ({ ...s, message, isLoading: false }));
    }

    function toggleClipping() {
        setState((s) => {
            s.selection?.clipSelection(!s.isCropped, s.padding);
            return { ...s, isCropped: !s.isCropped };
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
            plantState.selection = undefined;
            plantState.echo3DClient?.viewer.disposeAll();
        };
    }, []);

    return (
        <Context.Provider
            value={{
                ...plantState,
                setPlantState,
                setEcho3DClient,
                setModel,
                selectTags,
                setMessage,
                toggleClipping,
                toggleHide,
                toggleDefaultColor,
            }}
        >
            {children}
        </Context.Provider>
    );
};
