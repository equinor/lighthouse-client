

const LogoIcon = ({ size = 16 }) => {
    return (
        <svg width={size - 1} height={size} viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9.5" cy="3.5" r="3.5" fill="#34AB53" />
            <rect width="6" height="14" transform="matrix(1 0 0 -1 0 14)" fill="#1A73E8" />
        </svg>

    );
}

export default LogoIcon;

