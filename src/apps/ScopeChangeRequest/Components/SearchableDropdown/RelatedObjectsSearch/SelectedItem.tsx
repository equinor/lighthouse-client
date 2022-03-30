import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { ClickableIcon } from '../../../../../components/Icon/ClickableIcon';
import { TypedSelectOption } from '../../../Api/Search/searchType';
import { CommPkgIcon } from '../../DetailView/Components/RelatedObjects/CommPkg/commPkgIcon';

interface SelectedItemProps {
    item: TypedSelectOption;
    handleRemove: (value: string) => void;
}

export function SelectedItem({ item, handleRemove }: SelectedItemProps): JSX.Element {
    function getIcon(x: TypedSelectOption): JSX.Element | null {
        switch (x.type) {
            case 'area':
                return (
                    <Icon name="pin_drop" color={tokens.colors.interactive.primary__resting.hex} />
                );

            case 'discipline':
                return (
                    <Icon name="school" color={tokens.colors.interactive.primary__resting.hex} />
                );

            case 'document':
                return (
                    <Icon name="file_copy" color={tokens.colors.interactive.primary__resting.hex} />
                );

            case 'tag':
                return <Icon name="tag" color={tokens.colors.interactive.primary__resting.hex} />;

            case 'commpkg':
                return <CommPkgIcon />;

            default:
                return (
                    <Icon
                        name="placeholder_icon"
                        color={tokens.colors.interactive.primary__resting.hex}
                    />
                );
        }
    }
    const TypeIcon = () => getIcon(item);

    return (
        <ListItem key={item.value}>
            <TypeIcon />
            <DetailText>
                <SelectedItemLabel>{item.label}</SelectedItemLabel>
                <SelectedItemDescription>{item.description}</SelectedItemDescription>
            </DetailText>
            <ClickableIcon
                name="clear"
                onClick={() => {
                    handleRemove(item.value);
                }}
            />
        </ListItem>
    );
}

export const ListItem = styled.div`
    display: grid;
    grid-template-columns: 1fr 24fr 1fr;
    gap: 1em;
    color: ${tokens.colors.interactive.primary__resting.hex};
    height: 52px;
    align-items: center;
`;

export const SelectedItemLabel = styled.div`
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
`;

export const SelectedItemDescription = styled.div`
    font-weight: 500;
    font-size: 10px;
    line-height: 16px;
`;

export const DetailText = styled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;
