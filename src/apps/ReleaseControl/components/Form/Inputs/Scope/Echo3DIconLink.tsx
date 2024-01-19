import { echoUrls } from '../../../../../../packages/ProcosysUrls/src/echoUrls';

export const Echo3DIconLink = (props: { id: string }): JSX.Element => {
    return (
        <svg
            width="17"
            height="15"
            viewBox="0 0 25 22"
            fill="none"
            onClick={() => window.open(echoUrls.getEchoUrl(props.id))}
            style={{ cursor: 'pointer', width: '24px' }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10.71 0.96C9.71 0.32 8.56 0 7.26 0C5.94 0 4.72 0.31 3.6 0.929999C2.5 1.55 1.62 2.44 0.96 3.6C0.32 4.76 0 6.11 0 7.65C0 9.09 0.3 10.38 0.9 11.52C1.5 12.64 2.36 13.52 3.48 14.16C4.62 14.8 5.95 15.12 7.47 15.12C8.59 15.12 9.67 14.92 10.71 14.52C11.1338 14.357 11.5343 14.1658 11.9115 13.9464C11.9105 14.0053 11.91 14.0645 11.91 14.124C11.91 15.468 12.19 16.672 12.75 17.736C13.31 18.7813 14.1127 19.6027 15.158 20.2C16.222 20.7973 17.4633 21.096 18.882 21.096C19.9273 21.096 20.9353 20.9093 21.906 20.536C22.8767 20.1627 23.7167 19.6307 24.426 18.94C24.5007 18.8653 24.538 18.7907 24.538 18.716C24.538 18.6227 24.51 18.548 24.454 18.492L23.866 17.68C23.81 17.5867 23.7353 17.54 23.642 17.54C23.6047 17.54 23.53 17.5773 23.418 17.652C22.7833 18.212 22.074 18.6507 21.29 18.968C20.5247 19.2667 19.7407 19.416 18.938 19.416C17.874 19.416 16.95 19.192 16.166 18.744C15.4007 18.2773 14.8033 17.6707 14.374 16.924C13.9447 16.1587 13.702 15.328 13.646 14.432H24.482C24.706 14.432 24.818 14.3293 24.818 14.124V13.368C24.818 12.2293 24.566 11.1747 24.062 10.204C23.558 9.23333 22.8393 8.45867 21.906 7.88C20.9727 7.28267 19.8993 6.984 18.686 6.984C17.454 6.984 16.3153 7.27333 15.27 7.852C14.2433 8.43067 13.422 9.26133 12.806 10.344C12.6155 10.6892 12.4554 11.0525 12.3257 11.4338C11.6468 12.032 10.8882 12.5007 10.05 12.84C9.23 13.16 8.39 13.32 7.53 13.32C6.39 13.32 5.4 13.08 4.56 12.6C3.74 12.1 3.1 11.45 2.64 10.65C2.18 9.83 1.92 8.94 1.86 7.98H13.47C13.71 7.98 13.83 7.87 13.83 7.65V6.84C13.83 5.62 13.56 4.49 13.02 3.45C12.48 2.41 11.71 1.58 10.71 0.96ZM10.53 3.06C11.35 3.9 11.81 4.97 11.91 6.27H1.98C2.22 4.95 2.79 3.88 3.69 3.06C4.61 2.22 5.79 1.8 7.23 1.8C8.61 1.8 9.71 2.22 10.53 3.06ZM21.738 9.84C22.5033 10.624 22.9327 11.6227 23.026 12.836H13.758C13.982 11.604 14.514 10.6053 15.354 9.84C16.2127 9.056 17.314 8.664 18.658 8.664C19.946 8.664 20.9727 9.056 21.738 9.84Z"
                fill="#FF1243"
            ></path>
            <title>Open in Echo 3D</title>
        </svg>
    );
};
