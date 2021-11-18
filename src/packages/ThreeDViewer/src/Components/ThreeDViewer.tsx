import { Cognite3DViewer, THREE } from "@cognite/reveal";
import React, { useState } from "react";
import styled from "styled-components";
import { createBox, ObjectData, ThreeDViewerApi } from "../Api/ReferenceForFuture";




const Viewer = styled.div`
    height: 500px;
    > div {
        display: none;;
    }
`;


async function setupBoxes(viewer: Cognite3DViewer) {
    const response = await fetch("./data/boxes.json")
    const data: Record<string, ObjectData[]> = await response.json()

    Object.keys(data).map(key => {
        data[key].forEach(i => {
            const cube = createBox(key, i);
            viewer.addObject3D(cube);
        })
    });

    const scene = viewer.getScene()


    // setColorByName(Object.keys(data)[1], "#ff4400")
    // setColorByName(Object.keys(data)[6], () => "#97ca0a")
    // setColorByName(Object.keys(data)[0], () => "#003366")
    // setColorByName(Object.keys(data)[2], () => "#e02c95")


}

function viewerSetup(domElement: HTMLElement) {
    const { viewer, } = ThreeDViewerApi(domElement);
    // login(getToken);





    // setupBoxes(viewer).then(() => {
    //     setStatus(new Date('2021-08-01').getTime(), new Date('2021-05-01').getTime(), status);
    // });
    // viewer.fitCameraToBoundingBox(new THREE.Box3(new THREE.Vector3(80, 260, -1), new THREE.Vector3(420, 340, 120)), 0);

    // const model = await addModelById();

    // viewer.fitCameraToModel(model)
    // model.setDefaultNodeAppearance(DefaultNodeAppearance.Outlined)
    // const selectedNodes = new TreeIndexNodeCollection();
    // model.assignStyledNodeCollection(selectedNodes, DefaultNodeAppearance.Highlighted);


    // return setStatus




    // viewer.on('click', event => {
    //     const name = getIntersectedObjectName(event)
    //     const color = getObjectColorByName(name).r === 1 ? "#f3a30f" : "#ff4400";
    //     console.log(name)
    //     setColorByName(name, color);
    //     setStatus(new Date(), new Date(5), status);
    // });


}

const getUnixTime = (iso: string | number | Date) => {
    return new Date(iso).getTime()
}



export const ThreeDViewer = React.forwardRef<HTMLDivElement>(({ }, ref): JSX.Element => {


    // const [dates, setDates] = useState([getUnixTime('2020-01-01'), getUnixTime('2020-01-31')])
    const [state, seState] = useState<{
        setDate: (now: number, to: number, data: Record<string, {
            status: string;
            date: Date;
        }>) => void | undefined
    }>();

    // useEffect(() => {
    //     // TODO: -Add new scope for echo 3d api
    //     if (ref !== null && !state) {
    //         const func = viewerSetup(ref)
    //         seState({ setDate: func })
    //     }
    //     // return () => {

    //     //     seState(undefined)
    //     // }
    // }, [ref])

    const outputFunction = (value) => {
        const date = new Date(parseInt(value, 10))
        return date.toLocaleDateString('nb-NO', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        })
    }




    return (<>
        {/* <Slider
            min={getUnixTime('2020-01-01')}
            max={getUnixTime('2025-01-31')}
            ariaLabelledby="date-range-slider"
            step={60 * 60 * 24 * 1000}
            value={[getUnixTime('2020-11-12'), getUnixTime('2020-12-12')]}
            outputFunction={outputFunction}
            onChangeCommitted={(event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>, newValue: number | number[]) => {
                if (state) {
                    state.setDate(newValue[0], newValue[1], status)
                }
            }}
        /> */}
        <Viewer ref={ref} />
    </>);
});


function createBoundingBox({ min, max }) {
    return new THREE.Box3(new THREE.Vector3(min.x, min.z, -max.y), new THREE.Vector3(max.x, max.z, -min.y))
}