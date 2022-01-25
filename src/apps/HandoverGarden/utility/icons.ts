import { HandoverPackageStatus } from '../models/HandoverPackage';

export type ColorMode = 'Regular' | 'Color blind';

export const getFlagIcon = (color: string): string =>
    `<svg width="12" height="14" viewBox="0 0 12 14" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.52 1.64706L7.2 0H0V14H1.6V8.23529H6.08L6.4 9.88235H12V1.64706H7.52Z" fill='${color}'/>
            </svg>`;

export const getPunchAIcon = (colorMode: ColorMode = 'Regular'): string =>
    colorMode === 'Color blind'
        ? `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7Z" fill="%23FF4081"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13ZM7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="white"/>
                    <rect x="3" y="6" width="8" height="2" fill="white"/>
                </svg>`
        : `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7Z" fill="%23FF4081"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13ZM7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="white"/>
            </svg>`;

export const getOKIcon = (colorMode: ColorMode = 'Regular'): string =>
    colorMode === 'Color blind'
        ? `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7" r="6.5" fill="%2300E676" stroke="white"/>
                    <rect x="3" y="4" width="8" height="2" fill="white"/>
                    <rect x="3" y="8" width="8" height="2" fill="white"/>
                </svg>`
        : `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7Z" fill="%2300C853"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13ZM7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="white"/>
            </svg>`;

export const getPunchBIcon = (colorMode: ColorMode = 'Regular'): string =>
    colorMode === 'Color blind'
        ? `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7Z" fill="%23FFC107"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13ZM7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="white"/>
                    <rect x="8" y="3" width="8" height="2" transform="rotate(90 8 3)" fill="white"/>
                </svg>`
        : `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7Z" fill="%23FFC107"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13ZM7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="white"/>
            </svg>`;

export const getOutStandingIcon = (colorMode: ColorMode = 'Regular'): string =>
    colorMode === 'Color blind'
        ? `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7Z" fill="%239E9E9E"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13ZM7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5L8 5L8 9L6 9L6 5ZM6 3H8H10V5V9L10 11H8H6L4 11V9V5V3H6Z" fill="white"/>
                </svg>`
        : `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7Z" fill="%239E9E9E"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13ZM7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="white"/>
            </svg>`;

export const getSmallSizeIcon = (color: string): string =>
    `<svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="12" width="2" height="8" rx="1" transform="rotate(-90 3 12)" fill='${color}'/>
            </svg>`;

export const getMediumSizeIcon = (color: string): string =>
    `<svg width="14" height="12" viewBox="0 0 14 12"  xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="12" width="2" height="8" rx="1" transform="rotate(-90 3 12)" fill='${color}'/>
                <rect x="3" y="7" width="2" height="8" rx="1" transform="rotate(-90 3 7)" fill='${color}'/>
            </svg>`;

export const getLargeSizeIcon = (color: string): string =>
    `<svg width="14" height="12" viewBox="0 0 14 12" xmlns="http://www.w3.org/2000/svg">
               <g fill='${color}'>
                <rect x="3" y="12" width="2" height="8" rx="1" transform="rotate(-90 3 12)"/>
                <rect x="3" y="2" width="2" height="8" rx="1" transform="rotate(-90 3 2)"/>
                <rect x="3" y="7" width="2" height="8" rx="1" transform="rotate(-90 3 7)"/>
                </g>
            </svg>`;

export const getWarningIcon = (primary = true): string =>
    primary
        ? `<svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(%23filter0_dd)">
                    <circle cx="11" cy="9" r="6.5" fill="%23EB0000" stroke="white"/>
                    <rect x="10" y="5" width="2" height="5" fill="white"/>
                    <rect x="10" y="11" width="2" height="2" fill="white"/>
                </g>
                <defs>
                    <filter id="filter0_dd" x="0" y="0" width="22" height="23" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                        <feOffset dy="3"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                        <feOffset dy="2"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"/>
                        <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape"/>
                    </filter>
                </defs>
            </svg>`
        : `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="9" r="7" fill="%23FF3D00"/>
                <rect x="8" y="5" width="2" height="5" fill="white"/>
                <rect x="8" y="11" width="2" height="2" fill="white"/>
            </svg>`;

type Method = (colorMode: ColorMode) => string;

export const mapping: Record<HandoverPackageStatus, Method> = {
    OK: getOKIcon,
    OS: getOutStandingIcon,
    PA: getPunchAIcon,
    PB: getPunchBIcon,
    'No status': getOKIcon,
    'RFCC Accepted': getOKIcon,
    'RFCC Rejected': getOKIcon,
    'RFCC Sent': getOKIcon,
    'RFOC Accepted': getOKIcon,
    'RFOC Rejected': getOKIcon,
    'RFOC Sent': getOKIcon,
    'TAC Accepted': getOKIcon,
    'TAC Rejected': getOKIcon,
    'TAC Sent': getOKIcon,
    DCC: getOKIcon,
    RFRC: getOKIcon,
};
