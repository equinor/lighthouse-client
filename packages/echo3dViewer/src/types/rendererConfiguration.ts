import { OnLoadingCallback } from '@cognite/reveal';

export interface RendererConfiguration {
    clearColor?: string;
    height?: number;
    width?: number;
    pixelRatio?: number;
    loadingCallback?: OnLoadingCallback;
}
