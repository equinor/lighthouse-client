export interface MenuItem {
    label: string;
    onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
    icon?: JSX.Element;
    isDisabled?: boolean;
}
