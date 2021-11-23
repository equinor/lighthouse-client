'use strict';
import {
    BoundingBoxClipper,
    Cognite3DViewer,
    DefaultNodeAppearance,
    IndexSet,
    revealEnv,
    THREE,
    TreeIndexNodeCollection
} from '@cognite/reveal';
import { CogniteClient } from '@cognite/sdk';
import 'regenerator-runtime/runtime';
revealEnv.publicPath = `/reveal-worker/`;

const selectedStyle = {
    color: [0, 0, 255],
    visible: true,
    renderInFront: true,
    renderGhosted: false,
    outlineColor: 4
};

export class RevealViewer extends HTMLElement {
    constructor() {
        super();
        this._viewer = null;
        this._model = null;
        this._aabb = null;
        this._tags = [];
        this._selection = null;
        this._clipmodel = true;
        this._hidemode = 'Show';
    }

    set clipmodel(val) {
        if (val === this._clipmodel) {
            return;
        }
        this._clipmodel = val;
        this.clipper();
    }

    set hidemode(val) {
        if (val === this._hidemode) {
            return;
        }
        this._hidemode = val;
        this.hider();
    }

    set selection(selection) {
        if (!selection) {
            return;
        }
        this._tags = selection.tags.map((t) => {
            t.point = createBB(t.aabb).getCenter(new THREE.Vector3());
            return t;
        });
        this._aabb = selection.aabb;
        this._selection = selection.ids;
        this.highlight();
    }

    async connectedCallback() {
        const client = new CogniteClient({
            appId: '',
            baseUrl: 'https://app-echomodeldist-dev.azurewebsites.net'
        });
        const t = await window.getRevealToken();
        const customLogin = async (callbacks) => {
            const authenticate = async () => {
                const token = await window.getRevealToken();
                if (!token) {
                    return false;
                }
                callbacks.setBearerToken(token.accessToken);
                return true;
            };
            return [authenticate, t.accessToken];
        };
        await client.loginWithCustom(customLogin);

        client.setProject('3d-web');
        this._viewer = new Cognite3DViewer({
            sdk: client,
            domElement: this,
            logMetrics: false
        });
        const spinner = document.getElementsByClassName(
            'reveal-viewer-spinner'
        );
        for (var i = 0; i < spinner.length; i++) {
            spinner[i].style.display = 'none';
        }
        this._viewer.setBackgroundColor(new THREE.Color('#5EA4E0'));
        this._model = await this._viewer.addCadModel({
            modelId: 114,
            revisionId: 4,
            geometryFilter: {
                boundingBox: new THREE.Box3(
                    new THREE.Vector3(80, 260, -1),
                    new THREE.Vector3(420, 340, 120)
                )
            }
        });
        this._viewer.fitCameraToModel(this._model);
        this._model.setDefaultNodeAppearance(DefaultNodeAppearance.Outlined);
    }
    highlight() {
        console.log('Highlighting!');
        if (!this._viewer) {
            return;
        }
        this._viewer.on('cameraChange', (e) => {
            for (let i = 0; i < this._tags.length; i++) {
                this._tags[i].pos = this._viewer.worldToScreen(
                    this._tags[i].point,
                    true
                );
            }
            this.customEvent(
                'tagpositions',
                this._tags.filter((t) => {
                    return t.pos !== null;
                })
            );
        });
        this.clipper();
        this.hider();
    }
    clipper() {
        console.log('Clipper!');
        if (!this._viewer) {
            return;
        }
        if (!this._aabb) {
            return;
        }
        if (this._clipmodel) {
            const { min, max } = this._aabb;
            const bbox = new THREE.Box3(
                new THREE.Vector3(min.x - 1, min.z - 1, -max.y - 1),
                new THREE.Vector3(max.x + 1, max.z + 1, -min.y + 1)
            );
            this._viewer.fitCameraToBoundingBox(bbox, 500);
            const clipper = new BoundingBoxClipper(bbox);
            this._viewer.setClippingPlanes(clipper.clippingPlanes);
        } else {
            this._viewer.setClippingPlanes([]);
        }
    }
    hider() {
        console.log('Hider!');
        if (!this._model) {
            return;
        }
        if (!this._selection) {
            return;
        }
        this._model.removeAllStyledNodeCollections();
        const assetNodes = new TreeIndexNodeCollection(
            new IndexSet(this._selection)
        );
        this._model.assignStyledNodeCollection(assetNodes, selectedStyle);
        switch (this._hidemode) {
            case 'Hide':
                this._model.setDefaultNodeAppearance(
                    DefaultNodeAppearance.Hidden
                );
                return;
            case 'Ghost':
                this._model.setDefaultNodeAppearance(
                    DefaultNodeAppearance.Ghosted
                );
                return;
            default:
                this._model.setDefaultNodeAppearance(
                    DefaultNodeAppearance.Default
                );
        }
    }

    disconnectedCallback() {
        this._model.dispose();
        this._viewer.dispose();
        this._model = null;
        this._viewer = null;
    }
    customEvent(name, content) {
        this.dispatchEvent(new CustomEvent(name, { detail: content }));
    }
}
