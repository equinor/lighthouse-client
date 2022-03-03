// import { tokens } from '@equinor/eds-tokens';
// import { CustomClientApi } from '@equinor/portal-client';
// import {
//     THREE,
//     threeD,
//     ThreeDConfig,
//     ThreeDContextProvider,
//     ThreeDInstance
// } from '@equinor/ThreeDViewer';
// import { useEffect, useRef, useState } from 'react';
// import styled from 'styled-components';

// const Viewer = styled.div`
//     height: calc(100vh - 64px);
//     > div {
//         display: none;
//     }
// `;

// export const ModelViewer: React.FC<CustomClientApi> = (appApi: CustomClientApi): JSX.Element => {
//     const viewerRef = useRef<HTMLDivElement>(null);
//     const [threeDInstance, setThreeDInstance] = useState<ThreeDInstance>();

//     useEffect(() => {
//         async function setup() {
//             if (viewerRef.current == null) return;

//             const getToken = () =>
//                 appApi.authProvider.getAccessToken([
//                     'd484c551-acf8-45bc-b1e8-3f4373bd0d42/user_impersonation',
//                 ]);
//             const config: ThreeDConfig = {
//                 domElement: viewerRef.current,
//                 baseUrl: 'https://app-echomodeldist-dev.azurewebsites.net',
//             };
//             const instance = await threeD(config);
//             instance.viewer.setBackgroundColor(
//                 new THREE.Color(tokens.colors.ui.background__info.hex)
//             );
//             const isAuthenticated = await instance.login(getToken);
//             const geometryFilter = {
//                 boundingBox: new THREE.Box3(
//                     new THREE.Vector3(80, 260, -1),
//                     new THREE.Vector3(420, 340, 120)
//                 ),
//             };

//             setThreeDInstance(instance);

//             if (isAuthenticated) {
//                 await instance.loadModel(114, 4, geometryFilter);
//             }
//         }

//         setup();
//     }, [viewerRef]);

//     return (
//         <>
//             <ThreeDContextProvider threeDInstance={threeDInstance}>
//                 <Viewer ref={viewerRef} />
//             </ThreeDContextProvider>
//         </>
//     );
// };
