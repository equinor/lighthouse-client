import { THREE } from '@cognite/reveal';
import { CogniteClient } from '@cognite/sdk';
import { Echo3dViewer } from '../services/echo3DViewer';
import { RendererConfiguration } from '../types/rendererConfiguration';
/**
 * Initialize the renderer for the Echo3DClient
 *
 * @param {(HTMLCanvasElement)} canvas the canvas to render on
 * @param {RendererConfiguration} [config] the configuration to use for the renderer
 * default:
 *      setClearColor: '#3C86BE'
 *      setSize(with, height): window.innerWidth, window.innerHeight
 *      setPixelRatio: window.devicePixelRatio
 * @returns {*}  {THREE.WebGLRenderer} the configured renderer for the viewer
 */
const initializeRenderer = (canvas: HTMLCanvasElement, config?: RendererConfiguration): THREE.WebGLRenderer => {
    const renderer = new THREE.WebGLRenderer({
        canvas,
        powerPreference: 'high-performance'
    });

    renderer.setClearColor(config?.clearColor ?? '#3C86BE');
    renderer.setSize(config?.width ?? window.innerWidth, config?.height ?? window.innerHeight);

    // Defaults to 1. Set it to `window` value.
    // Needed to properly map screen coordinates to viewport on devices that do not have a 1-to-1 pixel ratio,
    renderer.setPixelRatio(config?.pixelRatio ?? window.devicePixelRatio);

    return renderer;
};

/**
 * Initialize the viewer
 *
 * Initializes a renderer that the viewer uses and creates a Echo3dViewer class
 *
 * @param {CogniteClient} client the cognite client that the Echo3dViewer will use
 * @param {HTMLCanvasElement} canvas the canvas to render the viewer on
 * @param {RendererConfiguration} renderConfig the configurations to use when configuring the renderer, if {undefined} default values will be used.
 * @returns {Echo3dViewer} The Echo3dViewer to render models on
 */
export const initializeEcho3dViewer = (
    client: CogniteClient,
    canvas: HTMLCanvasElement,
    renderConfig?: RendererConfiguration
): Echo3dViewer => {
    const renderer = initializeRenderer(canvas, renderConfig);

    if (!renderer.domElement.parentElement) throw Error('Canvas element must have a parent to render viewer');

    return new Echo3dViewer({
        sdk: client,
        renderer,
        domElement: renderer.domElement.parentElement,
        logMetrics: false,
        onLoading: renderConfig?.loadingCallback
    });
};
