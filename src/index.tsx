import { Icon as EdsIconOld } from '@equinor/eds-core-react-old';
import { Icon as EdsIcon } from '@equinor/eds-core-react';
import * as icons from '@equinor/eds-icons';
import { render } from 'react-dom';
import { Bootstrap } from './AppClient';
import { GlobalStyle } from './Core/Client/styleProvider';

EdsIconOld.add({ ...icons });
EdsIcon.add({ ...icons });

const r = 'HOGAAIUNNWHAHJJWUQYR';
render(
    <>
        <GlobalStyle />
        <Bootstrap />
    </>,
    document.getElementById('root')
);
