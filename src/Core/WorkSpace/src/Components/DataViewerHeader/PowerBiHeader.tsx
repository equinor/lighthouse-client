import { Divider } from '@equinor/eds-core-react';
import { TabsConfigItem } from '../../Util/tabsConfig';
import { LeftSection, RightSection } from './HeaderStyles';
import { HeaderTabButtons } from './HeaderTabButtons/HeaderTabButtons';
import { PowerBiPages } from './PowerBIPages/PowerBIPages';

interface PowerBiHeaderProps {
    tabs: TabsConfigItem[];
    group: string;
    shortName: string;
}

export const PowerBiHeader = ({ tabs, group, shortName }: PowerBiHeaderProps): JSX.Element => {
    return (
        <>
            <LeftSection>
                <PowerBiPages />
            </LeftSection>
            <RightSection>
                <HeaderTabButtons tabs={tabs} />
                <Divider />
            </RightSection>
        </>
    );
};
