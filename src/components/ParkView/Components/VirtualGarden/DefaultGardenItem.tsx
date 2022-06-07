import { DefaultPackage } from './styles';

interface DefaultGardenItemProps {
    columnExpanded: boolean;
    isSelected: boolean;
    item: Record<string, string>;
    itemKey: string;
    onClick: () => void;
    customDescription?: string | undefined;
    depth: number;
    backgroundColor: string;
}

export const DefaultGardenItem = ({
    columnExpanded,
    isSelected,
    item,
    itemKey,
    onClick,
    customDescription,
    depth,
    backgroundColor,
}: DefaultGardenItemProps): JSX.Element => {
    return (
        <DefaultPackage
            bgColor={backgroundColor}
            onClick={onClick}
            isSelected={isSelected}
            depth={depth}
        >
            <div>{item?.[itemKey]}</div>
            {columnExpanded && <div>{customDescription}</div>}
        </DefaultPackage>
    );
};
