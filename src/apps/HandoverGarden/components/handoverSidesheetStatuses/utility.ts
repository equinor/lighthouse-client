import tinycolor from 'tinycolor2';
import { HandoverPackageStatus } from '../../models/HandoverPackage';
import { colorMap } from '../../utility/handoverItemMapping';

export const createGradient = (color: string, isDemolition?: boolean): string[] => {
    const baseColor = tinycolor(color);
    const colors = [baseColor.spin(5).darken(10).toHexString(), color] as string[];

    return isDemolition ? colors.reverse() : colors;
};

export const getPunchStatusGradient = (status: HandoverPackageStatus): string[] =>
    status === 'OS' ? ['#afafaf', '#afafaf'] : createGradient(colorMap[status]);

export const createGradientBackground = (colors: string[]): string =>
    `linear-gradient(to right, ${colors[0]} 0%, ${colors[1]} 100%)`;
