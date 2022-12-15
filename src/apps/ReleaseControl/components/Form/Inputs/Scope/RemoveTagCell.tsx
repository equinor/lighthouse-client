import { ClickableIcon } from '@equinor/lighthouse-components';
import { CellProps } from '@equinor/Table';
import { TypedSelectOption } from '@equinor/Workflow';
import { DRCFormAtomApi } from '../../../../Atoms/formAtomApi';

const { useAtomState, updateAtom } = DRCFormAtomApi;

const removeTag = (tags: TypedSelectOption[], tagNo: string) => {
    updateAtom({ tags: tags.filter((x) => x.value !== tagNo) });
};

export const RemoveTagCell = ({ value }: CellProps<any, any>): JSX.Element => {
    const tags = useAtomState((s) => s.tags) ?? [];
    return <ClickableIcon name="close" onClick={() => removeTag(tags, (value as any).tagNo)} />;
};
