type Factory = (...arg: unknown[]) => unknown;
type VoidFunc = () => void;

declare global {
    interface Define {
        (d: string[], f: Factory): unknown;
        amd?: boolean;
    }

    interface HTMLScriptElement {
        module?: unknown;
    }
    interface Window {
        define: Define;
    }
}

const dep: Record<string, unknown> = {
    lodash: require('lodash')
};

const requireDependency = (d: string) => dep[d];

export function register(): void {
    self.define = function (d: string[], f: Factory) {
        if (typeof document === 'undefined') return;
        let currentScript = document.currentScript as HTMLScriptElement;

        if (d[0] === 'exports') {
            // Rollup Setup
            currentScript.module = {};
            f(currentScript.module, ...d.filter((d) => d !== 'exports').map(requireDependency));
        } else {
            // Webpack Setup
            const module = f(...d.map(requireDependency));
            currentScript.module = module;

            const { setup } = currentScript.module as { setup: VoidFunc };
            console.log('Current Script', setup());
        }
    };
    self.define.amd = true;
}
const moduleLoader = { register };

export default moduleLoader;
