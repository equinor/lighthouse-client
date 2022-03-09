/* eslint-disable no-underscore-dangle -- needed for mock */
/* eslint-disable max-classes-per-file -- Needed for mock */
import { Cognite3DModel, Cognite3DViewerOptions, THREE } from '@cognite/reveal';

// Create document.currentScript required by potree-core
Object.defineProperty(document, 'currentScript', {
    value: document.createElement('script')
});

Object.defineProperty(window, 'DOMRect', {
    value: jest.fn().mockImplementation(() => {
        return {};
    })
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any -- needed to test packages using potree-core
(document.currentScript as any).src = 'http://localhost/iamdummy.html';

jest.mock('@cognite/reveal', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- needed to mock webgl from threejs
    const realReveal = jest.requireActual('@cognite/reveal');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- mock
    return {
        ...realReveal,
        Cognite3DViewer: class Cognite3DViewer {
            private _renderer: THREE.WebGLRenderer;

            private _domElement?: HTMLElement;

            constructor(options: Cognite3DViewerOptions) {
                this._renderer = options.renderer!;
                this._domElement = options.domElement!;
            }

            get renderer(): THREE.WebGLRenderer {
                return this._renderer;
            }

            private get canvas(): HTMLCanvasElement {
                return this.renderer.domElement;
            }

            get domElement(): HTMLElement | undefined {
                return this._domElement;
            }

            dispose() {
                this._domElement = undefined;
            }

            removeModel = jest.fn();

            getCamera = jest.fn().mockReturnValue(new THREE.PerspectiveCamera());

            getScene = jest.fn();

            getCameraPosition = jest.fn().mockReturnValue(new THREE.Vector3());

            disableKeyboardNavigation = jest.fn();

            loadCameraFromModel = jest.fn();

            getIntersectionFromPixel = jest.fn();

            addCadModel = jest.fn().mockReturnValue({
                cadModelMetadata: jest.fn,
                assignStyledNodeCollection: jest.fn(),
                getCameraConfiguration: jest
                    .fn()
                    .mockReturnValue({ position: new THREE.Vector3(0), target: new THREE.Vector3(0) })
            } as unknown as Cognite3DModel);
        },

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ok
        THREE: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- ok
            ...realReveal.THREE,
            WebGLRenderer: class WebGlRenderer {
                capabilities = {
                    isWebGL2: true
                };

                domElement: HTMLCanvasElement;

                constructor(options?: { canvas: HTMLCanvasElement }) {
                    const all = jest.requireActual<HTMLCanvasElement>('');
                    const canvas = {
                        ...all,
                        offsetLeft: 10,
                        offsetTop: 55,
                        width: 1000,
                        height: 1000,
                        getBoundingClientRect: (): DOMRect => {
                            return { top: 55, left: 10, height: 1000, width: 1000, bottom: 0, right: 0 } as DOMRect;
                        }
                    };
                    if (options && options.canvas) this.domElement = options.canvas;
                    else this.domElement = canvas;
                }

                // eslint-disable-next-line class-methods-use-this -- just a mock
                getSize(target: THREE.Vector2): THREE.Vector2 {
                    target.set(1000, 1000);
                    return target;
                }

                setClearColor = jest.fn();

                setSize = jest.fn();

                setPixelRatio = jest.fn();

                getPixelRatio = jest.fn().mockReturnValue(1);
            }
        }
    };
});
