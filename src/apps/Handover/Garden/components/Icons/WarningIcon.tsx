export const WarningIcon = ({ primary = true }: { primary?: boolean }): JSX.Element =>
    primary ? (
        <svg
            width="22"
            height="23"
            viewBox="0 0 22 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g filter="url(%23filter0_dd)">
                <circle cx="11" cy="9" r="6.5" fill="%23EB0000" stroke="white" />
                <rect x="10" y="5" width="2" height="5" fill="white" />
                <rect x="10" y="11" width="2" height="2" fill="white" />
            </g>
            <defs>
                <filter
                    id="filter0_dd"
                    x="0"
                    y="0"
                    width="22"
                    height="23"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dy="3" />
                    <feGaussianBlur stdDeviation="2" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                    />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="2" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"
                    />
                    <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect2_dropShadow"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>
    ) : (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="9" cy="9" r="7" fill="%23FF3D00" />
            <rect x="8" y="5" width="2" height="5" fill="white" />
            <rect x="8" y="11" width="2" height="2" fill="white" />
        </svg>
    );
