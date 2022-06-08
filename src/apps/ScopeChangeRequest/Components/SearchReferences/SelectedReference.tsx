import { ClickableIcon } from '../../../../packages/Components/Icon';
import { TypedSelectOption } from '../../api/Search/searchType';
import { getReferenceIcon } from './getReferenceIcon';
import { ListItem, SelectedItemLabel, MetaData } from './searchReferences.styles';

interface SelectedReferenceProps {
    selected: TypedSelectOption;
    removeRelatedObject: (val: string) => void;
}

export function SelectedReference({
    selected,
    removeRelatedObject,
}: SelectedReferenceProps): JSX.Element {
    const TypeIcon = () => getReferenceIcon(selected.type);
    return (
        <ListItem key={selected.value}>
            <TypeIcon />
            <div>
                <SelectedItemLabel>{selected.label}</SelectedItemLabel>
                <MetaData>{selected.metadata}</MetaData>
            </div>
            <ClickableIcon
                name="clear"
                onClick={() => {
                    removeRelatedObject(selected.value);
                }}
            />
        </ListItem>
    );
}
