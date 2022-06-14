import { Icon } from '@equinor/eds-core-react';
import { useDataCreator } from '@equinor/lighthouse-fusion-modules';
import { useDataContext } from '../../../Context/DataProvider';
import { TabButton } from '../../ToggleButton';
import { Divider } from '../HeaderStyles';

export const CreatorButton = (): JSX.Element => {
    const { key } = useDataContext();
    const { openCreatorById, creator } = useDataCreator(`${key}Creator`);

    return (
        <>
            {creator && (
                <TabButton
                    aria-disabled={!creator.props.hasAccess}
                    onClick={() =>
                        creator.props.hasAccess !== false && openCreatorById(creator.widgetId)
                    }
                    width={'48px'}
                    aria-selected={false}
                    title={
                        creator.props.hasAccess !== false
                            ? creator.title
                            : 'Contact Support for access'
                    }
                >
                    <Icon name={'add'} />
                </TabButton>
            )}
            <Divider />
        </>
    );
};
