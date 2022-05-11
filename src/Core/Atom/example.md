import { createAtom } from './functions/createAtom';

interface SomeAppState {
    id: string;
    name: string;
    nestedObject: NestedObject;
}

interface NestedObject {
    name: string;
}

export const stateApi = createAtom<SomeAppState>({} as SomeAppState);

const FunctionalComponent = () => {
    const { readAtomValue, updateAtom, useAtomState, useOnAtomStateChanged } = stateApi;
    // Subscribes to value and rerenders component if it changes
    const name = useAtomState((s) => s.name);

    //Do not mutate value in here
    useOnAtomStateChanged((s) => console.log(`Name changed! new name is ${s}`));

    function handleClick() {
        updateAtom({ name: `${readAtomValue()}2` });
    }

    return (
        <>
            <div>{name}</div>
            <button onClick={handleClick}>Update name</button>
        </>
    );
};
