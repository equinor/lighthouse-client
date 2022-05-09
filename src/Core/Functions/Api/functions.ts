import { getFunctions } from '../../Providers/functionController';
import { CustomFunction } from '../Types/function';

interface FunctionsAPI {
    getFunction(id: string): CustomFunction;
}

const FunctionsAPIBuilder = (): FunctionsAPI => {
    const _Functions = {};
    function _getFunctions() {
        const functions = getFunctions();
        functions.forEach((f) => (_Functions[f.functionId] = f.function));
        _Functions;
    }
    _getFunctions();
    return {
        getFunction: (id: string): CustomFunction => {
            const functions = getFunctions();
            return functions.find((f) => f.functionId === id)!.function;
        },
    };
};

export const Functions = FunctionsAPIBuilder();
