

const LogoIcon = ({ size = 16 }) => {
    return (
        <svg width="50" height="35" viewBox="0 0 50 35" fill="none" style={{ transform: "scale(0.7)" }}>
            < path d="M0 2V23.1776L7.05405 16.1235V7.05405H16.1235L23.1776 0H2C0.895431 0 0 0.89543 0 2Z" transform="translate(50 17.5) scale(0.92727 1.06779) rotate(135)" fill="url(#paint0_linear)" ></path >
            <path d="M0 2V23.1776L7.05405 16.1235V7.05405H16.1235L23.1776 0H2C0.895431 0 0 0.89543 0 2Z" transform="translate(0 17.5) scale(0.92727 1.06779) rotate(-45)" fill="url(#paint1_linear)"></path>
            <path d="M9.61965 36.6972L2.60087 29.6784L1.96135 22.3809L8.42623 22.9069L9.61965 36.6972Z" transform="translate(33.8887 34.9863) scale(0.92727 -1.06779) rotate(45)" fill="#990025"></path>
            <path d="M7.05434 7.05434L0 0L1.21096 13.8183L7.68846 14.3818L7.05434 7.05434Z" transform="translate(33.8887 34.9863) scale(0.92727 -1.06779) rotate(45)" fill="#990025">
            </path><path d="M0 0L2.49398 29.5715L9.61965 36.6972L7.01878 7.01878L0 0Z" transform="translate(33.8887 0.015625) scale(0.92727 1.06779) rotate(45)" fill="#FF1243">
            </path><defs><linearGradient id="paint0_linear" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-13.5478 9.01983 -12.9578 -13.5478 18.0677 6.77391)">
                <stop offset="0.508287" stop-color="#DC002E"></stop><stop offset="0.508387" stop-color="#FF1243"></stop></linearGradient><linearGradient id="paint1_linear" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-13.5478 9.01983 -12.9578 -13.5478 18.0677 6.77391)"><stop offset="0.508287" stop-color="#DC002E"></stop><stop offset="0.508387" stop-color="#FF1243"></stop>
                </linearGradient></defs></svg >
        // <svg width={size - 1} height={size} viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        //     <circle cx="9.5" cy="3.5" r="3.5" fill="#34AB53" />
        //     <rect width="6" height="14" transform="matrix(1 0 0 -1 0 14)" fill="#1A73E8" />
        // </svg>

    );
}

export default LogoIcon;

