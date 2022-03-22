import { Accordion } from '@equinor/eds-core-react';
import { AccordionHeader, AccordionHeaderIcon, AccordionPanel } from './FavouritesStyles';

const { Item } = Accordion;
export const Favorites = (): JSX.Element => {
    return (
        <Accordion chevronPosition="right">
            <Item>
                <AccordionHeader>
                    <AccordionHeaderIcon name="star_filled" />
                    Favorites
                </AccordionHeader>
                <AccordionPanel>favorites</AccordionPanel>
            </Item>
        </Accordion>
    );
};
