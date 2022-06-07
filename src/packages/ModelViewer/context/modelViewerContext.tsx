import { Cognite3DModel } from '@cognite/reveal';
import { createContext, useContext, useEffect, useState } from 'react';
import { Echo3dMultiSelectionActions } from '../../../../packages/echo3dViewer/src/services/echo3dMultiSelectionActions';
import { EchoSetupObject } from '../../../../packages/echo3dViewer/src/types/echoSetupObject';
import { Message } from '../types/message';
import { ModelViewerState } from '../types/plants';
import { createMessage } from '../utils/getCurrentContextModel';

interface ModelViewerContext extends ModelViewerState {
    setPlantState(plantState: Partial<ModelViewerState>): void;
    setEcho3DClient(echo3DClient: EchoSetupObject): void;
    setModel(model: Cognite3DModel): void;
    selectTags(
        tags?: string[] | undefined,
        options?: { padding?: number; clearSelection?: boolean }
    ): void;
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
    });

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

    function selectTags(tags?: string[], options?: { padding?: number; clearSelection?: boolean }) {
        setState((s) => ({
            ...s,
            message: undefined,
            selection: options?.clearSelection === true ? undefined : s.selection,
            isLoading: true,
            tags,
            padding: options?.padding || s.padding,
        }));
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
                if (!plantState.tags) return;
                await selection.setSelectionBasedOnE3dTagNos(plantState.tags);

                selection.clipSelection(true, plantState.padding);
                selection.fitCameraToCurrentBoundingBox();
                selection.setWhiteAppearance();
                selection.setSelectedColor();
                setState((s) => ({
                    ...s,
                    selection,
                    isLoading: false,
                    isCropped: true,
                    hasDefaultColor: false,
                    modelIsVisible: false,
                    message: undefined,
                }));
            } catch (error: any) {
                setState((s) => ({
                    ...s,
                    selection: undefined,
                    isLoading: false,
                    message: createMessage(error.message, 'NoTags'),
                }));
            }
        })();
    }, [
        plantState.currentPlant,
        plantState.echo3DClient,
        plantState.cognite3DModel,
        plantState.tags,
        plantState.padding,
    ]);

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
